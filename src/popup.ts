const tabList: HTMLElement | null = document.getElementById("tabList");


  type Tabs= Map<number | string, chrome.tabs.Tab>;

(async () => {
  try {
    let tabs:[any,any][] = await chrome.runtime.sendMessage({
      action: "getTabs",
    });
    if (!tabList) {
      console.log("cannnot rendre tabs in popup: tablist nul");
      return;
    }
    tabList.innerHTML = "";
    console.log("this is popu",tabs)
    tabs.forEach(([key,tab]) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Index: ${key}, URL: ${tab.url}`;
      tabList.appendChild(listItem);
    });
  } catch (e) {
    console.log(e);
  }
})();
