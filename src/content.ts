
const Tabs : Map<number | string , chrome.tabs.Tab> = new Map()
let leaderKey : string = "Control"
let indexKey : number | string=""
let leaderKeyPressed:boolean = false
let indexKeyPressed: boolean = false

const indexCurrentTab = new CustomEvent("indexTab",{
   detail:{
    leaderKey: leaderKey,
    indexKey: indexKey,
   } 
})

//trigger indexCurreentTAb
function runIndexCurrentabEvent(){
    if(!leaderKeyPressed && !indexKeyPressed) return

    document.dispatchEvent(indexCurrentTab)
}
document.addEventListener("keydown", (e) => {
    if (e.key === leaderKey) {
        leaderKeyPressed=true
        return
    }
    if(leaderKeyPressed){
      indexKey = e.key
      indexKeyPressed = true
      runIndexCurrentabEvent()
    }

  setTimeout(()=>{
    leaderKeyPressed = false
  },5000)
});
document.addEventListener("keyup",(e)=>{
    if( !leaderKeyPressed) return
    if (e.key === leaderKey){
        leaderKeyPressed = false
    }
})


interface TabResponse{
    success : boolean;
    data : chrome.tabs.Tab | undefined;
}
document.addEventListener("indexTab",(e)=>{
    leaderKeyPressed = false
    indexKeyPressed = false
    let tab : TabResponse = {success : false , data : undefined};
    (async ()=>{
        try{
            tab= await chrome.runtime.sendMessage({action :"getCurrentTab"}) 
            if(tab.success && tab.data != undefined){
                Tabs.set(indexKey,tab.data)
            }else{
                console.error("tab is undefined",tab.data)
            }
            console.log(Tabs)
        }catch (e) {
            console.error("couldn't get current tab",e)
        }
    })()

})