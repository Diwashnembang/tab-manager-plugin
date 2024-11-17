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
    port.postMessage({message : "indexingTabUpdate",success : true})
  } catch (e) {
    console.log("couldn't get bindings from the storage baecausje", e);
    port.postMessage({message : "indexingTabUpdate",success : true})
  }
}

async function getBindingsHandler(request : any , port: chrome.runtime.Port) {
    tabs = await chrome.tabs.query({currentWindow : true})
    let data : Record<number | string, chrome.tabs.Tab> = bindings[tabs[0]?.windowId]
    port.postMessage(data || {})
}

async function switchTabHandler(request: any, port: chrome.runtime.Port) {
  let index = request.index;
  try {
    tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tabId = bindings[tabs[0].windowId][index].id;
    if(tabId === tabs[0].id){
      port.postMessage({success:false,info:"Already on the tab",message:"switchingTabUpdate"})
      return 
    }
    if (tabId) {
      chrome.tabs.update(tabId, { active: true });
      chrome.tabs.sendMessage(tabId,{success: true, info:"Tab Switched Sucessfully",message:"switchingTabUpdate"})
      return
    } else {
      throw console.error("undefiend tabId", tabId);
    }
  } catch (e) {
    port.postMessage({success: false,info:"Key binding doesn't exist",message:"switchingTabUpdate"})
    console.log("error swtiching tabs", e);
  }
}

async function deleteBindignHandler(request:any , port : chrome.runtime.Port){
  delete bindings[request.windowId][request.key]
}

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    if (message.action === "getCurrentTab") {
      // getCurrentTabHandler(message, port);
    }
    if (message.action === "switchTab") {
      switchTabHandler(message, port);
    }
    if (message.action === "deleteBinding") {
      deleteBindignHandler(message,port)
    }
    if (message.action === "setBinding") {
      setBindingsHandler(message, port);
    }
    if(message.action === "getBindings"){
      getBindingsHandler(message, port)
    }
  });

  //so that service worker isn't supspended
  if(port.name !== "popup"){
    setInterval(() => {
      console.log("port pinging ",port.name)
      port.postMessage({ action: "health" });
    }, 15 * 1000);
  }
});
