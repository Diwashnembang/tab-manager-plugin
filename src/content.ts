interface Events {
  event: string;
  handler: EventListener;
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
    document.removeEventListener(event.event, event.handler);
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
  document.dispatchEvent(indexCurrentTab);
}

function runAccessTabEvent() {
  if (!AccessleaderKeyPressed && !indexKeyPressed) return;
  document.dispatchEvent(accessTab);
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
    leaderKeyPressed = true;
    runIndexCurrentabEvent();
    return;
  }

  if (e.key === AccessleaderKey && indexKey && indexKey != AccessleaderKey) {
    AccessleaderKeyPressed = true;
    console.log("this is access keypresses", AccessleaderKeyPressed);
    console.log("this is index key", indexKey);
    runAccessTabEvent();
  }
}
function handleKeyUp(e: any) {
  if (!indexKeyPressed) return;
  indexKeyPressed = false;
}

function handleIndexTab(e: any) {
  leaderKeyPressed = false;
  indexKeyPressed = false;
  port.postMessage({
    action: "getCurrentTab",
    additionalInfo: {
      index: indexKey,
    },
  });
}

function handleAccessTab(e: any) {
  port.postMessage({
    action: "switchTab",
    additionalInfo: { indexKey: indexKey },
  });
  AccessleaderKeyPressed = false;
  indexKeyPressed = false;
}
const events: Events[] = [
  { event: "keydown", handler: handleKeydown },
  { event: "keyUp", handler: handleKeyUp },
  { event: "accessTab", handler: handleAccessTab },
  { event: "indexTab", handler: handleIndexTab },
];

let port = chrome.runtime.connect({ name: "content" });
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("indexTab", handleIndexTab);
document.addEventListener("accessTab", handleAccessTab);
port.onDisconnect.addListener(()=>{
  removeEventListener(events)
  port.disconnect()
  port = chrome.runtime.connect({name:"content"})
})
    //   // Save the windows data to chrome.storage


// // Periodically send a ping to keep the service worker alive
// setInterval(() => {
//   port.postMessage({ action: "ping" });
// }, 60000)
