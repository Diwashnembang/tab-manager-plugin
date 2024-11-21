(()=>{"use strict";var n={837:(n,e,t)=>{t.d(e,{A:()=>c});var o=t(601),r=t.n(o),a=t(314),i=t.n(a)()(r());i.push([n.id,"/* Basic styles for the body */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  width: 500px;\n  max-width: 500px;\n  background-color: #f0f2f5; /* Slightly lighter background */\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Stronger shadow for depth */\n  border-radius: 8px; /* Rounded corners for main container */\n}\n\n/* Styling for the heading */\nh3 {\n  color: #222;\n  text-align: center;\n  font-weight: 600; /* Make heading slightly bolder */\n  margin-bottom: 20px; /* Add space below heading */\n}\ncode {\n    background-color: #e6f7ff; /* Light blue background for code */\n    padding: 4px 8px; /* Padding for code block */\n    border-radius: 4px; /* Rounded corners for code block */\n    font-family: monospace; /* Monospace font for code */\n    color: #0073e6; /* Match primary color for code text */\n    font-size: 12px;\n}\n/* Styles for the unordered list */\nul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\n.url_span{\n  max-width: 300px;\n  min-width: 300px;\n  overflow: hidden;\n  font-size: 16px;\n}\n\n/* Styles for each list item */\nli {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  margin: 10px 0;\n  padding: 12px 16px;\n  background-color: #ffffff;\n  border-radius: 8px; /* Larger radius for a softer look */\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); /* Soft shadow */\n  transition: transform 0.2s, box-shadow 0.2s; /* Add a transform effect */\n}\n\n/* Hover effect for list items */\nli:hover {\n  background-color: #e9f5ff; /* Light blue background on hover */\n  transform: translateY(-2px); /* Slight lift effect */\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */\n}\n\n/* Styles for the delete button */\nbutton {\n  background-color: #ff4d4f; /* Bright red for delete button */\n  color: #ffffff;\n  border: none;\n  padding: 6px 12px;\n  font-size: 14px;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n\n/* Hover effect for the delete button */\nbutton:hover {\n  background-color: #d9363e; /* Darken red on hover */\n}\n\nspan{\n  font-size: 16px;\n  /* text-transform: uppercase; */\n  width: 30px;\n}\n\n/* Responsive styles */\n@media (max-width: 400px) {\n  body {\n    padding: 10px;\n  }\n  li {\n    padding: 10px;\n  }\n}\n",""]);const c=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);o&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],d=o.base?s[0]+o.base:s[0],l=a[d]||0,p="".concat(d," ").concat(l);a[d]=l+1;var f=t(p),u={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==f)e[f].references++,e[f].updater(u);else{var h=r(u,o);o.byIndex=c,e.splice(c,0,{identifier:p,updater:h,references:1})}i.push(p)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var a=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var s=o(n,r),d=0;d<a.length;d++){var l=t(a[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=s}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,exports:{}};return n[o](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var o=t(72),r=t.n(o),a=t(825),i=t.n(a),c=t(659),s=t.n(c),d=t(56),l=t.n(d),p=t(540),f=t.n(p),u=t(113),h=t.n(u),m=t(837),g={};g.styleTagTransform=h(),g.setAttributes=l(),g.insert=s().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=f(),r()(m.A,g),m.A&&m.A.locals&&m.A.locals;const v=document.getElementById("tabList"),x=chrome.runtime.connect({name:"popup"});var b,y,w,k;b=void 0,y=void 0,k=function*(){x.postMessage({action:"getBindings"}),x.onMessage.addListener((n=>{try{let e=n;if(!v)return void console.log("cannot render tabs in popup: tabList is null");if(0===Object.keys(e).length)return void(window.location.href="learn.html");v.innerHTML="",Object.entries(e).forEach((([n,e])=>{const t=document.createElement("li"),o=document.createElement("code");o.textContent=`${n} + Shift`;const r=document.createTextNode(`${e.url}`),a=document.createElement("span");a.classList.add("url_span"),a.appendChild(r),t.appendChild(o),t.appendChild(a);const i=document.createElement("button");i.textContent="Delete",i.addEventListener("click",(()=>{x.postMessage({action:"deleteBinding",key:n,windowId:e.windowId}),t.remove()})),t.appendChild(i),v.appendChild(t)}))}catch(n){console.log("Couldn't get tabs",n)}}))},new((w=void 0)||(w=Promise))((function(n,e){function t(n){try{r(k.next(n))}catch(n){e(n)}}function o(n){try{r(k.throw(n))}catch(n){e(n)}}function r(e){var r;e.done?n(e.value):(r=e.value,r instanceof w?r:new w((function(n){n(r)}))).then(t,o)}r((k=k.apply(b,y||[])).next())}))})();