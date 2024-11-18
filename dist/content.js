/*! For license information please see content.js.LICENSE.txt */
(()=>{var t={455:(t,n,e)=>{"use strict";e.d(n,{A:()=>r});var o=e(601),i=e.n(o),s=e(314),a=e.n(s)()(i());a.push([t.id,"/*!\n * Toastify js 1.12.0\n * https://github.com/apvarun/toastify-js\n * @license MIT licensed\n *\n * Copyright (C) 2018 Varun A P\n */\n\n.toastify {\n    padding: 12px 20px;\n    color: #ffffff;\n    display: inline-block;\n    box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);\n    background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);\n    background: linear-gradient(135deg, #73a5ff, #5477f5);\n    position: fixed;\n    opacity: 0;\n    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);\n    border-radius: 2px;\n    cursor: pointer;\n    text-decoration: none;\n    max-width: calc(50% - 20px);\n    z-index: 2147483647;\n}\n\n.toastify.on {\n    opacity: 1;\n}\n\n.toast-close {\n    background: transparent;\n    border: 0;\n    color: white;\n    cursor: pointer;\n    font-family: inherit;\n    font-size: 1em;\n    opacity: 0.4;\n    padding: 0 5px;\n}\n\n.toastify-right {\n    right: 15px;\n}\n\n.toastify-left {\n    left: 15px;\n}\n\n.toastify-top {\n    top: -150px;\n}\n\n.toastify-bottom {\n    bottom: -150px;\n}\n\n.toastify-rounded {\n    border-radius: 25px;\n}\n\n.toastify-avatar {\n    width: 1.5em;\n    height: 1.5em;\n    margin: -7px 5px;\n    border-radius: 2px;\n}\n\n.toastify-center {\n    margin-left: auto;\n    margin-right: auto;\n    left: 0;\n    right: 0;\n    max-width: fit-content;\n    max-width: -moz-fit-content;\n}\n\n@media only screen and (max-width: 360px) {\n    .toastify-right, .toastify-left {\n        margin-left: auto;\n        margin-right: auto;\n        left: 0;\n        right: 0;\n        max-width: fit-content;\n    }\n}\n",""]);const r=a},314:t=>{"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e="",o=void 0!==n[5];return n[4]&&(e+="@supports (".concat(n[4],") {")),n[2]&&(e+="@media ".concat(n[2]," {")),o&&(e+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),e+=t(n),o&&(e+="}"),n[2]&&(e+="}"),n[4]&&(e+="}"),e})).join("")},n.i=function(t,e,o,i,s){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(o)for(var r=0;r<this.length;r++){var c=this[r][0];null!=c&&(a[c]=!0)}for(var d=0;d<t.length;d++){var l=[].concat(t[d]);o&&a[l[0]]||(void 0!==s&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=s),e&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=e):l[2]=e),i&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=i):l[4]="".concat(i)),n.push(l))}},n}},601:t=>{"use strict";t.exports=function(t){return t[1]}},72:t=>{"use strict";var n=[];function e(t){for(var e=-1,o=0;o<n.length;o++)if(n[o].identifier===t){e=o;break}return e}function o(t,o){for(var s={},a=[],r=0;r<t.length;r++){var c=t[r],d=o.base?c[0]+o.base:c[0],l=s[d]||0,p="".concat(d," ").concat(l);s[d]=l+1;var u=e(p),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)n[u].references++,n[u].updater(f);else{var h=i(f,o);o.byIndex=r,n.splice(r,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function i(t,n){var e=n.domAPI(n);return e.update(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap&&n.supports===t.supports&&n.layer===t.layer)return;e.update(t=n)}else e.remove()}}t.exports=function(t,i){var s=o(t=t||[],i=i||{});return function(t){t=t||[];for(var a=0;a<s.length;a++){var r=e(s[a]);n[r].references--}for(var c=o(t,i),d=0;d<s.length;d++){var l=e(s[d]);0===n[l].references&&(n[l].updater(),n.splice(l,1))}s=c}}},659:t=>{"use strict";var n={};t.exports=function(t,e){var o=function(t){if(void 0===n[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}n[t]=e}return n[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}},540:t=>{"use strict";t.exports=function(t){var n=document.createElement("style");return t.setAttributes(n,t.attributes),t.insert(n,t.options),n}},56:(t,n,e)=>{"use strict";t.exports=function(t){var n=e.nc;n&&t.setAttribute("nonce",n)}},825:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=t.insertStyleElement(t);return{update:function(e){!function(t,n,e){var o="";e.supports&&(o+="@supports (".concat(e.supports,") {")),e.media&&(o+="@media ".concat(e.media," {"));var i=void 0!==e.layer;i&&(o+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),o+=e.css,i&&(o+="}"),e.media&&(o+="}"),e.supports&&(o+="}");var s=e.sourceMap;s&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),n.styleTagTransform(o,t,n.options)}(n,t,e)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)}}}},113:t=>{"use strict";t.exports=function(t,n){if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}},736:function(t){var n;n=function(t){var n=function(t){return new n.lib.init(t)};function e(t,n){return n.offset[t]?isNaN(n.offset[t])?n.offset[t]:n.offset[t]+"px":"0px"}function o(t,n){return!(!t||"string"!=typeof n||!(t.className&&t.className.trim().split(/\s+/gi).indexOf(n)>-1))}return n.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},n.lib=n.prototype={toastify:"1.12.0",constructor:n,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||n.defaults.text,this.options.node=t.node||n.defaults.node,this.options.duration=0===t.duration?0:t.duration||n.defaults.duration,this.options.selector=t.selector||n.defaults.selector,this.options.callback=t.callback||n.defaults.callback,this.options.destination=t.destination||n.defaults.destination,this.options.newWindow=t.newWindow||n.defaults.newWindow,this.options.close=t.close||n.defaults.close,this.options.gravity="bottom"===t.gravity?"toastify-bottom":n.defaults.gravity,this.options.positionLeft=t.positionLeft||n.defaults.positionLeft,this.options.position=t.position||n.defaults.position,this.options.backgroundColor=t.backgroundColor||n.defaults.backgroundColor,this.options.avatar=t.avatar||n.defaults.avatar,this.options.className=t.className||n.defaults.className,this.options.stopOnFocus=void 0===t.stopOnFocus?n.defaults.stopOnFocus:t.stopOnFocus,this.options.onClick=t.onClick||n.defaults.onClick,this.options.offset=t.offset||n.defaults.offset,this.options.escapeMarkup=void 0!==t.escapeMarkup?t.escapeMarkup:n.defaults.escapeMarkup,this.options.ariaLive=t.ariaLive||n.defaults.ariaLive,this.options.style=t.style||n.defaults.style,t.backgroundColor&&(this.options.style.background=t.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");for(var n in t.className="toastify on "+this.options.className,this.options.position?t.className+=" toastify-"+this.options.position:!0===this.options.positionLeft?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):t.className+=" toastify-right",t.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'),this.options.style)t.style[n]=this.options.style[n];if(this.options.ariaLive&&t.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,""!==this.options.avatar){var o=document.createElement("img");o.src=this.options.avatar,o.className="toastify-avatar","left"==this.options.position||!0===this.options.positionLeft?t.appendChild(o):t.insertAdjacentElement("afterbegin",o)}if(!0===this.options.close){var i=document.createElement("button");i.type="button",i.setAttribute("aria-label","Close"),i.className="toast-close",i.innerHTML="&#10006;",i.addEventListener("click",function(t){t.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this));var s=window.innerWidth>0?window.innerWidth:screen.width;("left"==this.options.position||!0===this.options.positionLeft)&&s>360?t.insertAdjacentElement("afterbegin",i):t.appendChild(i)}if(this.options.stopOnFocus&&this.options.duration>0){var a=this;t.addEventListener("mouseover",(function(n){window.clearTimeout(t.timeOutValue)})),t.addEventListener("mouseleave",(function(){t.timeOutValue=window.setTimeout((function(){a.removeElement(t)}),a.options.duration)}))}if(void 0!==this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),!0===this.options.newWindow?window.open(this.options.destination,"_blank"):window.location=this.options.destination}.bind(this)),"function"==typeof this.options.onClick&&void 0===this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),this.options.onClick()}.bind(this)),"object"==typeof this.options.offset){var r=e("x",this.options),c=e("y",this.options),d="left"==this.options.position?r:"-"+r,l="toastify-top"==this.options.gravity?c:"-"+c;t.style.transform="translate("+d+","+l+")"}return t},showToast:function(){var t;if(this.toastElement=this.buildToast(),!(t="string"==typeof this.options.selector?document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||"undefined"!=typeof ShadowRoot&&this.options.selector instanceof ShadowRoot?this.options.selector:document.body))throw"Root element is not defined";var e=n.defaults.oldestFirst?t.firstChild:t.lastChild;return t.insertBefore(this.toastElement,e),n.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(" on",""),window.setTimeout(function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),n.reposition()}.bind(this),400)}},n.reposition=function(){for(var t,n={top:15,bottom:15},e={top:15,bottom:15},i={top:15,bottom:15},s=document.getElementsByClassName("toastify"),a=0;a<s.length;a++){t=!0===o(s[a],"toastify-top")?"toastify-top":"toastify-bottom";var r=s[a].offsetHeight;t=t.substr(9,t.length-1),(window.innerWidth>0?window.innerWidth:screen.width)<=360?(s[a].style[t]=i[t]+"px",i[t]+=r+15):!0===o(s[a],"toastify-left")?(s[a].style[t]=n[t]+"px",n[t]+=r+15):(s[a].style[t]=e[t]+"px",e[t]+=r+15)}return this},n.lib.init.prototype=n.lib,n},t.exports?t.exports=n():this.Toastify=n()}},n={};function e(o){var i=n[o];if(void 0!==i)return i.exports;var s=n[o]={id:o,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.exports}e.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},e.d=(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),e.nc=void 0,(()=>{"use strict";var t=e(736),n=e.n(t),o=e(72),i=e.n(o),s=e(825),a=e.n(s),r=e(659),c=e.n(r),d=e(56),l=e.n(d),p=e(540),u=e.n(p),f=e(113),h=e.n(f),m=e(455),v={};v.styleTagTransform=h(),v.setAttributes=l(),v.insert=c().bind(null,"head"),v.domAPI=a(),v.insertStyleElement=u(),i()(m.A,v),m.A&&m.A.locals&&m.A.locals;let y="Tab",g="",b="Shift",w=!1,x=!1,E=!1;const k=new CustomEvent("indexTab"),T=new CustomEvent("accessTab");function C(t,e,o){n()({text:e,style:{background:t?"linear-gradient(to right, #4caf50, #2e7d32)":"linear-gradient(to right, #ff0000, #e60000",fontSize:"16px"},duration:o,gravity:"bottom",position:"right",close:!0,stopOnFocus:!0}).showToast()}function L(){if(null===M)return console.log("port is null");M.onMessage.addListener((t=>{!function(){const t=document.createElement("style");t.innerHTML="\n  .custom-swal-popup {\n    width: 300px;             /* Smaller width for less intrusive popup */\n    font-size: 16px;\n    background: #98fb98;\n    color: #333333;\n  }\n\n  .custom-swal-error {\n    width: 300px;             /* Smaller width for less intrusive popup */\n    font-size: 16px;\n    background: #ff6347;\n    color: #000000;\n  }\n",document.head.appendChild(t)}(),"indexingTabUpdate"===t.message?t.success?C(!0,"Tab indexed successfully.",1500):C(!1,"Error indexing tab. Try again.",1500):"switchingTabUpdate"===t.message&&(console.log(t.info),C(t.success,t.info,1500))}))}function N(){M=chrome.runtime.connect({name:"content"}),L(),M.onDisconnect.addListener((()=>{M=null}))}let M=chrome.runtime.connect({name:"content"});window.addEventListener("keydown",(function(t){return x||"Alt"===t.key||t.key===b||t.key===y?x&&t.key===y&&y!=g?(t.preventDefault(),w=!0,void((w||x)&&window.dispatchEvent(k))):void(t.key===b&&x&&g!=b&&(E=!0,(E||x)&&window.dispatchEvent(T))):(g=t.key,void(x=!0))})),window.addEventListener("keyup",(function(t){x=!1})),window.addEventListener("indexTab",(function(t){return n=this,e=void 0,i=function*(){w=!1,x=!1,null===M&&N(),M&&M.postMessage({action:"setBinding",additionalInfo:{index:g}})},new((o=void 0)||(o=Promise))((function(t,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof o?e:new o((function(t){t(e)}))).then(a,r)}c((i=i.apply(n,e||[])).next())}));var n,e,o,i})),window.addEventListener("accessTab",(function(t){null===M&&N(),M&&M.postMessage({action:"switchTab",index:g}),E=!1,x=!1})),L(),M.onDisconnect.addListener((()=>{M=null})),chrome.runtime.onMessage.addListener(((t,n,e)=>{console.log(`${t} from ${n}`),"switchingTabUpdate"===t.message&&C(t.success,t.info,1500)}))})()})();