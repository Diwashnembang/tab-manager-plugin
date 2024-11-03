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

document.addEventListener("indexTab", (e) => {
  leaderKeyPressed = false;
  indexKeyPressed = false;
  console.log(indexKey)
       chrome.runtime.sendMessage({ action: "getCurrentTab" ,additionalInfo:{
        index : indexKey
       }});
});

document.addEventListener("accessTab",(e)=>{
    AccessleaderKeyPressed=false;
    indexKeyPressed=false;
    
    chrome.runtime.sendMessage({action:"switchTab",additionalInfo:{indexKey:indexKey}})
    })


