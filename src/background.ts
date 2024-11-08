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

function populateExistingWindow() {
  // // Retrieve the windows data from chrome.storage when the service worker starts
  (async () => {
    try {
      let result = await chrome.storage.session.get(["windowsData"]);
      if (result.windowData){
        console.log("this is from session", result.windowsData);
        windows.push(result.windowsData);
      }

      let windowsHistory: chrome.windows.Window[] = await chrome.windows.getAll(
        {
          populate: true,
        }
      );

      for (let i = 0; i < windowsHistory.length; i++) {
        let aux: windowData = {
          window: windowsHistory[i],
          tabs: new Map<number | string, chrome.tabs.Tab>(),
        };
        windows.push(aux);
        let tabs = windowsHistory[i]?.tabs;
        console.log(tabs);
        console.log("this is windows", windows);
        if (tabs) {
          for (let j = 0; j < tabs.length; j++) {
            let tabId = tabs[j]?.id;
            if (!tabId) {
              throw `tab id unvalid ${tabs[i]}`;
            } else {
              chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["dist/content.js"],
              });
            }
          }
        }
      }
    } catch (e) {
      console.log("error populating window", e);
    }
    console.log("all windoes", windows);
  })();
}
chrome.windows.onCreated.addListener((newWindow) => {
  let aux: windowData = {
    window: newWindow,
    tabs: new Map<number | string, chrome.tabs.Tab>(),
  };
  windows.push(aux);
});

async function getCurrentTabHandler(request: any, port: chrome.runtime.Port) {
  try {
    tab = await chrome.tabs.query({ active: true, currentWindow: true });
    for (let i = 0; i < windows.length; i++) {
      //if current tab's window id == window id in the array
      if (tab[0].windowId === windows[i].window.id) {
        windows[i].tabs.set(request.additionalInfo.index, tab[0]);
        await chrome.storage.session.set({ windowsData: windows });
        let result = await chrome.storage.session.get(["windowsData"])
        console.log("this is after the update ",result.windowsData)
        break;
      }
    }
  } catch (e) {
    console.log("error getting tab", e);
  }
}

async function switchTabHandler(request: any, port: chrome.runtime.Port) {
  let indexKey = request.additionalInfo.indexKey;
  let currentWindow: chrome.windows.Window = await chrome.windows.getCurrent();
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
}
async function getTabsHandler(request: any, port: chrome.runtime.Port) {
  //getting lastfocused because getting curring focued retunrns the pop up window
  let currentWindow: chrome.windows.Window =
    await chrome.windows.getLastFocused();
  for (let i = 0; i < windows.length; i++) {
    if (currentWindow.id === windows[i].window.id) {
      port.postMessage(serializeMap(windows[i].tabs));
      break;
    }
  }
}
chrome.runtime.onConnect.addListener((port) => {
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
    if (message.action === "ping") {
      console.log("Received ping, service worker is alive");
    }
  });
  port.onDisconnect.addListener(async () => {
    port.postMessage({ message: "cleanup events" });
    //   // Save the windows data to chrome.storage
    await chrome.storage.session.set({ windowsData: windows });
  });
});
populateExistingWindow();
