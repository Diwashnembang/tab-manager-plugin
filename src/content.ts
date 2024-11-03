const Tabs: Map<number | string, chrome.tabs.Tab> = new Map();
let leaderKey: string = "Control";
let indexKey:  string = "";
let AccessleaderKey: string = "Shift";
let leaderKeyPressed: boolean = false;
let indexKeyPressed: boolean = false;
let AccessleaderKeyPressed: boolean = false;

const indexCurrentTab = new CustomEvent("indexTab");

const accessTab = new CustomEvent("accessTab")

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

function runAccessTabEvent(){
    if(!AccessleaderKeyPressed && !indexKeyPressed) return
    document.dispatchEvent(accessTab)
}


document.addEventListener("keydown", (e) => {
  if (e.key === leaderKey) {
    leaderKeyPressed = true;
    trackKeyPressedDuration(()=>{
        if (leaderKeyPressed == false) return
        leaderKeyPressed = false
        console.log(leaderKeyPressed)
    },5000)
    return;
  } else if (e.key === AccessleaderKey) {
    AccessleaderKeyPressed = true;
    trackKeyPressedDuration(()=>{
        if (AccessleaderKeyPressed == false) return
        AccessleaderKeyPressed=false
    },5000)
    return;
  }
  if (leaderKeyPressed && leaderKey != AccessleaderKey) {
    indexKey = e.key;
    indexKeyPressed = true;
    runIndexCurrentabEvent();
  }else  if(AccessleaderKeyPressed && leaderKey != AccessleaderKey){
    indexKey = e.key
    indexKeyPressed = true
    runAccessTabEvent()
  }

;
});
document.addEventListener("keyup", (e) => {
  if (!leaderKeyPressed) return;
  if (e.key === leaderKey) {
    leaderKeyPressed = false;
  }
});

interface TabResponse {
  success: boolean;
  data: chrome.tabs.Tab | undefined;
}
document.addEventListener("indexTab", (e) => {
  leaderKeyPressed = false;
  indexKeyPressed = false;
  let tab: TabResponse = { success: false, data: undefined };
  (async () => {
    try {
      tab = await chrome.runtime.sendMessage({ action: "getCurrentTab" });
      if (tab.success && tab.data != undefined) {
        Tabs.set(indexKey, tab.data);
      } else {
        console.error("tab is undefined", tab.data);
      }
      console.log(Tabs)
    } catch (e) {
      console.error("couldn't get current tab", e);
    }
  })();
});

document.addEventListener("accessTab",(e)=>{
    console.log(Tabs)
    AccessleaderKeyPressed=false;
    indexKeyPressed=false;
    let accessKey = Tabs.get(indexKey.toLocaleLowerCase())
    console.log("index key",indexKey)
    if(!accessKey){
        console.log(accessKey)
        alert("cannot access unsaved tab")
        return 
    }
    (async ()=>{
        await chrome.runtime.sendMessage({action:"switchTab",tabId: accessKey})
    })
})
