import Swal from "sweetalert2";
import { addCssToSwal } from "./swalConfig";
interface Events {
  event: string;
  handler: EventListener;
}
interface windowData {
  window: chrome.windows.Window;
  tabs: Record<number | string, number>;
}
//no need to store tabs. jsut store bindings
let bindings: Record<string, chrome.tabs.Tab> = {};
let leaderKey: string = "Tab";
let indexKey: string = "";
let AccessleaderKey: string = "Shift";
let leaderKeyPressed: boolean = false;
let indexKeyPressed: boolean = false;
let AccessleaderKeyPressed: boolean = false;
let tabs: chrome.tabs.Tab[] = [];

const indexCurrentTab = new CustomEvent("indexTab");

const accessTab = new CustomEvent("accessTab");


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

async function handleIndexTab(e: any) {
  leaderKeyPressed = false;
  indexKeyPressed = false;
  if(port){
    //FIXME this is not triggring
    port.postMessage({
      action: "setBinding",
      additionalInfo: {
       index: indexKey 
      },
    });
  }else{
    console.log("cannot send message to port because port is", port)
  }
}

function handleAccessTab(e: any) {
  port.postMessage({
    action: "switchTab",
    additionalInfo: { tabId : bindings[indexKey]},
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
      const closeButtons = document.getElementsByClassName("swal2-close");

      // Make sure to check if the collection has any elements
      if (closeButtons.length > 0) {
        // TypeScript: cast the first element to HTMLElement
        const closeButton = closeButtons[0] as HTMLElement;

        // Now you can safely access the style property
        closeButton.style.border = "none !important"; // Remove border
        closeButton.style.background = "none !important";
        closeButton.style.boxShadow = "none !important"; // Remove background
        closeButton.style.color = "inherit"; // Inherit color
        closeButton.style.fontSize = "30px"; // Optional: Change font size
        closeButton.style.padding = "0"; // Optional: Remove padding
      }
    },
  });
}


const events: Events[] = [
  { event: "keydown", handler: handleKeydown },
  { event: "keyUp", handler: handleKeyUp },
  { event: "accessTab", handler: handleAccessTab },
  { event: "indexTab", handler: handleIndexTab },
];


let port = chrome.runtime.connect({ name: "content" });
port.postMessage({action: "triggerUpdateBinding"})
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("indexTab", handleIndexTab);
window.addEventListener("accessTab", handleAccessTab);
setInterval(()=>{
  port.postMessage({action:"health"})
},15*1000)
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

  if (response.message === "updateData") {
    console.log("inside updateData")
    if(response.success){
      tabs = response.data
      console.log("this is tabs",tabs)
    }
  }
  if (response.message === "updateBindings") {
    if(response.success){
      bindings = response.data
      console.log("this is bindigs",bindings)
    }
  }
});
