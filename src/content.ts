import Swal from "sweetalert2";
import { addCssToSwal } from "./swalConfig";
interface Events {
  event: string;
  handler: EventListener;
}
interface windowData {
  window: chrome.windows.Window;
  tabs: Record<number | string, chrome.tabs.Tab>;
}
let  bindings: Record<number | string, chrome.tabs.Tab>= {}
let leaderKey: string = "Tab";
let indexKey: string = "";
let AccessleaderKey: string = "Shift";
let leaderKeyPressed: boolean = false;
let indexKeyPressed: boolean = false;
let AccessleaderKeyPressed: boolean = false;
let windows: chrome.tabs.Tab[] = []

const indexCurrentTab = new CustomEvent("indexTab");

const accessTab = new CustomEvent("accessTab");

async function getAllTabs(){
    try{
      let result  = await chrome.storage.session.get({ tabs: tabs });
      if(result.windowsData){
        windows = result.windowData
      }else{
        console.log("no tabs")
      }
    }catch(e){
      console.log("error getting tabs form session becaue", e)
    }
}

function removeEventListener(events: Events[]) {
  events.forEach((event) => {
    window.removeEventListener(event.event, event.handler);
  });
}

function trackKeyPressedDuration(callback: () => void, duration: number) {
  setTimeout(() => {
    callback();
  }, duration);
}
//trigger indexCurreentTAb
function runIndexCurrentabEvent() {
  if (!leaderKeyPressed && !indexKeyPressed) return;
  window.dispatchEvent(indexCurrentTab);
}

function runAccessTabEvent() {
  if (!AccessleaderKeyPressed && !indexKeyPressed) return;
  window.dispatchEvent(accessTab);
}
function handleKeydown(e: any) {
  if (
    !indexKeyPressed &&
    e.key !== "Alt" &&
    e.key !== AccessleaderKey &&
    e.key !== leaderKey
  ) {
    indexKey = e.key;
    indexKeyPressed = true;
    return;
  }

  if (indexKeyPressed && e.key === leaderKey && leaderKey != indexKey) {
    e.preventDefault();
    leaderKeyPressed = true;
    runIndexCurrentabEvent();
    return;
  }

  if (
    e.key === AccessleaderKey &&
    indexKeyPressed &&
    indexKey != AccessleaderKey
  ) {
    AccessleaderKeyPressed = true;
    console.log("this is access keypresses", AccessleaderKeyPressed);
    console.log("this is index key", indexKey);
    runAccessTabEvent();
  }
}
function handleKeyUp(e: any) {
  indexKeyPressed = false;
}

function handleIndexTab(e: any) {
  leaderKeyPressed = false;
  indexKeyPressed = false;
  port.postMessage({
    action: "getCurrentTab",
    additionalInfo: {
      index: indexKey,
      windows: windows,
    },
  });
}

function handleAccessTab(e: any) {
  port.postMessage({
    action: "switchTab",
    additionalInfo: { indexKey: indexKey ,windows: windows},
  });
  AccessleaderKeyPressed = false;
  indexKeyPressed = false;
}
function alert(success: boolean, message: string, time: number) {
  Swal.fire({
    text: message,
    position: "bottom",
    timer: time, // Alert will auto-close after 3 seconds
    timerProgressBar: true,
    showConfirmButton: false,
    showCloseButton: true,
    returnFocus: false,
    focusConfirm: false, // Prevent the confirm button from being focused automatically
    focusCancel: false,
    backdrop: false,
    customClass: {
      popup: success ? "custom-swal-popup" : "custom-swal-error",
    },
     didOpen: () => {
    // Get the close button using getElementsByClassName
    const closeButtons = document.getElementsByClassName('swal2-close');

    // Make sure to check if the collection has any elements
    if (closeButtons.length > 0) {
      // TypeScript: cast the first element to HTMLElement
      const closeButton = closeButtons[0] as HTMLElement;

      // Now you can safely access the style property
      closeButton.style.border = 'none !important';        // Remove border
      closeButton.style.background = 'none !important'; 
       closeButton.style.boxShadow = 'none !important';    // Remove background
      closeButton.style.color = 'inherit';       // Inherit color
      closeButton.style.fontSize = '30px';       // Optional: Change font size
      closeButton.style.padding = '0';           // Optional: Remove padding
    }
  }
  });
}

function setAllTabs(){
  port.postMessage({action: "setAllTabs"})
}
const events: Events[] = [
  { event: "keydown", handler: handleKeydown },
  { event: "keyUp", handler: handleKeyUp },
  { event: "accessTab", handler: handleAccessTab },
  { event: "indexTab", handler: handleIndexTab },
];

console.log("connetion established with backgroound");
let port = chrome.runtime.connect({ name: "content" });
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("indexTab", handleIndexTab);
window.addEventListener("accessTab", handleAccessTab);
port.onMessage.addListener((response) => {
  addCssToSwal();
  if (response.message === "indexTabUpdate") {
    if (response.success) {
      alert(true, "Tab indexed successfully.", 1500);
    } else {
      alert(false, "Error indexing tab. Try again.", 1500);
    }
  } else if (response.message === "switchTabUpdate") {
    console.log(response.info);
    alert(response.success, response.info, 1500);
  }

  if(response.message ==="updateData"){
    getAllTabs()
  }
});
port.onDisconnect.addListener(() => {
  console.log("connection to port lost");
port = chrome.runtime.connect({name:"content"})
console.log("this is the new connetion  to background")
});

setAllTabs()