function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  return new Promise((resolve, reject) => {
    chrome.tabs.getCurrent((tab) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(tab);
      }
    });
  });
}
let tab: chrome.tabs.Tab[];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCurrentTab") {
      console.error("inn");
    (async () => {
      try {
        tab = await chrome.tabs.query({active:true,currentWindow: true});
        sendResponse({success: true , data: tab[0]})
      } catch (e) {
        sendResponse({success : false, data: undefined})
      }
    })();
    return true
  }
});
console.log("background loaded")
