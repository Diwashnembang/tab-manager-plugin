interface windowData {
  window: chrome.windows.Window;
  tabs: Map<number | string, chrome.tabs.Tab>;
}
let tab: chrome.tabs.Tab[];
let windows: windowData[] = [];
let Tabs: Map<number | string, chrome.tabs.Tab> = new Map();
// Utility function to serialize a Map to an array of key-value pairs
function serializeMap(map: Map<any, any>): [any, any][] {
  return Array.from(map.entries()); // Converts the Map to an array of tuples
}

function populateExistingWindow(){
    (async ()=>{
        let windowsHistory: chrome.windows.Window[] =await chrome.windows.getAll()

        for (let i = 0; i < windowsHistory.length; i++) {
             let aux: windowData = { window: windowsHistory[i], tabs: new Map<number|string , chrome.tabs.Tab>()};
           windows.push(aux) 
        }
    })()
}

chrome.windows.onCreated.addListener((newWindow) => {
  let aux: windowData = { window: newWindow, tabs: new Map<number|string , chrome.tabs.Tab>()};
  windows.push(aux);
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCurrentTab") {
    (async () => {
      try {
        tab = await chrome.tabs.query({ active: true, currentWindow: true });
        for (let i = 0; i < windows.length; i++) {
          //if current tab's window id == window id in the array
          if (tab[0].windowId === windows[i].window.id) {
            windows[i].tabs.set(request.additionalInfo.index, tab[0]);
            break;
          }
        }
      } catch (e) {
        console.log("error getting tab", e);
      }
    })();
    return true;
  }

  if (request.action === "switchTab") {
    let indexKey = request.additionalInfo.indexKey;
    (
        async () => {
      let currentWindow: chrome.windows.Window =
        await chrome.windows.getCurrent();
      for (let i = 0; i < windows.length; i++) {
        //switch tab in the correct window
        if (currentWindow.id === windows[i].window.id) {
          let tab = windows[i].tabs.get(indexKey.toLocaleLowerCase());
          if (!tab) {
            console.log(tab);
            return;
          }
          chrome.tabs.update(Number(tab.id), { active: true });
          break;
        }
      }
    })();
  }
  if (request.action === "getTabs") {
    (async () => {
        //getting lastfocused because getting curring focued retunrns the pop up window
      let currentWindow: chrome.windows.Window =
        await chrome.windows.getLastFocused();
      for (let i = 0; i < windows.length; i++) {
        console.log("this is all windows tab",windows[i].tabs)
        if (currentWindow.id === windows[i].window.id) {
            console.log("this is windws's tab",windows[i].tabs)
          sendResponse(serializeMap(windows[i].tabs));
          break;
        }
      }
    })();
  }
  return true;
});


populateExistingWindow()