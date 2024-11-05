let leaderKey: string = "Tab";
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
    if(!indexKeyPressed && e.key !== "Alt"){
        indexKey = e.key
        indexKeyPressed = true 
        return 
    }

    if(indexKeyPressed && e.key=== leaderKey){
        leaderKeyPressed= true
        runIndexCurrentabEvent()
        return 
    }

    if(e.key === AccessleaderKey&& indexKey){
        AccessleaderKeyPressed = true
        runAccessTabEvent()
    }
});


document.addEventListener("keyup", (e) => {
  if (!indexKeyPressed) return;
    indexKeyPressed = false;
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


