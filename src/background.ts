interface windowData {
  window: chrome.windows.Window;
  tabs: Record<number | string, chrome.tabs.Tab>;
}

let tab: chrome.tabs.Tab[];
let windows: windowData[] = [];

// Utility function to serialize a Map to an array of key-value pairs
function serializeMap(map: Map<any, any>): [any, any][] {
  return Array.from(map.entries()); // Converts the Map to an array of tuples
}

async function populateExistingWindow() {
  try {
    // Retrieve the windows data from chrome.storage when the service worker starts
    let result = await chrome.storage.session.get(["windowsData"]);
    let windowsHistory: chrome.windows.Window[] = [];

    if (result.windowsData) {
      console.log("This is from session:", result.windowsData);
      windows = result.windowsData;
      console.log("This is windows after loading from session:", windows);
    } else {
      console.log("No window data; loading all tabs into windows");
      windowsHistory = await chrome.windows.getAll({
        populate: true,
      });
      for (let i = 0; i < windowsHistory.length; i++) {
        let aux: windowData = {
          window: windowsHistory[i],
          tabs: {},
        };
        windows.push(aux);
      }
    }

    // Populate windows with existing tab data if windowsHistory is not empty
    for (let i = 0; i < windows.length; i++) {
      let tabs = windows[i].window?.tabs;
      if (tabs) {
        for (let j = 0; j < tabs.length; j++) {
          let tabId = tabs[j]?.id;
          if (!tabId) {
            throw `Tab ID invalid for tab: ${tabs[j]}`;
          } else {
            console.log("executing content sscript for all the tab");
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              files: ["dist/content.js"],
            });
          }
        }
      } else {
        console.log("no tabs in windows");
      }
    }
  } catch (e) {
    console.log("Error populating window:", e);
  }
}

chrome.windows.onCreated.addListener(async (newWindow) => {
  console.log("new window created");
  let aux: windowData = {
    window: newWindow,
    tabs: {},
  };
  windows.push(aux);
  await chrome.storage.session.set({ windowsData: windows });
});

async function getCurrentTabHandler(request: any, port: chrome.runtime.Port) {
  try {
    tab = await chrome.tabs.query({ active: true, currentWindow: true });
    for (let i = 0; i < windows.length; i++) {
      //if current tab's window id == window id in the array
      if (tab[0].windowId === windows[i].window.id) {
        windows[i].tabs[request.additionalInfo.index] = tab[0];
        await chrome.storage.session.set({ windowsData: windows });
        port.postMessage({message : "indexTabUpdate",success : true})
        break;
      }
    }
  } catch (e) {
    port.postMessage({success : false})
    console.log("error getting tab", e);
    //todo : add remove button, fix index glitch, resize poppup url font size , 
  }
}

async function switchTabHandler(request: any, port: chrome.runtime.Port) {
  let indexKey = request.additionalInfo.indexKey;
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
    if (message.action === "ping") {
      console.log("Received ping, service worker is alive");
    }
  });
  port.onDisconnect.addListener(async () => {
    console.log("port disconnected", port.name);
    await chrome.storage.session.set({ windowsData: windows });
    if (port.name === "popup") return;
  });
});
// Create an alarm that triggers every 15 minutes
chrome.alarms.create("periodicCheck", { periodInMinutes: 1 });

populateExistingWindow();
