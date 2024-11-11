const tabList: HTMLElement | null = document.getElementById("tabList");
type Tabs = Map<number | string, chrome.tabs.Tab>;
const PopUpPort = chrome.runtime.connect({ name: "popup" });

(async () => {
  PopUpPort.postMessage({ action: "getTabs" });

  PopUpPort.onMessage.addListener((response) => {
    try {
      let tabs: Record<number | string, chrome.tabs.Tab> = response;

      if (!tabList) {
        console.log("cannot render tabs in popup: tabList is null");
        return;
      }

      if (Object.keys(tabs).length === 0) {
        {
          // Redirect to a different page within the same site
          window.location.href = "learn.html";
          return;
        }
     }

      tabList.innerHTML = ""; // Clear existing items

      // Iterate over the object using Object.entries()
      Object.entries(tabs).forEach(([key, tab]) => {
        // Create the list item for each tab
        const listItem = document.createElement("li");

        const icon = document.createElement("img");
        icon.src =
          "https://www.techonthenet.com/clipart/keyboard/images/shift_key.png"; // Update with your image path
        icon.alt = "Tab Icon"; // Alt text for accessibility
        icon.style.width = "20px"; // Set desired width
        icon.style.height = "20px"; // Set desired height
        icon.style.marginRight = "8px"; // Space between icon and text

        const keyNode = document.createElement("code");

        keyNode.textContent = `${key} + Shift`;
        // Create a text node for the tab information
        const textNode = document.createTextNode(`${tab.url}`);
        const url = document.createElement("span");
        url.classList.add("url_span");
        url.appendChild(textNode);

        // Append the icon and text to the list item
        listItem.appendChild(keyNode);
        // listItem.appendChild(icon);
        listItem.appendChild(url);

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

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        // Append the list item to the tabList
        tabList.appendChild(listItem);
      });
    } catch (e) {
      console.log("Couldn't get tabs", e);
    }
  });
})();
