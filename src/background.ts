
let tab: chrome.tabs.Tab[];
let  Tabs: Map<number | string, chrome.tabs.Tab> = new Map();
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCurrentTab") {
    (async () => {
      try {
        tab = await chrome.tabs.query({active:true,currentWindow: true});
        Tabs.set(request.additionalInfo.index,tab[0]) 
        console.log(Tabs)
      } catch (e) {
        console.log("error getting tab",e)
    }})();
    return true
  }


  if( request.action ==="switchTab"){
    let indexKey = request.additionalInfo.indexKey
        let accessKey = Tabs.get(indexKey.toLocaleLowerCase())
        console.log("index key",indexKey)
        if(!accessKey){
            console.log(accessKey)
            return 
        }
    chrome.tabs.update(Number(accessKey.id),{active: true})
    
  }
});

