function Kf(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(r,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function Xf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var $u={exports:{}},Jo={},Hu={exports:{}},M={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zr=Symbol.for("react.element"),Yf=Symbol.for("react.portal"),Jf=Symbol.for("react.fragment"),qf=Symbol.for("react.strict_mode"),Gf=Symbol.for("react.profiler"),Zf=Symbol.for("react.provider"),ep=Symbol.for("react.context"),tp=Symbol.for("react.forward_ref"),np=Symbol.for("react.suspense"),rp=Symbol.for("react.memo"),op=Symbol.for("react.lazy"),na=Symbol.iterator;function ip(e){return e===null||typeof e!="object"?null:(e=na&&e[na]||e["@@iterator"],typeof e=="function"?e:null)}var Vu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Wu=Object.assign,Qu={};function Ln(e,t,n){this.props=e,this.context=t,this.refs=Qu,this.updater=n||Vu}Ln.prototype.isReactComponent={};Ln.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ln.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ku(){}Ku.prototype=Ln.prototype;function Gs(e,t,n){this.props=e,this.context=t,this.refs=Qu,this.updater=n||Vu}var Zs=Gs.prototype=new Ku;Zs.constructor=Gs;Wu(Zs,Ln.prototype);Zs.isPureReactComponent=!0;var ra=Array.isArray,Xu=Object.prototype.hasOwnProperty,el={current:null},Yu={key:!0,ref:!0,__self:!0,__source:!0};function Ju(e,t,n){var r,o={},i=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)Xu.call(t,r)&&!Yu.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];o.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)o[r]===void 0&&(o[r]=l[r]);return{$$typeof:zr,type:e,key:i,ref:s,props:o,_owner:el.current}}function sp(e,t){return{$$typeof:zr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function tl(e){return typeof e=="object"&&e!==null&&e.$$typeof===zr}function lp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var oa=/\/+/g;function ki(e,t){return typeof e=="object"&&e!==null&&e.key!=null?lp(""+e.key):t.toString(36)}function uo(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case zr:case Yf:s=!0}}if(s)return s=e,o=o(s),e=r===""?"."+ki(s,0):r,ra(o)?(n="",e!=null&&(n=e.replace(oa,"$&/")+"/"),uo(o,t,n,"",function(c){return c})):o!=null&&(tl(o)&&(o=sp(o,n+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(oa,"$&/")+"/")+e)),t.push(o)),1;if(s=0,r=r===""?".":r+":",ra(e))for(var l=0;l<e.length;l++){i=e[l];var u=r+ki(i,l);s+=uo(i,t,n,u,o)}else if(u=ip(e),typeof u=="function")for(e=u.call(e),l=0;!(i=e.next()).done;)i=i.value,u=r+ki(i,l++),s+=uo(i,t,n,u,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Wr(e,t,n){if(e==null)return e;var r=[],o=0;return uo(e,r,"","",function(i){return t.call(n,i,o++)}),r}function ap(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ce={current:null},co={transition:null},up={ReactCurrentDispatcher:Ce,ReactCurrentBatchConfig:co,ReactCurrentOwner:el};function qu(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:Wr,forEach:function(e,t,n){Wr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Wr(e,function(){t++}),t},toArray:function(e){return Wr(e,function(t){return t})||[]},only:function(e){if(!tl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};M.Component=Ln;M.Fragment=Jf;M.Profiler=Gf;M.PureComponent=Gs;M.StrictMode=qf;M.Suspense=np;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=up;M.act=qu;M.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Wu({},e.props),o=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=el.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)Xu.call(t,u)&&!Yu.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:zr,type:e.type,key:o,ref:i,props:r,_owner:s}};M.createContext=function(e){return e={$$typeof:ep,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Zf,_context:e},e.Consumer=e};M.createElement=Ju;M.createFactory=function(e){var t=Ju.bind(null,e);return t.type=e,t};M.createRef=function(){return{current:null}};M.forwardRef=function(e){return{$$typeof:tp,render:e}};M.isValidElement=tl;M.lazy=function(e){return{$$typeof:op,_payload:{_status:-1,_result:e},_init:ap}};M.memo=function(e,t){return{$$typeof:rp,type:e,compare:t===void 0?null:t}};M.startTransition=function(e){var t=co.transition;co.transition={};try{e()}finally{co.transition=t}};M.unstable_act=qu;M.useCallback=function(e,t){return Ce.current.useCallback(e,t)};M.useContext=function(e){return Ce.current.useContext(e)};M.useDebugValue=function(){};M.useDeferredValue=function(e){return Ce.current.useDeferredValue(e)};M.useEffect=function(e,t){return Ce.current.useEffect(e,t)};M.useId=function(){return Ce.current.useId()};M.useImperativeHandle=function(e,t,n){return Ce.current.useImperativeHandle(e,t,n)};M.useInsertionEffect=function(e,t){return Ce.current.useInsertionEffect(e,t)};M.useLayoutEffect=function(e,t){return Ce.current.useLayoutEffect(e,t)};M.useMemo=function(e,t){return Ce.current.useMemo(e,t)};M.useReducer=function(e,t,n){return Ce.current.useReducer(e,t,n)};M.useRef=function(e){return Ce.current.useRef(e)};M.useState=function(e){return Ce.current.useState(e)};M.useSyncExternalStore=function(e,t,n){return Ce.current.useSyncExternalStore(e,t,n)};M.useTransition=function(){return Ce.current.useTransition()};M.version="18.3.1";Hu.exports=M;var E=Hu.exports;const dr=Xf(E),cp=Kf({__proto__:null,default:dr},[E]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dp=E,fp=Symbol.for("react.element"),pp=Symbol.for("react.fragment"),hp=Object.prototype.hasOwnProperty,mp=dp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,gp={key:!0,ref:!0,__self:!0,__source:!0};function Gu(e,t,n){var r,o={},i=null,s=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)hp.call(t,r)&&!gp.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:fp,type:e,key:i,ref:s,props:o,_owner:mp.current}}Jo.Fragment=pp;Jo.jsx=Gu;Jo.jsxs=Gu;$u.exports=Jo;var a=$u.exports,Zi={},Zu={exports:{}},De={},ec={exports:{}},tc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(_,A){var O=_.length;_.push(A);e:for(;0<O;){var B=O-1>>>1,W=_[B];if(0<o(W,A))_[B]=A,_[O]=W,O=B;else break e}}function n(_){return _.length===0?null:_[0]}function r(_){if(_.length===0)return null;var A=_[0],O=_.pop();if(O!==A){_[0]=O;e:for(var B=0,W=_.length,Xe=W>>>1;B<Xe;){var we=2*(B+1)-1,at=_[we],ut=we+1,ct=_[ut];if(0>o(at,O))ut<W&&0>o(ct,at)?(_[B]=ct,_[ut]=O,B=ut):(_[B]=at,_[we]=O,B=we);else if(ut<W&&0>o(ct,O))_[B]=ct,_[ut]=O,B=ut;else break e}}return A}function o(_,A){var O=_.sortIndex-A.sortIndex;return O!==0?O:_.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var u=[],c=[],d=1,f=null,x=3,k=!1,v=!1,g=!1,y=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(_){for(var A=n(c);A!==null;){if(A.callback===null)r(c);else if(A.startTime<=_)r(c),A.sortIndex=A.expirationTime,t(u,A);else break;A=n(c)}}function S(_){if(g=!1,m(_),!v)if(n(u)!==null)v=!0,oe(N);else{var A=n(c);A!==null&&he(S,A.startTime-_)}}function N(_,A){v=!1,g&&(g=!1,p(P),P=-1),k=!0;var O=x;try{for(m(A),f=n(u);f!==null&&(!(f.expirationTime>A)||_&&!$());){var B=f.callback;if(typeof B=="function"){f.callback=null,x=f.priorityLevel;var W=B(f.expirationTime<=A);A=e.unstable_now(),typeof W=="function"?f.callback=W:f===n(u)&&r(u),m(A)}else r(u);f=n(u)}if(f!==null)var Xe=!0;else{var we=n(c);we!==null&&he(S,we.startTime-A),Xe=!1}return Xe}finally{f=null,x=O,k=!1}}var C=!1,R=null,P=-1,I=5,b=-1;function $(){return!(e.unstable_now()-b<I)}function D(){if(R!==null){var _=e.unstable_now();b=_;var A=!0;try{A=R(!0,_)}finally{A?J():(C=!1,R=null)}}else C=!1}var J;if(typeof h=="function")J=function(){h(D)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,Fe=ee.port2;ee.port1.onmessage=D,J=function(){Fe.postMessage(null)}}else J=function(){y(D,0)};function oe(_){R=_,C||(C=!0,J())}function he(_,A){P=y(function(){_(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(_){_.callback=null},e.unstable_continueExecution=function(){v||k||(v=!0,oe(N))},e.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<_?Math.floor(1e3/_):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(_){switch(x){case 1:case 2:case 3:var A=3;break;default:A=x}var O=x;x=A;try{return _()}finally{x=O}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(_,A){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var O=x;x=_;try{return A()}finally{x=O}},e.unstable_scheduleCallback=function(_,A,O){var B=e.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?B+O:B):O=B,_){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=O+W,_={id:d++,callback:A,priorityLevel:_,startTime:O,expirationTime:W,sortIndex:-1},O>B?(_.sortIndex=O,t(c,_),n(u)===null&&_===n(c)&&(g?(p(P),P=-1):g=!0,he(S,O-B))):(_.sortIndex=W,t(u,_),v||k||(v=!0,oe(N))),_},e.unstable_shouldYield=$,e.unstable_wrapCallback=function(_){var A=x;return function(){var O=x;x=A;try{return _.apply(this,arguments)}finally{x=O}}}})(tc);ec.exports=tc;var xp=ec.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yp=E,Le=xp;function F(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var nc=new Set,fr={};function sn(e,t){Rn(e,t),Rn(e+"Capture",t)}function Rn(e,t){for(fr[e]=t,e=0;e<t.length;e++)nc.add(t[e])}var gt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),es=Object.prototype.hasOwnProperty,vp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia={},sa={};function wp(e){return es.call(sa,e)?!0:es.call(ia,e)?!1:vp.test(e)?sa[e]=!0:(ia[e]=!0,!1)}function kp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Sp(e,t,n,r){if(t===null||typeof t>"u"||kp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ne(e,t,n,r,o,i,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=s}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new Ne(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];pe[t]=new Ne(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new Ne(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new Ne(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new Ne(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new Ne(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){pe[e]=new Ne(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){pe[e]=new Ne(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){pe[e]=new Ne(e,5,!1,e.toLowerCase(),null,!1,!1)});var nl=/[\-:]([a-z])/g;function rl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(nl,rl);pe[t]=new Ne(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(nl,rl);pe[t]=new Ne(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(nl,rl);pe[t]=new Ne(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new Ne(e,1,!1,e.toLowerCase(),null,!1,!1)});pe.xlinkHref=new Ne("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){pe[e]=new Ne(e,1,!1,e.toLowerCase(),null,!0,!0)});function ol(e,t,n,r){var o=pe.hasOwnProperty(t)?pe[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Sp(t,n,o,r)&&(n=null),r||o===null?wp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var wt=yp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qr=Symbol.for("react.element"),dn=Symbol.for("react.portal"),fn=Symbol.for("react.fragment"),il=Symbol.for("react.strict_mode"),ts=Symbol.for("react.profiler"),rc=Symbol.for("react.provider"),oc=Symbol.for("react.context"),sl=Symbol.for("react.forward_ref"),ns=Symbol.for("react.suspense"),rs=Symbol.for("react.suspense_list"),ll=Symbol.for("react.memo"),St=Symbol.for("react.lazy"),ic=Symbol.for("react.offscreen"),la=Symbol.iterator;function Hn(e){return e===null||typeof e!="object"?null:(e=la&&e[la]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,Si;function Gn(e){if(Si===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Si=t&&t[1]||""}return`
`+Si+e}var Ei=!1;function Ci(e,t){if(!e||Ei)return"";Ei=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),i=r.stack.split(`
`),s=o.length-1,l=i.length-1;1<=s&&0<=l&&o[s]!==i[l];)l--;for(;1<=s&&0<=l;s--,l--)if(o[s]!==i[l]){if(s!==1||l!==1)do if(s--,l--,0>l||o[s]!==i[l]){var u=`
`+o[s].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=s&&0<=l);break}}}finally{Ei=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Gn(e):""}function Ep(e){switch(e.tag){case 5:return Gn(e.type);case 16:return Gn("Lazy");case 13:return Gn("Suspense");case 19:return Gn("SuspenseList");case 0:case 2:case 15:return e=Ci(e.type,!1),e;case 11:return e=Ci(e.type.render,!1),e;case 1:return e=Ci(e.type,!0),e;default:return""}}function os(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case fn:return"Fragment";case dn:return"Portal";case ts:return"Profiler";case il:return"StrictMode";case ns:return"Suspense";case rs:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case oc:return(e.displayName||"Context")+".Consumer";case rc:return(e._context.displayName||"Context")+".Provider";case sl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ll:return t=e.displayName||null,t!==null?t:os(e.type)||"Memo";case St:t=e._payload,e=e._init;try{return os(e(t))}catch{}}return null}function Cp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return os(t);case 8:return t===il?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Lt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function sc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Np(e){var t=sc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(s){r=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Kr(e){e._valueTracker||(e._valueTracker=Np(e))}function lc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=sc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function No(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function is(e,t){var n=t.checked;return Z({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function aa(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Lt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ac(e,t){t=t.checked,t!=null&&ol(e,"checked",t,!1)}function ss(e,t){ac(e,t);var n=Lt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ls(e,t.type,n):t.hasOwnProperty("defaultValue")&&ls(e,t.type,Lt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ua(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ls(e,t,n){(t!=="number"||No(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Zn=Array.isArray;function En(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Lt(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function as(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(F(91));return Z({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ca(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(F(92));if(Zn(n)){if(1<n.length)throw Error(F(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Lt(n)}}function uc(e,t){var n=Lt(t.value),r=Lt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function da(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function cc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function us(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?cc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Xr,dc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Xr=Xr||document.createElement("div"),Xr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Xr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function pr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var nr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fp=["Webkit","ms","Moz","O"];Object.keys(nr).forEach(function(e){Fp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),nr[t]=nr[e]})});function fc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||nr.hasOwnProperty(e)&&nr[e]?(""+t).trim():t+"px"}function pc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=fc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var bp=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cs(e,t){if(t){if(bp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(F(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(F(61))}if(t.style!=null&&typeof t.style!="object")throw Error(F(62))}}function ds(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fs=null;function al(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ps=null,Cn=null,Nn=null;function fa(e){if(e=Or(e)){if(typeof ps!="function")throw Error(F(280));var t=e.stateNode;t&&(t=ti(t),ps(e.stateNode,e.type,t))}}function hc(e){Cn?Nn?Nn.push(e):Nn=[e]:Cn=e}function mc(){if(Cn){var e=Cn,t=Nn;if(Nn=Cn=null,fa(e),t)for(e=0;e<t.length;e++)fa(t[e])}}function gc(e,t){return e(t)}function xc(){}var Ni=!1;function yc(e,t,n){if(Ni)return e(t,n);Ni=!0;try{return gc(e,t,n)}finally{Ni=!1,(Cn!==null||Nn!==null)&&(xc(),mc())}}function hr(e,t){var n=e.stateNode;if(n===null)return null;var r=ti(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(F(231,t,typeof n));return n}var hs=!1;if(gt)try{var Vn={};Object.defineProperty(Vn,"passive",{get:function(){hs=!0}}),window.addEventListener("test",Vn,Vn),window.removeEventListener("test",Vn,Vn)}catch{hs=!1}function jp(e,t,n,r,o,i,s,l,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var rr=!1,Fo=null,bo=!1,ms=null,Rp={onError:function(e){rr=!0,Fo=e}};function _p(e,t,n,r,o,i,s,l,u){rr=!1,Fo=null,jp.apply(Rp,arguments)}function Pp(e,t,n,r,o,i,s,l,u){if(_p.apply(this,arguments),rr){if(rr){var c=Fo;rr=!1,Fo=null}else throw Error(F(198));bo||(bo=!0,ms=c)}}function ln(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function vc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pa(e){if(ln(e)!==e)throw Error(F(188))}function zp(e){var t=e.alternate;if(!t){if(t=ln(e),t===null)throw Error(F(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return pa(o),e;if(i===r)return pa(o),t;i=i.sibling}throw Error(F(188))}if(n.return!==r.return)n=o,r=i;else{for(var s=!1,l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s){for(l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?e:t}function wc(e){return e=zp(e),e!==null?kc(e):null}function kc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=kc(e);if(t!==null)return t;e=e.sibling}return null}var Sc=Le.unstable_scheduleCallback,ha=Le.unstable_cancelCallback,Tp=Le.unstable_shouldYield,Ap=Le.unstable_requestPaint,re=Le.unstable_now,Op=Le.unstable_getCurrentPriorityLevel,ul=Le.unstable_ImmediatePriority,Ec=Le.unstable_UserBlockingPriority,jo=Le.unstable_NormalPriority,Ip=Le.unstable_LowPriority,Cc=Le.unstable_IdlePriority,qo=null,st=null;function Lp(e){if(st&&typeof st.onCommitFiberRoot=="function")try{st.onCommitFiberRoot(qo,e,void 0,(e.current.flags&128)===128)}catch{}}var Ze=Math.clz32?Math.clz32:Mp,Dp=Math.log,Bp=Math.LN2;function Mp(e){return e>>>=0,e===0?32:31-(Dp(e)/Bp|0)|0}var Yr=64,Jr=4194304;function er(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ro(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~o;l!==0?r=er(l):(i&=s,i!==0&&(r=er(i)))}else s=n&~o,s!==0?r=er(s):i!==0&&(r=er(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ze(t),o=1<<n,r|=e[n],t&=~o;return r}function Up(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $p(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-Ze(i),l=1<<s,u=o[s];u===-1?(!(l&n)||l&r)&&(o[s]=Up(l,t)):u<=t&&(e.expiredLanes|=l),i&=~l}}function gs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Nc(){var e=Yr;return Yr<<=1,!(Yr&4194240)&&(Yr=64),e}function Fi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Tr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ze(t),e[t]=n}function Hp(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Ze(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function cl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ze(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var V=0;function Fc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var bc,dl,jc,Rc,_c,xs=!1,qr=[],Rt=null,_t=null,Pt=null,mr=new Map,gr=new Map,Ct=[],Vp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ma(e,t){switch(e){case"focusin":case"focusout":Rt=null;break;case"dragenter":case"dragleave":_t=null;break;case"mouseover":case"mouseout":Pt=null;break;case"pointerover":case"pointerout":mr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":gr.delete(t.pointerId)}}function Wn(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=Or(t),t!==null&&dl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Wp(e,t,n,r,o){switch(t){case"focusin":return Rt=Wn(Rt,e,t,n,r,o),!0;case"dragenter":return _t=Wn(_t,e,t,n,r,o),!0;case"mouseover":return Pt=Wn(Pt,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return mr.set(i,Wn(mr.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,gr.set(i,Wn(gr.get(i)||null,e,t,n,r,o)),!0}return!1}function Pc(e){var t=Wt(e.target);if(t!==null){var n=ln(t);if(n!==null){if(t=n.tag,t===13){if(t=vc(n),t!==null){e.blockedOn=t,_c(e.priority,function(){jc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function fo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ys(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);fs=r,n.target.dispatchEvent(r),fs=null}else return t=Or(n),t!==null&&dl(t),e.blockedOn=n,!1;t.shift()}return!0}function ga(e,t,n){fo(e)&&n.delete(t)}function Qp(){xs=!1,Rt!==null&&fo(Rt)&&(Rt=null),_t!==null&&fo(_t)&&(_t=null),Pt!==null&&fo(Pt)&&(Pt=null),mr.forEach(ga),gr.forEach(ga)}function Qn(e,t){e.blockedOn===t&&(e.blockedOn=null,xs||(xs=!0,Le.unstable_scheduleCallback(Le.unstable_NormalPriority,Qp)))}function xr(e){function t(o){return Qn(o,e)}if(0<qr.length){Qn(qr[0],e);for(var n=1;n<qr.length;n++){var r=qr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Rt!==null&&Qn(Rt,e),_t!==null&&Qn(_t,e),Pt!==null&&Qn(Pt,e),mr.forEach(t),gr.forEach(t),n=0;n<Ct.length;n++)r=Ct[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Ct.length&&(n=Ct[0],n.blockedOn===null);)Pc(n),n.blockedOn===null&&Ct.shift()}var Fn=wt.ReactCurrentBatchConfig,_o=!0;function Kp(e,t,n,r){var o=V,i=Fn.transition;Fn.transition=null;try{V=1,fl(e,t,n,r)}finally{V=o,Fn.transition=i}}function Xp(e,t,n,r){var o=V,i=Fn.transition;Fn.transition=null;try{V=4,fl(e,t,n,r)}finally{V=o,Fn.transition=i}}function fl(e,t,n,r){if(_o){var o=ys(e,t,n,r);if(o===null)Ii(e,t,r,Po,n),ma(e,r);else if(Wp(o,e,t,n,r))r.stopPropagation();else if(ma(e,r),t&4&&-1<Vp.indexOf(e)){for(;o!==null;){var i=Or(o);if(i!==null&&bc(i),i=ys(e,t,n,r),i===null&&Ii(e,t,r,Po,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else Ii(e,t,r,null,n)}}var Po=null;function ys(e,t,n,r){if(Po=null,e=al(r),e=Wt(e),e!==null)if(t=ln(e),t===null)e=null;else if(n=t.tag,n===13){if(e=vc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Po=e,null}function zc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Op()){case ul:return 1;case Ec:return 4;case jo:case Ip:return 16;case Cc:return 536870912;default:return 16}default:return 16}}var Ft=null,pl=null,po=null;function Tc(){if(po)return po;var e,t=pl,n=t.length,r,o="value"in Ft?Ft.value:Ft.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===o[i-r];r++);return po=o.slice(e,1<r?1-r:void 0)}function ho(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Gr(){return!0}function xa(){return!1}function Be(e){function t(n,r,o,i,s){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Gr:xa,this.isPropagationStopped=xa,this}return Z(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Gr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Gr)},persist:function(){},isPersistent:Gr}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hl=Be(Dn),Ar=Z({},Dn,{view:0,detail:0}),Yp=Be(Ar),bi,ji,Kn,Go=Z({},Ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ml,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Kn&&(Kn&&e.type==="mousemove"?(bi=e.screenX-Kn.screenX,ji=e.screenY-Kn.screenY):ji=bi=0,Kn=e),bi)},movementY:function(e){return"movementY"in e?e.movementY:ji}}),ya=Be(Go),Jp=Z({},Go,{dataTransfer:0}),qp=Be(Jp),Gp=Z({},Ar,{relatedTarget:0}),Ri=Be(Gp),Zp=Z({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),eh=Be(Zp),th=Z({},Dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nh=Be(th),rh=Z({},Dn,{data:0}),va=Be(rh),oh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ih={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=sh[e])?!!t[e]:!1}function ml(){return lh}var ah=Z({},Ar,{key:function(e){if(e.key){var t=oh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ho(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ih[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ml,charCode:function(e){return e.type==="keypress"?ho(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ho(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),uh=Be(ah),ch=Z({},Go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wa=Be(ch),dh=Z({},Ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ml}),fh=Be(dh),ph=Z({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),hh=Be(ph),mh=Z({},Go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),gh=Be(mh),xh=[9,13,27,32],gl=gt&&"CompositionEvent"in window,or=null;gt&&"documentMode"in document&&(or=document.documentMode);var yh=gt&&"TextEvent"in window&&!or,Ac=gt&&(!gl||or&&8<or&&11>=or),ka=" ",Sa=!1;function Oc(e,t){switch(e){case"keyup":return xh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ic(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pn=!1;function vh(e,t){switch(e){case"compositionend":return Ic(t);case"keypress":return t.which!==32?null:(Sa=!0,ka);case"textInput":return e=t.data,e===ka&&Sa?null:e;default:return null}}function wh(e,t){if(pn)return e==="compositionend"||!gl&&Oc(e,t)?(e=Tc(),po=pl=Ft=null,pn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ac&&t.locale!=="ko"?null:t.data;default:return null}}var kh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ea(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!kh[e.type]:t==="textarea"}function Lc(e,t,n,r){hc(r),t=zo(t,"onChange"),0<t.length&&(n=new hl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ir=null,yr=null;function Sh(e){Xc(e,0)}function Zo(e){var t=gn(e);if(lc(t))return e}function Eh(e,t){if(e==="change")return t}var Dc=!1;if(gt){var _i;if(gt){var Pi="oninput"in document;if(!Pi){var Ca=document.createElement("div");Ca.setAttribute("oninput","return;"),Pi=typeof Ca.oninput=="function"}_i=Pi}else _i=!1;Dc=_i&&(!document.documentMode||9<document.documentMode)}function Na(){ir&&(ir.detachEvent("onpropertychange",Bc),yr=ir=null)}function Bc(e){if(e.propertyName==="value"&&Zo(yr)){var t=[];Lc(t,yr,e,al(e)),yc(Sh,t)}}function Ch(e,t,n){e==="focusin"?(Na(),ir=t,yr=n,ir.attachEvent("onpropertychange",Bc)):e==="focusout"&&Na()}function Nh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zo(yr)}function Fh(e,t){if(e==="click")return Zo(t)}function bh(e,t){if(e==="input"||e==="change")return Zo(t)}function jh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var tt=typeof Object.is=="function"?Object.is:jh;function vr(e,t){if(tt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!es.call(t,o)||!tt(e[o],t[o]))return!1}return!0}function Fa(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ba(e,t){var n=Fa(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Fa(n)}}function Mc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Mc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Uc(){for(var e=window,t=No();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=No(e.document)}return t}function xl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Rh(e){var t=Uc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Mc(n.ownerDocument.documentElement,n)){if(r!==null&&xl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=ba(n,i);var s=ba(n,r);o&&s&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var _h=gt&&"documentMode"in document&&11>=document.documentMode,hn=null,vs=null,sr=null,ws=!1;function ja(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ws||hn==null||hn!==No(r)||(r=hn,"selectionStart"in r&&xl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),sr&&vr(sr,r)||(sr=r,r=zo(vs,"onSelect"),0<r.length&&(t=new hl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=hn)))}function Zr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var mn={animationend:Zr("Animation","AnimationEnd"),animationiteration:Zr("Animation","AnimationIteration"),animationstart:Zr("Animation","AnimationStart"),transitionend:Zr("Transition","TransitionEnd")},zi={},$c={};gt&&($c=document.createElement("div").style,"AnimationEvent"in window||(delete mn.animationend.animation,delete mn.animationiteration.animation,delete mn.animationstart.animation),"TransitionEvent"in window||delete mn.transitionend.transition);function ei(e){if(zi[e])return zi[e];if(!mn[e])return e;var t=mn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in $c)return zi[e]=t[n];return e}var Hc=ei("animationend"),Vc=ei("animationiteration"),Wc=ei("animationstart"),Qc=ei("transitionend"),Kc=new Map,Ra="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Bt(e,t){Kc.set(e,t),sn(t,[e])}for(var Ti=0;Ti<Ra.length;Ti++){var Ai=Ra[Ti],Ph=Ai.toLowerCase(),zh=Ai[0].toUpperCase()+Ai.slice(1);Bt(Ph,"on"+zh)}Bt(Hc,"onAnimationEnd");Bt(Vc,"onAnimationIteration");Bt(Wc,"onAnimationStart");Bt("dblclick","onDoubleClick");Bt("focusin","onFocus");Bt("focusout","onBlur");Bt(Qc,"onTransitionEnd");Rn("onMouseEnter",["mouseout","mouseover"]);Rn("onMouseLeave",["mouseout","mouseover"]);Rn("onPointerEnter",["pointerout","pointerover"]);Rn("onPointerLeave",["pointerout","pointerover"]);sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));sn("onBeforeInput",["compositionend","keypress","textInput","paste"]);sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Th=new Set("cancel close invalid load scroll toggle".split(" ").concat(tr));function _a(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Pp(r,t,void 0,e),e.currentTarget=null}function Xc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var s=r.length-1;0<=s;s--){var l=r[s],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&o.isPropagationStopped())break e;_a(o,l,c),i=u}else for(s=0;s<r.length;s++){if(l=r[s],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&o.isPropagationStopped())break e;_a(o,l,c),i=u}}}if(bo)throw e=ms,bo=!1,ms=null,e}function K(e,t){var n=t[Ns];n===void 0&&(n=t[Ns]=new Set);var r=e+"__bubble";n.has(r)||(Yc(t,e,2,!1),n.add(r))}function Oi(e,t,n){var r=0;t&&(r|=4),Yc(n,e,r,t)}var eo="_reactListening"+Math.random().toString(36).slice(2);function wr(e){if(!e[eo]){e[eo]=!0,nc.forEach(function(n){n!=="selectionchange"&&(Th.has(n)||Oi(n,!1,e),Oi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[eo]||(t[eo]=!0,Oi("selectionchange",!1,t))}}function Yc(e,t,n,r){switch(zc(t)){case 1:var o=Kp;break;case 4:o=Xp;break;default:o=fl}n=o.bind(null,t,n,e),o=void 0,!hs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Ii(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var l=r.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(s===4)for(s=r.return;s!==null;){var u=s.tag;if((u===3||u===4)&&(u=s.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;s=s.return}for(;l!==null;){if(s=Wt(l),s===null)return;if(u=s.tag,u===5||u===6){r=i=s;continue e}l=l.parentNode}}r=r.return}yc(function(){var c=i,d=al(n),f=[];e:{var x=Kc.get(e);if(x!==void 0){var k=hl,v=e;switch(e){case"keypress":if(ho(n)===0)break e;case"keydown":case"keyup":k=uh;break;case"focusin":v="focus",k=Ri;break;case"focusout":v="blur",k=Ri;break;case"beforeblur":case"afterblur":k=Ri;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=ya;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=qp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=fh;break;case Hc:case Vc:case Wc:k=eh;break;case Qc:k=hh;break;case"scroll":k=Yp;break;case"wheel":k=gh;break;case"copy":case"cut":case"paste":k=nh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=wa}var g=(t&4)!==0,y=!g&&e==="scroll",p=g?x!==null?x+"Capture":null:x;g=[];for(var h=c,m;h!==null;){m=h;var S=m.stateNode;if(m.tag===5&&S!==null&&(m=S,p!==null&&(S=hr(h,p),S!=null&&g.push(kr(h,S,m)))),y)break;h=h.return}0<g.length&&(x=new k(x,v,null,n,d),f.push({event:x,listeners:g}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",k=e==="mouseout"||e==="pointerout",x&&n!==fs&&(v=n.relatedTarget||n.fromElement)&&(Wt(v)||v[xt]))break e;if((k||x)&&(x=d.window===d?d:(x=d.ownerDocument)?x.defaultView||x.parentWindow:window,k?(v=n.relatedTarget||n.toElement,k=c,v=v?Wt(v):null,v!==null&&(y=ln(v),v!==y||v.tag!==5&&v.tag!==6)&&(v=null)):(k=null,v=c),k!==v)){if(g=ya,S="onMouseLeave",p="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(g=wa,S="onPointerLeave",p="onPointerEnter",h="pointer"),y=k==null?x:gn(k),m=v==null?x:gn(v),x=new g(S,h+"leave",k,n,d),x.target=y,x.relatedTarget=m,S=null,Wt(d)===c&&(g=new g(p,h+"enter",v,n,d),g.target=m,g.relatedTarget=y,S=g),y=S,k&&v)t:{for(g=k,p=v,h=0,m=g;m;m=un(m))h++;for(m=0,S=p;S;S=un(S))m++;for(;0<h-m;)g=un(g),h--;for(;0<m-h;)p=un(p),m--;for(;h--;){if(g===p||p!==null&&g===p.alternate)break t;g=un(g),p=un(p)}g=null}else g=null;k!==null&&Pa(f,x,k,g,!1),v!==null&&y!==null&&Pa(f,y,v,g,!0)}}e:{if(x=c?gn(c):window,k=x.nodeName&&x.nodeName.toLowerCase(),k==="select"||k==="input"&&x.type==="file")var N=Eh;else if(Ea(x))if(Dc)N=bh;else{N=Nh;var C=Ch}else(k=x.nodeName)&&k.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(N=Fh);if(N&&(N=N(e,c))){Lc(f,N,n,d);break e}C&&C(e,x,c),e==="focusout"&&(C=x._wrapperState)&&C.controlled&&x.type==="number"&&ls(x,"number",x.value)}switch(C=c?gn(c):window,e){case"focusin":(Ea(C)||C.contentEditable==="true")&&(hn=C,vs=c,sr=null);break;case"focusout":sr=vs=hn=null;break;case"mousedown":ws=!0;break;case"contextmenu":case"mouseup":case"dragend":ws=!1,ja(f,n,d);break;case"selectionchange":if(_h)break;case"keydown":case"keyup":ja(f,n,d)}var R;if(gl)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else pn?Oc(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Ac&&n.locale!=="ko"&&(pn||P!=="onCompositionStart"?P==="onCompositionEnd"&&pn&&(R=Tc()):(Ft=d,pl="value"in Ft?Ft.value:Ft.textContent,pn=!0)),C=zo(c,P),0<C.length&&(P=new va(P,e,null,n,d),f.push({event:P,listeners:C}),R?P.data=R:(R=Ic(n),R!==null&&(P.data=R)))),(R=yh?vh(e,n):wh(e,n))&&(c=zo(c,"onBeforeInput"),0<c.length&&(d=new va("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=R))}Xc(f,t)})}function kr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function zo(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=hr(e,n),i!=null&&r.unshift(kr(e,i,o)),i=hr(e,t),i!=null&&r.push(kr(e,i,o))),e=e.return}return r}function un(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Pa(e,t,n,r,o){for(var i=t._reactName,s=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,o?(u=hr(n,i),u!=null&&s.unshift(kr(n,u,l))):o||(u=hr(n,i),u!=null&&s.push(kr(n,u,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Ah=/\r\n?/g,Oh=/\u0000|\uFFFD/g;function za(e){return(typeof e=="string"?e:""+e).replace(Ah,`
`).replace(Oh,"")}function to(e,t,n){if(t=za(t),za(e)!==t&&n)throw Error(F(425))}function To(){}var ks=null,Ss=null;function Es(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cs=typeof setTimeout=="function"?setTimeout:void 0,Ih=typeof clearTimeout=="function"?clearTimeout:void 0,Ta=typeof Promise=="function"?Promise:void 0,Lh=typeof queueMicrotask=="function"?queueMicrotask:typeof Ta<"u"?function(e){return Ta.resolve(null).then(e).catch(Dh)}:Cs;function Dh(e){setTimeout(function(){throw e})}function Li(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),xr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);xr(t)}function zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Aa(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Bn=Math.random().toString(36).slice(2),it="__reactFiber$"+Bn,Sr="__reactProps$"+Bn,xt="__reactContainer$"+Bn,Ns="__reactEvents$"+Bn,Bh="__reactListeners$"+Bn,Mh="__reactHandles$"+Bn;function Wt(e){var t=e[it];if(t)return t;for(var n=e.parentNode;n;){if(t=n[xt]||n[it]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Aa(e);e!==null;){if(n=e[it])return n;e=Aa(e)}return t}e=n,n=e.parentNode}return null}function Or(e){return e=e[it]||e[xt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function gn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function ti(e){return e[Sr]||null}var Fs=[],xn=-1;function Mt(e){return{current:e}}function X(e){0>xn||(e.current=Fs[xn],Fs[xn]=null,xn--)}function Q(e,t){xn++,Fs[xn]=e.current,e.current=t}var Dt={},ve=Mt(Dt),Re=Mt(!1),Zt=Dt;function _n(e,t){var n=e.type.contextTypes;if(!n)return Dt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function _e(e){return e=e.childContextTypes,e!=null}function Ao(){X(Re),X(ve)}function Oa(e,t,n){if(ve.current!==Dt)throw Error(F(168));Q(ve,t),Q(Re,n)}function Jc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(F(108,Cp(e)||"Unknown",o));return Z({},n,r)}function Oo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Dt,Zt=ve.current,Q(ve,e),Q(Re,Re.current),!0}function Ia(e,t,n){var r=e.stateNode;if(!r)throw Error(F(169));n?(e=Jc(e,t,Zt),r.__reactInternalMemoizedMergedChildContext=e,X(Re),X(ve),Q(ve,e)):X(Re),Q(Re,n)}var ft=null,ni=!1,Di=!1;function qc(e){ft===null?ft=[e]:ft.push(e)}function Uh(e){ni=!0,qc(e)}function Ut(){if(!Di&&ft!==null){Di=!0;var e=0,t=V;try{var n=ft;for(V=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ft=null,ni=!1}catch(o){throw ft!==null&&(ft=ft.slice(e+1)),Sc(ul,Ut),o}finally{V=t,Di=!1}}return null}var yn=[],vn=0,Io=null,Lo=0,$e=[],He=0,en=null,pt=1,ht="";function $t(e,t){yn[vn++]=Lo,yn[vn++]=Io,Io=e,Lo=t}function Gc(e,t,n){$e[He++]=pt,$e[He++]=ht,$e[He++]=en,en=e;var r=pt;e=ht;var o=32-Ze(r)-1;r&=~(1<<o),n+=1;var i=32-Ze(t)+o;if(30<i){var s=o-o%5;i=(r&(1<<s)-1).toString(32),r>>=s,o-=s,pt=1<<32-Ze(t)+o|n<<o|r,ht=i+e}else pt=1<<i|n<<o|r,ht=e}function yl(e){e.return!==null&&($t(e,1),Gc(e,1,0))}function vl(e){for(;e===Io;)Io=yn[--vn],yn[vn]=null,Lo=yn[--vn],yn[vn]=null;for(;e===en;)en=$e[--He],$e[He]=null,ht=$e[--He],$e[He]=null,pt=$e[--He],$e[He]=null}var Ie=null,Oe=null,Y=!1,Ge=null;function Zc(e,t){var n=Ve(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function La(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ie=e,Oe=zt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ie=e,Oe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=en!==null?{id:pt,overflow:ht}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ve(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ie=e,Oe=null,!0):!1;default:return!1}}function bs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function js(e){if(Y){var t=Oe;if(t){var n=t;if(!La(e,t)){if(bs(e))throw Error(F(418));t=zt(n.nextSibling);var r=Ie;t&&La(e,t)?Zc(r,n):(e.flags=e.flags&-4097|2,Y=!1,Ie=e)}}else{if(bs(e))throw Error(F(418));e.flags=e.flags&-4097|2,Y=!1,Ie=e}}}function Da(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ie=e}function no(e){if(e!==Ie)return!1;if(!Y)return Da(e),Y=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Es(e.type,e.memoizedProps)),t&&(t=Oe)){if(bs(e))throw ed(),Error(F(418));for(;t;)Zc(e,t),t=zt(t.nextSibling)}if(Da(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Oe=zt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Oe=null}}else Oe=Ie?zt(e.stateNode.nextSibling):null;return!0}function ed(){for(var e=Oe;e;)e=zt(e.nextSibling)}function Pn(){Oe=Ie=null,Y=!1}function wl(e){Ge===null?Ge=[e]:Ge.push(e)}var $h=wt.ReactCurrentBatchConfig;function Xn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(s){var l=o.refs;s===null?delete l[i]:l[i]=s},t._stringRef=i,t)}if(typeof e!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,e))}return e}function ro(e,t){throw e=Object.prototype.toString.call(t),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ba(e){var t=e._init;return t(e._payload)}function td(e){function t(p,h){if(e){var m=p.deletions;m===null?(p.deletions=[h],p.flags|=16):m.push(h)}}function n(p,h){if(!e)return null;for(;h!==null;)t(p,h),h=h.sibling;return null}function r(p,h){for(p=new Map;h!==null;)h.key!==null?p.set(h.key,h):p.set(h.index,h),h=h.sibling;return p}function o(p,h){return p=It(p,h),p.index=0,p.sibling=null,p}function i(p,h,m){return p.index=m,e?(m=p.alternate,m!==null?(m=m.index,m<h?(p.flags|=2,h):m):(p.flags|=2,h)):(p.flags|=1048576,h)}function s(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,h,m,S){return h===null||h.tag!==6?(h=Wi(m,p.mode,S),h.return=p,h):(h=o(h,m),h.return=p,h)}function u(p,h,m,S){var N=m.type;return N===fn?d(p,h,m.props.children,S,m.key):h!==null&&(h.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===St&&Ba(N)===h.type)?(S=o(h,m.props),S.ref=Xn(p,h,m),S.return=p,S):(S=ko(m.type,m.key,m.props,null,p.mode,S),S.ref=Xn(p,h,m),S.return=p,S)}function c(p,h,m,S){return h===null||h.tag!==4||h.stateNode.containerInfo!==m.containerInfo||h.stateNode.implementation!==m.implementation?(h=Qi(m,p.mode,S),h.return=p,h):(h=o(h,m.children||[]),h.return=p,h)}function d(p,h,m,S,N){return h===null||h.tag!==7?(h=Jt(m,p.mode,S,N),h.return=p,h):(h=o(h,m),h.return=p,h)}function f(p,h,m){if(typeof h=="string"&&h!==""||typeof h=="number")return h=Wi(""+h,p.mode,m),h.return=p,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Qr:return m=ko(h.type,h.key,h.props,null,p.mode,m),m.ref=Xn(p,null,h),m.return=p,m;case dn:return h=Qi(h,p.mode,m),h.return=p,h;case St:var S=h._init;return f(p,S(h._payload),m)}if(Zn(h)||Hn(h))return h=Jt(h,p.mode,m,null),h.return=p,h;ro(p,h)}return null}function x(p,h,m,S){var N=h!==null?h.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:l(p,h,""+m,S);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Qr:return m.key===N?u(p,h,m,S):null;case dn:return m.key===N?c(p,h,m,S):null;case St:return N=m._init,x(p,h,N(m._payload),S)}if(Zn(m)||Hn(m))return N!==null?null:d(p,h,m,S,null);ro(p,m)}return null}function k(p,h,m,S,N){if(typeof S=="string"&&S!==""||typeof S=="number")return p=p.get(m)||null,l(h,p,""+S,N);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Qr:return p=p.get(S.key===null?m:S.key)||null,u(h,p,S,N);case dn:return p=p.get(S.key===null?m:S.key)||null,c(h,p,S,N);case St:var C=S._init;return k(p,h,m,C(S._payload),N)}if(Zn(S)||Hn(S))return p=p.get(m)||null,d(h,p,S,N,null);ro(h,S)}return null}function v(p,h,m,S){for(var N=null,C=null,R=h,P=h=0,I=null;R!==null&&P<m.length;P++){R.index>P?(I=R,R=null):I=R.sibling;var b=x(p,R,m[P],S);if(b===null){R===null&&(R=I);break}e&&R&&b.alternate===null&&t(p,R),h=i(b,h,P),C===null?N=b:C.sibling=b,C=b,R=I}if(P===m.length)return n(p,R),Y&&$t(p,P),N;if(R===null){for(;P<m.length;P++)R=f(p,m[P],S),R!==null&&(h=i(R,h,P),C===null?N=R:C.sibling=R,C=R);return Y&&$t(p,P),N}for(R=r(p,R);P<m.length;P++)I=k(R,p,P,m[P],S),I!==null&&(e&&I.alternate!==null&&R.delete(I.key===null?P:I.key),h=i(I,h,P),C===null?N=I:C.sibling=I,C=I);return e&&R.forEach(function($){return t(p,$)}),Y&&$t(p,P),N}function g(p,h,m,S){var N=Hn(m);if(typeof N!="function")throw Error(F(150));if(m=N.call(m),m==null)throw Error(F(151));for(var C=N=null,R=h,P=h=0,I=null,b=m.next();R!==null&&!b.done;P++,b=m.next()){R.index>P?(I=R,R=null):I=R.sibling;var $=x(p,R,b.value,S);if($===null){R===null&&(R=I);break}e&&R&&$.alternate===null&&t(p,R),h=i($,h,P),C===null?N=$:C.sibling=$,C=$,R=I}if(b.done)return n(p,R),Y&&$t(p,P),N;if(R===null){for(;!b.done;P++,b=m.next())b=f(p,b.value,S),b!==null&&(h=i(b,h,P),C===null?N=b:C.sibling=b,C=b);return Y&&$t(p,P),N}for(R=r(p,R);!b.done;P++,b=m.next())b=k(R,p,P,b.value,S),b!==null&&(e&&b.alternate!==null&&R.delete(b.key===null?P:b.key),h=i(b,h,P),C===null?N=b:C.sibling=b,C=b);return e&&R.forEach(function(D){return t(p,D)}),Y&&$t(p,P),N}function y(p,h,m,S){if(typeof m=="object"&&m!==null&&m.type===fn&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Qr:e:{for(var N=m.key,C=h;C!==null;){if(C.key===N){if(N=m.type,N===fn){if(C.tag===7){n(p,C.sibling),h=o(C,m.props.children),h.return=p,p=h;break e}}else if(C.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===St&&Ba(N)===C.type){n(p,C.sibling),h=o(C,m.props),h.ref=Xn(p,C,m),h.return=p,p=h;break e}n(p,C);break}else t(p,C);C=C.sibling}m.type===fn?(h=Jt(m.props.children,p.mode,S,m.key),h.return=p,p=h):(S=ko(m.type,m.key,m.props,null,p.mode,S),S.ref=Xn(p,h,m),S.return=p,p=S)}return s(p);case dn:e:{for(C=m.key;h!==null;){if(h.key===C)if(h.tag===4&&h.stateNode.containerInfo===m.containerInfo&&h.stateNode.implementation===m.implementation){n(p,h.sibling),h=o(h,m.children||[]),h.return=p,p=h;break e}else{n(p,h);break}else t(p,h);h=h.sibling}h=Qi(m,p.mode,S),h.return=p,p=h}return s(p);case St:return C=m._init,y(p,h,C(m._payload),S)}if(Zn(m))return v(p,h,m,S);if(Hn(m))return g(p,h,m,S);ro(p,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,h!==null&&h.tag===6?(n(p,h.sibling),h=o(h,m),h.return=p,p=h):(n(p,h),h=Wi(m,p.mode,S),h.return=p,p=h),s(p)):n(p,h)}return y}var zn=td(!0),nd=td(!1),Do=Mt(null),Bo=null,wn=null,kl=null;function Sl(){kl=wn=Bo=null}function El(e){var t=Do.current;X(Do),e._currentValue=t}function Rs(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function bn(e,t){Bo=e,kl=wn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(je=!0),e.firstContext=null)}function Qe(e){var t=e._currentValue;if(kl!==e)if(e={context:e,memoizedValue:t,next:null},wn===null){if(Bo===null)throw Error(F(308));wn=e,Bo.dependencies={lanes:0,firstContext:e}}else wn=wn.next=e;return t}var Qt=null;function Cl(e){Qt===null?Qt=[e]:Qt.push(e)}function rd(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Cl(t)):(n.next=o.next,o.next=n),t.interleaved=n,yt(e,r)}function yt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Et=!1;function Nl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function od(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function mt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Tt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,H&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,yt(e,n)}return o=r.interleaved,o===null?(t.next=t,Cl(r)):(t.next=o.next,o.next=t),r.interleaved=t,yt(e,n)}function mo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,cl(e,n)}}function Ma(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Mo(e,t,n,r){var o=e.updateQueue;Et=!1;var i=o.firstBaseUpdate,s=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var u=l,c=u.next;u.next=null,s===null?i=c:s.next=c,s=u;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==s&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=u))}if(i!==null){var f=o.baseState;s=0,d=c=u=null,l=i;do{var x=l.lane,k=l.eventTime;if((r&x)===x){d!==null&&(d=d.next={eventTime:k,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,g=l;switch(x=t,k=n,g.tag){case 1:if(v=g.payload,typeof v=="function"){f=v.call(k,f,x);break e}f=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=g.payload,x=typeof v=="function"?v.call(k,f,x):v,x==null)break e;f=Z({},f,x);break e;case 2:Et=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,x=o.effects,x===null?o.effects=[l]:x.push(l))}else k={eventTime:k,lane:x,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=k,u=f):d=d.next=k,s|=x;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;x=l,l=x.next,x.next=null,o.lastBaseUpdate=x,o.shared.pending=null}}while(!0);if(d===null&&(u=f),o.baseState=u,o.firstBaseUpdate=c,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){o=t;do s|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);nn|=s,e.lanes=s,e.memoizedState=f}}function Ua(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(F(191,o));o.call(r)}}}var Ir={},lt=Mt(Ir),Er=Mt(Ir),Cr=Mt(Ir);function Kt(e){if(e===Ir)throw Error(F(174));return e}function Fl(e,t){switch(Q(Cr,t),Q(Er,e),Q(lt,Ir),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:us(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=us(t,e)}X(lt),Q(lt,t)}function Tn(){X(lt),X(Er),X(Cr)}function id(e){Kt(Cr.current);var t=Kt(lt.current),n=us(t,e.type);t!==n&&(Q(Er,e),Q(lt,n))}function bl(e){Er.current===e&&(X(lt),X(Er))}var q=Mt(0);function Uo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bi=[];function jl(){for(var e=0;e<Bi.length;e++)Bi[e]._workInProgressVersionPrimary=null;Bi.length=0}var go=wt.ReactCurrentDispatcher,Mi=wt.ReactCurrentBatchConfig,tn=0,G=null,le=null,ue=null,$o=!1,lr=!1,Nr=0,Hh=0;function me(){throw Error(F(321))}function Rl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!tt(e[n],t[n]))return!1;return!0}function _l(e,t,n,r,o,i){if(tn=i,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,go.current=e===null||e.memoizedState===null?Kh:Xh,e=n(r,o),lr){i=0;do{if(lr=!1,Nr=0,25<=i)throw Error(F(301));i+=1,ue=le=null,t.updateQueue=null,go.current=Yh,e=n(r,o)}while(lr)}if(go.current=Ho,t=le!==null&&le.next!==null,tn=0,ue=le=G=null,$o=!1,t)throw Error(F(300));return e}function Pl(){var e=Nr!==0;return Nr=0,e}function ot(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?G.memoizedState=ue=e:ue=ue.next=e,ue}function Ke(){if(le===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=le.next;var t=ue===null?G.memoizedState:ue.next;if(t!==null)ue=t,le=e;else{if(e===null)throw Error(F(310));le=e,e={memoizedState:le.memoizedState,baseState:le.baseState,baseQueue:le.baseQueue,queue:le.queue,next:null},ue===null?G.memoizedState=ue=e:ue=ue.next=e}return ue}function Fr(e,t){return typeof t=="function"?t(e):t}function Ui(e){var t=Ke(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=le,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var s=o.next;o.next=i.next,i.next=s}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var l=s=null,u=null,c=i;do{var d=c.lane;if((tn&d)===d)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=f,s=r):u=u.next=f,G.lanes|=d,nn|=d}c=c.next}while(c!==null&&c!==i);u===null?s=r:u.next=l,tt(r,t.memoizedState)||(je=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,G.lanes|=i,nn|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function $i(e){var t=Ke(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var s=o=o.next;do i=e(i,s.action),s=s.next;while(s!==o);tt(i,t.memoizedState)||(je=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function sd(){}function ld(e,t){var n=G,r=Ke(),o=t(),i=!tt(r.memoizedState,o);if(i&&(r.memoizedState=o,je=!0),r=r.queue,zl(cd.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ue!==null&&ue.memoizedState.tag&1){if(n.flags|=2048,br(9,ud.bind(null,n,r,o,t),void 0,null),ce===null)throw Error(F(349));tn&30||ad(n,t,o)}return o}function ad(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ud(e,t,n,r){t.value=n,t.getSnapshot=r,dd(t)&&fd(e)}function cd(e,t,n){return n(function(){dd(t)&&fd(e)})}function dd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!tt(e,n)}catch{return!0}}function fd(e){var t=yt(e,1);t!==null&&et(t,e,1,-1)}function $a(e){var t=ot();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Fr,lastRenderedState:e},t.queue=e,e=e.dispatch=Qh.bind(null,G,e),[t.memoizedState,e]}function br(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function pd(){return Ke().memoizedState}function xo(e,t,n,r){var o=ot();G.flags|=e,o.memoizedState=br(1|t,n,void 0,r===void 0?null:r)}function ri(e,t,n,r){var o=Ke();r=r===void 0?null:r;var i=void 0;if(le!==null){var s=le.memoizedState;if(i=s.destroy,r!==null&&Rl(r,s.deps)){o.memoizedState=br(t,n,i,r);return}}G.flags|=e,o.memoizedState=br(1|t,n,i,r)}function Ha(e,t){return xo(8390656,8,e,t)}function zl(e,t){return ri(2048,8,e,t)}function hd(e,t){return ri(4,2,e,t)}function md(e,t){return ri(4,4,e,t)}function gd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xd(e,t,n){return n=n!=null?n.concat([e]):null,ri(4,4,gd.bind(null,t,e),n)}function Tl(){}function yd(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Rl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function vd(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Rl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function wd(e,t,n){return tn&21?(tt(n,t)||(n=Nc(),G.lanes|=n,nn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,je=!0),e.memoizedState=n)}function Vh(e,t){var n=V;V=n!==0&&4>n?n:4,e(!0);var r=Mi.transition;Mi.transition={};try{e(!1),t()}finally{V=n,Mi.transition=r}}function kd(){return Ke().memoizedState}function Wh(e,t,n){var r=Ot(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Sd(e))Ed(t,n);else if(n=rd(e,t,n,r),n!==null){var o=Ee();et(n,e,r,o),Cd(n,t,r)}}function Qh(e,t,n){var r=Ot(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Sd(e))Ed(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,l=i(s,n);if(o.hasEagerState=!0,o.eagerState=l,tt(l,s)){var u=t.interleaved;u===null?(o.next=o,Cl(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch{}finally{}n=rd(e,t,o,r),n!==null&&(o=Ee(),et(n,e,r,o),Cd(n,t,r))}}function Sd(e){var t=e.alternate;return e===G||t!==null&&t===G}function Ed(e,t){lr=$o=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Cd(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,cl(e,n)}}var Ho={readContext:Qe,useCallback:me,useContext:me,useEffect:me,useImperativeHandle:me,useInsertionEffect:me,useLayoutEffect:me,useMemo:me,useReducer:me,useRef:me,useState:me,useDebugValue:me,useDeferredValue:me,useTransition:me,useMutableSource:me,useSyncExternalStore:me,useId:me,unstable_isNewReconciler:!1},Kh={readContext:Qe,useCallback:function(e,t){return ot().memoizedState=[e,t===void 0?null:t],e},useContext:Qe,useEffect:Ha,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xo(4194308,4,gd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xo(4194308,4,e,t)},useInsertionEffect:function(e,t){return xo(4,2,e,t)},useMemo:function(e,t){var n=ot();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ot();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Wh.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var t=ot();return e={current:e},t.memoizedState=e},useState:$a,useDebugValue:Tl,useDeferredValue:function(e){return ot().memoizedState=e},useTransition:function(){var e=$a(!1),t=e[0];return e=Vh.bind(null,e[1]),ot().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=G,o=ot();if(Y){if(n===void 0)throw Error(F(407));n=n()}else{if(n=t(),ce===null)throw Error(F(349));tn&30||ad(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Ha(cd.bind(null,r,i,e),[e]),r.flags|=2048,br(9,ud.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=ot(),t=ce.identifierPrefix;if(Y){var n=ht,r=pt;n=(r&~(1<<32-Ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Nr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Hh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Xh={readContext:Qe,useCallback:yd,useContext:Qe,useEffect:zl,useImperativeHandle:xd,useInsertionEffect:hd,useLayoutEffect:md,useMemo:vd,useReducer:Ui,useRef:pd,useState:function(){return Ui(Fr)},useDebugValue:Tl,useDeferredValue:function(e){var t=Ke();return wd(t,le.memoizedState,e)},useTransition:function(){var e=Ui(Fr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:sd,useSyncExternalStore:ld,useId:kd,unstable_isNewReconciler:!1},Yh={readContext:Qe,useCallback:yd,useContext:Qe,useEffect:zl,useImperativeHandle:xd,useInsertionEffect:hd,useLayoutEffect:md,useMemo:vd,useReducer:$i,useRef:pd,useState:function(){return $i(Fr)},useDebugValue:Tl,useDeferredValue:function(e){var t=Ke();return le===null?t.memoizedState=e:wd(t,le.memoizedState,e)},useTransition:function(){var e=$i(Fr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:sd,useSyncExternalStore:ld,useId:kd,unstable_isNewReconciler:!1};function Je(e,t){if(e&&e.defaultProps){t=Z({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function _s(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Z({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var oi={isMounted:function(e){return(e=e._reactInternals)?ln(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ee(),o=Ot(e),i=mt(r,o);i.payload=t,n!=null&&(i.callback=n),t=Tt(e,i,o),t!==null&&(et(t,e,o,r),mo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ee(),o=Ot(e),i=mt(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Tt(e,i,o),t!==null&&(et(t,e,o,r),mo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ee(),r=Ot(e),o=mt(n,r);o.tag=2,t!=null&&(o.callback=t),t=Tt(e,o,r),t!==null&&(et(t,e,r,n),mo(t,e,r))}};function Va(e,t,n,r,o,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,s):t.prototype&&t.prototype.isPureReactComponent?!vr(n,r)||!vr(o,i):!0}function Nd(e,t,n){var r=!1,o=Dt,i=t.contextType;return typeof i=="object"&&i!==null?i=Qe(i):(o=_e(t)?Zt:ve.current,r=t.contextTypes,i=(r=r!=null)?_n(e,o):Dt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=oi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Wa(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&oi.enqueueReplaceState(t,t.state,null)}function Ps(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Nl(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Qe(i):(i=_e(t)?Zt:ve.current,o.context=_n(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(_s(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&oi.enqueueReplaceState(o,o.state,null),Mo(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function An(e,t){try{var n="",r=t;do n+=Ep(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Hi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function zs(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Jh=typeof WeakMap=="function"?WeakMap:Map;function Fd(e,t,n){n=mt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Wo||(Wo=!0,$s=r),zs(e,t)},n}function bd(e,t,n){n=mt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){zs(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){zs(e,t),typeof r!="function"&&(At===null?At=new Set([this]):At.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Qa(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Jh;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=cm.bind(null,e,t,n),t.then(e,e))}function Ka(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Xa(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=mt(-1,1),t.tag=2,Tt(n,t,1))),n.lanes|=1),e)}var qh=wt.ReactCurrentOwner,je=!1;function Se(e,t,n,r){t.child=e===null?nd(t,null,n,r):zn(t,e.child,n,r)}function Ya(e,t,n,r,o){n=n.render;var i=t.ref;return bn(t,o),r=_l(e,t,n,r,i,o),n=Pl(),e!==null&&!je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,vt(e,t,o)):(Y&&n&&yl(t),t.flags|=1,Se(e,t,r,o),t.child)}function Ja(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Ul(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,jd(e,t,i,r,o)):(e=ko(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:vr,n(s,r)&&e.ref===t.ref)return vt(e,t,o)}return t.flags|=1,e=It(i,r),e.ref=t.ref,e.return=t,t.child=e}function jd(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(vr(i,r)&&e.ref===t.ref)if(je=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(je=!0);else return t.lanes=e.lanes,vt(e,t,o)}return Ts(e,t,n,r,o)}function Rd(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Q(Sn,Ae),Ae|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Q(Sn,Ae),Ae|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Q(Sn,Ae),Ae|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Q(Sn,Ae),Ae|=r;return Se(e,t,o,n),t.child}function _d(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ts(e,t,n,r,o){var i=_e(n)?Zt:ve.current;return i=_n(t,i),bn(t,o),n=_l(e,t,n,r,i,o),r=Pl(),e!==null&&!je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,vt(e,t,o)):(Y&&r&&yl(t),t.flags|=1,Se(e,t,n,o),t.child)}function qa(e,t,n,r,o){if(_e(n)){var i=!0;Oo(t)}else i=!1;if(bn(t,o),t.stateNode===null)yo(e,t),Nd(t,n,r),Ps(t,n,r,o),r=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var u=s.context,c=n.contextType;typeof c=="object"&&c!==null?c=Qe(c):(c=_e(n)?Zt:ve.current,c=_n(t,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==r||u!==c)&&Wa(t,s,r,c),Et=!1;var x=t.memoizedState;s.state=x,Mo(t,r,s,o),u=t.memoizedState,l!==r||x!==u||Re.current||Et?(typeof d=="function"&&(_s(t,n,d,r),u=t.memoizedState),(l=Et||Va(t,n,l,r,x,u,c))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),s.props=r,s.state=u,s.context=c,r=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,od(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:Je(t.type,l),s.props=c,f=t.pendingProps,x=s.context,u=n.contextType,typeof u=="object"&&u!==null?u=Qe(u):(u=_e(n)?Zt:ve.current,u=_n(t,u));var k=n.getDerivedStateFromProps;(d=typeof k=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==f||x!==u)&&Wa(t,s,r,u),Et=!1,x=t.memoizedState,s.state=x,Mo(t,r,s,o);var v=t.memoizedState;l!==f||x!==v||Re.current||Et?(typeof k=="function"&&(_s(t,n,k,r),v=t.memoizedState),(c=Et||Va(t,n,c,r,x,v,u)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,v,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,v,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),s.props=r,s.state=v,s.context=u,r=c):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),r=!1)}return As(e,t,n,r,i,o)}function As(e,t,n,r,o,i){_d(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return o&&Ia(t,n,!1),vt(e,t,i);r=t.stateNode,qh.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=zn(t,e.child,null,i),t.child=zn(t,null,l,i)):Se(e,t,l,i),t.memoizedState=r.state,o&&Ia(t,n,!0),t.child}function Pd(e){var t=e.stateNode;t.pendingContext?Oa(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Oa(e,t.context,!1),Fl(e,t.containerInfo)}function Ga(e,t,n,r,o){return Pn(),wl(o),t.flags|=256,Se(e,t,n,r),t.child}var Os={dehydrated:null,treeContext:null,retryLane:0};function Is(e){return{baseLanes:e,cachePool:null,transitions:null}}function zd(e,t,n){var r=t.pendingProps,o=q.current,i=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Q(q,o&1),e===null)return js(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,i?(r=t.mode,i=t.child,s={mode:"hidden",children:s},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=s):i=li(s,r,0,null),e=Jt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Is(n),t.memoizedState=Os,e):Al(t,s));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return Gh(e,t,s,r,l,o,n);if(i){i=r.fallback,s=t.mode,o=e.child,l=o.sibling;var u={mode:"hidden",children:r.children};return!(s&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=It(o,u),r.subtreeFlags=o.subtreeFlags&14680064),l!==null?i=It(l,i):(i=Jt(i,s,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,s=e.child.memoizedState,s=s===null?Is(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},i.memoizedState=s,i.childLanes=e.childLanes&~n,t.memoizedState=Os,r}return i=e.child,e=i.sibling,r=It(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Al(e,t){return t=li({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function oo(e,t,n,r){return r!==null&&wl(r),zn(t,e.child,null,n),e=Al(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Gh(e,t,n,r,o,i,s){if(n)return t.flags&256?(t.flags&=-257,r=Hi(Error(F(422))),oo(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=li({mode:"visible",children:r.children},o,0,null),i=Jt(i,o,s,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&zn(t,e.child,null,s),t.child.memoizedState=Is(s),t.memoizedState=Os,i);if(!(t.mode&1))return oo(e,t,s,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(F(419)),r=Hi(i,r,void 0),oo(e,t,s,r)}if(l=(s&e.childLanes)!==0,je||l){if(r=ce,r!==null){switch(s&-s){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|s)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,yt(e,o),et(r,e,o,-1))}return Ml(),r=Hi(Error(F(421))),oo(e,t,s,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=dm.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Oe=zt(o.nextSibling),Ie=t,Y=!0,Ge=null,e!==null&&($e[He++]=pt,$e[He++]=ht,$e[He++]=en,pt=e.id,ht=e.overflow,en=t),t=Al(t,r.children),t.flags|=4096,t)}function Za(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Rs(e.return,t,n)}function Vi(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function Td(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(Se(e,t,r.children,n),r=q.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Za(e,n,t);else if(e.tag===19)Za(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Q(q,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Uo(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Vi(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Uo(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Vi(t,!0,n,null,i);break;case"together":Vi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function yo(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function vt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),nn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(F(153));if(t.child!==null){for(e=t.child,n=It(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=It(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Zh(e,t,n){switch(t.tag){case 3:Pd(t),Pn();break;case 5:id(t);break;case 1:_e(t.type)&&Oo(t);break;case 4:Fl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Q(Do,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Q(q,q.current&1),t.flags|=128,null):n&t.child.childLanes?zd(e,t,n):(Q(q,q.current&1),e=vt(e,t,n),e!==null?e.sibling:null);Q(q,q.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Td(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Q(q,q.current),r)break;return null;case 22:case 23:return t.lanes=0,Rd(e,t,n)}return vt(e,t,n)}var Ad,Ls,Od,Id;Ad=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ls=function(){};Od=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Kt(lt.current);var i=null;switch(n){case"input":o=is(e,o),r=is(e,r),i=[];break;case"select":o=Z({},o,{value:void 0}),r=Z({},r,{value:void 0}),i=[];break;case"textarea":o=as(e,o),r=as(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=To)}cs(n,r);var s;n=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var l=o[c];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(fr.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(l=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(s in l)!l.hasOwnProperty(s)||u&&u.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in u)u.hasOwnProperty(s)&&l[s]!==u[s]&&(n||(n={}),n[s]=u[s])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(fr.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&K("scroll",e),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};Id=function(e,t,n,r){n!==r&&(t.flags|=4)};function Yn(e,t){if(!Y)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function em(e,t,n){var r=t.pendingProps;switch(vl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ge(t),null;case 1:return _e(t.type)&&Ao(),ge(t),null;case 3:return r=t.stateNode,Tn(),X(Re),X(ve),jl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(no(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ge!==null&&(Ws(Ge),Ge=null))),Ls(e,t),ge(t),null;case 5:bl(t);var o=Kt(Cr.current);if(n=t.type,e!==null&&t.stateNode!=null)Od(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(F(166));return ge(t),null}if(e=Kt(lt.current),no(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[it]=t,r[Sr]=i,e=(t.mode&1)!==0,n){case"dialog":K("cancel",r),K("close",r);break;case"iframe":case"object":case"embed":K("load",r);break;case"video":case"audio":for(o=0;o<tr.length;o++)K(tr[o],r);break;case"source":K("error",r);break;case"img":case"image":case"link":K("error",r),K("load",r);break;case"details":K("toggle",r);break;case"input":aa(r,i),K("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},K("invalid",r);break;case"textarea":ca(r,i),K("invalid",r)}cs(n,i),o=null;for(var s in i)if(i.hasOwnProperty(s)){var l=i[s];s==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&to(r.textContent,l,e),o=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&to(r.textContent,l,e),o=["children",""+l]):fr.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&K("scroll",r)}switch(n){case"input":Kr(r),ua(r,i,!0);break;case"textarea":Kr(r),da(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=To)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=cc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[it]=t,e[Sr]=r,Ad(e,t,!1,!1),t.stateNode=e;e:{switch(s=ds(n,r),n){case"dialog":K("cancel",e),K("close",e),o=r;break;case"iframe":case"object":case"embed":K("load",e),o=r;break;case"video":case"audio":for(o=0;o<tr.length;o++)K(tr[o],e);o=r;break;case"source":K("error",e),o=r;break;case"img":case"image":case"link":K("error",e),K("load",e),o=r;break;case"details":K("toggle",e),o=r;break;case"input":aa(e,r),o=is(e,r),K("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Z({},r,{value:void 0}),K("invalid",e);break;case"textarea":ca(e,r),o=as(e,r),K("invalid",e);break;default:o=r}cs(n,o),l=o;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?pc(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&dc(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&pr(e,u):typeof u=="number"&&pr(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(fr.hasOwnProperty(i)?u!=null&&i==="onScroll"&&K("scroll",e):u!=null&&ol(e,i,u,s))}switch(n){case"input":Kr(e),ua(e,r,!1);break;case"textarea":Kr(e),da(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Lt(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?En(e,!!r.multiple,i,!1):r.defaultValue!=null&&En(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=To)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ge(t),null;case 6:if(e&&t.stateNode!=null)Id(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(F(166));if(n=Kt(Cr.current),Kt(lt.current),no(t)){if(r=t.stateNode,n=t.memoizedProps,r[it]=t,(i=r.nodeValue!==n)&&(e=Ie,e!==null))switch(e.tag){case 3:to(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&to(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[it]=t,t.stateNode=r}return ge(t),null;case 13:if(X(q),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Y&&Oe!==null&&t.mode&1&&!(t.flags&128))ed(),Pn(),t.flags|=98560,i=!1;else if(i=no(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(F(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[it]=t}else Pn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ge(t),i=!1}else Ge!==null&&(Ws(Ge),Ge=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||q.current&1?ae===0&&(ae=3):Ml())),t.updateQueue!==null&&(t.flags|=4),ge(t),null);case 4:return Tn(),Ls(e,t),e===null&&wr(t.stateNode.containerInfo),ge(t),null;case 10:return El(t.type._context),ge(t),null;case 17:return _e(t.type)&&Ao(),ge(t),null;case 19:if(X(q),i=t.memoizedState,i===null)return ge(t),null;if(r=(t.flags&128)!==0,s=i.rendering,s===null)if(r)Yn(i,!1);else{if(ae!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Uo(e),s!==null){for(t.flags|=128,Yn(i,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Q(q,q.current&1|2),t.child}e=e.sibling}i.tail!==null&&re()>On&&(t.flags|=128,r=!0,Yn(i,!1),t.lanes=4194304)}else{if(!r)if(e=Uo(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Yn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Y)return ge(t),null}else 2*re()-i.renderingStartTime>On&&n!==1073741824&&(t.flags|=128,r=!0,Yn(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(n=i.last,n!==null?n.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=re(),t.sibling=null,n=q.current,Q(q,r?n&1|2:n&1),t):(ge(t),null);case 22:case 23:return Bl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ae&1073741824&&(ge(t),t.subtreeFlags&6&&(t.flags|=8192)):ge(t),null;case 24:return null;case 25:return null}throw Error(F(156,t.tag))}function tm(e,t){switch(vl(t),t.tag){case 1:return _e(t.type)&&Ao(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Tn(),X(Re),X(ve),jl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return bl(t),null;case 13:if(X(q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(F(340));Pn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X(q),null;case 4:return Tn(),null;case 10:return El(t.type._context),null;case 22:case 23:return Bl(),null;case 24:return null;default:return null}}var io=!1,xe=!1,nm=typeof WeakSet=="function"?WeakSet:Set,z=null;function kn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){te(e,t,r)}else n.current=null}function Ds(e,t,n){try{n()}catch(r){te(e,t,r)}}var eu=!1;function rm(e,t){if(ks=_o,e=Uc(),xl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var s=0,l=-1,u=-1,c=0,d=0,f=e,x=null;t:for(;;){for(var k;f!==n||o!==0&&f.nodeType!==3||(l=s+o),f!==i||r!==0&&f.nodeType!==3||(u=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(k=f.firstChild)!==null;)x=f,f=k;for(;;){if(f===e)break t;if(x===n&&++c===o&&(l=s),x===i&&++d===r&&(u=s),(k=f.nextSibling)!==null)break;f=x,x=f.parentNode}f=k}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ss={focusedElem:e,selectionRange:n},_o=!1,z=t;z!==null;)if(t=z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z=e;else for(;z!==null;){t=z;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var g=v.memoizedProps,y=v.memoizedState,p=t.stateNode,h=p.getSnapshotBeforeUpdate(t.elementType===t.type?g:Je(t.type,g),y);p.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(S){te(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,z=e;break}z=t.return}return v=eu,eu=!1,v}function ar(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Ds(t,n,i)}o=o.next}while(o!==r)}}function ii(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Bs(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Ld(e){var t=e.alternate;t!==null&&(e.alternate=null,Ld(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[it],delete t[Sr],delete t[Ns],delete t[Bh],delete t[Mh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Dd(e){return e.tag===5||e.tag===3||e.tag===4}function tu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Dd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ms(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=To));else if(r!==4&&(e=e.child,e!==null))for(Ms(e,t,n),e=e.sibling;e!==null;)Ms(e,t,n),e=e.sibling}function Us(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Us(e,t,n),e=e.sibling;e!==null;)Us(e,t,n),e=e.sibling}var de=null,qe=!1;function kt(e,t,n){for(n=n.child;n!==null;)Bd(e,t,n),n=n.sibling}function Bd(e,t,n){if(st&&typeof st.onCommitFiberUnmount=="function")try{st.onCommitFiberUnmount(qo,n)}catch{}switch(n.tag){case 5:xe||kn(n,t);case 6:var r=de,o=qe;de=null,kt(e,t,n),de=r,qe=o,de!==null&&(qe?(e=de,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):de.removeChild(n.stateNode));break;case 18:de!==null&&(qe?(e=de,n=n.stateNode,e.nodeType===8?Li(e.parentNode,n):e.nodeType===1&&Li(e,n),xr(e)):Li(de,n.stateNode));break;case 4:r=de,o=qe,de=n.stateNode.containerInfo,qe=!0,kt(e,t,n),de=r,qe=o;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,s=i.destroy;i=i.tag,s!==void 0&&(i&2||i&4)&&Ds(n,t,s),o=o.next}while(o!==r)}kt(e,t,n);break;case 1:if(!xe&&(kn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){te(n,t,l)}kt(e,t,n);break;case 21:kt(e,t,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,kt(e,t,n),xe=r):kt(e,t,n);break;default:kt(e,t,n)}}function nu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new nm),t.forEach(function(r){var o=fm.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ye(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:de=l.stateNode,qe=!1;break e;case 3:de=l.stateNode.containerInfo,qe=!0;break e;case 4:de=l.stateNode.containerInfo,qe=!0;break e}l=l.return}if(de===null)throw Error(F(160));Bd(i,s,o),de=null,qe=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(c){te(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Md(t,e),t=t.sibling}function Md(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ye(t,e),rt(e),r&4){try{ar(3,e,e.return),ii(3,e)}catch(g){te(e,e.return,g)}try{ar(5,e,e.return)}catch(g){te(e,e.return,g)}}break;case 1:Ye(t,e),rt(e),r&512&&n!==null&&kn(n,n.return);break;case 5:if(Ye(t,e),rt(e),r&512&&n!==null&&kn(n,n.return),e.flags&32){var o=e.stateNode;try{pr(o,"")}catch(g){te(e,e.return,g)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,s=n!==null?n.memoizedProps:i,l=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&ac(o,i),ds(l,s);var c=ds(l,i);for(s=0;s<u.length;s+=2){var d=u[s],f=u[s+1];d==="style"?pc(o,f):d==="dangerouslySetInnerHTML"?dc(o,f):d==="children"?pr(o,f):ol(o,d,f,c)}switch(l){case"input":ss(o,i);break;case"textarea":uc(o,i);break;case"select":var x=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var k=i.value;k!=null?En(o,!!i.multiple,k,!1):x!==!!i.multiple&&(i.defaultValue!=null?En(o,!!i.multiple,i.defaultValue,!0):En(o,!!i.multiple,i.multiple?[]:"",!1))}o[Sr]=i}catch(g){te(e,e.return,g)}}break;case 6:if(Ye(t,e),rt(e),r&4){if(e.stateNode===null)throw Error(F(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(g){te(e,e.return,g)}}break;case 3:if(Ye(t,e),rt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{xr(t.containerInfo)}catch(g){te(e,e.return,g)}break;case 4:Ye(t,e),rt(e);break;case 13:Ye(t,e),rt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Ll=re())),r&4&&nu(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(xe=(c=xe)||d,Ye(t,e),xe=c):Ye(t,e),rt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(z=e,d=e.child;d!==null;){for(f=z=d;z!==null;){switch(x=z,k=x.child,x.tag){case 0:case 11:case 14:case 15:ar(4,x,x.return);break;case 1:kn(x,x.return);var v=x.stateNode;if(typeof v.componentWillUnmount=="function"){r=x,n=x.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(g){te(r,n,g)}}break;case 5:kn(x,x.return);break;case 22:if(x.memoizedState!==null){ou(f);continue}}k!==null?(k.return=x,z=k):ou(f)}d=d.sibling}e:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{o=f.stateNode,c?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=f.stateNode,u=f.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=fc("display",s))}catch(g){te(e,e.return,g)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(g){te(e,e.return,g)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Ye(t,e),rt(e),r&4&&nu(e);break;case 21:break;default:Ye(t,e),rt(e)}}function rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Dd(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(pr(o,""),r.flags&=-33);var i=tu(e);Us(e,i,o);break;case 3:case 4:var s=r.stateNode.containerInfo,l=tu(e);Ms(e,l,s);break;default:throw Error(F(161))}}catch(u){te(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function om(e,t,n){z=e,Ud(e)}function Ud(e,t,n){for(var r=(e.mode&1)!==0;z!==null;){var o=z,i=o.child;if(o.tag===22&&r){var s=o.memoizedState!==null||io;if(!s){var l=o.alternate,u=l!==null&&l.memoizedState!==null||xe;l=io;var c=xe;if(io=s,(xe=u)&&!c)for(z=o;z!==null;)s=z,u=s.child,s.tag===22&&s.memoizedState!==null?iu(o):u!==null?(u.return=s,z=u):iu(o);for(;i!==null;)z=i,Ud(i),i=i.sibling;z=o,io=l,xe=c}ru(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,z=i):ru(e)}}function ru(e){for(;z!==null;){var t=z;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:xe||ii(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xe)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Je(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ua(t,i,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ua(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&xr(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}xe||t.flags&512&&Bs(t)}catch(x){te(t,t.return,x)}}if(t===e){z=null;break}if(n=t.sibling,n!==null){n.return=t.return,z=n;break}z=t.return}}function ou(e){for(;z!==null;){var t=z;if(t===e){z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,z=n;break}z=t.return}}function iu(e){for(;z!==null;){var t=z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ii(4,t)}catch(u){te(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(u){te(t,o,u)}}var i=t.return;try{Bs(t)}catch(u){te(t,i,u)}break;case 5:var s=t.return;try{Bs(t)}catch(u){te(t,s,u)}}}catch(u){te(t,t.return,u)}if(t===e){z=null;break}var l=t.sibling;if(l!==null){l.return=t.return,z=l;break}z=t.return}}var im=Math.ceil,Vo=wt.ReactCurrentDispatcher,Ol=wt.ReactCurrentOwner,We=wt.ReactCurrentBatchConfig,H=0,ce=null,ie=null,fe=0,Ae=0,Sn=Mt(0),ae=0,jr=null,nn=0,si=0,Il=0,ur=null,be=null,Ll=0,On=1/0,dt=null,Wo=!1,$s=null,At=null,so=!1,bt=null,Qo=0,cr=0,Hs=null,vo=-1,wo=0;function Ee(){return H&6?re():vo!==-1?vo:vo=re()}function Ot(e){return e.mode&1?H&2&&fe!==0?fe&-fe:$h.transition!==null?(wo===0&&(wo=Nc()),wo):(e=V,e!==0||(e=window.event,e=e===void 0?16:zc(e.type)),e):1}function et(e,t,n,r){if(50<cr)throw cr=0,Hs=null,Error(F(185));Tr(e,n,r),(!(H&2)||e!==ce)&&(e===ce&&(!(H&2)&&(si|=n),ae===4&&Nt(e,fe)),Pe(e,r),n===1&&H===0&&!(t.mode&1)&&(On=re()+500,ni&&Ut()))}function Pe(e,t){var n=e.callbackNode;$p(e,t);var r=Ro(e,e===ce?fe:0);if(r===0)n!==null&&ha(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ha(n),t===1)e.tag===0?Uh(su.bind(null,e)):qc(su.bind(null,e)),Lh(function(){!(H&6)&&Ut()}),n=null;else{switch(Fc(r)){case 1:n=ul;break;case 4:n=Ec;break;case 16:n=jo;break;case 536870912:n=Cc;break;default:n=jo}n=Yd(n,$d.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function $d(e,t){if(vo=-1,wo=0,H&6)throw Error(F(327));var n=e.callbackNode;if(jn()&&e.callbackNode!==n)return null;var r=Ro(e,e===ce?fe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ko(e,r);else{t=r;var o=H;H|=2;var i=Vd();(ce!==e||fe!==t)&&(dt=null,On=re()+500,Yt(e,t));do try{am();break}catch(l){Hd(e,l)}while(!0);Sl(),Vo.current=i,H=o,ie!==null?t=0:(ce=null,fe=0,t=ae)}if(t!==0){if(t===2&&(o=gs(e),o!==0&&(r=o,t=Vs(e,o))),t===1)throw n=jr,Yt(e,0),Nt(e,r),Pe(e,re()),n;if(t===6)Nt(e,r);else{if(o=e.current.alternate,!(r&30)&&!sm(o)&&(t=Ko(e,r),t===2&&(i=gs(e),i!==0&&(r=i,t=Vs(e,i))),t===1))throw n=jr,Yt(e,0),Nt(e,r),Pe(e,re()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(F(345));case 2:Ht(e,be,dt);break;case 3:if(Nt(e,r),(r&130023424)===r&&(t=Ll+500-re(),10<t)){if(Ro(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){Ee(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Cs(Ht.bind(null,e,be,dt),t);break}Ht(e,be,dt);break;case 4:if(Nt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var s=31-Ze(r);i=1<<s,s=t[s],s>o&&(o=s),r&=~i}if(r=o,r=re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*im(r/1960))-r,10<r){e.timeoutHandle=Cs(Ht.bind(null,e,be,dt),r);break}Ht(e,be,dt);break;case 5:Ht(e,be,dt);break;default:throw Error(F(329))}}}return Pe(e,re()),e.callbackNode===n?$d.bind(null,e):null}function Vs(e,t){var n=ur;return e.current.memoizedState.isDehydrated&&(Yt(e,t).flags|=256),e=Ko(e,t),e!==2&&(t=be,be=n,t!==null&&Ws(t)),e}function Ws(e){be===null?be=e:be.push.apply(be,e)}function sm(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!tt(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Nt(e,t){for(t&=~Il,t&=~si,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ze(t),r=1<<n;e[n]=-1,t&=~r}}function su(e){if(H&6)throw Error(F(327));jn();var t=Ro(e,0);if(!(t&1))return Pe(e,re()),null;var n=Ko(e,t);if(e.tag!==0&&n===2){var r=gs(e);r!==0&&(t=r,n=Vs(e,r))}if(n===1)throw n=jr,Yt(e,0),Nt(e,t),Pe(e,re()),n;if(n===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ht(e,be,dt),Pe(e,re()),null}function Dl(e,t){var n=H;H|=1;try{return e(t)}finally{H=n,H===0&&(On=re()+500,ni&&Ut())}}function rn(e){bt!==null&&bt.tag===0&&!(H&6)&&jn();var t=H;H|=1;var n=We.transition,r=V;try{if(We.transition=null,V=1,e)return e()}finally{V=r,We.transition=n,H=t,!(H&6)&&Ut()}}function Bl(){Ae=Sn.current,X(Sn)}function Yt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ih(n)),ie!==null)for(n=ie.return;n!==null;){var r=n;switch(vl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ao();break;case 3:Tn(),X(Re),X(ve),jl();break;case 5:bl(r);break;case 4:Tn();break;case 13:X(q);break;case 19:X(q);break;case 10:El(r.type._context);break;case 22:case 23:Bl()}n=n.return}if(ce=e,ie=e=It(e.current,null),fe=Ae=t,ae=0,jr=null,Il=si=nn=0,be=ur=null,Qt!==null){for(t=0;t<Qt.length;t++)if(n=Qt[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var s=i.next;i.next=o,r.next=s}n.pending=r}Qt=null}return e}function Hd(e,t){do{var n=ie;try{if(Sl(),go.current=Ho,$o){for(var r=G.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}$o=!1}if(tn=0,ue=le=G=null,lr=!1,Nr=0,Ol.current=null,n===null||n.return===null){ae=1,jr=t,ie=null;break}e:{var i=e,s=n.return,l=n,u=t;if(t=fe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,d=l,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var x=d.alternate;x?(d.updateQueue=x.updateQueue,d.memoizedState=x.memoizedState,d.lanes=x.lanes):(d.updateQueue=null,d.memoizedState=null)}var k=Ka(s);if(k!==null){k.flags&=-257,Xa(k,s,l,i,t),k.mode&1&&Qa(i,c,t),t=k,u=c;var v=t.updateQueue;if(v===null){var g=new Set;g.add(u),t.updateQueue=g}else v.add(u);break e}else{if(!(t&1)){Qa(i,c,t),Ml();break e}u=Error(F(426))}}else if(Y&&l.mode&1){var y=Ka(s);if(y!==null){!(y.flags&65536)&&(y.flags|=256),Xa(y,s,l,i,t),wl(An(u,l));break e}}i=u=An(u,l),ae!==4&&(ae=2),ur===null?ur=[i]:ur.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=Fd(i,u,t);Ma(i,p);break e;case 1:l=u;var h=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof h.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(At===null||!At.has(m)))){i.flags|=65536,t&=-t,i.lanes|=t;var S=bd(i,l,t);Ma(i,S);break e}}i=i.return}while(i!==null)}Qd(n)}catch(N){t=N,ie===n&&n!==null&&(ie=n=n.return);continue}break}while(!0)}function Vd(){var e=Vo.current;return Vo.current=Ho,e===null?Ho:e}function Ml(){(ae===0||ae===3||ae===2)&&(ae=4),ce===null||!(nn&268435455)&&!(si&268435455)||Nt(ce,fe)}function Ko(e,t){var n=H;H|=2;var r=Vd();(ce!==e||fe!==t)&&(dt=null,Yt(e,t));do try{lm();break}catch(o){Hd(e,o)}while(!0);if(Sl(),H=n,Vo.current=r,ie!==null)throw Error(F(261));return ce=null,fe=0,ae}function lm(){for(;ie!==null;)Wd(ie)}function am(){for(;ie!==null&&!Tp();)Wd(ie)}function Wd(e){var t=Xd(e.alternate,e,Ae);e.memoizedProps=e.pendingProps,t===null?Qd(e):ie=t,Ol.current=null}function Qd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=tm(n,t),n!==null){n.flags&=32767,ie=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ae=6,ie=null;return}}else if(n=em(n,t,Ae),n!==null){ie=n;return}if(t=t.sibling,t!==null){ie=t;return}ie=t=e}while(t!==null);ae===0&&(ae=5)}function Ht(e,t,n){var r=V,o=We.transition;try{We.transition=null,V=1,um(e,t,n,r)}finally{We.transition=o,V=r}return null}function um(e,t,n,r){do jn();while(bt!==null);if(H&6)throw Error(F(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Hp(e,i),e===ce&&(ie=ce=null,fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||so||(so=!0,Yd(jo,function(){return jn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=We.transition,We.transition=null;var s=V;V=1;var l=H;H|=4,Ol.current=null,rm(e,n),Md(n,e),Rh(Ss),_o=!!ks,Ss=ks=null,e.current=n,om(n),Ap(),H=l,V=s,We.transition=i}else e.current=n;if(so&&(so=!1,bt=e,Qo=o),i=e.pendingLanes,i===0&&(At=null),Lp(n.stateNode),Pe(e,re()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Wo)throw Wo=!1,e=$s,$s=null,e;return Qo&1&&e.tag!==0&&jn(),i=e.pendingLanes,i&1?e===Hs?cr++:(cr=0,Hs=e):cr=0,Ut(),null}function jn(){if(bt!==null){var e=Fc(Qo),t=We.transition,n=V;try{if(We.transition=null,V=16>e?16:e,bt===null)var r=!1;else{if(e=bt,bt=null,Qo=0,H&6)throw Error(F(331));var o=H;for(H|=4,z=e.current;z!==null;){var i=z,s=i.child;if(z.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(z=c;z!==null;){var d=z;switch(d.tag){case 0:case 11:case 15:ar(8,d,i)}var f=d.child;if(f!==null)f.return=d,z=f;else for(;z!==null;){d=z;var x=d.sibling,k=d.return;if(Ld(d),d===c){z=null;break}if(x!==null){x.return=k,z=x;break}z=k}}}var v=i.alternate;if(v!==null){var g=v.child;if(g!==null){v.child=null;do{var y=g.sibling;g.sibling=null,g=y}while(g!==null)}}z=i}}if(i.subtreeFlags&2064&&s!==null)s.return=i,z=s;else e:for(;z!==null;){if(i=z,i.flags&2048)switch(i.tag){case 0:case 11:case 15:ar(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,z=p;break e}z=i.return}}var h=e.current;for(z=h;z!==null;){s=z;var m=s.child;if(s.subtreeFlags&2064&&m!==null)m.return=s,z=m;else e:for(s=h;z!==null;){if(l=z,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ii(9,l)}}catch(N){te(l,l.return,N)}if(l===s){z=null;break e}var S=l.sibling;if(S!==null){S.return=l.return,z=S;break e}z=l.return}}if(H=o,Ut(),st&&typeof st.onPostCommitFiberRoot=="function")try{st.onPostCommitFiberRoot(qo,e)}catch{}r=!0}return r}finally{V=n,We.transition=t}}return!1}function lu(e,t,n){t=An(n,t),t=Fd(e,t,1),e=Tt(e,t,1),t=Ee(),e!==null&&(Tr(e,1,t),Pe(e,t))}function te(e,t,n){if(e.tag===3)lu(e,e,n);else for(;t!==null;){if(t.tag===3){lu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(At===null||!At.has(r))){e=An(n,e),e=bd(t,e,1),t=Tt(t,e,1),e=Ee(),t!==null&&(Tr(t,1,e),Pe(t,e));break}}t=t.return}}function cm(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ee(),e.pingedLanes|=e.suspendedLanes&n,ce===e&&(fe&n)===n&&(ae===4||ae===3&&(fe&130023424)===fe&&500>re()-Ll?Yt(e,0):Il|=n),Pe(e,t)}function Kd(e,t){t===0&&(e.mode&1?(t=Jr,Jr<<=1,!(Jr&130023424)&&(Jr=4194304)):t=1);var n=Ee();e=yt(e,t),e!==null&&(Tr(e,t,n),Pe(e,n))}function dm(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Kd(e,n)}function fm(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(t),Kd(e,n)}var Xd;Xd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Re.current)je=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return je=!1,Zh(e,t,n);je=!!(e.flags&131072)}else je=!1,Y&&t.flags&1048576&&Gc(t,Lo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;yo(e,t),e=t.pendingProps;var o=_n(t,ve.current);bn(t,n),o=_l(null,t,r,e,o,n);var i=Pl();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,_e(r)?(i=!0,Oo(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Nl(t),o.updater=oi,t.stateNode=o,o._reactInternals=t,Ps(t,r,e,n),t=As(null,t,r,!0,i,n)):(t.tag=0,Y&&i&&yl(t),Se(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(yo(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=hm(r),e=Je(r,e),o){case 0:t=Ts(null,t,r,e,n);break e;case 1:t=qa(null,t,r,e,n);break e;case 11:t=Ya(null,t,r,e,n);break e;case 14:t=Ja(null,t,r,Je(r.type,e),n);break e}throw Error(F(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Je(r,o),Ts(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Je(r,o),qa(e,t,r,o,n);case 3:e:{if(Pd(t),e===null)throw Error(F(387));r=t.pendingProps,i=t.memoizedState,o=i.element,od(e,t),Mo(t,r,null,n);var s=t.memoizedState;if(r=s.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=An(Error(F(423)),t),t=Ga(e,t,r,n,o);break e}else if(r!==o){o=An(Error(F(424)),t),t=Ga(e,t,r,n,o);break e}else for(Oe=zt(t.stateNode.containerInfo.firstChild),Ie=t,Y=!0,Ge=null,n=nd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Pn(),r===o){t=vt(e,t,n);break e}Se(e,t,r,n)}t=t.child}return t;case 5:return id(t),e===null&&js(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,s=o.children,Es(r,o)?s=null:i!==null&&Es(r,i)&&(t.flags|=32),_d(e,t),Se(e,t,s,n),t.child;case 6:return e===null&&js(t),null;case 13:return zd(e,t,n);case 4:return Fl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=zn(t,null,r,n):Se(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Je(r,o),Ya(e,t,r,o,n);case 7:return Se(e,t,t.pendingProps,n),t.child;case 8:return Se(e,t,t.pendingProps.children,n),t.child;case 12:return Se(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,s=o.value,Q(Do,r._currentValue),r._currentValue=s,i!==null)if(tt(i.value,s)){if(i.children===o.children&&!Re.current){t=vt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){s=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=mt(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Rs(i.return,n,t),l.lanes|=n;break}u=u.next}}else if(i.tag===10)s=i.type===t.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(F(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Rs(s,n,t),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===t){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}Se(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,bn(t,n),o=Qe(o),r=r(o),t.flags|=1,Se(e,t,r,n),t.child;case 14:return r=t.type,o=Je(r,t.pendingProps),o=Je(r.type,o),Ja(e,t,r,o,n);case 15:return jd(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Je(r,o),yo(e,t),t.tag=1,_e(r)?(e=!0,Oo(t)):e=!1,bn(t,n),Nd(t,r,o),Ps(t,r,o,n),As(null,t,r,!0,e,n);case 19:return Td(e,t,n);case 22:return Rd(e,t,n)}throw Error(F(156,t.tag))};function Yd(e,t){return Sc(e,t)}function pm(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ve(e,t,n,r){return new pm(e,t,n,r)}function Ul(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hm(e){if(typeof e=="function")return Ul(e)?1:0;if(e!=null){if(e=e.$$typeof,e===sl)return 11;if(e===ll)return 14}return 2}function It(e,t){var n=e.alternate;return n===null?(n=Ve(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ko(e,t,n,r,o,i){var s=2;if(r=e,typeof e=="function")Ul(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case fn:return Jt(n.children,o,i,t);case il:s=8,o|=8;break;case ts:return e=Ve(12,n,t,o|2),e.elementType=ts,e.lanes=i,e;case ns:return e=Ve(13,n,t,o),e.elementType=ns,e.lanes=i,e;case rs:return e=Ve(19,n,t,o),e.elementType=rs,e.lanes=i,e;case ic:return li(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case rc:s=10;break e;case oc:s=9;break e;case sl:s=11;break e;case ll:s=14;break e;case St:s=16,r=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return t=Ve(s,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function Jt(e,t,n,r){return e=Ve(7,e,r,t),e.lanes=n,e}function li(e,t,n,r){return e=Ve(22,e,r,t),e.elementType=ic,e.lanes=n,e.stateNode={isHidden:!1},e}function Wi(e,t,n){return e=Ve(6,e,null,t),e.lanes=n,e}function Qi(e,t,n){return t=Ve(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function mm(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fi(0),this.expirationTimes=Fi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fi(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function $l(e,t,n,r,o,i,s,l,u){return e=new mm(e,t,n,l,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Ve(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Nl(i),e}function gm(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:dn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Jd(e){if(!e)return Dt;e=e._reactInternals;e:{if(ln(e)!==e||e.tag!==1)throw Error(F(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(_e(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(F(171))}if(e.tag===1){var n=e.type;if(_e(n))return Jc(e,n,t)}return t}function qd(e,t,n,r,o,i,s,l,u){return e=$l(n,r,!0,e,o,i,s,l,u),e.context=Jd(null),n=e.current,r=Ee(),o=Ot(n),i=mt(r,o),i.callback=t??null,Tt(n,i,o),e.current.lanes=o,Tr(e,o,r),Pe(e,r),e}function ai(e,t,n,r){var o=t.current,i=Ee(),s=Ot(o);return n=Jd(n),t.context===null?t.context=n:t.pendingContext=n,t=mt(i,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Tt(o,t,s),e!==null&&(et(e,o,s,i),mo(e,o,s)),s}function Xo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function au(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Hl(e,t){au(e,t),(e=e.alternate)&&au(e,t)}function xm(){return null}var Gd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Vl(e){this._internalRoot=e}ui.prototype.render=Vl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(F(409));ai(e,t,null,null)};ui.prototype.unmount=Vl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;rn(function(){ai(null,e,null,null)}),t[xt]=null}};function ui(e){this._internalRoot=e}ui.prototype.unstable_scheduleHydration=function(e){if(e){var t=Rc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ct.length&&t!==0&&t<Ct[n].priority;n++);Ct.splice(n,0,e),n===0&&Pc(e)}};function Wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ci(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function uu(){}function ym(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var c=Xo(s);i.call(c)}}var s=qd(t,r,e,0,null,!1,!1,"",uu);return e._reactRootContainer=s,e[xt]=s.current,wr(e.nodeType===8?e.parentNode:e),rn(),s}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var l=r;r=function(){var c=Xo(u);l.call(c)}}var u=$l(e,0,!1,null,null,!1,!1,"",uu);return e._reactRootContainer=u,e[xt]=u.current,wr(e.nodeType===8?e.parentNode:e),rn(function(){ai(t,u,n,r)}),u}function di(e,t,n,r,o){var i=n._reactRootContainer;if(i){var s=i;if(typeof o=="function"){var l=o;o=function(){var u=Xo(s);l.call(u)}}ai(t,s,e,o)}else s=ym(n,t,e,o,r);return Xo(s)}bc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=er(t.pendingLanes);n!==0&&(cl(t,n|1),Pe(t,re()),!(H&6)&&(On=re()+500,Ut()))}break;case 13:rn(function(){var r=yt(e,1);if(r!==null){var o=Ee();et(r,e,1,o)}}),Hl(e,1)}};dl=function(e){if(e.tag===13){var t=yt(e,134217728);if(t!==null){var n=Ee();et(t,e,134217728,n)}Hl(e,134217728)}};jc=function(e){if(e.tag===13){var t=Ot(e),n=yt(e,t);if(n!==null){var r=Ee();et(n,e,t,r)}Hl(e,t)}};Rc=function(){return V};_c=function(e,t){var n=V;try{return V=e,t()}finally{V=n}};ps=function(e,t,n){switch(t){case"input":if(ss(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=ti(r);if(!o)throw Error(F(90));lc(r),ss(r,o)}}}break;case"textarea":uc(e,n);break;case"select":t=n.value,t!=null&&En(e,!!n.multiple,t,!1)}};gc=Dl;xc=rn;var vm={usingClientEntryPoint:!1,Events:[Or,gn,ti,hc,mc,Dl]},Jn={findFiberByHostInstance:Wt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},wm={bundleType:Jn.bundleType,version:Jn.version,rendererPackageName:Jn.rendererPackageName,rendererConfig:Jn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:wt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=wc(e),e===null?null:e.stateNode},findFiberByHostInstance:Jn.findFiberByHostInstance||xm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var lo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!lo.isDisabled&&lo.supportsFiber)try{qo=lo.inject(wm),st=lo}catch{}}De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vm;De.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wl(t))throw Error(F(200));return gm(e,t,null,n)};De.createRoot=function(e,t){if(!Wl(e))throw Error(F(299));var n=!1,r="",o=Gd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=$l(e,1,!1,null,null,n,!1,r,o),e[xt]=t.current,wr(e.nodeType===8?e.parentNode:e),new Vl(t)};De.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=wc(t),e=e===null?null:e.stateNode,e};De.flushSync=function(e){return rn(e)};De.hydrate=function(e,t,n){if(!ci(t))throw Error(F(200));return di(null,e,t,!0,n)};De.hydrateRoot=function(e,t,n){if(!Wl(e))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",s=Gd;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=qd(t,null,e,1,n??null,o,!1,i,s),e[xt]=t.current,wr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new ui(t)};De.render=function(e,t,n){if(!ci(t))throw Error(F(200));return di(null,e,t,!1,n)};De.unmountComponentAtNode=function(e){if(!ci(e))throw Error(F(40));return e._reactRootContainer?(rn(function(){di(null,null,e,!1,function(){e._reactRootContainer=null,e[xt]=null})}),!0):!1};De.unstable_batchedUpdates=Dl;De.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ci(n))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return di(e,t,n,!1,r)};De.version="18.3.1-next-f1338f8080-20240426";function Zd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zd)}catch(e){console.error(e)}}Zd(),Zu.exports=De;var km=Zu.exports,cu=km;Zi.createRoot=cu.createRoot,Zi.hydrateRoot=cu.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Rr(){return Rr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Rr.apply(this,arguments)}var jt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(jt||(jt={}));const du="popstate";function Sm(e){e===void 0&&(e={});function t(r,o){let{pathname:i,search:s,hash:l}=r.location;return Qs("",{pathname:i,search:s,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:ef(o)}return Cm(t,n,null,e)}function se(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ql(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Em(){return Math.random().toString(36).substr(2,8)}function fu(e,t){return{usr:e.state,key:e.key,idx:t}}function Qs(e,t,n,r){return n===void 0&&(n=null),Rr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Mn(t):t,{state:n,key:t&&t.key||r||Em()})}function ef(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Mn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Cm(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:i=!1}=r,s=o.history,l=jt.Pop,u=null,c=d();c==null&&(c=0,s.replaceState(Rr({},s.state,{idx:c}),""));function d(){return(s.state||{idx:null}).idx}function f(){l=jt.Pop;let y=d(),p=y==null?null:y-c;c=y,u&&u({action:l,location:g.location,delta:p})}function x(y,p){l=jt.Push;let h=Qs(g.location,y,p);c=d()+1;let m=fu(h,c),S=g.createHref(h);try{s.pushState(m,"",S)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;o.location.assign(S)}i&&u&&u({action:l,location:g.location,delta:1})}function k(y,p){l=jt.Replace;let h=Qs(g.location,y,p);c=d();let m=fu(h,c),S=g.createHref(h);s.replaceState(m,"",S),i&&u&&u({action:l,location:g.location,delta:0})}function v(y){let p=o.location.origin!=="null"?o.location.origin:o.location.href,h=typeof y=="string"?y:ef(y);return h=h.replace(/ $/,"%20"),se(p,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,p)}let g={get action(){return l},get location(){return e(o,s)},listen(y){if(u)throw new Error("A history only accepts one active listener");return o.addEventListener(du,f),u=y,()=>{o.removeEventListener(du,f),u=null}},createHref(y){return t(o,y)},createURL:v,encodeLocation(y){let p=v(y);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:x,replace:k,go(y){return s.go(y)}};return g}var pu;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(pu||(pu={}));function Nm(e,t,n){return n===void 0&&(n="/"),Fm(e,t,n)}function Fm(e,t,n,r){let o=typeof t=="string"?Mn(t):t,i=rf(o.pathname||"/",n);if(i==null)return null;let s=tf(e);bm(s);let l=null;for(let u=0;l==null&&u<s.length;++u){let c=Bm(i);l=Im(s[u],c)}return l}function tf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let o=(i,s,l)=>{let u={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};u.relativePath.startsWith("/")&&(se(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=qt([r,u.relativePath]),d=n.concat(u);i.children&&i.children.length>0&&(se(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),tf(i.children,t,d,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:Am(c,i.index),routesMeta:d})};return e.forEach((i,s)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))o(i,s);else for(let u of nf(i.path))o(i,s,u)}),t}function nf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let s=nf(r.join("/")),l=[];return l.push(...s.map(u=>u===""?i:[i,u].join("/"))),o&&l.push(...s),l.map(u=>e.startsWith("/")&&u===""?"/":u)}function bm(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Om(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const jm=/^:[\w-]+$/,Rm=3,_m=2,Pm=1,zm=10,Tm=-2,hu=e=>e==="*";function Am(e,t){let n=e.split("/"),r=n.length;return n.some(hu)&&(r+=Tm),t&&(r+=_m),n.filter(o=>!hu(o)).reduce((o,i)=>o+(jm.test(i)?Rm:i===""?Pm:zm),r)}function Om(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function Im(e,t,n){let{routesMeta:r}=e,o={},i="/",s=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,d=i==="/"?t:t.slice(i.length)||"/",f=Lm({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},d),x=u.route;if(!f)return null;Object.assign(o,f.params),s.push({params:o,pathname:qt([i,f.pathname]),pathnameBase:Vm(qt([i,f.pathnameBase])),route:x}),f.pathnameBase!=="/"&&(i=qt([i,f.pathnameBase]))}return s}function Lm(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Dm(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],s=i.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:r.reduce((c,d,f)=>{let{paramName:x,isOptional:k}=d;if(x==="*"){let g=l[f]||"";s=i.slice(0,i.length-g.length).replace(/(.)\/+$/,"$1")}const v=l[f];return k&&!v?c[x]=void 0:c[x]=(v||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:s,pattern:e}}function Dm(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Ql(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function Bm(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ql(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function rf(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Mm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Um=e=>Mm.test(e);function $m(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Mn(e):e,i;if(n)if(Um(n))i=n;else{if(n.includes("//")){let s=n;n=n.replace(/\/\/+/g,"/"),Ql(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+n))}n.startsWith("/")?i=mu(n.substring(1),"/"):i=mu(n,t)}else i=t;return{pathname:i,search:Wm(r),hash:Qm(o)}}function mu(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function Ki(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Hm(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function of(e,t){let n=Hm(e);return t?n.map((r,o)=>o===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function sf(e,t,n,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=Mn(e):(o=Rr({},e),se(!o.pathname||!o.pathname.includes("?"),Ki("?","pathname","search",o)),se(!o.pathname||!o.pathname.includes("#"),Ki("#","pathname","hash",o)),se(!o.search||!o.search.includes("#"),Ki("#","search","hash",o)));let i=e===""||o.pathname==="",s=i?"/":o.pathname,l;if(s==null)l=n;else{let f=t.length-1;if(!r&&s.startsWith("..")){let x=s.split("/");for(;x[0]==="..";)x.shift(),f-=1;o.pathname=x.join("/")}l=f>=0?t[f]:"/"}let u=$m(o,l),c=s&&s!=="/"&&s.endsWith("/"),d=(i||s===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||d)&&(u.pathname+="/"),u}const qt=e=>e.join("/").replace(/\/\/+/g,"/"),Vm=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Wm=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Qm=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Km(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const lf=["post","put","patch","delete"];new Set(lf);const Xm=["get",...lf];new Set(Xm);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _r(){return _r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_r.apply(this,arguments)}const Kl=E.createContext(null),Ym=E.createContext(null),Lr=E.createContext(null),fi=E.createContext(null),an=E.createContext({outlet:null,matches:[],isDataRoute:!1}),af=E.createContext(null);function Dr(){return E.useContext(fi)!=null}function pi(){return Dr()||se(!1),E.useContext(fi).location}function uf(e){E.useContext(Lr).static||E.useLayoutEffect(e)}function hi(){let{isDataRoute:e}=E.useContext(an);return e?ag():Jm()}function Jm(){Dr()||se(!1);let e=E.useContext(Kl),{basename:t,future:n,navigator:r}=E.useContext(Lr),{matches:o}=E.useContext(an),{pathname:i}=pi(),s=JSON.stringify(of(o,n.v7_relativeSplatPath)),l=E.useRef(!1);return uf(()=>{l.current=!0}),E.useCallback(function(c,d){if(d===void 0&&(d={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let f=sf(c,JSON.parse(s),i,d.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:qt([t,f.pathname])),(d.replace?r.replace:r.push)(f,d.state,d)},[t,r,s,i,e])}function qm(e,t){return Gm(e,t)}function Gm(e,t,n,r){Dr()||se(!1);let{navigator:o}=E.useContext(Lr),{matches:i}=E.useContext(an),s=i[i.length-1],l=s?s.params:{};s&&s.pathname;let u=s?s.pathnameBase:"/";s&&s.route;let c=pi(),d;if(t){var f;let y=typeof t=="string"?Mn(t):t;u==="/"||(f=y.pathname)!=null&&f.startsWith(u)||se(!1),d=y}else d=c;let x=d.pathname||"/",k=x;if(u!=="/"){let y=u.replace(/^\//,"").split("/");k="/"+x.replace(/^\//,"").split("/").slice(y.length).join("/")}let v=Nm(e,{pathname:k}),g=rg(v&&v.map(y=>Object.assign({},y,{params:Object.assign({},l,y.params),pathname:qt([u,o.encodeLocation?o.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?u:qt([u,o.encodeLocation?o.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),i,n,r);return t&&g?E.createElement(fi.Provider,{value:{location:_r({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:jt.Pop}},g):g}function Zm(){let e=lg(),t=Km(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return E.createElement(E.Fragment,null,E.createElement("h2",null,"Unexpected Application Error!"),E.createElement("h3",{style:{fontStyle:"italic"}},t),n?E.createElement("pre",{style:o},n):null,null)}const eg=E.createElement(Zm,null);class tg extends E.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?E.createElement(an.Provider,{value:this.props.routeContext},E.createElement(af.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ng(e){let{routeContext:t,match:n,children:r}=e,o=E.useContext(Kl);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),E.createElement(an.Provider,{value:t},r)}function rg(e,t,n,r){var o;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let s=e,l=(o=n)==null?void 0:o.errors;if(l!=null){let d=s.findIndex(f=>f.route.id&&(l==null?void 0:l[f.route.id])!==void 0);d>=0||se(!1),s=s.slice(0,Math.min(s.length,d+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<s.length;d++){let f=s[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=d),f.route.id){let{loaderData:x,errors:k}=n,v=f.route.loader&&x[f.route.id]===void 0&&(!k||k[f.route.id]===void 0);if(f.route.lazy||v){u=!0,c>=0?s=s.slice(0,c+1):s=[s[0]];break}}}return s.reduceRight((d,f,x)=>{let k,v=!1,g=null,y=null;n&&(k=l&&f.route.id?l[f.route.id]:void 0,g=f.route.errorElement||eg,u&&(c<0&&x===0?(ug("route-fallback"),v=!0,y=null):c===x&&(v=!0,y=f.route.hydrateFallbackElement||null)));let p=t.concat(s.slice(0,x+1)),h=()=>{let m;return k?m=g:v?m=y:f.route.Component?m=E.createElement(f.route.Component,null):f.route.element?m=f.route.element:m=d,E.createElement(ng,{match:f,routeContext:{outlet:d,matches:p,isDataRoute:n!=null},children:m})};return n&&(f.route.ErrorBoundary||f.route.errorElement||x===0)?E.createElement(tg,{location:n.location,revalidation:n.revalidation,component:g,error:k,children:h(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):h()},null)}var cf=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(cf||{}),df=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(df||{});function og(e){let t=E.useContext(Kl);return t||se(!1),t}function ig(e){let t=E.useContext(Ym);return t||se(!1),t}function sg(e){let t=E.useContext(an);return t||se(!1),t}function ff(e){let t=sg(),n=t.matches[t.matches.length-1];return n.route.id||se(!1),n.route.id}function lg(){var e;let t=E.useContext(af),n=ig(),r=ff();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function ag(){let{router:e}=og(cf.UseNavigateStable),t=ff(df.UseNavigateStable),n=E.useRef(!1);return uf(()=>{n.current=!0}),E.useCallback(function(o,i){i===void 0&&(i={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,_r({fromRouteId:t},i)))},[e,t])}const gu={};function ug(e,t,n){gu[e]||(gu[e]=!0)}function cg(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Pr(e){let{to:t,replace:n,state:r,relative:o}=e;Dr()||se(!1);let{future:i,static:s}=E.useContext(Lr),{matches:l}=E.useContext(an),{pathname:u}=pi(),c=hi(),d=sf(t,of(l,i.v7_relativeSplatPath),u,o==="path"),f=JSON.stringify(d);return E.useEffect(()=>c(JSON.parse(f),{replace:n,state:r,relative:o}),[c,f,o,n,r]),null}function Vt(e){se(!1)}function dg(e){let{basename:t="/",children:n=null,location:r,navigationType:o=jt.Pop,navigator:i,static:s=!1,future:l}=e;Dr()&&se(!1);let u=t.replace(/^\/*/,"/"),c=E.useMemo(()=>({basename:u,navigator:i,static:s,future:_r({v7_relativeSplatPath:!1},l)}),[u,l,i,s]);typeof r=="string"&&(r=Mn(r));let{pathname:d="/",search:f="",hash:x="",state:k=null,key:v="default"}=r,g=E.useMemo(()=>{let y=rf(d,u);return y==null?null:{location:{pathname:y,search:f,hash:x,state:k,key:v},navigationType:o}},[u,d,f,x,k,v,o]);return g==null?null:E.createElement(Lr.Provider,{value:c},E.createElement(fi.Provider,{children:n,value:g}))}function fg(e){let{children:t,location:n}=e;return qm(Ks(t),n)}new Promise(()=>{});function Ks(e,t){t===void 0&&(t=[]);let n=[];return E.Children.forEach(e,(r,o)=>{if(!E.isValidElement(r))return;let i=[...t,o];if(r.type===E.Fragment){n.push.apply(n,Ks(r.props.children,i));return}r.type!==Vt&&se(!1),!r.props.index||!r.props.children||se(!1);let s={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(s.children=Ks(r.props.children,i)),n.push(s)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const pg="6";try{window.__reactRouterVersion=pg}catch{}const hg="startTransition",xu=cp[hg];function mg(e){let{basename:t,children:n,future:r,window:o}=e,i=E.useRef();i.current==null&&(i.current=Sm({window:o,v5Compat:!0}));let s=i.current,[l,u]=E.useState({action:s.action,location:s.location}),{v7_startTransition:c}=r||{},d=E.useCallback(f=>{c&&xu?xu(()=>u(f)):u(f)},[u,c]);return E.useLayoutEffect(()=>s.listen(d),[s,d]),E.useEffect(()=>cg(r),[r]),E.createElement(dg,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:s,future:r})}var yu;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(yu||(yu={}));var vu;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(vu||(vu={}));const pf=E.createContext(null),wu="https://lostandfound-three-kohl.vercel.app",Br=()=>{const e=E.useContext(pf);if(!e)throw new Error("useAuth must be used within AuthProvider");return e},gg=({children:e})=>{const[t,n]=E.useState(null),[r,o]=E.useState(!0);E.useEffect(()=>{const u=localStorage.getItem("token"),c=localStorage.getItem("user");if(u&&c)try{n(JSON.parse(c))}catch{}o(!1)},[]);const i=async(u,c)=>{try{const d=await fetch(`${wu}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u.toLowerCase(),password:c})}),f=await d.json();if(f.success||d.ok){const x=f.token,k=f.user;if(x&&k)return localStorage.setItem("token",x),localStorage.setItem("user",JSON.stringify(k)),n(k),{success:!0}}return{success:!1,message:f.message||"Login failed"}}catch(d){return console.error("Login error:",d),{success:!1,message:"Network error"}}},s=async u=>{try{const c=await fetch(`${wu}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}),d=await c.json();return{success:c.ok,message:d.message||(c.ok?"Registration successful":"Registration failed")}}catch(c){return console.error("Register error:",c),{success:!1,message:"Network error"}}},l=()=>{localStorage.removeItem("token"),localStorage.removeItem("user"),n(null)};return a.jsx(pf.Provider,{value:{user:t,loading:r,login:i,register:s,logout:l,isAdmin:(t==null?void 0:t.role)==="admin"},children:e})},hf=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .auth-page {
    min-height: 100vh;
    display: flex;
    background: #f7f8fc;
  }

  .auth-brand {
    width: 42%;
    min-height: 100vh;
    background: linear-gradient(160deg, #0B3A66 0%, #0a3059 55%, #072544 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 44px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .auth-brand::before {
    content: '';
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    border: 1.5px solid rgba(244, 180, 0, 0.12);
    top: -100px;
    right: -120px;
  }

  .auth-brand::after {
    content: '';
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.07);
    bottom: 60px;
    left: -80px;
  }

  .brand-top { position: relative; z-index: 1; }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-badge {
    width: 46px;
    height: 46px;
    background: linear-gradient(135deg, #F4B400 0%, #C89B2B 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 16px;
    color: #0B3A66;
    box-shadow: 0 6px 20px rgba(244, 180, 0, 0.35);
    letter-spacing: 0.5px;
  }

  .logo-name {
    font-size: 15px;
    font-weight: 700;
    color: white;
    letter-spacing: 0.4px;
  }

  .logo-tagline {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .brand-middle { position: relative; z-index: 1; }

  .brand-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(30px, 3.5vw, 40px);
    color: white;
    line-height: 1.2;
    margin-bottom: 16px;
    font-weight: 400;
  }

  .brand-headline em {
    font-style: italic;
    color: #F4B400;
  }

  .brand-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    font-weight: 300;
    max-width: 280px;
  }

  .brand-stats {
    display: flex;
    gap: 28px;
    margin-top: 36px;
  }

  .stat { display: flex; flex-direction: column; gap: 3px; }

  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: #F4B400;
    font-weight: 400;
  }

  .stat-label {
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 500;
  }

  .brand-bottom {
    position: relative;
    z-index: 1;
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    font-weight: 300;
  }

  .auth-form-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 36px;
    overflow-y: auto;
  }

  .auth-form-inner {
    width: 100%;
    max-width: 420px;
    animation: fadeUp 0.45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-heading { margin-bottom: 32px; }

  .form-heading h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 30px;
    color: #0B3A66;
    font-weight: 400;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .form-heading p {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 300;
  }

  .auth-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    padding: 11px 14px;
    border-radius: 10px;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 13px;
    color: #b91c1c;
  }

  .error-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ef4444;
    flex-shrink: 0;
  }

  .auth-form { margin-bottom: 22px; }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .form-group { margin-bottom: 16px; }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #374151;
    font-size: 12px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-wrapper input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: white;
    color: #1f2937;
  }

  .input-wrapper input:focus {
    outline: none;
    border-color: #0B3A66;
    box-shadow: 0 0 0 3px rgba(11, 58, 102, 0.08);
  }

  .input-wrapper input::placeholder {
    color: #d1d5db;
    font-weight: 300;
  }

  .input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    opacity: 0.35;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  .mail-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
  }

  .lock-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'/%3E%3C/svg%3E");
  }

  .id-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z'/%3E%3C/svg%3E");
  }

  .phone-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/%3E%3C/svg%3E");
  }

  .form-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0 18px;
    color: #d1d5db;
    font-size: 11px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .form-divider::before,
  .form-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  .auth-submit {
    width: 100%;
    padding: 13px;
    background: #0B3A66;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .auth-submit:hover:not(:disabled) {
    background: #0d4478;
    box-shadow: 0 6px 18px rgba(11, 58, 102, 0.3);
    transform: translateY(-1px);
  }

  .auth-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .auth-footer {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    font-weight: 300;
  }

  .auth-footer .toggle-button {
    color: #0B3A66;
    font-weight: 700;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }

  .auth-footer .toggle-button:hover {
    text-decoration: underline;
  }

  .demo-note {
    text-align: center;
    margin-top: 10px;
    font-size: 11px;
    color: #d1d5db;
    font-weight: 300;
  }

  .spinner-small {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .auth-page { flex-direction: column; }

    .auth-brand {
      width: 100%;
      min-height: unset;
      padding: 28px 24px 32px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .auth-brand::before,
    .auth-brand::after { display: none; }

    .brand-middle,
    .brand-bottom,
    .brand-stats { display: none; }

    .auth-form-panel { padding: 32px 20px 40px; }

    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
`,mf=()=>a.jsxs("div",{className:"auth-brand",children:[a.jsx("div",{className:"brand-top",children:a.jsxs("div",{className:"brand-logo",children:[a.jsx("div",{className:"logo-badge",children:"L&F"}),a.jsxs("div",{children:[a.jsx("div",{className:"logo-name",children:"Lost & Found"}),a.jsx("div",{className:"logo-tagline",children:"Campus System"})]})]})}),a.jsxs("div",{className:"brand-middle",children:[a.jsxs("h2",{className:"brand-headline",children:["Reuniting people",a.jsx("br",{}),"with their ",a.jsx("em",{children:"lost"})," things"]}),a.jsx("p",{className:"brand-desc",children:"A smarter way to report, track, and recover lost items across campus — fast and hassle-free."}),a.jsxs("div",{className:"brand-stats",children:[a.jsxs("div",{className:"stat",children:[a.jsx("span",{className:"stat-num",children:"94%"}),a.jsx("span",{className:"stat-label",children:"Recovery rate"})]}),a.jsxs("div",{className:"stat",children:[a.jsx("span",{className:"stat-num",children:"2.4k"}),a.jsx("span",{className:"stat-label",children:"Items returned"})]})]})]}),a.jsxs("div",{className:"brand-bottom",children:["© ",new Date().getFullYear()," Campus Lost & Found"]})]}),xg=()=>{const e=hi(),[t,n]=E.useState({name:"",email:"",password:"",confirmPassword:"",studentId:"",contactNumber:""}),[r,o]=E.useState(""),[i,s]=E.useState(""),[l,u]=E.useState(!1),{register:c}=Br(),d=x=>n({...t,[x.target.name]:x.target.value}),f=async x=>{if(x.preventDefault(),o(""),s(""),t.password!==t.confirmPassword){o("Passwords do not match");return}if(t.password.length<6){o("Password must be at least 6 characters");return}u(!0);const{confirmPassword:k,...v}=t,g=await c(v);g.success?(s("Successfully registered! Continue to log in."),n({name:"",email:"",password:"",confirmPassword:"",studentId:"",contactNumber:""}),setTimeout(()=>e("/login"),2500)):o(g.message),u(!1)};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:hf}),a.jsxs("div",{className:"auth-page",children:[a.jsx(mf,{}),a.jsx("div",{className:"auth-form-panel",children:a.jsxs("div",{className:"auth-form-inner",children:[a.jsxs("div",{className:"form-heading",children:[a.jsx("h2",{children:"Create an account"}),a.jsx("p",{children:"Fill in your details to get started"})]}),r&&a.jsxs("div",{className:"auth-error",children:[a.jsx("span",{className:"error-dot"}),r]}),i&&a.jsxs("div",{style:{background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"11px 14px",borderRadius:"10px",marginBottom:"22px",display:"flex",alignItems:"center",gap:"9px",fontSize:"13px",color:"#15803d"},children:[a.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#22c55e",flexShrink:0,display:"inline-block"}}),i]}),a.jsxs("form",{className:"auth-form",onSubmit:f,children:[a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Full Name"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon id-icon"}),a.jsx("input",{type:"text",name:"name",value:t.name,onChange:d,placeholder:"Juan dela Cruz",required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Student ID"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon id-icon"}),a.jsx("input",{type:"text",name:"studentId",value:t.studentId,onChange:d,placeholder:"2021-00001",required:!0})]})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Email"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon mail-icon"}),a.jsx("input",{type:"email",name:"email",value:t.email,onChange:d,placeholder:"you@school.edu",required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Contact Number"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon phone-icon"}),a.jsx("input",{type:"tel",name:"contactNumber",value:t.contactNumber,onChange:d,placeholder:"09XXXXXXXXX",required:!0})]})]})]}),a.jsx("div",{className:"form-divider",children:"Security"}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Password"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon lock-icon"}),a.jsx("input",{type:"password",name:"password",value:t.password,onChange:d,placeholder:"Min. 6 characters",required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Confirm Password"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon lock-icon"}),a.jsx("input",{type:"password",name:"confirmPassword",value:t.confirmPassword,onChange:d,placeholder:"Repeat password",required:!0})]})]})]}),a.jsx("button",{type:"submit",className:"auth-submit",disabled:l||!!i,style:{marginTop:4},children:l?a.jsx("span",{className:"spinner-small"}):"Create Account"})]}),a.jsxs("div",{className:"auth-footer",children:["Already have an account?"," ",a.jsx("button",{className:"toggle-button",onClick:()=>e("/login"),children:"Sign in"})]})]})})]})]})},yg=()=>{const e=hi(),[t,n]=E.useState({email:"",password:""}),[r,o]=E.useState(""),[i,s]=E.useState(!1),{login:l}=Br(),u=d=>n({...t,[d.target.name]:d.target.value}),c=async d=>{d.preventDefault(),o(""),s(!0);const f=await l(t.email,t.password);f.success||o(f.message),s(!1)};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:hf}),a.jsxs("div",{className:"auth-page",children:[a.jsx(mf,{}),a.jsx("div",{className:"auth-form-panel",children:a.jsxs("div",{className:"auth-form-inner",children:[a.jsxs("div",{className:"form-heading",children:[a.jsx("h2",{children:"Welcome back"}),a.jsx("p",{children:"Sign in to your account to continue"})]}),r&&a.jsxs("div",{className:"auth-error",children:[a.jsx("span",{className:"error-dot"}),r]}),a.jsxs("form",{className:"auth-form",onSubmit:c,children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Email"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon mail-icon"}),a.jsx("input",{type:"email",name:"email",value:t.email,onChange:u,placeholder:"Enter your email",required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Password"}),a.jsxs("div",{className:"input-wrapper",children:[a.jsx("span",{className:"input-icon lock-icon"}),a.jsx("input",{type:"password",name:"password",value:t.password,onChange:u,placeholder:"Enter your password",required:!0})]})]}),a.jsx("button",{type:"submit",className:"auth-submit",disabled:i,style:{marginTop:8},children:i?a.jsx("span",{className:"spinner-small"}):"Sign In"})]}),a.jsxs("div",{className:"auth-footer",children:["Don't have an account?"," ",a.jsx("button",{className:"toggle-button",onClick:()=>e("/register"),children:"Register"})]}),a.jsx("div",{className:"demo-note",children:"Demo: admin@example.com / admin123"})]})})]})]})};function gf(e,t){return function(){return e.apply(t,arguments)}}const{toString:vg}=Object.prototype,{getPrototypeOf:mi}=Object,{iterator:gi,toStringTag:xf}=Symbol,xi=(e=>t=>{const n=vg.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),nt=e=>(e=e.toLowerCase(),t=>xi(t)===e),yi=e=>t=>typeof t===e,{isArray:Un}=Array,In=yi("undefined");function Mr(e){return e!==null&&!In(e)&&e.constructor!==null&&!In(e.constructor)&&ze(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const yf=nt("ArrayBuffer");function wg(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&yf(e.buffer),t}const kg=yi("string"),ze=yi("function"),vf=yi("number"),Ur=e=>e!==null&&typeof e=="object",Sg=e=>e===!0||e===!1,So=e=>{if(xi(e)!=="object")return!1;const t=mi(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(xf in e)&&!(gi in e)},Eg=e=>{if(!Ur(e)||Mr(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Cg=nt("Date"),Ng=nt("File"),Fg=e=>!!(e&&typeof e.uri<"u"),bg=e=>e&&typeof e.getParts<"u",jg=nt("Blob"),Rg=nt("FileList"),_g=e=>Ur(e)&&ze(e.pipe);function Pg(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const ku=Pg(),Su=typeof ku.FormData<"u"?ku.FormData:void 0,zg=e=>{if(!e)return!1;if(Su&&e instanceof Su)return!0;const t=mi(e);if(!t||t===Object.prototype||!ze(e.append))return!1;const n=xi(e);return n==="formdata"||n==="object"&&ze(e.toString)&&e.toString()==="[object FormData]"},Tg=nt("URLSearchParams"),[Ag,Og,Ig,Lg]=["ReadableStream","Request","Response","Headers"].map(nt),Dg=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function $r(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),Un(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{if(Mr(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),s=i.length;let l;for(r=0;r<s;r++)l=i[r],t.call(null,e[l],l,e)}}function wf(e,t){if(Mr(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const Xt=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,kf=e=>!In(e)&&e!==Xt;function Xs(){const{caseless:e,skipUndefined:t}=kf(this)&&this||{},n={},r=(o,i)=>{if(i==="__proto__"||i==="constructor"||i==="prototype")return;const s=e&&wf(n,i)||i;So(n[s])&&So(o)?n[s]=Xs(n[s],o):So(o)?n[s]=Xs({},o):Un(o)?n[s]=o.slice():(!t||!In(o))&&(n[s]=o)};for(let o=0,i=arguments.length;o<i;o++)arguments[o]&&$r(arguments[o],r);return n}const Bg=(e,t,n,{allOwnKeys:r}={})=>($r(t,(o,i)=>{n&&ze(o)?Object.defineProperty(e,i,{value:gf(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),Mg=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ug=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},$g=(e,t,n,r)=>{let o,i,s;const l={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),i=o.length;i-- >0;)s=o[i],(!r||r(s,e,t))&&!l[s]&&(t[s]=e[s],l[s]=!0);e=n!==!1&&mi(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Hg=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Vg=e=>{if(!e)return null;if(Un(e))return e;let t=e.length;if(!vf(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Wg=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&mi(Uint8Array)),Qg=(e,t)=>{const r=(e&&e[gi]).call(e);let o;for(;(o=r.next())&&!o.done;){const i=o.value;t.call(e,i[0],i[1])}},Kg=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Xg=nt("HTMLFormElement"),Yg=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),Eu=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Jg=nt("RegExp"),Sf=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};$r(n,(o,i)=>{let s;(s=t(o,i,e))!==!1&&(r[i]=s||o)}),Object.defineProperties(e,r)},qg=e=>{Sf(e,(t,n)=>{if(ze(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(ze(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Gg=(e,t)=>{const n={},r=o=>{o.forEach(i=>{n[i]=!0})};return Un(e)?r(e):r(String(e).split(t)),n},Zg=()=>{},e0=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function t0(e){return!!(e&&ze(e.append)&&e[xf]==="FormData"&&e[gi])}const n0=e=>{const t=new Array(10),n=(r,o)=>{if(Ur(r)){if(t.indexOf(r)>=0)return;if(Mr(r))return r;if(!("toJSON"in r)){t[o]=r;const i=Un(r)?[]:{};return $r(r,(s,l)=>{const u=n(s,o+1);!In(u)&&(i[l]=u)}),t[o]=void 0,i}}return r};return n(e,0)},r0=nt("AsyncFunction"),o0=e=>e&&(Ur(e)||ze(e))&&ze(e.then)&&ze(e.catch),Ef=((e,t)=>e?setImmediate:t?((n,r)=>(Xt.addEventListener("message",({source:o,data:i})=>{o===Xt&&i===n&&r.length&&r.shift()()},!1),o=>{r.push(o),Xt.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",ze(Xt.postMessage)),i0=typeof queueMicrotask<"u"?queueMicrotask.bind(Xt):typeof process<"u"&&process.nextTick||Ef,s0=e=>e!=null&&ze(e[gi]),w={isArray:Un,isArrayBuffer:yf,isBuffer:Mr,isFormData:zg,isArrayBufferView:wg,isString:kg,isNumber:vf,isBoolean:Sg,isObject:Ur,isPlainObject:So,isEmptyObject:Eg,isReadableStream:Ag,isRequest:Og,isResponse:Ig,isHeaders:Lg,isUndefined:In,isDate:Cg,isFile:Ng,isReactNativeBlob:Fg,isReactNative:bg,isBlob:jg,isRegExp:Jg,isFunction:ze,isStream:_g,isURLSearchParams:Tg,isTypedArray:Wg,isFileList:Rg,forEach:$r,merge:Xs,extend:Bg,trim:Dg,stripBOM:Mg,inherits:Ug,toFlatObject:$g,kindOf:xi,kindOfTest:nt,endsWith:Hg,toArray:Vg,forEachEntry:Qg,matchAll:Kg,isHTMLForm:Xg,hasOwnProperty:Eu,hasOwnProp:Eu,reduceDescriptors:Sf,freezeMethods:qg,toObjectSet:Gg,toCamelCase:Yg,noop:Zg,toFiniteNumber:e0,findKey:wf,global:Xt,isContextDefined:kf,isSpecCompliantForm:t0,toJSONObject:n0,isAsyncFn:r0,isThenable:o0,setImmediate:Ef,asap:i0,isIterable:s0};let T=class Cf extends Error{static from(t,n,r,o,i,s){const l=new Cf(t.message,n||t.code,r,o,i);return l.cause=t,l.name=t.name,t.status!=null&&l.status==null&&(l.status=t.status),s&&Object.assign(l,s),l}constructor(t,n,r,o,i){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),o&&(this.request=o),i&&(this.response=i,this.status=i.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:w.toJSONObject(this.config),code:this.code,status:this.status}}};T.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";T.ERR_BAD_OPTION="ERR_BAD_OPTION";T.ECONNABORTED="ECONNABORTED";T.ETIMEDOUT="ETIMEDOUT";T.ERR_NETWORK="ERR_NETWORK";T.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";T.ERR_DEPRECATED="ERR_DEPRECATED";T.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";T.ERR_BAD_REQUEST="ERR_BAD_REQUEST";T.ERR_CANCELED="ERR_CANCELED";T.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";T.ERR_INVALID_URL="ERR_INVALID_URL";T.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const l0=null;function Ys(e){return w.isPlainObject(e)||w.isArray(e)}function Nf(e){return w.endsWith(e,"[]")?e.slice(0,-2):e}function Xi(e,t,n){return e?e.concat(t).map(function(o,i){return o=Nf(o),!n&&i?"["+o+"]":o}).join(n?".":""):t}function a0(e){return w.isArray(e)&&!e.some(Ys)}const u0=w.toFlatObject(w,{},null,function(t){return/^is[A-Z]/.test(t)});function vi(e,t,n){if(!w.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=w.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,p){return!w.isUndefined(p[y])});const r=n.metaTokens,o=n.visitor||f,i=n.dots,s=n.indexes,l=n.Blob||typeof Blob<"u"&&Blob,u=n.maxDepth===void 0?100:n.maxDepth,c=l&&w.isSpecCompliantForm(t);if(!w.isFunction(o))throw new TypeError("visitor must be a function");function d(g){if(g===null)return"";if(w.isDate(g))return g.toISOString();if(w.isBoolean(g))return g.toString();if(!c&&w.isBlob(g))throw new T("Blob is not supported. Use a Buffer instead.");return w.isArrayBuffer(g)||w.isTypedArray(g)?c&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function f(g,y,p){let h=g;if(w.isReactNative(t)&&w.isReactNativeBlob(g))return t.append(Xi(p,y,i),d(g)),!1;if(g&&!p&&typeof g=="object"){if(w.endsWith(y,"{}"))y=r?y:y.slice(0,-2),g=JSON.stringify(g);else if(w.isArray(g)&&a0(g)||(w.isFileList(g)||w.endsWith(y,"[]"))&&(h=w.toArray(g)))return y=Nf(y),h.forEach(function(S,N){!(w.isUndefined(S)||S===null)&&t.append(s===!0?Xi([y],N,i):s===null?y:y+"[]",d(S))}),!1}return Ys(g)?!0:(t.append(Xi(p,y,i),d(g)),!1)}const x=[],k=Object.assign(u0,{defaultVisitor:f,convertValue:d,isVisitable:Ys});function v(g,y,p=0){if(!w.isUndefined(g)){if(p>u)throw new T("Object is too deeply nested ("+p+" levels). Max depth: "+u,T.ERR_FORM_DATA_DEPTH_EXCEEDED);if(x.indexOf(g)!==-1)throw Error("Circular reference detected in "+y.join("."));x.push(g),w.forEach(g,function(m,S){(!(w.isUndefined(m)||m===null)&&o.call(t,m,w.isString(S)?S.trim():S,y,k))===!0&&v(m,y?y.concat(S):[S],p+1)}),x.pop()}}if(!w.isObject(e))throw new TypeError("data must be an object");return v(e),t}function Cu(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}function Xl(e,t){this._pairs=[],e&&vi(e,this,t)}const Ff=Xl.prototype;Ff.append=function(t,n){this._pairs.push([t,n])};Ff.toString=function(t){const n=t?function(r){return t.call(this,r,Cu)}:Cu;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function c0(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function bf(e,t,n){if(!t)return e;const r=n&&n.encode||c0,o=w.isFunction(n)?{serialize:n}:n,i=o&&o.serialize;let s;if(i?s=i(t,o):s=w.isURLSearchParams(t)?t.toString():new Xl(t,o).toString(r),s){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class Nu{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){w.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Yl={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},d0=typeof URLSearchParams<"u"?URLSearchParams:Xl,f0=typeof FormData<"u"?FormData:null,p0=typeof Blob<"u"?Blob:null,h0={isBrowser:!0,classes:{URLSearchParams:d0,FormData:f0,Blob:p0},protocols:["http","https","file","blob","url","data"]},Jl=typeof window<"u"&&typeof document<"u",Js=typeof navigator=="object"&&navigator||void 0,m0=Jl&&(!Js||["ReactNative","NativeScript","NS"].indexOf(Js.product)<0),g0=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",x0=Jl&&window.location.href||"http://localhost",y0=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Jl,hasStandardBrowserEnv:m0,hasStandardBrowserWebWorkerEnv:g0,navigator:Js,origin:x0},Symbol.toStringTag,{value:"Module"})),ye={...y0,...h0};function v0(e,t){return vi(e,new ye.classes.URLSearchParams,{visitor:function(n,r,o,i){return ye.isNode&&w.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function w0(e){return w.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function k0(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}function jf(e){function t(n,r,o,i){let s=n[i++];if(s==="__proto__")return!0;const l=Number.isFinite(+s),u=i>=n.length;return s=!s&&w.isArray(o)?o.length:s,u?(w.hasOwnProp(o,s)?o[s]=w.isArray(o[s])?o[s].concat(r):[o[s],r]:o[s]=r,!l):((!o[s]||!w.isObject(o[s]))&&(o[s]=[]),t(n,r,o[s],i)&&w.isArray(o[s])&&(o[s]=k0(o[s])),!l)}if(w.isFormData(e)&&w.isFunction(e.entries)){const n={};return w.forEachEntry(e,(r,o)=>{t(w0(r),o,n,0)}),n}return null}const cn=(e,t)=>e!=null&&w.hasOwnProp(e,t)?e[t]:void 0;function S0(e,t,n){if(w.isString(e))try{return(t||JSON.parse)(e),w.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Hr={transitional:Yl,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,i=w.isObject(t);if(i&&w.isHTMLForm(t)&&(t=new FormData(t)),w.isFormData(t))return o?JSON.stringify(jf(t)):t;if(w.isArrayBuffer(t)||w.isBuffer(t)||w.isStream(t)||w.isFile(t)||w.isBlob(t)||w.isReadableStream(t))return t;if(w.isArrayBufferView(t))return t.buffer;if(w.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){const u=cn(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return v0(t,u).toString();if((l=w.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=cn(this,"env"),d=c&&c.FormData;return vi(l?{"files[]":t}:t,d&&new d,u)}}return i||o?(n.setContentType("application/json",!1),S0(t)):t}],transformResponse:[function(t){const n=cn(this,"transitional")||Hr.transitional,r=n&&n.forcedJSONParsing,o=cn(this,"responseType"),i=o==="json";if(w.isResponse(t)||w.isReadableStream(t))return t;if(t&&w.isString(t)&&(r&&!o||i)){const l=!(n&&n.silentJSONParsing)&&i;try{return JSON.parse(t,cn(this,"parseReviver"))}catch(u){if(l)throw u.name==="SyntaxError"?T.from(u,T.ERR_BAD_RESPONSE,this,null,cn(this,"response")):u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ye.classes.FormData,Blob:ye.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};w.forEach(["delete","get","head","post","put","patch"],e=>{Hr.headers[e]={}});const E0=w.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),C0=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),r=s.substring(o+1).trim(),!(!n||t[n]&&E0[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Fu=Symbol("internals"),N0=/[^\x09\x20-\x7E\x80-\xFF]/g;function F0(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}function qn(e){return e&&String(e).trim().toLowerCase()}function b0(e){return F0(e.replace(N0,""))}function Eo(e){return e===!1||e==null?e:w.isArray(e)?e.map(Eo):b0(String(e))}function j0(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const R0=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Yi(e,t,n,r,o){if(w.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!w.isString(t)){if(w.isString(r))return t.indexOf(r)!==-1;if(w.isRegExp(r))return r.test(t)}}function _0(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function P0(e,t){const n=w.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,i,s){return this[r].call(this,t,o,i,s)},configurable:!0})})}let Te=class{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function i(l,u,c){const d=qn(u);if(!d)throw new Error("header name must be a non-empty string");const f=w.findKey(o,d);(!f||o[f]===void 0||c===!0||c===void 0&&o[f]!==!1)&&(o[f||u]=Eo(l))}const s=(l,u)=>w.forEach(l,(c,d)=>i(c,d,u));if(w.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(w.isString(t)&&(t=t.trim())&&!R0(t))s(C0(t),n);else if(w.isObject(t)&&w.isIterable(t)){let l={},u,c;for(const d of t){if(!w.isArray(d))throw TypeError("Object iterator must return a key-value pair");l[c=d[0]]=(u=l[c])?w.isArray(u)?[...u,d[1]]:[u,d[1]]:d[1]}s(l,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=qn(t),t){const r=w.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return j0(o);if(w.isFunction(n))return n.call(this,o,r);if(w.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=qn(t),t){const r=w.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Yi(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function i(s){if(s=qn(s),s){const l=w.findKey(r,s);l&&(!n||Yi(r,r[l],l,n))&&(delete r[l],o=!0)}}return w.isArray(t)?t.forEach(i):i(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const i=n[r];(!t||Yi(this,this[i],i,t,!0))&&(delete this[i],o=!0)}return o}normalize(t){const n=this,r={};return w.forEach(this,(o,i)=>{const s=w.findKey(r,i);if(s){n[s]=Eo(o),delete n[i];return}const l=t?_0(i):String(i).trim();l!==i&&delete n[i],n[l]=Eo(o),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return w.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&w.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[Fu]=this[Fu]={accessors:{}}).accessors,o=this.prototype;function i(s){const l=qn(s);r[l]||(P0(o,s),r[l]=!0)}return w.isArray(t)?t.forEach(i):i(t),this}};Te.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);w.reduceDescriptors(Te.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});w.freezeMethods(Te);function Ji(e,t){const n=this||Hr,r=t||n,o=Te.from(r.headers);let i=r.data;return w.forEach(e,function(l){i=l.call(n,i,o.normalize(),t?t.status:void 0)}),o.normalize(),i}function Rf(e){return!!(e&&e.__CANCEL__)}let Vr=class extends T{constructor(t,n,r){super(t??"canceled",T.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function _f(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new T("Request failed with status code "+n.status,[T.ERR_BAD_REQUEST,T.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function z0(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function T0(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,i=0,s;return t=t!==void 0?t:1e3,function(u){const c=Date.now(),d=r[i];s||(s=c),n[o]=u,r[o]=c;let f=i,x=0;for(;f!==o;)x+=n[f++],f=f%e;if(o=(o+1)%e,o===i&&(i=(i+1)%e),c-s<t)return;const k=d&&c-d;return k?Math.round(x*1e3/k):void 0}}function A0(e,t){let n=0,r=1e3/t,o,i;const s=(c,d=Date.now())=>{n=d,o=null,i&&(clearTimeout(i),i=null),e(...c)};return[(...c)=>{const d=Date.now(),f=d-n;f>=r?s(c,d):(o=c,i||(i=setTimeout(()=>{i=null,s(o)},r-f)))},()=>o&&s(o)]}const Yo=(e,t,n=3)=>{let r=0;const o=T0(50,250);return A0(i=>{const s=i.loaded,l=i.lengthComputable?i.total:void 0,u=l!=null?Math.min(s,l):s,c=Math.max(0,u-r),d=o(c);r=Math.max(r,u);const f={loaded:u,total:l,progress:l?u/l:void 0,bytes:c,rate:d||void 0,estimated:d&&l?(l-u)/d:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(f)},n)},bu=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},ju=e=>(...t)=>w.asap(()=>e(...t)),O0=ye.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ye.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ye.origin),ye.navigator&&/(msie|trident)/i.test(ye.navigator.userAgent)):()=>!0,I0=ye.hasStandardBrowserEnv?{write(e,t,n,r,o,i,s){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];w.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),w.isString(r)&&l.push(`path=${r}`),w.isString(o)&&l.push(`domain=${o}`),i===!0&&l.push("secure"),w.isString(s)&&l.push(`SameSite=${s}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function L0(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function D0(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Pf(e,t,n){let r=!L0(t);return e&&(r||n===!1)?D0(e,t):t}const Ru=e=>e instanceof Te?{...e}:e;function on(e,t){t=t||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(c,d,f,x){return w.isPlainObject(c)&&w.isPlainObject(d)?w.merge.call({caseless:x},c,d):w.isPlainObject(d)?w.merge({},d):w.isArray(d)?d.slice():d}function o(c,d,f,x){if(w.isUndefined(d)){if(!w.isUndefined(c))return r(void 0,c,f,x)}else return r(c,d,f,x)}function i(c,d){if(!w.isUndefined(d))return r(void 0,d)}function s(c,d){if(w.isUndefined(d)){if(!w.isUndefined(c))return r(void 0,c)}else return r(void 0,d)}function l(c,d,f){if(w.hasOwnProp(t,f))return r(c,d);if(w.hasOwnProp(e,f))return r(void 0,c)}const u={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,allowedSocketPaths:s,responseEncoding:s,validateStatus:l,headers:(c,d,f)=>o(Ru(c),Ru(d),f,!0)};return w.forEach(Object.keys({...e,...t}),function(d){if(d==="__proto__"||d==="constructor"||d==="prototype")return;const f=w.hasOwnProp(u,d)?u[d]:o,x=w.hasOwnProp(e,d)?e[d]:void 0,k=w.hasOwnProp(t,d)?t[d]:void 0,v=f(x,k,d);w.isUndefined(v)&&f!==l||(n[d]=v)}),n}const zf=e=>{const t=on({},e),n=x=>w.hasOwnProp(t,x)?t[x]:void 0,r=n("data");let o=n("withXSRFToken");const i=n("xsrfHeaderName"),s=n("xsrfCookieName");let l=n("headers");const u=n("auth"),c=n("baseURL"),d=n("allowAbsoluteUrls"),f=n("url");if(t.headers=l=Te.from(l),t.url=bf(Pf(c,f,d),e.params,e.paramsSerializer),u&&l.set("Authorization","Basic "+btoa((u.username||"")+":"+(u.password?unescape(encodeURIComponent(u.password)):""))),w.isFormData(r)){if(ye.hasStandardBrowserEnv||ye.hasStandardBrowserWebWorkerEnv)l.setContentType(void 0);else if(w.isFunction(r.getHeaders)){const x=r.getHeaders(),k=["content-type","content-length"];Object.entries(x).forEach(([v,g])=>{k.includes(v.toLowerCase())&&l.set(v,g)})}}if(ye.hasStandardBrowserEnv&&(w.isFunction(o)&&(o=o(t)),o===!0||o==null&&O0(t.url))){const k=i&&s&&I0.read(s);k&&l.set(i,k)}return t},B0=typeof XMLHttpRequest<"u",M0=B0&&function(e){return new Promise(function(n,r){const o=zf(e);let i=o.data;const s=Te.from(o.headers).normalize();let{responseType:l,onUploadProgress:u,onDownloadProgress:c}=o,d,f,x,k,v;function g(){k&&k(),v&&v(),o.cancelToken&&o.cancelToken.unsubscribe(d),o.signal&&o.signal.removeEventListener("abort",d)}let y=new XMLHttpRequest;y.open(o.method.toUpperCase(),o.url,!0),y.timeout=o.timeout;function p(){if(!y)return;const m=Te.from("getAllResponseHeaders"in y&&y.getAllResponseHeaders()),N={data:!l||l==="text"||l==="json"?y.responseText:y.response,status:y.status,statusText:y.statusText,headers:m,config:e,request:y};_f(function(R){n(R),g()},function(R){r(R),g()},N),y=null}"onloadend"in y?y.onloadend=p:y.onreadystatechange=function(){!y||y.readyState!==4||y.status===0&&!(y.responseURL&&y.responseURL.indexOf("file:")===0)||setTimeout(p)},y.onabort=function(){y&&(r(new T("Request aborted",T.ECONNABORTED,e,y)),y=null)},y.onerror=function(S){const N=S&&S.message?S.message:"Network Error",C=new T(N,T.ERR_NETWORK,e,y);C.event=S||null,r(C),y=null},y.ontimeout=function(){let S=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const N=o.transitional||Yl;o.timeoutErrorMessage&&(S=o.timeoutErrorMessage),r(new T(S,N.clarifyTimeoutError?T.ETIMEDOUT:T.ECONNABORTED,e,y)),y=null},i===void 0&&s.setContentType(null),"setRequestHeader"in y&&w.forEach(s.toJSON(),function(S,N){y.setRequestHeader(N,S)}),w.isUndefined(o.withCredentials)||(y.withCredentials=!!o.withCredentials),l&&l!=="json"&&(y.responseType=o.responseType),c&&([x,v]=Yo(c,!0),y.addEventListener("progress",x)),u&&y.upload&&([f,k]=Yo(u),y.upload.addEventListener("progress",f),y.upload.addEventListener("loadend",k)),(o.cancelToken||o.signal)&&(d=m=>{y&&(r(!m||m.type?new Vr(null,e,y):m),y.abort(),y=null)},o.cancelToken&&o.cancelToken.subscribe(d),o.signal&&(o.signal.aborted?d():o.signal.addEventListener("abort",d)));const h=z0(o.url);if(h&&ye.protocols.indexOf(h)===-1){r(new T("Unsupported protocol "+h+":",T.ERR_BAD_REQUEST,e));return}y.send(i||null)})},U0=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,o;const i=function(c){if(!o){o=!0,l();const d=c instanceof Error?c:this.reason;r.abort(d instanceof T?d:new Vr(d instanceof Error?d.message:d))}};let s=t&&setTimeout(()=>{s=null,i(new T(`timeout of ${t}ms exceeded`,T.ETIMEDOUT))},t);const l=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(c=>{c.unsubscribe?c.unsubscribe(i):c.removeEventListener("abort",i)}),e=null)};e.forEach(c=>c.addEventListener("abort",i));const{signal:u}=r;return u.unsubscribe=()=>w.asap(l),u}},$0=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,o;for(;r<n;)o=r+t,yield e.slice(r,o),r=o},H0=async function*(e,t){for await(const n of V0(e))yield*$0(n,t)},V0=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},_u=(e,t,n,r)=>{const o=H0(e,t);let i=0,s,l=u=>{s||(s=!0,r&&r(u))};return new ReadableStream({async pull(u){try{const{done:c,value:d}=await o.next();if(c){l(),u.close();return}let f=d.byteLength;if(n){let x=i+=f;n(x)}u.enqueue(new Uint8Array(d))}catch(c){throw l(c),c}},cancel(u){return l(u),o.return()}},{highWaterMark:2})},Pu=64*1024,{isFunction:ao}=w,W0=(({Request:e,Response:t})=>({Request:e,Response:t}))(w.global),{ReadableStream:zu,TextEncoder:Tu}=w.global,Au=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Q0=e=>{e=w.merge.call({skipUndefined:!0},W0,e);const{fetch:t,Request:n,Response:r}=e,o=t?ao(t):typeof fetch=="function",i=ao(n),s=ao(r);if(!o)return!1;const l=o&&ao(zu),u=o&&(typeof Tu=="function"?(v=>g=>v.encode(g))(new Tu):async v=>new Uint8Array(await new n(v).arrayBuffer())),c=i&&l&&Au(()=>{let v=!1;const g=new n(ye.origin,{body:new zu,method:"POST",get duplex(){return v=!0,"half"}}),y=g.headers.has("Content-Type");return g.body!=null&&g.body.cancel(),v&&!y}),d=s&&l&&Au(()=>w.isReadableStream(new r("").body)),f={stream:d&&(v=>v.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(v=>{!f[v]&&(f[v]=(g,y)=>{let p=g&&g[v];if(p)return p.call(g);throw new T(`Response type '${v}' is not supported`,T.ERR_NOT_SUPPORT,y)})});const x=async v=>{if(v==null)return 0;if(w.isBlob(v))return v.size;if(w.isSpecCompliantForm(v))return(await new n(ye.origin,{method:"POST",body:v}).arrayBuffer()).byteLength;if(w.isArrayBufferView(v)||w.isArrayBuffer(v))return v.byteLength;if(w.isURLSearchParams(v)&&(v=v+""),w.isString(v))return(await u(v)).byteLength},k=async(v,g)=>{const y=w.toFiniteNumber(v.getContentLength());return y??x(g)};return async v=>{let{url:g,method:y,data:p,signal:h,cancelToken:m,timeout:S,onDownloadProgress:N,onUploadProgress:C,responseType:R,headers:P,withCredentials:I="same-origin",fetchOptions:b}=zf(v),$=t||fetch;R=R?(R+"").toLowerCase():"text";let D=U0([h,m&&m.toAbortSignal()],S),J=null;const ee=D&&D.unsubscribe&&(()=>{D.unsubscribe()});let Fe;try{if(C&&c&&y!=="get"&&y!=="head"&&(Fe=await k(P,p))!==0){let B=new n(g,{method:"POST",body:p,duplex:"half"}),W;if(w.isFormData(p)&&(W=B.headers.get("content-type"))&&P.setContentType(W),B.body){const[Xe,we]=bu(Fe,Yo(ju(C)));p=_u(B.body,Pu,Xe,we)}}w.isString(I)||(I=I?"include":"omit");const oe=i&&"credentials"in n.prototype;if(w.isFormData(p)){const B=P.getContentType();B&&/^multipart\/form-data/i.test(B)&&!/boundary=/i.test(B)&&P.delete("content-type")}const he={...b,signal:D,method:y.toUpperCase(),headers:P.normalize().toJSON(),body:p,duplex:"half",credentials:oe?I:void 0};J=i&&new n(g,he);let _=await(i?$(J,b):$(g,he));const A=d&&(R==="stream"||R==="response");if(d&&(N||A&&ee)){const B={};["status","statusText","headers"].forEach(at=>{B[at]=_[at]});const W=w.toFiniteNumber(_.headers.get("content-length")),[Xe,we]=N&&bu(W,Yo(ju(N),!0))||[];_=new r(_u(_.body,Pu,Xe,()=>{we&&we(),ee&&ee()}),B)}R=R||"text";let O=await f[w.findKey(f,R)||"text"](_,v);return!A&&ee&&ee(),await new Promise((B,W)=>{_f(B,W,{data:O,headers:Te.from(_.headers),status:_.status,statusText:_.statusText,config:v,request:J})})}catch(oe){throw ee&&ee(),oe&&oe.name==="TypeError"&&/Load failed|fetch/i.test(oe.message)?Object.assign(new T("Network Error",T.ERR_NETWORK,v,J,oe&&oe.response),{cause:oe.cause||oe}):T.from(oe,oe&&oe.code,v,J,oe&&oe.response)}}},K0=new Map,Tf=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:o}=t,i=[r,o,n];let s=i.length,l=s,u,c,d=K0;for(;l--;)u=i[l],c=d.get(u),c===void 0&&d.set(u,c=l?new Map:Q0(t)),d=c;return c};Tf();const ql={http:l0,xhr:M0,fetch:{get:Tf}};w.forEach(ql,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Ou=e=>`- ${e}`,X0=e=>w.isFunction(e)||e===null||e===!1;function Y0(e,t){e=w.isArray(e)?e:[e];const{length:n}=e;let r,o;const i={};for(let s=0;s<n;s++){r=e[s];let l;if(o=r,!X0(r)&&(o=ql[(l=String(r)).toLowerCase()],o===void 0))throw new T(`Unknown adapter '${l}'`);if(o&&(w.isFunction(o)||(o=o.get(t))))break;i[l||"#"+s]=o}if(!o){const s=Object.entries(i).map(([u,c])=>`adapter ${u} `+(c===!1?"is not supported by the environment":"is not available in the build"));let l=n?s.length>1?`since :
`+s.map(Ou).join(`
`):" "+Ou(s[0]):"as no adapter specified";throw new T("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return o}const Af={getAdapter:Y0,adapters:ql};function qi(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Vr(null,e)}function Iu(e){return qi(e),e.headers=Te.from(e.headers),e.data=Ji.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Af.getAdapter(e.adapter||Hr.adapter,e)(e).then(function(r){return qi(e),r.data=Ji.call(e,e.transformResponse,r),r.headers=Te.from(r.headers),r},function(r){return Rf(r)||(qi(e),r&&r.response&&(r.response.data=Ji.call(e,e.transformResponse,r.response),r.response.headers=Te.from(r.response.headers))),Promise.reject(r)})}const Of="1.15.2",wi={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{wi[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Lu={};wi.transitional=function(t,n,r){function o(i,s){return"[Axios v"+Of+"] Transitional option '"+i+"'"+s+(r?". "+r:"")}return(i,s,l)=>{if(t===!1)throw new T(o(s," has been removed"+(n?" in "+n:"")),T.ERR_DEPRECATED);return n&&!Lu[s]&&(Lu[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,s,l):!0}};wi.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function J0(e,t,n){if(typeof e!="object")throw new T("options must be an object",T.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],s=Object.prototype.hasOwnProperty.call(t,i)?t[i]:void 0;if(s){const l=e[i],u=l===void 0||s(l,i,e);if(u!==!0)throw new T("option "+i+" must be "+u,T.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new T("Unknown option "+i,T.ERR_BAD_OPTION)}}const Co={assertOptions:J0,validators:wi},Ue=Co.validators;let Gt=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Nu,response:new Nu}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const i=(()=>{if(!o.stack)return"";const s=o.stack.indexOf(`
`);return s===-1?"":o.stack.slice(s+1)})();try{if(!r.stack)r.stack=i;else if(i){const s=i.indexOf(`
`),l=s===-1?-1:i.indexOf(`
`,s+1),u=l===-1?"":i.slice(l+1);String(r.stack).endsWith(u)||(r.stack+=`
`+i)}}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=on(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:i}=n;r!==void 0&&Co.assertOptions(r,{silentJSONParsing:Ue.transitional(Ue.boolean),forcedJSONParsing:Ue.transitional(Ue.boolean),clarifyTimeoutError:Ue.transitional(Ue.boolean),legacyInterceptorReqResOrdering:Ue.transitional(Ue.boolean)},!1),o!=null&&(w.isFunction(o)?n.paramsSerializer={serialize:o}:Co.assertOptions(o,{encode:Ue.function,serialize:Ue.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Co.assertOptions(n,{baseUrl:Ue.spelling("baseURL"),withXsrfToken:Ue.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=i&&w.merge(i.common,i[n.method]);i&&w.forEach(["delete","get","head","post","put","patch","common"],v=>{delete i[v]}),n.headers=Te.concat(s,i);const l=[];let u=!0;this.interceptors.request.forEach(function(g){if(typeof g.runWhen=="function"&&g.runWhen(n)===!1)return;u=u&&g.synchronous;const y=n.transitional||Yl;y&&y.legacyInterceptorReqResOrdering?l.unshift(g.fulfilled,g.rejected):l.push(g.fulfilled,g.rejected)});const c=[];this.interceptors.response.forEach(function(g){c.push(g.fulfilled,g.rejected)});let d,f=0,x;if(!u){const v=[Iu.bind(this),void 0];for(v.unshift(...l),v.push(...c),x=v.length,d=Promise.resolve(n);f<x;)d=d.then(v[f++],v[f++]);return d}x=l.length;let k=n;for(;f<x;){const v=l[f++],g=l[f++];try{k=v(k)}catch(y){g.call(this,y);break}}try{d=Iu.call(this,k)}catch(v){return Promise.reject(v)}for(f=0,x=c.length;f<x;)d=d.then(c[f++],c[f++]);return d}getUri(t){t=on(this.defaults,t);const n=Pf(t.baseURL,t.url,t.allowAbsoluteUrls);return bf(n,t.params,t.paramsSerializer)}};w.forEach(["delete","get","head","options"],function(t){Gt.prototype[t]=function(n,r){return this.request(on(r||{},{method:t,url:n,data:(r||{}).data}))}});w.forEach(["post","put","patch"],function(t){function n(r){return function(i,s,l){return this.request(on(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:s}))}}Gt.prototype[t]=n(),Gt.prototype[t+"Form"]=n(!0)});let q0=class If{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(o=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](o);r._listeners=null}),this.promise.then=o=>{let i;const s=new Promise(l=>{r.subscribe(l),i=l}).then(o);return s.cancel=function(){r.unsubscribe(i)},s},t(function(i,s,l){r.reason||(r.reason=new Vr(i,s,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new If(function(o){t=o}),cancel:t}}};function G0(e){return function(n){return e.apply(null,n)}}function Z0(e){return w.isObject(e)&&e.isAxiosError===!0}const qs={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(qs).forEach(([e,t])=>{qs[t]=e});function Lf(e){const t=new Gt(e),n=gf(Gt.prototype.request,t);return w.extend(n,Gt.prototype,t,{allOwnKeys:!0}),w.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Lf(on(e,o))},n}const L=Lf(Hr);L.Axios=Gt;L.CanceledError=Vr;L.CancelToken=q0;L.isCancel=Rf;L.VERSION=Of;L.toFormData=vi;L.AxiosError=T;L.Cancel=L.CanceledError;L.all=function(t){return Promise.all(t)};L.spread=G0;L.isAxiosError=Z0;L.mergeConfig=on;L.AxiosHeaders=Te;L.formToJSON=e=>jf(w.isHTMLForm(e)?new FormData(e):e);L.getAdapter=Af.getAdapter;L.HttpStatusCode=qs;L.default=L;const{Axios:xx,AxiosError:yx,CanceledError:vx,isCancel:wx,CancelToken:kx,VERSION:Sx,all:Ex,Cancel:Cx,isAxiosError:Nx,spread:Fx,toFormData:bx,AxiosHeaders:jx,HttpStatusCode:Rx,formToJSON:_x,getAdapter:Px,mergeConfig:zx}=L,ex=`
  .chat-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .chat-modal-container {
    width: 100%;
    max-width: 500px;
    height: 600px;
    background: #FFFFFF;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    animation: chatSlideIn 0.3s ease;
  }

  @keyframes chatSlideIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .chat-header {
    background: linear-gradient(135deg, #0B3A66 0%, #0F4C80 100%);
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-header-info { flex: 1; }

  .chat-item-name {
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    margin-bottom: 2px;
  }

  .chat-with {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .chat-close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  .chat-messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px;
    background: #F0F2F5;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    animation: messageAppear 0.2s ease;
  }

  @keyframes messageAppear {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .message-row.own   { justify-content: flex-end; }
  .message-row.other { justify-content: flex-start; }

  .message-sender-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B3A66;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
    margin-bottom: 20px;
  }

  .message-wrapper {
    max-width: 70%;
    display: flex;
    flex-direction: column;
  }

  .message-sender-name {
    font-size: 11px;
    font-weight: 600;
    color: #65676B;
    margin-bottom: 4px;
    margin-left: 12px;
  }

  .message-bubble {
    padding: 10px 14px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
  }

  .own-bubble {
    background: #0084FF;
    color: #FFFFFF;
    border-bottom-right-radius: 4px;
  }

  .other-bubble {
    background: #E4E6EB;
    color: #050505;
    border-bottom-left-radius: 4px;
  }

  .auto-message-bubble {
    background: #EFF6FF !important;
    border-left: 3px solid #0B3A66 !important;
    color: #1e3a5f !important;
  }

  .message-text {
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  .message-time {
    font-size: 10px;
    margin-top: 6px;
    opacity: 0.7;
  }

  .own-bubble .message-time   { text-align: right; color: rgba(255,255,255,0.8); }
  .other-bubble .message-time { text-align: left; color: #65676B; }
  .auto-message-bubble .message-time { text-align: left; color: #6b7280; }

  .chat-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 16px;
    color: #65676B;
  }

  .spinner-small {
    width: 32px;
    height: 32px;
    border: 3px solid #E4E6EB;
    border-top-color: #0084FF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .chat-no-messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #65676B;
  }

  .no-messages-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
  .chat-no-messages p { margin: 0; font-size: 14px; }
  .no-messages-sub { font-size: 12px; margin-top: 4px; opacity: 0.7; }

  .chat-input-area {
    padding: 12px 16px;
    background: #FFFFFF;
    border-top: 1px solid #E4E6EB;
  }

  .chat-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #F0F2F5;
    border-radius: 24px;
    padding: 4px 8px 4px 16px;
  }

  .chat-input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px 0;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    max-height: 100px;
    outline: none;
  }

  .chat-input::placeholder { color: #65676B; }

  .chat-send-btn {
    background: #0084FF;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 16px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .chat-send-btn:hover:not(:disabled) { background: #0073E6; transform: scale(1.05); }
  .chat-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .chat-error {
    padding: 12px 20px;
    background: #FEE2E2;
    border-bottom: 1px solid #FCA5A5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .chat-error span { font-size: 13px; color: #991B1B; flex: 1; }
  .chat-error button {
    padding: 6px 12px;
    background: #991B1B;
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }

  .auto-message-note {
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
    padding: 4px 0 8px;
    font-style: italic;
  }

  .chat-messages-area::-webkit-scrollbar { width: 6px; }
  .chat-messages-area::-webkit-scrollbar-track { background: #F0F2F5; }
  .chat-messages-area::-webkit-scrollbar-thumb { background: #BCC0C4; border-radius: 3px; }

  @media (max-width: 768px) {
    .chat-modal-container { max-width: 95%; height: 85vh; border-radius: 16px; }
    .message-wrapper { max-width: 85%; }
    .message-bubble { padding: 8px 12px; }
    .message-text { font-size: 13px; }
  }
`,tx=(e,t)=>e?(t!=null&&t.name,e.category==="lost"?`Hi! I think I found your lost item "${e.name}" that was reported at ${e.location}. I'd like to help return it to you. Can we arrange a time to meet?`:`Hi! I believe the item "${e.name}" you found at ${e.location} belongs to me. I can provide details to verify it's mine. Can we arrange a pickup?`):null,nx=({isOpen:e,onClose:t,item:n,currentUser:r,onItemUpdate:o,initialRoom:i})=>{const[s,l]=E.useState([]),[u,c]=E.useState(""),[d,f]=E.useState(!1),[x,k]=E.useState(null),[v,g]=E.useState(!0),[y,p]=E.useState(null),h=E.useRef(null),m=E.useRef(!1),S=()=>!r||!n?!1:String(r.id)===String(n.userId),N=async()=>{if(!(!n||!r)){g(!0),p(null),m.current=!1;try{const b=localStorage.getItem("token"),$=n.userId;if(i){k(i);const D=await L.get(`/api/chat/messages/${i._id}`,{headers:{Authorization:`Bearer ${b}`}});D.data.success?l(D.data.data||[]):l([])}else if(S()){const D=await L.get("/api/chat/rooms",{headers:{Authorization:`Bearer ${b}`}});if(D.data.success){const J=D.data.data.filter(ee=>{var Fe;return ee.itemId===n._id||((Fe=ee.item)==null?void 0:Fe._id)===n._id});if(J.length>0){k(J[0]);const ee=await L.get(`/api/chat/messages/${J[0]._id}`,{headers:{Authorization:`Bearer ${b}`}});ee.data.success?l(ee.data.data||[]):l([])}else l([])}}else{const D=await L.post("/api/chat/room",{itemId:n._id,ownerId:$},{headers:{Authorization:`Bearer ${b}`}});if(D.data.success&&D.data.data){const J=D.data.data;k(J);const ee=J.messages||[];if(l(ee),ee.length===0&&!m.current){m.current=!0;const Fe=tx(n,r);Fe&&c(Fe)}}}}catch(b){console.error("Load chat error:",b),p(b.message)}finally{g(!1)}}},C=async()=>{if(x!=null&&x._id)try{const b=localStorage.getItem("token"),$=await L.get(`/api/chat/messages/${x._id}`,{headers:{Authorization:`Bearer ${b}`}});$.data.success&&l($.data.data||[])}catch{}};E.useEffect(()=>{if(e&&n){N();const b=setInterval(C,3e3);return()=>clearInterval(b)}},[e,n==null?void 0:n._id,i]),E.useEffect(()=>{var b;(b=h.current)==null||b.scrollIntoView({behavior:"smooth"})},[s]);const R=async()=>{if(!(!u.trim()||!x)){f(!0);try{const b=localStorage.getItem("token"),$=await L.post("/api/chat/message",{roomId:x._id,message:u.trim()},{headers:{Authorization:`Bearer ${b}`}});$.data.success&&(l(D=>[...D,$.data.data]),c(""))}catch(b){console.error("Send error:",b)}finally{f(!1)}}},P=b=>{b.key==="Enter"&&!b.shiftKey&&(b.preventDefault(),R())},I=b=>new Date(b).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return e?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:ex}),a.jsx("div",{className:"chat-modal-overlay",onClick:t,children:a.jsxs("div",{className:"chat-modal-container",onClick:b=>b.stopPropagation(),children:[a.jsxs("div",{className:"chat-header",children:[a.jsxs("div",{className:"chat-header-info",children:[a.jsx("div",{className:"chat-item-name",children:n==null?void 0:n.name}),a.jsx("div",{className:"chat-with",children:i!=null&&i.otherUser?`Chat with ${i.otherUser.name||i.otherUserName||"User"}`:S()?"Messages from interested people":"Chat with owner"})]}),a.jsx("button",{className:"chat-close-btn",onClick:t,children:"✕"})]}),y&&a.jsxs("div",{className:"chat-error",children:[a.jsx("span",{children:y}),a.jsx("button",{onClick:N,children:"Retry"})]}),a.jsxs("div",{className:"chat-messages-area",children:[v?a.jsxs("div",{className:"chat-loading",children:[a.jsx("div",{className:"spinner-small"}),a.jsx("p",{children:"Loading..."})]}):s.length===0?a.jsxs("div",{className:"chat-no-messages",children:[a.jsx("div",{className:"no-messages-icon",children:"💬"}),a.jsx("p",{children:"No messages yet"}),a.jsx("p",{className:"no-messages-sub",children:S()?"When someone shows interest in your item, their messages will appear here":(n==null?void 0:n.category)==="lost"?"Let the owner know you found their item!":"Let the finder know this item belongs to you!"})]}):s.map((b,$)=>{var J;const D=b.senderId===(r==null?void 0:r.id);return a.jsxs("div",{className:`message-row ${D?"own":"other"}`,children:[!D&&a.jsx("div",{className:"message-sender-avatar",children:((J=b.senderName)==null?void 0:J.charAt(0))||"?"}),a.jsxs("div",{className:"message-wrapper",children:[!D&&a.jsx("div",{className:"message-sender-name",children:b.senderName||"Unknown"}),a.jsxs("div",{className:`message-bubble ${D?"own-bubble":"other-bubble"}`,children:[a.jsx("div",{className:"message-text",children:b.message}),a.jsx("div",{className:"message-time",children:I(b.createdAt)})]})]})]},$)}),a.jsx("div",{ref:h})]}),a.jsxs("div",{className:"chat-input-area",children:[!S()&&s.length===0&&u&&a.jsx("div",{className:"auto-message-note",children:"✨ Suggested message — edit or send as is"}),a.jsxs("div",{className:"chat-input-wrapper",children:[a.jsx("textarea",{className:"chat-input",placeholder:S()?"Type a message...":(n==null?void 0:n.category)==="lost"?"Tell the owner you found their item...":"Tell the finder this item is yours...",value:u,onChange:b=>c(b.target.value),onKeyPress:P,rows:"1"}),a.jsx("button",{className:"chat-send-btn",onClick:R,disabled:d||!u.trim(),children:"➤"})]})]})]})})]}):null},rx=`
  .message-list-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .message-list-modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .message-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #0B3A66;
    color: white;
  }

  .message-list-header h2 {
    font-size: 16px;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
  }

  .message-list-body {
    flex: 1;
    overflow-y: auto;
  }

  .conversation-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s;
  }

  .conversation-item:hover {
    background: #f8f8f8;
  }

  .conv-avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #0B3A66, #1a2a8a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .conv-content {
    flex: 1;
    min-width: 0;
  }

  .conv-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .conv-name {
    font-weight: 600;
    color: #0B3A66;
    font-size: 14px;
  }

  .conv-time {
    font-size: 11px;
    color: #999;
  }

  .conv-preview {
    font-size: 13px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .conv-arrow {
    color: #ccc;
    font-size: 18px;
  }

  .loading, .no-conversations {
    text-align: center;
    padding: 40px;
    color: #666;
  }

  .no-conversations .sub {
    font-size: 13px;
    color: #999;
    margin-top: 8px;
  }
`,ox=({item:e,onSelectChat:t,onClose:n})=>{const[r,o]=E.useState([]),[i,s]=E.useState(!0),l=dr.useCallback(async()=>{if(e)try{const c=localStorage.getItem("token"),d=await L.get("/api/chat/rooms",{headers:{Authorization:`Bearer ${c}`}});if(d.data.success){const f=d.data.data.filter(x=>{var k;return x.itemId===e._id||((k=x.item)==null?void 0:k._id)===e._id});o(f)}}catch(c){console.error("Error:",c)}finally{s(!1)}},[e]);E.useEffect(()=>{l()},[l]);const u=c=>{if(!c)return"";const d=new Date,f=new Date(c),x=Math.floor((d-f)/6e4);if(x<1)return"Just now";if(x<60)return`${x}m ago`;const k=Math.floor(x/60);return k<24?`${k}h ago`:f.toLocaleDateString()};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:rx}),a.jsx("div",{className:"message-list-overlay",onClick:n,children:a.jsxs("div",{className:"message-list-modal",onClick:c=>c.stopPropagation(),children:[a.jsxs("div",{className:"message-list-header",children:[a.jsxs("h2",{children:["Messages: ",e==null?void 0:e.name]}),a.jsx("button",{className:"close-btn",onClick:n,children:"✕"})]}),a.jsx("div",{className:"message-list-body",children:i?a.jsx("p",{className:"loading",children:"Loading conversations..."}):r.length===0?a.jsxs("div",{className:"no-conversations",children:[a.jsx("p",{children:"No messages yet"}),a.jsx("p",{className:"sub",children:"When someone shows interest in your item, their conversation will appear here"})]}):r.map(c=>{const d=c.otherUser||{};return a.jsxs("div",{className:"conversation-item",onClick:()=>t(c),children:[a.jsx("div",{className:"conv-avatar",children:(d.name||"?").charAt(0).toUpperCase()}),a.jsxs("div",{className:"conv-content",children:[a.jsxs("div",{className:"conv-header",children:[a.jsx("span",{className:"conv-name",children:d.name||"Unknown User"}),a.jsx("span",{className:"conv-time",children:u(c.lastMessageTime)})]}),a.jsx("div",{className:"conv-preview",children:c.lastMessage||"No messages"})]}),a.jsx("span",{className:"conv-arrow",children:"›"})]},c._id)})})]})})]})},Du=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: #F5E6C8;
    color: #0B3A66;
    -webkit-font-smoothing: antialiased;
  }

  .dashboard {
    min-height: 100vh;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
  }

  .dashboard-header {
    background: #0B3A66;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
  }

  .header-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .logo-image { width: 38px; height: 38px; border-radius: 10px; object-fit: cover; }

  .logo {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
  }

  .logo span { color: #F4B400; }

  .header-nav { display: flex; align-items: center; gap: 4px; }

  .nav-link {
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .nav-link:hover { background: rgba(255,255,255,0.08); color: #FFFFFF; }
  .nav-link.active { background: rgba(255,255,255,0.12); color: #FFFFFF; }

  .header-right { display: flex; align-items: center; gap: 10px; }

  .ghost-btn {
    padding: 8px 16px;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .ghost-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); }

  .primary-btn {
    padding: 8px 18px;
    border: none;
    background: #F4B400;
    color: #0B3A66;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 2px 8px rgba(244, 180, 0, 0.25);
  }

  .primary-btn:hover {
    background: #E5A800;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(244, 180, 0, 0.35);
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px 6px 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .user-profile:hover { background: rgba(255,255,255,0.15); transform: translateY(-1px); }

  .user-avatar {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B3A66;
    font-weight: 700;
    font-size: 16px;
  }

  .user-info { display: flex; flex-direction: column; gap: 2px; }
  .user-name { font-size: 14px; font-weight: 600; color: #FFFFFF; }
  .user-role { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.7); }

  .logout-btn {
    padding: 6px 12px;
    border: none;
    background: #C0392B;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .logout-btn:hover { background: #A93226; transform: translateY(-1px); }

  /* ── Main ── */
  .dashboard-main { padding: 32px 0 60px; }

  .main-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  /* ── Hero ── */
  .hero-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin-bottom: 40px;
    padding: 40px;
    background: linear-gradient(135deg, #0B3A66 0%, #0F4C80 100%);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(244,180,0,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-content { position: relative; z-index: 1; flex: 1; }

  .hero-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: -1px;
  }

  .text-accent   { color: #F4B400; }
  .text-secondary { color: #2ECC71; }

  .hero-description {
    font-size: 16px;
    color: rgba(255,255,255,0.75);
    max-width: 500px;
    line-height: 1.6;
  }

  .hero-report-btn {
    margin-top: 20px;
    padding: 12px 28px;
    background: linear-gradient(135deg, #F4B400 0%, #E5A800 100%);
    color: #0B3A66;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3);
  }

  .hero-report-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(244, 180, 0, 0.4); }

  .hero-stats { position: relative; z-index: 1; display: flex; gap: 32px; }

  .hero-stats .stat {
    text-align: center;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    padding: 20px 28px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .stat-value {
    display: block;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #F4B400;
  }

  .stat-label { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 4px; display: block; }

  /* ── Search ── */
  .search-section {
    background: #FFFFFF;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 2px 12px rgba(11, 58, 102, 0.06);
    border: 1px solid rgba(11, 58, 102, 0.08);
  }

  .search-bar { margin-bottom: 16px; }

  .search-input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #E8DFD0;
    border-radius: 14px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    background: #FAF8F4;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #0B3A66;
    background: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(11, 58, 102, 0.06);
  }

  .search-input::placeholder { color: #B8A88A; }

  .filter-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }

  .chip {
    padding: 8px 16px;
    border: 1px solid #E0D5C0;
    background: #FFFFFF;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    color: #5C4F3A;
  }

  .chip:hover { background: #F5E6C8; border-color: #D4C4A8; }
  .chip.active { background: #0B3A66; color: #FFFFFF; border-color: #0B3A66; }
  .chip.chip-lost.active  { background: #C0392B; border-color: #C0392B; }
  .chip.chip-found.active { background: #1F6B4F; border-color: #1F6B4F; }

  .chip select {
    border: none;
    background: transparent;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    cursor: pointer;
    color: inherit;
    outline: none;
  }

  .results-info { font-size: 13px; color: #8E8068; font-weight: 500; }

  /* ── Items Grid ── */
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .item-card {
    background: #FFFFFF;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #E8DFD0;
    box-shadow: 0 2px 8px rgba(11, 58, 102, 0.04);
    transition: all 0.3s ease;
  }

  .item-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(11, 58, 102, 0.1);
    border-color: #D4C4A8;
  }

  .item-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-image.bg-lost  { background: linear-gradient(135deg, #FDE8E8 0%, #FBD5D5 100%); }
  .item-image.bg-found { background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%); }
  .item-image img { width: 100%; height: 100%; object-fit: cover; }

  .item-emoji {
    font-size: 64px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    transition: all 0.3s ease;
  }

  .item-card:hover .item-emoji { transform: scale(1.1) rotate(3deg); }

  .item-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #FFFFFF;
    backdrop-filter: blur(4px);
  }

  .item-badge.lost  { background: rgba(192, 57, 43, 0.9); }
  .item-badge.found { background: rgba(31, 107, 79, 0.9); }

  .item-category-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(255,255,255,0.85);
    color: #0B3A66;
    backdrop-filter: blur(4px);
  }

  .item-body { padding: 18px; }

  .item-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #0B3A66;
    margin-bottom: 6px;
  }

  .item-posted-by {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 12px;
    padding: 8px 12px;
    background: linear-gradient(135deg, #F5F5F5 0%, #FAFAFA 100%);
    border-radius: 10px;
    border-left: 3px solid #F4B400;
    font-size: 12px;
  }

  .posted-by-label {
    color: #8E8068;
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .posted-by-name   { color: #0B3A66; font-weight: 700; font-size: 13px; }
  .posted-by-studentid { color: #8E8068; font-size: 11px; background: #F0E8D8; padding: 2px 6px; border-radius: 12px; }

  .item-description { font-size: 13px; color: #6B5E4A; line-height: 1.5; margin-bottom: 14px; }

  .item-meta {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #8E8068;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #F0E8D8;
  }

  .status-pill { padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 600; }
  .status-pill.pending          { background: #FEF3C7; color: #B45309; }
  .status-pill.claimed          { background: #DBEAFE; color: #1D4ED8; }
  .status-pill.verified         { background: #D1FAE5; color: #065F46; }
  .status-pill.ready_for_pickup { background: #EDE9FE; color: #6D28D9; }

  .item-actions { display: flex; gap: 6px; flex-wrap: wrap; }

  .owner-badge {
    background: #F4B400;
    color: #0B3A66;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 700;
    margin-left: 8px;
  }

  .claimed-badge {
    padding: 5px 12px;
    background: #E8DFD0;
    color: #8E8068;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
  }

  .btn-resolve {
    padding: 7px 14px;
    background: #2ECC71;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .btn-resolve:hover    { background: #27AE60; transform: translateY(-1px); }
  .btn-resolve:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-chat {
    padding: 7px 14px;
    background: #0084FF;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .btn-chat:hover { background: #0073E6; transform: translateY(-1px); }

  .btn-inquiries {
    padding: 7px 14px;
    background: #F4B400;
    color: #0B3A66;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .btn-inquiries:hover { background: #E5A800; transform: translateY(-1px); }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(11, 58, 102, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    backdrop-filter: blur(6px);
  }

  .dialog-modal {
    background: #FFFFFF;
    border-radius: 24px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(11, 58, 102, 0.15);
  }

  .dialog-header { padding: 28px 28px 0; position: relative; }

  .dialog-header h2 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #0B3A66;
    margin-bottom: 6px;
  }

  .dialog-header p { color: #8E8068; font-size: 14px; }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #F5E6C8;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5C4F3A;
    transition: all 0.2s ease;
  }

  .modal-close:hover { background: #E8D5B0; color: #0B3A66; }

  .mode-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 20px 28px;
    background: #FAF8F4;
    margin: 16px 0;
  }

  .mode-btn {
    padding: 12px;
    border: 2px solid #E8DFD0;
    background: #FFFFFF;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    color: #8E8068;
  }

  .mode-btn:hover { border-color: #C4A87A; }
  .mode-btn.active.lost  { background: #C0392B; color: #FFFFFF; border-color: #C0392B; }
  .mode-btn.active.found { background: #1F6B4F; color: #FFFFFF; border-color: #1F6B4F; }

  .dialog-modal form { padding: 0 28px 28px; }

  .dialog-modal input,
  .dialog-modal select,
  .dialog-modal textarea {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #E8DFD0;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    margin-bottom: 12px;
    background: #FAF8F4;
    transition: all 0.2s ease;
  }

  .dialog-modal input:focus,
  .dialog-modal select:focus,
  .dialog-modal textarea:focus {
    outline: none;
    border-color: #0B3A66;
    background: #FFFFFF;
  }

  .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .image-upload-area { margin-bottom: 16px; }

  .upload-zone {
    border: 2px dashed #D4C4A8;
    border-radius: 14px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .upload-zone:hover { border-color: #0B3A66; background: #FAF8F4; }
  .upload-zone p   { font-weight: 500; color: #5C4F3A; }
  .upload-zone span { font-size: 12px; color: #B8A88A; }

  .preview { position: relative; border-radius: 14px; overflow: hidden; }
  .preview img { width: 100%; height: 200px; object-fit: cover; }

  .preview button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #C0392B;
    color: #FFFFFF;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #0B3A66;
    color: #FFFFFF;
    border: none;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    margin-top: 8px;
  }

  .submit-btn:hover { background: #0F4C80; transform: translateY(-1px); }

  /* ── States ── */
  .loading-state { text-align: center; padding: 60px; }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #E8DFD0;
    border-top-color: #0B3A66;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .empty-state { text-align: center; padding: 80px 20px; }
  .empty-icon  { font-size: 56px; margin-bottom: 16px; }
  .empty-state h3 { font-weight: 700; color: #0B3A66; margin-bottom: 8px; }
  .empty-state p  { color: #8E8068; margin-bottom: 20px; }

  .report-btn-empty {
    margin-top: 20px;
    padding: 10px 24px;
    background: #0B3A66;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .report-btn-empty:hover { background: #0F4C80; transform: translateY(-2px); }

  /* ── Highlight animation ── */
  @keyframes highlightPulse {
    0%   { box-shadow: 0 0 0 0 rgba(244, 180, 0, 0.7); border-color: #F4B400; }
    70%  { box-shadow: 0 0 0 10px rgba(244, 180, 0, 0); border-color: #F4B400; }
    100% { box-shadow: 0 0 0 0 rgba(244, 180, 0, 0); border-color: #E8DFD0; }
  }

  .highlight-item {
    animation: highlightPulse 1s ease-in-out 3;
    background: #FFF9E6 !important;
    border-color: #F4B400 !important;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .header-container { flex-direction: column; gap: 12px; }
    .hero-section     { flex-direction: column; padding: 28px; text-align: center; }
    .hero-title       { font-size: 30px; }
    .hero-stats       { justify-content: center; }
    .items-grid       { grid-template-columns: 1fr; }
    .form-row-2       { grid-template-columns: 1fr; }
    .user-info        { display: none; }
    .user-profile     { padding: 6px; }

    .item-actions { flex-direction: column; width: 100%; }
    .item-actions button,
    .item-actions .claimed-badge { width: 100%; text-align: center; }
  }
`,ix=({registerChatHandler:e})=>{var ea;const[t,n]=E.useState([]),[r,o]=E.useState([]),[i,s]=E.useState(!0),[l,u]=E.useState(""),[c,d]=E.useState("all"),[f,x]=E.useState("all"),[k,v]=E.useState(!1),[g,y]=E.useState("lost"),[p,h]=E.useState(null),[m,S]=E.useState({total:0,lost:0,found:0}),[N,C]=E.useState(!1),[R,P]=E.useState(!1),[I,b]=E.useState(null),[$,D]=E.useState(null),[J,ee]=E.useState(!1),[Fe,oe]=E.useState(null),[he,_]=E.useState({name:"",description:"",category:"lost",itemCategory:"others",location:"",date:new Date().toISOString().split("T")[0],image:null}),[A,O]=E.useState(null),[B,W]=E.useState(!1),Xe=j=>j?String(j).replace(/ObjectId\("|"\)/g,"").trim():"",we=j=>!p||!p.id||!j||!j.userId?!1:Xe(p.id)===Xe(j.userId),at=dr.useCallback(async(j,U)=>{let ne=t.find(ke=>ke._id===j);if(!ne)try{const ke=localStorage.getItem("token"),Me=await L.get(`/api/items/${j}`,{headers:{Authorization:`Bearer ${ke}`}});if(Me.data.success)ne=Me.data.data;else return}catch{return}b(ne),D(null),C(!0)},[t]);E.useEffect(()=>{e&&e(at)},[e,at]);const ut=async()=>{try{const j=localStorage.getItem("token");if(!j)return;const U=await L.get("/api/users/profile",{headers:{Authorization:`Bearer ${j}`}});U.data.success&&h({...U.data.data,id:U.data.data.id||U.data.data._id})}catch(j){console.error("Error fetching user:",j)}},ct=async()=>{try{const j=localStorage.getItem("token"),U=await L.get("/api/items",{headers:{Authorization:`Bearer ${j}`}});U.data.success&&(n(U.data.data),S({total:U.data.data.length,lost:U.data.data.filter(ne=>ne.category==="lost").length,found:U.data.data.filter(ne=>ne.category==="found").length}))}catch(j){console.error("Error fetching items:",j)}finally{s(!1)}},Gl=dr.useCallback(()=>{let j=[...t];l&&(j=j.filter(U=>U.name.toLowerCase().includes(l.toLowerCase())||U.description.toLowerCase().includes(l.toLowerCase())||U.location.toLowerCase().includes(l.toLowerCase()))),c!=="all"&&(j=j.filter(U=>U.category===c)),f!=="all"&&(j=j.filter(U=>U.itemCategory===f)),o(j)},[t,l,c,f]);E.useEffect(()=>{ut(),ct()},[]),E.useEffect(()=>{Gl()},[Gl]),E.useEffect(()=>{if(Fe&&r.length>0){const j=document.getElementById(`item-${Fe}`);j&&(j.scrollIntoView({behavior:"smooth",block:"center"}),j.classList.add("highlight-item"),setTimeout(()=>j.classList.remove("highlight-item"),3e3)),oe(null)}},[r,Fe]);const Zl=j=>{b(j),D(null),C(!0)},Mf=j=>{b(j),P(!0)},Uf=j=>{P(!1);const U=t.find(ne=>{var ke;return ne._id===j.itemId||ne._id===((ke=j.item)==null?void 0:ke._id)});b(U),D(j),C(!0)},$f=async j=>{var ne,ke;const U=t.find(Me=>Me._id===j);if(!p||!p.id){alert("You must be logged in.");return}if(!U){alert("Item not found");return}if(!we(U)){alert("Only the item owner can mark this as resolved.");return}if(window.confirm("Mark this item as resolved?")){ee(!0);try{const Me=localStorage.getItem("token"),ta=await L.post(`/api/items/${j}/mark-claimed`,{claimerId:p.id},{headers:{Authorization:`Bearer ${Me}`}});ta.data.success?(alert("Item marked as resolved!"),ct(),C(!1)):alert(ta.data.message||"Failed")}catch(Me){alert("Error: "+(((ke=(ne=Me.response)==null?void 0:ne.data)==null?void 0:ke.message)||Me.message))}finally{ee(!1)}}},$n=j=>_({...he,[j.target.name]:j.target.value}),Hf=j=>{const U=j.target.files[0];if(U){const ne=new FileReader;ne.onloadend=()=>{O(ne.result),_({...he,image:ne.result})},ne.readAsDataURL(U)}},Vf=()=>{O(null),_({...he,image:null})},Wf=async j=>{var U,ne;j.preventDefault(),W(!0);try{const ke=localStorage.getItem("token"),Me=await L.post("/api/items",{...he,category:g},{headers:{Authorization:`Bearer ${ke}`}});Me.data.success?(alert("Item reported!"),v(!1),Qf(),ct()):alert(Me.data.message||"Failed")}catch(ke){alert("Error: "+(((ne=(U=ke.response)==null?void 0:U.data)==null?void 0:ne.message)||ke.message))}finally{W(!1)}},Qf=()=>{_({name:"",description:"",category:"lost",itemCategory:"others",location:"",date:new Date().toISOString().split("T")[0],image:null}),O(null),y("lost")};return i?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Du}),a.jsx("div",{className:"dashboard",children:a.jsxs("div",{className:"loading-state",children:[a.jsx("div",{className:"spinner"}),a.jsx("p",{children:"Loading dashboard..."})]})})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Du}),a.jsxs("div",{className:"dashboard",children:[a.jsx("main",{className:"dashboard-main",children:a.jsxs("div",{className:"main-container",children:[a.jsxs("div",{className:"hero-section",children:[a.jsxs("div",{className:"hero-content",children:[a.jsxs("h1",{className:"hero-title",children:["Welcome back, ",a.jsxs("span",{className:"text-accent",children:[((ea=p==null?void 0:p.name)==null?void 0:ea.split(" ")[0])||"User","!"]})]}),a.jsx("p",{className:"hero-description",children:"Track lost and found items, report new findings, and help reunite people with their belongings."}),a.jsx("button",{className:"hero-report-btn",onClick:()=>v(!0),children:"+ Report Lost or Found Item"})]}),a.jsxs("div",{className:"hero-stats",children:[a.jsxs("div",{className:"stat",children:[a.jsx("span",{className:"stat-value",children:m.total}),a.jsx("span",{className:"stat-label",children:"Total Items"})]}),a.jsxs("div",{className:"stat",children:[a.jsx("span",{className:"stat-value",children:m.lost}),a.jsx("span",{className:"stat-label",children:"Lost"})]}),a.jsxs("div",{className:"stat",children:[a.jsx("span",{className:"stat-value",children:m.found}),a.jsx("span",{className:"stat-label",children:"Found"})]})]})]}),a.jsxs("div",{className:"search-section",children:[a.jsx("div",{className:"search-bar",children:a.jsx("input",{type:"text",placeholder:"Search items...",className:"search-input",value:l,onChange:j=>u(j.target.value)})}),a.jsxs("div",{className:"filter-chips",children:[a.jsx("button",{className:`chip ${c==="all"?"active":""}`,onClick:()=>d("all"),children:"All Items"}),a.jsx("button",{className:`chip chip-lost  ${c==="lost"?"active":""}`,onClick:()=>d("lost"),children:"Lost Items"}),a.jsx("button",{className:`chip chip-found ${c==="found"?"active":""}`,onClick:()=>d("found"),children:"Found Items"}),a.jsx("div",{className:"chip",children:a.jsxs("select",{value:f,onChange:j=>x(j.target.value),children:[a.jsx("option",{value:"all",children:"All Types"}),a.jsx("option",{value:"electronics",children:"Electronics"}),a.jsx("option",{value:"clothing",children:"Clothing"}),a.jsx("option",{value:"documents",children:"Documents"}),a.jsx("option",{value:"accessories",children:"Accessories"}),a.jsx("option",{value:"others",children:"Others"})]})})]}),a.jsxs("div",{className:"results-info",children:["Showing ",r.length," of ",t.length," items"]})]}),a.jsx("div",{className:"items-grid",children:r.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-icon",children:"🔍"}),a.jsx("h3",{children:"No items found"}),a.jsx("p",{children:"Try adjusting your search or filter criteria"}),a.jsx("button",{className:"report-btn-empty",onClick:()=>v(!0),children:"+ Report an Item"})]}):r.map(j=>{const U=we(j);return a.jsxs("div",{id:`item-${j._id}`,className:"item-card",children:[a.jsxs("div",{className:`item-image ${j.category==="lost"?"bg-lost":"bg-found"}`,children:[j.image?a.jsx("img",{src:j.image,alt:j.name}):a.jsx("div",{className:"item-emoji",children:j.category==="lost"?"🔍":"📦"}),a.jsx("div",{className:`item-badge ${j.category}`,children:j.category==="lost"?"LOST":"FOUND"}),j.itemCategory&&a.jsx("div",{className:"item-category-tag",children:j.itemCategory})]}),a.jsxs("div",{className:"item-body",children:[a.jsx("h3",{className:"item-title",children:j.name}),a.jsxs("div",{className:"item-posted-by",children:[a.jsx("span",{className:"posted-by-label",children:"Posted by:"}),a.jsx("span",{className:"posted-by-name",children:j.userName||"Anonymous"}),j.userStudentId&&a.jsxs("span",{className:"posted-by-studentid",children:["(",j.userStudentId,")"]}),U&&a.jsx("span",{className:"owner-badge",children:"(Your Item)"})]}),a.jsx("p",{className:"item-description",children:j.description}),a.jsxs("div",{className:"item-meta",children:[a.jsxs("span",{children:["📍 ",j.location]}),a.jsxs("span",{children:["📅 ",new Date(j.date).toLocaleDateString()]})]}),a.jsxs("div",{className:"item-footer",children:[a.jsx("div",{className:`status-pill ${j.status}`,children:j.status==="claimed"?"Resolved":j.status}),a.jsxs("div",{className:"item-actions",children:[U&&j.status!=="claimed"&&a.jsx("button",{className:"btn-inquiries",onClick:()=>Mf(j),children:"View Messages"}),U&&j.status!=="claimed"&&a.jsx("button",{className:"btn-resolve",onClick:()=>$f(j._id),disabled:J,children:"Mark Resolved"}),!U&&j.category==="lost"&&j.status!=="claimed"&&a.jsx("button",{className:"btn-chat",onClick:()=>Zl(j),children:"I found this"}),!U&&j.category==="found"&&j.status!=="claimed"&&a.jsx("button",{className:"btn-chat",onClick:()=>Zl(j),children:"This is mine"}),j.status==="claimed"&&a.jsx("span",{className:"claimed-badge",children:"Resolved"})]})]})]})]},j._id)})})]})}),k&&a.jsx("div",{className:"modal-overlay",onClick:()=>v(!1),children:a.jsxs("div",{className:"dialog-modal",onClick:j=>j.stopPropagation(),children:[a.jsxs("div",{className:"dialog-header",children:[a.jsx("h2",{children:"Report an Item"}),a.jsx("p",{children:"Help someone find their lost item or report something you found"}),a.jsx("button",{className:"modal-close",onClick:()=>v(!1),children:"✕"})]}),a.jsxs("div",{className:"mode-toggle",children:[a.jsx("button",{className:`mode-btn ${g==="lost"?"active lost":""}`,onClick:()=>y("lost"),children:"Lost Item"}),a.jsx("button",{className:`mode-btn ${g==="found"?"active found":""}`,onClick:()=>y("found"),children:"Found Item"})]}),a.jsxs("form",{onSubmit:Wf,children:[a.jsx("input",{type:"text",name:"name",placeholder:"Item name*",value:he.name,onChange:$n,required:!0}),a.jsx("textarea",{name:"description",placeholder:"Description*",rows:"3",value:he.description,onChange:$n,required:!0}),a.jsxs("div",{className:"form-row-2",children:[a.jsxs("select",{name:"itemCategory",value:he.itemCategory,onChange:$n,children:[a.jsx("option",{value:"electronics",children:"Electronics"}),a.jsx("option",{value:"clothing",children:"Clothing"}),a.jsx("option",{value:"documents",children:"Documents"}),a.jsx("option",{value:"accessories",children:"Accessories"}),a.jsx("option",{value:"bag",children:"Bags"}),a.jsx("option",{value:"jewelry",children:"Jewelry"}),a.jsx("option",{value:"keys",children:"Keys"}),a.jsx("option",{value:"wallet",children:"Wallet/Purse"}),a.jsx("option",{value:"phone",children:"Phone"}),a.jsx("option",{value:"laptop",children:"Laptop"}),a.jsx("option",{value:"books",children:"Books"}),a.jsx("option",{value:"others",children:"Others"})]}),a.jsx("input",{type:"text",name:"location",placeholder:"Location*",value:he.location,onChange:$n,required:!0})]}),a.jsx("input",{type:"date",name:"date",value:he.date,onChange:$n,required:!0}),a.jsx("div",{className:"image-upload-area",children:A?a.jsxs("div",{className:"preview",children:[a.jsx("img",{src:A,alt:"Preview"}),a.jsx("button",{type:"button",onClick:Vf,children:"✕"})]}):a.jsxs("div",{className:"upload-zone",onClick:()=>document.getElementById("imageInput").click(),children:[a.jsx("p",{children:"Click to upload image"}),a.jsx("span",{children:"PNG, JPG up to 5MB"}),a.jsx("input",{id:"imageInput",type:"file",accept:"image/*",onChange:Hf,style:{display:"none"}})]})}),a.jsx("button",{type:"submit",className:"submit-btn",disabled:B,children:B?"Submitting...":`Submit ${g==="lost"?"Lost":"Found"} Item`})]})]})}),R&&I&&a.jsx(ox,{item:I,onSelectChat:Uf,onClose:()=>P(!1)}),a.jsx(nx,{isOpen:N,onClose:()=>{C(!1),D(null)},item:I,currentUser:p,onItemUpdate:ct,initialRoom:$})]})]})},Gi=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .profile-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
    padding: 40px 20px;
    font-family: 'Inter', sans-serif;
  }

  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(11, 58, 102, 0.1);
  }

  .profile-header {
    background: linear-gradient(135deg, #0B3A66 0%, #0F4C80 100%);
    padding: 40px;
    text-align: center;
    color: #FFFFFF;
  }

  .profile-avatar {
    width: 100px; height: 100px;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    font-size: 48px; font-weight: 700;
    color: #0B3A66;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .profile-header h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px; font-weight: 700;
    margin-bottom: 8px;
  }
  .profile-header p { font-size: 14px; opacity: 0.8; }

  .profile-content { padding: 32px; }

  .profile-info-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .info-group { border-bottom: 2px solid #F0E8D8; padding-bottom: 12px; }
  .info-group label {
    display: block;
    font-size: 12px; font-weight: 600;
    color: #8E8068;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 8px;
  }
  .info-value { font-size: 16px; font-weight: 500; color: #0B3A66; word-break: break-word; }

  .role-badge {
    display: inline-block;
    background: #F4B400; color: #0B3A66;
    padding: 4px 12px; border-radius: 20px;
    font-size: 12px; font-weight: 600;
  }

  .profile-stats { margin-bottom: 32px; }
  .profile-stats h3 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 18px; font-weight: 700;
    color: #0B3A66; margin-bottom: 16px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  .stat-card {
    background: linear-gradient(135deg, #FAF8F4 0%, #F5F0E8 100%);
    border-radius: 16px; padding: 20px;
    text-align: center;
    border: 1px solid #E8DFD0;
  }
  .stat-number {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 32px; font-weight: 800;
    color: #F4B400; margin-bottom: 8px;
  }
  .stat-label { font-size: 12px; color: #8E8068; font-weight: 500; }

  .profile-actions { display: flex; gap: 16px; justify-content: center; }

  .edit-btn, .logout-btn {
    padding: 12px 24px; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease; font-family: 'Inter', sans-serif;
  }
  .edit-btn { background: #0B3A66; color: #FFFFFF; }
  .edit-btn:hover { background: #0F4C80; transform: translateY(-2px); }
  .logout-btn { background: #C0392B; color: #FFFFFF; }
  .logout-btn:hover { background: #A93226; transform: translateY(-2px); }

  .profile-edit { display: flex; flex-direction: column; gap: 20px; }

  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group label { font-size: 14px; font-weight: 600; color: #0B3A66; }
  .form-group input {
    padding: 12px 16px;
    border: 2px solid #E8DFD0; border-radius: 12px;
    font-size: 14px; font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
  }
  .form-group input:focus {
    outline: none; border-color: #0B3A66;
    box-shadow: 0 0 0 3px rgba(11, 58, 102, 0.1);
  }
  .form-group small { font-size: 11px; color: #8E8068; }

  .update-status {
    padding: 12px; border-radius: 10px;
    font-size: 13px; font-weight: 500; text-align: center;
  }
  .update-status.updating { background: #E8F4FD; color: #0B3A66; }
  .update-status.success { background: #D1FAE5; color: #065F46; }
  .update-status.error { background: #FEE2E2; color: #991B1B; }

  .form-actions { display: flex; gap: 16px; margin-top: 8px; }
  .save-btn, .cancel-btn {
    flex: 1; padding: 12px 24px; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease; font-family: 'Inter', sans-serif;
  }
  .save-btn { background: #2ECC71; color: #FFFFFF; }
  .save-btn:hover:not(:disabled) { background: #27AE60; transform: translateY(-2px); }
  .save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .cancel-btn { background: #E8DFD0; color: #5C4F3A; }
  .cancel-btn:hover { background: #D4C4A8; transform: translateY(-2px); }

  .profile-loading {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
  }
  .profile-loading .spinner {
    width: 48px; height: 48px;
    border: 3px solid #E8DFD0; border-top-color: #0B3A66;
    border-radius: 50%; animation: spin 0.8s linear infinite;
    margin-bottom: 16px;
  }
  .profile-loading p { color: #8E8068; }

  @keyframes spin { to { transform: rotate(360deg); } }

  .profile-error {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
    text-align: center;
  }
  .error-icon { font-size: 64px; margin-bottom: 16px; }
  .profile-error p { color: #C0392B; margin-bottom: 20px; font-size: 16px; }
  .profile-error button {
    padding: 12px 24px; background: #0B3A66; color: #FFFFFF;
    border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s ease;
  }
  .profile-error button:hover { background: #0F4C80; transform: translateY(-2px); }

  @media (max-width: 768px) {
    .profile-container { margin: 0 16px; }
    .profile-header { padding: 30px 20px; }
    .profile-content { padding: 24px; }
    .profile-info-section { grid-template-columns: 1fr; gap: 16px; }
    .stats-grid { grid-template-columns: 1fr; }
    .profile-actions { flex-direction: column; }
    .form-actions { flex-direction: column; }
  }
`,sx=()=>{var g;const[e,t]=E.useState(null),[n,r]=E.useState(!0),[o,i]=E.useState(""),[s,l]=E.useState(!1),[u,c]=E.useState({name:"",studentId:"",contactNumber:""}),[d,f]=E.useState("");E.useEffect(()=>{x()},[]);const x=async()=>{var p,h;const y=localStorage.getItem("token");if(!y){i("Please login first"),r(!1);return}try{const m=await L.get("/api/users/profile",{headers:{Authorization:`Bearer ${y}`}});m.data.success?(t(m.data.data),c({name:m.data.data.name||"",studentId:m.data.data.studentId||"",contactNumber:m.data.data.contactNumber||""})):i(m.data.message)}catch(m){i(((h=(p=m.response)==null?void 0:p.data)==null?void 0:h.message)||"Failed to load profile")}finally{r(!1)}},k=y=>{c({...u,[y.target.name]:y.target.value})},v=async y=>{y.preventDefault(),f("updating");try{const p=localStorage.getItem("token"),h=await L.put("/api/users/profile",u,{headers:{Authorization:`Bearer ${p}`}});h.data.success?(t(h.data.data),l(!1),f("success"),setTimeout(()=>f(""),3e3)):(f("error"),setTimeout(()=>f(""),3e3))}catch{f("error"),setTimeout(()=>f(""),3e3)}};return n?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Gi}),a.jsxs("div",{className:"profile-loading",children:[a.jsx("div",{className:"spinner"}),a.jsx("p",{children:"Loading profile..."})]})]}):o?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Gi}),a.jsxs("div",{className:"profile-error",children:[a.jsx("div",{className:"error-icon",children:"⚠️"}),a.jsx("p",{children:o}),a.jsx("button",{onClick:()=>window.location.href="/login",children:"Go to Login"})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Gi}),a.jsx("div",{className:"profile-page",children:a.jsxs("div",{className:"profile-container",children:[a.jsxs("div",{className:"profile-header",children:[a.jsx("div",{className:"profile-avatar",children:(g=e==null?void 0:e.name)==null?void 0:g.charAt(0).toUpperCase()}),a.jsx("h1",{children:"My Profile"}),a.jsx("p",{children:"Manage your account information"})]}),a.jsx("div",{className:"profile-content",children:s?a.jsxs("form",{className:"profile-edit",onSubmit:v,children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Full Name"}),a.jsx("input",{type:"text",name:"name",value:u.name,onChange:k,placeholder:"Enter your full name",required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Student ID"}),a.jsx("input",{type:"text",name:"studentId",value:u.studentId,onChange:k,placeholder:"Enter your student ID"}),a.jsx("small",{children:"Format: XX-XXXXX-XXX"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Contact Number"}),a.jsx("input",{type:"tel",name:"contactNumber",value:u.contactNumber,onChange:k,placeholder:"Enter your contact number"}),a.jsx("small",{children:"Philippine mobile number (e.g., 09123456789)"})]}),d&&a.jsxs("div",{className:`update-status ${d}`,children:[d==="updating"&&"Updating profile...",d==="success"&&"Profile updated successfully!",d==="error"&&"Failed to update profile. Please try again."]}),a.jsxs("div",{className:"form-actions",children:[a.jsx("button",{type:"submit",className:"save-btn",disabled:d==="updating",children:d==="updating"?"Saving...":"💾 Save Changes"}),a.jsx("button",{type:"button",className:"cancel-btn",onClick:()=>{l(!1),c({name:(e==null?void 0:e.name)||"",studentId:(e==null?void 0:e.studentId)||"",contactNumber:(e==null?void 0:e.contactNumber)||""})},children:"Cancel"})]})]}):a.jsxs("div",{className:"profile-view",children:[a.jsxs("div",{className:"profile-info-section",children:[[{label:"Full Name",value:(e==null?void 0:e.name)||"Not set"},{label:"Email Address",value:e==null?void 0:e.email},{label:"Student ID",value:(e==null?void 0:e.studentId)||"Not set"},{label:"Contact Number",value:(e==null?void 0:e.contactNumber)||"Not set"}].map(({label:y,value:p})=>a.jsxs("div",{className:"info-group",children:[a.jsx("label",{children:y}),a.jsx("div",{className:"info-value",children:p})]},y)),a.jsxs("div",{className:"info-group",children:[a.jsx("label",{children:"Role"}),a.jsx("div",{className:"info-value",children:a.jsx("span",{className:"role-badge",children:(e==null?void 0:e.role)==="admin"?"Administrator":"User"})})]})]}),(e==null?void 0:e.stats)&&a.jsxs("div",{className:"profile-stats",children:[a.jsx("h3",{children:"Activity Statistics"}),a.jsxs("div",{className:"stats-grid",children:[a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:e.stats.itemsReported||0}),a.jsx("div",{className:"stat-label",children:"Items Reported"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:e.stats.itemsClaimed||0}),a.jsx("div",{className:"stat-label",children:"Items Claimed"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:e.stats.unreadNotifications||0}),a.jsx("div",{className:"stat-label",children:"Unread Notifications"})]})]})]}),a.jsx("div",{className:"profile-actions",children:a.jsx("button",{className:"edit-btn",onClick:()=>l(!0),children:"✏️ Edit Profile"})})]})})]})})]})},lx=`
  .notification-container { position: relative; display: inline-block; }

  .notification-bell {
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    position: relative;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  .notification-bell:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.05); }

  .bell-icon { display: inline-block; }

  .notification-badge {
    position: absolute;
    top: 0; right: 0;
    background: #F4B400;
    color: #0B3A66;
    font-size: 11px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 50%;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  .notification-dropdown {
    position: absolute;
    top: 45px; right: 0;
    width: 380px;
    max-height: 500px;
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .notification-header {
    padding: 16px 20px;
    background: #0B3A66;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .notification-header h3 { margin: 0; font-size: 16px; font-weight: 600; }

  .mark-all-read {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #FFFFFF;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .mark-all-read:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.5); }

  .notification-list { max-height: 450px; overflow-y: auto; }

  .notification-item {
    padding: 16px 20px;
    display: flex;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #F0E8D8;
    position: relative;
  }
  .notification-item:hover { background: #FAF8F4; }
  .notification-item.unread { background: #FFF9E6; }

  .notification-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .notification-content { flex: 1; }
  .notification-title { font-weight: 600; color: #0B3A66; margin-bottom: 4px; font-size: 14px; }
  .notification-message { font-size: 13px; color: #6B5E4A; margin-bottom: 6px; line-height: 1.4; }
  .notification-time { font-size: 11px; color: #B8A88A; }

  .unread-dot {
    width: 8px; height: 8px;
    background: #F4B400;
    border-radius: 50%;
    position: absolute;
    top: 20px; right: 20px;
  }

  .no-notifications { text-align: center; padding: 60px 20px; color: #B8A88A; }
  .no-notifications p { margin: 0; font-size: 14px; }

  @media (max-width: 768px) {
    .notification-dropdown { width: 320px; right: -20px; }
  }
`,ax=({onOpenChat:e})=>{const[t,n]=E.useState([]),[r,o]=E.useState(0),[i,s]=E.useState(!1),l=E.useRef(null);E.useEffect(()=>{u();const g=setInterval(u,1e4);return()=>clearInterval(g)},[]),E.useEffect(()=>{const g=y=>{l.current&&!l.current.contains(y.target)&&s(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[]);const u=async()=>{try{const g=localStorage.getItem("token"),y=await L.get("/api/notifications",{headers:{Authorization:`Bearer ${g}`}});y.data.success&&(n(y.data.data),o(y.data.unreadCount))}catch(g){console.error("Error fetching notifications:",g)}},c=async g=>{try{const y=localStorage.getItem("token");await L.put(`/api/notifications/${g}/read`,{},{headers:{Authorization:`Bearer ${y}`}}),n(t.map(p=>p._id===g?{...p,isRead:!0}:p)),o(p=>Math.max(0,p-1))}catch(y){console.error("Error marking notification as read:",y)}},d=async()=>{try{const g=localStorage.getItem("token");await L.put("/api/notifications/read-all",{},{headers:{Authorization:`Bearer ${g}`}}),n(t.map(y=>({...y,isRead:!0}))),o(0)}catch(g){console.error("Error marking all as read:",g)}},f=async g=>{if(await c(g._id),s(!1),g.type==="new_message")e&&g.relatedItemId&&e(g.relatedItemId,g.senderId);else if(g.relatedItemId){const y=document.getElementById(`item-${g.relatedItemId}`);y&&(y.scrollIntoView({behavior:"smooth",block:"center"}),y.classList.add("highlight-item"),setTimeout(()=>y.classList.remove("highlight-item"),3e3))}},x=g=>{switch(g){case"potential_match":return"🔍";case"item_claimed":return"✅";case"new_message":return"💬";default:return"📢"}},k=g=>{switch(g){case"potential_match":return"#F4B400";case"item_claimed":return"#2ECC71";case"new_message":return"#3498DB";default:return"#0B3A66"}},v=g=>{const y=new Date,p=new Date(g),h=y-p,m=Math.floor(h/6e4),S=Math.floor(h/36e5),N=Math.floor(h/864e5);return m<1?"Just now":m<60?`${m} minute${m>1?"s":""} ago`:S<24?`${S} hour${S>1?"s":""} ago`:N<7?`${N} day${N>1?"s":""} ago`:p.toLocaleDateString()};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:lx}),a.jsxs("div",{className:"notification-container",ref:l,children:[a.jsxs("button",{className:"notification-bell",onClick:()=>s(!i),children:[a.jsx("span",{className:"bell-icon",children:"🔔"}),r>0&&a.jsx("span",{className:"notification-badge",children:r>99?"99+":r})]}),i&&a.jsxs("div",{className:"notification-dropdown",children:[a.jsxs("div",{className:"notification-header",children:[a.jsx("h3",{children:"Notifications"}),r>0&&a.jsx("button",{className:"mark-all-read",onClick:d,children:"Mark all as read"})]}),a.jsx("div",{className:"notification-list",children:t.length===0?a.jsx("div",{className:"no-notifications",children:a.jsx("p",{children:"No notifications yet"})}):t.map(g=>a.jsxs("div",{className:`notification-item ${g.isRead?"":"unread"}`,onClick:()=>f(g),children:[a.jsx("div",{className:"notification-icon",style:{backgroundColor:k(g.type)},children:x(g.type)}),a.jsxs("div",{className:"notification-content",children:[a.jsx("div",{className:"notification-title",children:g.title}),a.jsx("div",{className:"notification-message",children:g.message}),a.jsx("div",{className:"notification-time",children:v(g.createdAt)})]}),!g.isRead&&a.jsx("div",{className:"unread-dot"})]},g._id))})]})]})]})},ux=`
  /* Messages Dropdown Styles */
  .messages-dropdown-container {
    position: relative;
    display: inline-block;
  }

  .messages-btn {
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    position: relative;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    color: #FFFFFF;
  }

  .messages-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .messages-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #F4B400;
    color: #0B3A66;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 50%;
    min-width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 1s infinite;
  }

  .messages-dropdown {
    position: absolute;
    top: 45px;
    right: 0;
    width: 380px;
    max-height: 500px;
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .messages-header {
    padding: 16px 20px;
    background: #0B3A66;
    color: #FFFFFF;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .messages-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .no-messages-text {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
    display: block;
  }

  .messages-list {
    max-height: 450px;
    overflow-y: auto;
  }

  .message-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #F0E8D8;
    position: relative;
  }

  .message-item:hover {
    background: #FAF8F4;
    transform: translateX(2px);
  }

  .message-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B3A66;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .message-content {
    flex: 1;
    min-width: 0;
  }

  .message-sender-name {
    font-weight: 600;
    color: #0B3A66;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .message-preview {
    font-size: 12px;
    color: #8E8068;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .message-item-time {
    font-size: 10px;
    color: #B8A88A;
    margin-top: 4px;
  }

  .message-item-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .item-name-badge {
    font-size: 10px;
    background: #E8DFD0;
    padding: 2px 8px;
    border-radius: 12px;
    color: #5C4F3A;
    white-space: nowrap;
  }

  .no-messages {
    text-align: center;
    padding: 40px 20px;
    color: #B8A88A;
  }

  .no-messages p {
    margin: 0;
    font-size: 14px;
  }

  .no-messages-sub {
    font-size: 12px;
    margin-top: 8px;
    opacity: 0.7;
  }

  /* Scrollbar */
  .messages-list::-webkit-scrollbar {
    width: 6px;
  }

  .messages-list::-webkit-scrollbar-track {
    background: #F0F2F5;
  }

  .messages-list::-webkit-scrollbar-thumb {
    background: #BCC0C4;
    border-radius: 3px;
  }

  .messages-list::-webkit-scrollbar-thumb:hover {
    background: #8F959E;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .messages-dropdown {
      width: 320px;
      right: -60px;
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      font-size: 14px;
    }

    .message-sender-name {
      font-size: 13px;
    }
  }
`,Bu=({children:e,onOpenChatFromNotification:t})=>{var N;const n=hi(),r=pi(),{user:o,logout:i}=Br(),[s,l]=E.useState([]),[u,c]=E.useState(!1),[d,f]=E.useState(0),[x,k]=E.useState(!1),v=E.useRef(null);E.useEffect(()=>{if(o){g();const C=setInterval(g,15e3);return()=>clearInterval(C)}},[o]),E.useEffect(()=>{const C=R=>{v.current&&!v.current.contains(R.target)&&c(!1)};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[]);const g=async()=>{if(!x){k(!0);try{const C=localStorage.getItem("token"),R=await L.get("/api/chat/rooms",{headers:{Authorization:`Bearer ${C}`}});if(R.data.success){l(R.data.data);let P=0;for(const I of R.data.data){const b=await L.get(`/api/chat/messages/${I._id}`,{headers:{Authorization:`Bearer ${C}`}});if(b.data.success){const $=b.data.data.filter(D=>!D.read&&D.senderId!==(o==null?void 0:o.id)).length;P+=$}}f(P)}}catch(C){console.error("Error fetching chat rooms:",C)}finally{k(!1)}}},y=(C,R)=>{c(!1),t&&t(C,R)},p=C=>C?C.charAt(0).toUpperCase():"U",h=()=>{i(),n("/login")},m=C=>r.pathname===C,S=C=>{if(!C)return"";const R=new Date,P=new Date(C),I=R-P,b=Math.floor(I/6e4),$=Math.floor(I/36e5),D=Math.floor(I/864e5);return b<1?"Just now":b<60?`${b}m ago`:$<24?`${$}h ago`:D<7?`${D}d ago`:P.toLocaleDateString()};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:ux}),a.jsxs("div",{className:"main-layout",children:[a.jsx("header",{className:"main-header",children:a.jsxs("div",{className:"header-container",children:[a.jsx("div",{className:"logo-container",onClick:()=>n("/dashboard"),children:a.jsxs("span",{className:"logo",children:["Lost",a.jsx("span",{children:"&"}),"Found"]})}),a.jsxs("div",{className:"header-nav",children:[a.jsx("button",{className:`nav-link ${m("/dashboard")?"active":""}`,onClick:()=>n("/dashboard"),children:"Dashboard"}),(o==null?void 0:o.role)==="admin"&&a.jsx("button",{className:`nav-link ${m("/admin")?"active":""}`,onClick:()=>n("/admin"),children:"Admin"})]}),a.jsxs("div",{className:"header-right",children:[a.jsxs("div",{className:"messages-dropdown-container",ref:v,children:[a.jsxs("button",{className:"messages-btn",onClick:()=>{c(!u),u||g()},children:["💬",d>0&&a.jsx("span",{className:"messages-badge",children:d>99?"99+":d})]}),u&&a.jsxs("div",{className:"messages-dropdown",children:[a.jsx("div",{className:"messages-header",children:a.jsx("h3",{children:"Messages"})}),a.jsx("div",{className:"messages-list",children:s.length===0?a.jsxs("div",{className:"no-messages",children:[a.jsx("p",{children:"No messages yet"}),a.jsx("p",{className:"no-messages-sub",children:'Start a conversation by clicking "Chat" on any item'})]}):s.map(C=>{var R,P,I,b;return a.jsxs("div",{className:"message-item",onClick:()=>{var $;return y(C.itemId,($=C.otherUser)==null?void 0:$.id)},children:[a.jsx("div",{className:"message-avatar",children:((P=(R=C.otherUser)==null?void 0:R.name)==null?void 0:P.charAt(0).toUpperCase())||"U"}),a.jsxs("div",{className:"message-content",children:[a.jsx("div",{className:"message-sender-name",children:((I=C.otherUser)==null?void 0:I.name)||"User"}),a.jsx("div",{className:"message-preview",children:C.lastMessage||"No messages yet"}),a.jsx("div",{className:"message-item-time",children:S(C.lastMessageTime)})]}),a.jsx("div",{className:"message-item-badge",children:a.jsx("span",{className:"item-name-badge",children:(b=C.item)==null?void 0:b.name})})]},C._id)})})]})]}),a.jsx(ax,{onOpenChat:t}),a.jsxs("div",{className:"user-profile",onClick:()=>n("/profile"),style:{cursor:"pointer"},children:[a.jsx("div",{className:"user-avatar",children:p(o==null?void 0:o.name)}),a.jsxs("div",{className:"user-info",children:[a.jsx("div",{className:"user-name",children:((N=o==null?void 0:o.name)==null?void 0:N.split(" ")[0])||"User"}),a.jsx("div",{className:"user-role",children:(o==null?void 0:o.role)==="admin"?"Admin":"User"})]})]}),a.jsx("button",{className:"logout-btn",onClick:h,children:"Logout"})]})]})}),a.jsx("main",{className:"main-content",children:e})]})]})},cx=`
  .loading-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,Df=()=>a.jsxs(a.Fragment,{children:[a.jsx("style",{children:cx}),a.jsx("div",{className:"loading-screen",children:a.jsx("div",{className:"spinner"})})]}),Mu=({children:e,adminOnly:t=!1})=>{const{user:n,loading:r}=Br();return r?a.jsx(Df,{}):n?t&&n.role!=="admin"?a.jsx(Pr,{to:"/dashboard",replace:!0}):e:a.jsx(Pr,{to:"/login",replace:!0})},Uu=({children:e})=>{const{user:t,loading:n}=Br();return n?a.jsx(Df,{}):t?a.jsx(Pr,{to:"/dashboard",replace:!0}):e};function dx(){const[e,t]=E.useState(null),n=E.useCallback(r=>{t(()=>r)},[]);return a.jsx(mg,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:a.jsxs(fg,{children:[a.jsx(Vt,{path:"/",element:a.jsx(Pr,{to:"/login",replace:!0})}),a.jsx(Vt,{path:"/login",element:a.jsx(Uu,{children:a.jsx(yg,{})})}),a.jsx(Vt,{path:"/register",element:a.jsx(Uu,{children:a.jsx(xg,{})})}),a.jsx(Vt,{path:"/dashboard",element:a.jsx(Mu,{children:a.jsx(Bu,{onOpenChatFromNotification:e,children:a.jsx(ix,{registerChatHandler:n})})})}),a.jsx(Vt,{path:"/profile",element:a.jsx(Mu,{children:a.jsx(Bu,{children:a.jsx(sx,{})})})}),a.jsx(Vt,{path:"*",element:a.jsx(Pr,{to:"/dashboard",replace:!0})})]})})}const fx=`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`,Bf=document.createElement("style");Bf.textContent=fx;document.head.appendChild(Bf);const px=Zi.createRoot(document.getElementById("root"));px.render(a.jsx(dr.StrictMode,{children:a.jsx(gg,{children:a.jsx(dx,{})})}));
