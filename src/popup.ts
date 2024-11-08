const tabList: HTMLElement | null = document.getElementById("tabList");
type Tabs = Map<number | string, chrome.tabs.Tab>;
const PopUpPort = chrome.runtime.connect({ name: "popup" });

(async () => {
  PopUpPort.postMessage({ action: "getTabs" });
  
  PopUpPort.onMessage.addListener((response) => {
    try {
      let tabs: [any, any][] = response;
      
      if (!tabList) {
        console.log("cannot render tabs in popup: tabList is null");
        return;
      }
      
      tabList.innerHTML = ""; // Clear existing items

      tabs.forEach(([key, tab]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Index: ${key}, URL: ${tab.url}`;

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        
        // Add a click event listener to the delete button
        deleteButton.addEventListener("click", () => {
          // Send a message to delete the tab
          PopUpPort.postMessage({ action: "deleteTab", tabId: key });
          
          // Remove the item from the list in the popup UI
          listItem.remove();
        });

        // Append the button to the list item
        listItem.appendChild(deleteButton);
        
        // Append the list item to the tabList
        tabList.appendChild(listItem);
      });
    } catch (e) {
      console.log("Couldn't get tabs", e);
    }
  });
})();

