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
    document.removeEventListener(event.event,event.handler);
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
  if (!indexKeyPressed && e.key !== "Alt") {
    indexKey = e.key;
    indexKeyPressed = true;
    return;
  }

  if (indexKeyPressed && e.key === leaderKey) {
    leaderKeyPressed = true;
    runIndexCurrentabEvent();
    return;
  }

  if (e.key === AccessleaderKey && indexKey) {
    AccessleaderKeyPressed = true;
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
  console.log(indexKey);
  try {
    chrome.runtime.sendMessage({
      action: "getCurrentTab",
      additionalInfo: {
        index: indexKey,
      },
    });
  } catch (e) {
    console.log("error sending get current message", e);
  }
}

function handleAccessTab(e: any) {
  AccessleaderKeyPressed = false;
  indexKeyPressed = false;
  console.log(indexKey)
  try {
    chrome.runtime.sendMessage({
      action: "switchTab",
      additionalInfo: { indexKey: indexKey },
    });
  } catch (e) {
    console.log("error switching tab", e);
    
  }
}
const events: Events[] = [
  { event: "keydown", handler: handleKeydown },
  { event: "keyUp", handler: handleKeyUp },
  { event: "accessTab", handler:handleAccessTab },
  { event: "indexTab", handler: handleIndexTab },
];

removeEventListener(events);
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("indexTab", handleIndexTab);
document.addEventListener("accessTab", handleAccessTab);
