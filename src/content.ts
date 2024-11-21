import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
interface Events {
  event: string;
  handler: EventListener;
}
let orphanMessageId = chrome.runtime.id + 'orphanCheck';
window.dispatchEvent(new CustomEvent(orphanMessageId));
window.addEventListener(orphanMessageId, unregisterOrphan);
function unregisterOrphan() {
  if (chrome.runtime.id) {
    // The extension context is still valid.
    return;
  }

  // The extension context is invalid; the content script is orphaned.
  window.removeEventListener(orphanMessageId, unregisterOrphan);
  removeEventListener(events)
  return true;
}

let leaderKey: string = "Tab";
let indexKey: string = "";
let AccessleaderKey: string = "Shift";
let leaderKeyPressed: boolean = false;
let indexKeyPressed: boolean = false;
let AccessleaderKeyPressed: boolean = false;

const indexCurrentTab = new CustomEvent("indexTab");

const accessTab = new CustomEvent("accessTab");

function removeEventListener(events: Events[]) {
  events.forEach((event) => {
    window.removeEventListener(event.event, event.handler);
  });
}

function addEventListener(evetns: Events[]) {
  events.forEach((event) => {
    window.addEventListener(event.event, event.handler);
  });
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
    runAccessTabEvent();
  }
}
function handleKeyUp(e: any) {
  indexKeyPressed = false;
}

async function handleIndexTab(e: any) {
  if(unregisterOrphan()) return 
  leaderKeyPressed = false;
  indexKeyPressed = false;
  if (port === null) {
    connectToPort();
  }
  if (port) {
    port.postMessage({
      action: "setBinding",
      additionalInfo: {
        index: indexKey,
      },
    });
  }
}


function handleAccessTab(e: any) {
  if(unregisterOrphan()) return 
  if (port === null) {
    connectToPort();
  }
  if (port) {
    port.postMessage({
      action: "switchTab",
      index: indexKey,
    });
  }
  AccessleaderKeyPressed = false;
  indexKeyPressed = false;
}
function alert(success: boolean, message: string, time: number) {
  Toastify({
    text: message,
    style: {
      background: success
        ? "linear-gradient(to right, #4caf50, #2e7d32)"
        : "linear-gradient(to right, #ff0000, #e60000",
      fontSize: "16px",
    },
    duration: time,
    gravity: "bottom",
    position: "right",
    close: true,
    stopOnFocus: true,
  }).showToast();
}

function changeTitle(index: string) {
  document.title = `[ ${index} ]  ${document.title}`;
}
function backgroundListner() {
  if (port === null) return console.log("port is null");
   port.onMessage.addListener((response) => {
    if (response.message === "indexingTabUpdate") {
      if (response.success) {
        alert(true, "Tab indexed successfully.", 1500);
        changeTitle(indexKey);
      } else {
        alert(false, "Error indexing tab. Try again.", 1500);
      }
    } else if (response.message === "switchingTabUpdate") {
      alert(response.success, response.info, 1500);
    }
  });
}



function connectToPort() {
  port = chrome.runtime.connect({ name: "content" });
  backgroundListner();
  port.onDisconnect.addListener(() => {
    port = null;
  });
}
const events: Events[] = [
  { event: "keydown", handler: handleKeydown },
  { event: "keyUp", handler: handleKeyUp },
  { event: "accessTab", handler: handleAccessTab },
  { event: "indexTab", handler: handleIndexTab },
];
let port: chrome.runtime.Port | null;
port = chrome.runtime.connect({
  name: "content",
});
addEventListener(events);
backgroundListner();
port.onDisconnect.addListener(() => {
  port = null;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //this is use for receving sucess message. only one tab receives this
  if (message.message === "switchingTabUpdate") {
    alert(message.success, message.info, 1500);
  }
});
