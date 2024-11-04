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
    console.log("inn");
    (async ()=>{
        let windowsHistory: chrome.windows.Window[] =await chrome.windows.getAll()

        for (let i = 0; i < windowsHistory.length; i++) {
             let aux: windowData = { window: windowsHistory[i], tabs: new Map<number|string , chrome.tabs.Tab>()};
           windows.push(aux) 
        }
        console.log("windows pop",windows)
    })()
}

chrome.windows.onCreated.addListener((newWindow) => {
  let aux: windowData = { window: newWindow, tabs: new Map<number|string , chrome.tabs.Tab>()};
  windows.push(aux);
  console.log('window', windows)
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
        console.log(Tabs);
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
        console.log("this is current window",currentWindow)
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
      let currentWindow: chrome.windows.Window =
        await chrome.windows.getCurrent();
      for (let i = 0; i < windows.length; i++) {
        if (currentWindow.id === windows[i].window.id) {
          sendResponse(serializeMap(windows[i].tabs));
          break;
        }
      }
    })();
  }
  return true;
});


populateExistingWindow()