/*
 binding data structure
  {bindings : {
    windowId:{
      index: tab
    }
  }}

*/
let bindings: Record<string | number, Record<string, chrome.tabs.Tab>> = {};
//usings this to store tabs that is get from quering tabs
let tabs: chrome.tabs.Tab[] = [];

let interval: NodeJS.Timeout;

async function setBindingsHandler(message: any, port: chrome.runtime.Port) {
  try {
    tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  } catch (e) {
    console.log("error inexing tab because ", e);
  }

  let index = message.additionalInfo.index;
  if (!index)
    return console.log("cannot set binding because binding is ", index);
  try {
    if (!bindings[tabs[0]?.windowId]) {
      bindings[tabs[0].windowId] = {};
    }
    bindings[tabs[0].windowId][index] = tabs[0];
    port.postMessage({ message: "indexingTabUpdate", success: true });
    await chrome.storage.session.set({ bindings: bindings });
  } catch (e) {
    console.log("couldn't get bindings from the storage baecausje", e);
    port.postMessage({ message: "indexingTabUpdate", success: true });
  }
}

async function getBindingsHandler(request: any, port: chrome.runtime.Port) {
  tabs = await chrome.tabs.query({ currentWindow: true });
  let data: Record<number | string, chrome.tabs.Tab> =
    bindings[tabs[0]?.windowId];
  port.postMessage(data || {});
}

async function switchTabHandler(request: any, port: chrome.runtime.Port) {
  let index = request.index;
  try {
    tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tabId = bindings[tabs[0].windowId][index].id;
    if (tabId === tabs[0].id) {
      port.postMessage({
        success: false,
        info: "Already on the tab",
        message: "switchingTabUpdate",
      });
      return;
    }
    if (tabId) {
      chrome.tabs.update(tabId, { active: true });
      chrome.tabs.sendMessage(tabId, {
        success: true,
        info: "Tab Switched Sucessfully",
        message: "switchingTabUpdate",
      });
      return;
    } else {
      throw console.error("undefiend tabId", tabId);
    }
  } catch (e) {
    port.postMessage({
      success: false,
      info: "Key binding doesn't exist",
      message: "switchingTabUpdate",
    });
    console.log("error swtiching tabs", e);
  }
}

async function deleteBindignHandler(request: any, port: chrome.runtime.Port) {
  delete bindings[request.windowId][request.key];
  try {
    await chrome.storage.session.set({ bindings: bindings });
  } catch (e) {
    console.log("error deleting bindings form the storage because", e);
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  let promises :Promise<chrome.scripting.InjectionResult<unknown>[]>[]=[]
  try{
    tabs = await chrome.tabs.query({})
    tabs.forEach(tab=>{
      let tabId = tab.id
      if(tabId){
        chrome.tabs.sendMessage(tabId,{action:"removeListners"})
      }
    })
    let keyBindings = await chrome.storage.session.get(["bindings"])
    if(keyBindings.bindings){
      bindings = keyBindings.bindings
    }
    if(!tabs) throw "no tabs"
    for(let i=0 ; i< tabs.length; i++ ){
      try{
        
        let tabId = tabs[i]?.id
        if(!tabId) throw "no tab id to inject content"
        let result = chrome.scripting.executeScript({
          target: { tabId: tabId }, // Specify the tab you want to inject the script into
          files: ['dist/content.js'] // Path to your content script file
        },)
        ;
        promises.push(result) 
      }catch (e){
        console.log(e)
      }
    }
  }catch (e){
    console.log(e)
  }
  try{
    await Promise.all(promises)
  }catch (e){
    console.log(e)
  }
});

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    if (message.action === "switchTab") {
      switchTabHandler(message, port);
    }
    if (message.action === "deleteBinding") {
      deleteBindignHandler(message, port);
    }
    if (message.action === "setBinding") {
      setBindingsHandler(message, port);
    }
    if (message.action === "getBindings") {
      getBindingsHandler(message, port);
    }
  });

  //so that service worker isn't supspended
  if (port.name !== "popup" && port) {
    interval = setInterval(() => {
      try {
        port.postMessage({ action: "health" });
      } catch (e) {
        console.log(e, port.name);
      }
    }, 15 * 1000);
  }

  port.onDisconnect.addListener(() => {
    clearInterval(interval);
  });
});

async function seedBindings() {
  try {
    let result = await chrome.storage.session.get(["bindings"]);
    if (result.bindings) {
      bindings = { ...result.bindings };
    } else {
      throw "couldn't get bindings to seed data";
    }
  } catch (e) {
    console.log("error seeding data because", e);
  }
}
async function wakeUP() {
  try {
    //sending wakeup message to reconnect  bacground and content script
    let result = await chrome.storage.session.get(["wakingUp"]);
    if (result.wakingUp) {
      chrome.runtime.sendMessage({ action: "wakeUp" });
      seedBindings();
    } else {
      throw "chould retrive waking up ";
    }
  } catch (e) {
    console.log("error wakin up because", e);
  }
  //so waking up is true when service worker rerun
  await chrome.storage.session.set({ wakingUp: true });
}

wakeUP();
