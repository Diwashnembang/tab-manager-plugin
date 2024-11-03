
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


  if( request.action ==="switchTab"){
    console.log("in switch tab",request.tabId)
    chrome.tabs.update(request.tabId,{active: true})
  }
});

