
let tab: chrome.tabs.Tab[];
let  Tabs: Map<number | string, chrome.tabs.Tab> = new Map();
// Utility function to serialize a Map to an array of key-value pairs
function serializeMap(map: Map<any, any>): [any, any][] {
    return Array.from(map.entries()); // Converts the Map to an array of tuples
}
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
  if(request.action ==="getTabs"){
    sendResponse(serializeMap(Tabs)) 
    return true 
  }
});

