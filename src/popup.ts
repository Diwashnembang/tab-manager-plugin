const tabList: HTMLElement | null = document.getElementById("tabList");
type Tabs = Map<number | string, chrome.tabs.Tab>;
const PopUpPort = chrome.runtime.connect({name:"popup"});
(async () => {
  PopUpPort.postMessage({action:"getTabs"})
  PopUpPort.onMessage.addListener((response)=>{
    try{

      let tabs: [any, any][] = response
      if (!tabList) {
        console.log("cannnot rendre tabs in popup: tablist nul");
        return;
      }
      tabList.innerHTML = "";
      tabs.forEach(([key, tab]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Index: ${key}, URL: ${tab.url}`;
        tabList.appendChild(listItem);
      });
    }catch(e){
      console.log("couldn't get tabs",e)
    }

  })
})();
