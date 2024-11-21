(()=>{"use strict";({994:function(){var e=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(o,s){function c(e){try{d(i.next(e))}catch(e){s(e)}}function a(e){try{d(i.throw(e))}catch(e){s(e)}}function d(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(c,a)}d((i=i.apply(e,n||[])).next())}))};let n,t={},i=[];chrome.runtime.onInstalled.addListener((()=>e(void 0,void 0,void 0,(function*(){var e;let n=[];try{i=yield chrome.tabs.query({});let o=yield chrome.storage.session.get(["bindings"]);if(o.bindings&&(t=o.bindings),!i)throw"no tabs";for(let t=0;t<i.length;t++)try{let o=null===(e=i[t])||void 0===e?void 0:e.id;if(!o)throw"no tab id to inject content";let s=chrome.scripting.executeScript({target:{tabId:o},files:["dist/content.js"]});n.push(s)}catch(e){console.log(e)}}catch(e){console.log(e)}try{yield Promise.all(n)}catch(e){console.log(e)}})))),chrome.runtime.onConnect.addListener((o=>{o.onMessage.addListener((n=>{"switchTab"===n.action&&function(n,o){e(this,void 0,void 0,(function*(){let e=n.index;try{i=yield chrome.tabs.query({active:!0,currentWindow:!0});let n=t[i[0].windowId][e].id;if(n===i[0].id)return void o.postMessage({success:!1,info:"Already on the tab",message:"switchingTabUpdate"});if(n)return chrome.tabs.update(n,{active:!0}),void chrome.tabs.sendMessage(n,{success:!0,info:"Tab Switched Sucessfully",message:"switchingTabUpdate"});throw console.error("undefiend tabId",n)}catch(e){o.postMessage({success:!1,info:"Key binding doesn't exist",message:"switchingTabUpdate"}),console.log("error swtiching tabs",e)}}))}(n,o),"deleteBinding"===n.action&&function(n){e(this,void 0,void 0,(function*(){delete t[n.windowId][n.key];try{yield chrome.storage.session.set({bindings:t})}catch(e){console.log("error deleting bindings form the storage because",e)}}))}(n),"setBinding"===n.action&&function(n,o){e(this,void 0,void 0,(function*(){var e;try{i=yield chrome.tabs.query({active:!0,currentWindow:!0})}catch(e){console.log("error inexing tab because ",e)}let s=n.additionalInfo.index;if(!s)return console.log("cannot set binding because binding is ",s);try{t[null===(e=i[0])||void 0===e?void 0:e.windowId]||(t[i[0].windowId]={}),t[i[0].windowId][s]=i[0],o.postMessage({message:"indexingTabUpdate",success:!0}),yield chrome.storage.session.set({bindings:t})}catch(e){console.log("couldn't get bindings from the storage baecausje",e),o.postMessage({message:"indexingTabUpdate",success:!0})}}))}(n,o),"getBindings"===n.action&&function(n,o){e(this,void 0,void 0,(function*(){var e;i=yield chrome.tabs.query({currentWindow:!0});let n=t[null===(e=i[0])||void 0===e?void 0:e.windowId];o.postMessage(n||{})}))}(0,o)})),"popup"!==o.name&&o&&(n=setInterval((()=>{try{o.postMessage({action:"health"})}catch(e){console.log(e,o.name)}}),15e3)),o.onDisconnect.addListener((()=>{clearInterval(n)}))})),function(){e(this,void 0,void 0,(function*(){try{if(!(yield chrome.storage.session.get(["wakingUp"])).wakingUp)throw"chould retrive waking up ";chrome.runtime.sendMessage({action:"wakeUp"}),function(){e(this,void 0,void 0,(function*(){try{let e=yield chrome.storage.session.get(["bindings"]);if(!e.bindings)throw"couldn't get bindings to seed data";t=Object.assign({},e.bindings)}catch(e){console.log("error seeding data because",e)}}))}()}catch(e){console.log("error wakin up because",e)}yield chrome.storage.session.set({wakingUp:!0})}))}()}})[994]()})();