(function(r,y){typeof exports=="object"&&typeof module<"u"?y(exports):typeof define=="function"&&define.amd?define(["exports"],y):(r=typeof globalThis<"u"?globalThis:r||self,y(r["json-difference"]={}))})(this,function(r){"use strict";const y=(e,n)=>{const o=[];for(const f in e)if(n.hasOwnProperty(f)){if(typeof e[f]=="object"&&typeof n[f]=="object"&&JSON.stringify(e[f])===JSON.stringify(n[f])||e[f]===n[f])continue;if(e[f]==="@{}"||e[f]==="@[]"){const i=n[f]==="@{}"?{}:n[f]==="@[]"?[]:n[f];e[f]==="@{}"?JSON.stringify(n[f])!=="{}"&&o.push([f,{},i]):JSON.stringify(n[f])!=="[]"&&o.push([f,[],i])}else o.push([f,e[f],n[f]])}return o},p=(e,n)=>{const o=[];let f=0;for(const i in e)if(!(i in n)){const s=e[i]==="@{}"?{}:e[i]==="@[]"?[]:e[i];o[f]=[i,s],f++}return o},c=(e,n,o,f)=>{const i=f?e?"[":".":"/",s=f?e?"]":"":e?"[]":"";return n==="__start__"?`${f&&e?"[":""}${o}${s}`:`${n}${i}${o}${s}`},t=(e,n=!1,o,f="__start__")=>{o===void 0&&(o=Array.isArray(e)?{__root__:"@[]"}:{__root__:"@{}"});for(const i of Object.keys(e)){const s=c(Array.isArray(e),f,i,n);typeof e[i]=="object"&&e[i]!==null?(Object.keys(e[i]).length===0?o[s]=e[i]:o[s]=Array.isArray(e[i])?"@[]":"@{}",t(e[i],n,o,s)):o[s]=e[i]}return o},O=e=>(e.edited=e.edited.filter(n=>!(typeof n[1]=="object"&&n[2]==="@{}")).map(n=>n[2]==="@{}"?[n[0],n[1],{}]:n[2]==="@[]"?[n[0],n[1],[]]:n),e),b={isLodashLike:!1},j=(e,n,o)=>{const{isLodashLike:f}=o??b,i={added:[],removed:[],edited:[]},s=typeof e=="string"?JSON.parse(e):e,d=typeof n=="string"?JSON.parse(n):n,g=t(s,f),_=t(d,f);return i.removed=p(g,_),i.added=p(_,g),i.edited=y(g,_),O(i)};r.getDiff=j,r.getEditedPaths=y,r.getPathsDiff=p,r.getStructPaths=t,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});