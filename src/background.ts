let tabs: chrome.tabs.Tab[]
// Utility function to serialize a Map to an array of key-value pairs
function serializeMap(map: Map<any, any>): [any, any][] {
  return Array.from(map.entries()); // Converts the Map to an array of tuples
}



async function setAllTabsHandler(request : any , port : chrome.runtime.Port){
  try {
    tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.storage.session.set({tabs: tabs})
    port.postMessage({message:"updateData",success: true})
    
  }
}
chrome.windows.onCreated.addListener(async (newWindow) => {
  console.log("new window created");
});

async function indexTabHandler(request: any, port: chrome.runtime.Port) {
  let windows = request.additionalInfo.windows
  try {
    let tab = await chrome.tabs.query({ active: true, currentWindow: true });
    for (let i = 0; i < windows.length; i++) {
      //if current tab's window id == window id in the array
      if (tab[0].windowId === windows[i].window.id) {
        windows[i].tabs[request.additionalInfo.index] = tab[0];
        await chrome.storage.session.set({ windowsData: windows });
        port.postMessage({message:"updateData",success: true})
        port.postMessage({message : "indexTabUpdate",success : true})
        break;
      }
    }
  } catch (e) {
    port.postMessage({success : false})
    console.log("error getting tab", e);
  }
}

async function switchTabHandler(request: any, port: chrome.runtime.Port) {
  let indexKey = request.additionalInfo.indexKey;
  let windows = request.additionalInfo.windows
  let activeWindow = await chrome.tabs.query({active:true,currentWindow:true})
  for (let i = 0; i < windows.length; i++) {
    //switch tab in the correct window
    if (activeWindow[0].windowId === windows[i].window.id) {
      let tab = windows[i].tabs[indexKey];
      if (!tab) {
        port.postMessage({success : false, info : "key binding doesn't exists", message:"switchTabUpdate"})
        console.log("inside switch tab when no tab is found", tab);
        return;
      }
      if(activeWindow[0].id === tab.id){
        console.log("already on the tab")
        port.postMessage({success : false, info: "Aleady on the tab", message :"switchTabUpdate"})
        return 
      }
      try{
        await chrome.tabs.update(Number(tab.id), { active: true });
      }catch (e){
        console.log("error swtiching tabs",e)
        port.postMessage({success:false, info:"Error switching tab",message:"switchTabUpdate"})
      }
      break
    }else{
      if (i == windows.length -1){

        console.log("no matching windows found for switching tabs")
      }
    }
  }
}

async function getTabsHandler(request: any, port: chrome.runtime.Port) {
  //getting lastfocused because getting curring focued retunrns the pop up window
  let currentWindow: chrome.windows.Window =
    await chrome.windows.getLastFocused();
  for (let i = 0; i < windows.length; i++) {
    if (currentWindow.id === windows[i].window.id) {
      port.postMessage(windows[i].tabs);
      break;
    }
  }
}

async function removeIndex(request: any, port : chrome.runtime.Port) {
  let currentWindow: chrome.windows.Window =
    await chrome.windows.getLastFocused();
  
     for (let i = 0; i < windows.length; i++) {
    if (currentWindow.id === windows[i].window.id) {
      delete windows[i].tabs[request.key]
      chrome.storage.session.set({windowsData : windows})
      console.log("removed index")
      break;
    }
  }
  
}

chrome.runtime.onStartup.addListener(async () => {
  await chrome.storage.session.set({ shouldWakeUp: false });
});

chrome.runtime.onConnect.addListener((port) => {
  console.log(`${port.name}'s port connected`);
  port.onMessage.addListener((message) => {
    if (message.action === "getCurrentTab") {
      getCurrentTabHandler(message, port);
    }
    if (message.action === "switchTab") {
      switchTabHandler(message, port);
    }
    if (message.action === "getTabs") {
      getTabsHandler(message, port);
    }
    if(message.action ==="deleteTab"){
      removeIndex(message,port)
    }
    if (message.action === "setAllTabs") {
      setAllTabsHandler(message,port)
    }
  });
  port.onDisconnect.addListener(async () => {
    console.log("port disconnected", port.name);
    if (port.name === "popup") return;
  });
});

