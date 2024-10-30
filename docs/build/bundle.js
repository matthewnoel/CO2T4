var app=function(){"use strict";"undefined"!=typeof window&&(window.__svelte||={v:new Set}).v.add("5");const e=Symbol();var n=Array.isArray,t=Array.from,r=Object.defineProperty,l=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyDescriptors,i=Object.prototype,a=Array.prototype,u=Object.getPrototypeOf;function s(e){return e()}function f(e){for(var n=0;n<e.length;n++)e[n]()}const c=32,v=128,d=256,p=512,h=1024,g=2048,m=4096,y=8192,b=32768,_=1<<19,w=Symbol("$state");function x(e){return e===this.v}function k(e){return{f:0,v:e,reactions:null,equals:x,version:0}}function S(e){return function(e){null!==te&&2&te.f&&(null===ie?ie=[e]:ie.push(e));return e}(k(e))}function E(e,n){return null!==te&&pe()&&18&te.f&&(null===ie||!ie.includes(e))&&function(){throw new Error("state_unsafe_mutation")}(),function(e,n){e.equals(n)||(e.v=n,e.version=de(),T(e,h),pe()&&null!==le&&le.f&p&&!(le.f&c)&&(null!==ae&&ae.includes(e)?(Oe(le,h),ke(le)):null===se?function(e){se=e}([e]):se.push(e)));return n}(e,n)}function T(e,n){var t=e.reactions;if(null!==t)for(var r=pe(),l=t.length,o=0;o<l;o++){var i=t[o],a=i.f;a&h||(r||i!==le)&&(Oe(i,n),640&a&&(2&a?T(i,g):ke(i)))}}function O(e){var n=1026;null===le?n|=v:le.f|=_;const t={children:null,ctx:ve,deps:null,equals:x,f:n,fn:e,reactions:null,v:null,version:0,parent:le};if(null!==te&&2&te.f){var r=te;(r.children??=[]).push(t)}return t}function P(e){var n=e.children;if(null!==n){e.children=null;for(var t=0;t<n.length;t+=1){var r=n[t];2&r.f?q(r):W(r)}}}function D(e){var n,t=le;oe(e.parent);try{P(e),n=ge(e)}finally{oe(t)}return n}function $(e){var n=D(e);Oe(e,(ce||e.f&v)&&null!==e.deps?g:p),e.equals(n)||(e.v=n,e.version=de())}function q(e){P(e),ye(e,0),Oe(e,y),e.v=e.children=e.deps=e.ctx=e.reactions=null}function C(e){null===le&&null===te&&function(){throw new Error("effect_orphan")}(),null!==te&&te.f&v&&function(){throw new Error("effect_in_unowned_derived")}(),X&&function(){throw new Error("effect_in_teardown")}()}function N(e,n,t,r=!0){var l=!!(64&e),o=le,i={ctx:ve,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|h,first:null,fn:n,last:null,next:null,parent:l?null:o,prev:null,teardown:null,transitions:null,version:0};if(t){var a=Q;try{Y(!0),be(i),i.f|=16384}catch(e){throw W(i),e}finally{Y(a)}}else null!==n&&ke(i);if(!(t&&null===i.deps&&null===i.first&&null===i.nodes_start&&null===i.teardown&&!(i.f&_))&&!l&&r&&(null!==o&&function(e,n){var t=n.last;null===t?n.last=n.first=e:(t.next=e,e.prev=t,n.last=e)}(i,o),null!==te&&2&te.f)){var u=te;(u.children??=[]).push(i)}return i}function j(e){if(C(),!(null!==le&&!!(le.f&c)&&null!==ve&&!ve.m))return B(e);var n=ve;(n.e??=[]).push({fn:e,effect:le,reaction:te})}function B(e){return N(4,e,!1)}function A(e){return N(8,e,!0)}function I(e){return M(e)}function M(e,n=0){return N(24|n,e,!0)}function R(e,n=!0){return N(40,e,!0,n)}function z(e){var n=e.teardown;if(null!==n){const e=X,t=te;Z(!0),re(null);try{n.call(null)}finally{Z(e),re(t)}}}function L(e){var n=e.deriveds;if(null!==n){e.deriveds=null;for(var t=0;t<n.length;t+=1)q(n[t])}}function H(e,n=!1){var t=e.first;for(e.first=e.last=null;null!==t;){var r=t.next;W(t,n),t=r}}function W(e,n=!0){var t=!1;if((n||262144&e.f)&&null!==e.nodes_start){for(var r=e.nodes_start,l=e.nodes_end;null!==r;){var o=r===l?null:Re(r);r.remove(),r=o}t=!0}L(e),H(e,n&&!t),ye(e,0),Oe(e,y);var i=e.transitions;if(null!==i)for(const e of i)e.stop();z(e);var a=e.parent;null!==a&&null!==a.first&&G(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.parent=e.fn=e.nodes_start=e.nodes_end=null}function G(e){var n=e.parent,t=e.prev,r=e.next;null!==t&&(t.next=r),null!==r&&(r.prev=t),null!==n&&(n.first===e&&(n.first=r),n.last===e&&(n.last=t))}function K(e,n){var t=[];V(e,t,!0),function(e,n){var t=e.length;if(t>0){var r=()=>--t||n();for(var l of e)l.out(r)}else n()}(t,(()=>{W(e),n&&n()}))}function V(e,n,t){if(!(e.f&m)){if(e.f^=m,null!==e.transitions)for(const r of e.transitions)(r.is_global||t)&&n.push(r);for(var r=e.first;null!==r;){var l=r.next;V(r,n,!!(!!(r.f&b)||!!(r.f&c))&&t),r=l}}}function F(e){U(e,!0)}function U(e,n){if(e.f&m){e.f^=m,he(e)&&be(e);for(var t=e.first;null!==t;){var r=t.next;U(t,!!(!!(t.f&b)||!!(t.f&c))&&n),t=r}if(null!==e.transitions)for(const t of e.transitions)(t.is_global||n)&&t.in()}}let J=!1,Q=!1,X=!1;function Y(e){Q=e}function Z(e){X=e}let ee=[],ne=0,te=null;function re(e){te=e}let le=null;function oe(e){le=e}let ie=null;let ae=null,ue=0,se=null;let fe=0,ce=!1,ve=null;function de(){return++fe}function pe(){return null!==ve&&null===ve.l}function he(e){var n=e.f;if(n&h)return!0;if(n&g){var t=e.deps,r=!!(n&v);if(null!==t){var l;if(n&d){for(l=0;l<t.length;l++)(t[l].reactions??=[]).push(e);e.f^=d}for(l=0;l<t.length;l++){var o=t[l];if(he(o)&&$(o),!r||null===le||ce||o?.reactions?.includes(e)||(o.reactions??=[]).push(e),o.version>e.version)return!0}}r||Oe(e,p)}return!1}function ge(e){var n=ae,t=ue,r=se,l=te,o=ce,i=ie,a=ve,u=e.f;ae=null,ue=0,se=null,te=96&u?null:e,ce=!Q&&!!(u&v),ie=null,ve=e.ctx;try{var s=(0,e.fn)(),f=e.deps;if(null!==ae){var c;if(ye(e,ue),null!==f&&ue>0)for(f.length=ue+ae.length,c=0;c<ae.length;c++)f[ue+c]=ae[c];else e.deps=f=ae;if(!ce)for(c=ue;c<f.length;c++)(f[c].reactions??=[]).push(e)}else null!==f&&ue<f.length&&(ye(e,ue),f.length=ue);return s}finally{ae=n,ue=t,se=r,te=l,ce=o,ie=i,ve=a}}function me(e,n){let t=n.reactions;if(null!==t){var r=t.indexOf(e);if(-1!==r){var l=t.length-1;0===l?t=n.reactions=null:(t[r]=t[l],t.pop())}}null===t&&2&n.f&&(null===ae||!ae.includes(n))&&(Oe(n,g),384&n.f||(n.f^=d),ye(n,0))}function ye(e,n){var t=e.deps;if(null!==t)for(var r=n;r<t.length;r++)me(e,t[r])}function be(e){var n=e.f;if(!(n&y)){Oe(e,p);var t=le;le=e;try{L(e),16&n?function(e){for(var n=e.first;null!==n;){var t=n.next;n.f&c||W(n),n=t}}(e):H(e),z(e);var r=ge(e);e.teardown="function"==typeof r?r:null,e.version=fe}catch(e){!function(e){throw e}(e)}finally{le=t}}}function _e(){ne>1e3&&(ne=0,function(){throw new Error("effect_update_depth_exceeded")}()),ne++}function we(e){var n=e.length;if(0!==n)for(var t=0;t<n;t++){var r=e[t];12288&r.f||!he(r)||(be(r),null===r.deps&&null===r.first&&null===r.nodes_start&&(null===r.teardown?G(r):r.fn=null))}}function xe(){if(J=!1,ne>1001)return;const e=ee;ee=[],function(e){var n=e.length;if(0!==n){_e();var t=Q;Q=!0;try{for(var r=0;r<n;r++){var l=e[r];l.f&p||(l.f^=p);var o=[];Se(l,o),we(o)}}finally{Q=t}}}(e),J||(ne=0)}function ke(e){J||(J=!0,queueMicrotask(xe));for(var n=e;null!==n.parent;){var t=(n=n.parent).f;if(96&t){if(!(t&p))return;n.f^=p}}ee.push(n)}function Se(e,n){var t=e.first,r=[];e:for(;null!==t;){var l=t.f,o=!!(l&c);if(!(o&&!!(l&p)||l&m))if(8&l){o?t.f^=p:he(t)&&be(t);var i=t.first;if(null!==i){t=i;continue}}else 4&l&&r.push(t);var a=t.next;if(null===a){let n=t.parent;for(;null!==n;){if(e===n)break e;var u=n.next;if(null!==u){t=u;continue e}n=n.parent}}t=a}for(var s=0;s<r.length;s++)i=r[s],n.push(i),Se(i,n)}function Ee(e){var n=e.f,t=!!(2&n);if(t&&n&y){var r=D(e);return q(e),r}if(null!==te){null!==ie&&ie.includes(e)&&function(){throw new Error("state_unsafe_local_read")}();var l=te.deps;null===ae&&null!==l&&l[ue]===e?ue++:null===ae?ae=[e]:ae.push(e),null!==se&&null!==le&&le.f&p&&!(le.f&c)&&se.includes(e)&&(Oe(le,h),ke(le))}else if(t&&null===e.deps){var o=e,i=o.parent;null===i||i.deriveds?.includes(o)||(i.deriveds??=[]).push(o)}return t&&he(o=e)&&$(o),e.v}const Te=-3585;function Oe(e,n){e.f=e.f&Te|n}function Pe(e,n=1){var t=+Ee(e);return E(e,t+n),t}function De(e,n=!1,t){ve={p:ve,c:null,e:null,m:!1,s:e,x:null,l:null},n||(ve.l={s:null,u:null,r1:[],r2:k(!1)})}function $e(e){const n=ve;if(null!==n){const e=n.e;if(null!==e){var t=le,r=te;n.e=null;try{for(var l=0;l<e.length;l++){var o=e[l];oe(o.effect),re(o.reaction),B(o.fn)}}finally{oe(t),re(r)}}ve=n.p,n.m=!0}return{}}function qe(e,n=new Set){if(!("object"!=typeof e||null===e||e instanceof EventTarget||n.has(e))){n.add(e),e instanceof Date&&e.getTime();for(let t in e)try{qe(e[t],n)}catch(e){}const t=u(e);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const n=o(t);for(let t in n){const r=n[t].get;if(r)try{r.call(e)}catch(e){}}}}}function Ce(t,r=null,o){if("object"!=typeof t||null===t||w in t)return t;const s=u(t);if(s!==i&&s!==a)return t;var f,c=new Map,v=n(t),d=k(0);return v&&c.set("length",k(t.length)),new Proxy(t,{defineProperty(e,n,t){"value"in t&&!1!==t.configurable&&!1!==t.enumerable&&!1!==t.writable||function(){throw new Error("state_descriptors_fixed")}();var r=c.get(n);return void 0===r?(r=k(t.value),c.set(n,r)):E(r,Ce(t.value,f)),!0},deleteProperty(n,t){var r=c.get(t);if(void 0===r)t in n&&c.set(t,k(e));else{if(v&&"string"==typeof t){var l=c.get("length"),o=Number(t);Number.isInteger(o)&&o<l.v&&E(l,o)}E(r,e),Ne(d)}return!0},get(n,r,o){if(r===w)return t;var i=c.get(r),a=r in n;if(void 0!==i||a&&!l(n,r)?.writable||(i=k(Ce(a?n[r]:e,f)),c.set(r,i)),void 0!==i){var u=Ee(i);return u===e?void 0:u}return Reflect.get(n,r,o)},getOwnPropertyDescriptor(n,t){var r=Reflect.getOwnPropertyDescriptor(n,t);if(r&&"value"in r){var l=c.get(t);l&&(r.value=Ee(l))}else if(void 0===r){var o=c.get(t),i=o?.v;if(void 0!==o&&i!==e)return{enumerable:!0,configurable:!0,value:i,writable:!0}}return r},has(n,t){if(t===w)return!0;var r=c.get(t),o=void 0!==r&&r.v!==e||Reflect.has(n,t);if((void 0!==r||null!==le&&(!o||l(n,t)?.writable))&&(void 0===r&&(r=k(o?Ce(n[t],f):e),c.set(t,r)),Ee(r)===e))return!1;return o},set(n,t,r,o){var i=c.get(t),a=t in n;if(v&&"length"===t)for(var u=r;u<i.v;u+=1){var s=c.get(u+"");void 0!==s?E(s,e):u in n&&(s=k(e),c.set(u+"",s))}void 0===i?a&&!l(n,t)?.writable||(E(i=k(void 0),Ce(r,f)),c.set(t,i)):(a=i.v!==e,E(i,Ce(r,f)));var p=Reflect.getOwnPropertyDescriptor(n,t);if(p?.set&&p.set.call(o,r),!a){if(v&&"string"==typeof t){var h=c.get("length"),g=Number(t);Number.isInteger(g)&&g>=h.v&&E(h,g+1)}Ne(d)}return!0},ownKeys(n){Ee(d);var t=Reflect.ownKeys(n).filter((n=>{var t=c.get(n);return void 0===t||t.v!==e}));for(var[r,l]of c)l.v===e||r in n||t.push(r);return t},setPrototypeOf(){!function(){throw new Error("state_prototype_fixed")}()}})}function Ne(e,n=1){E(e,e.v+n)}var je,Be,Ae;function Ie(e=""){return document.createTextNode(e)}function Me(e){return Be.call(e)}function Re(e){return Ae.call(e)}function ze(e,n){return Me(e)}function Le(e,n){var t=Me(e);return t instanceof Comment&&""===t.data?Re(t):t}function He(e,n=1,t=!1){let r=e;for(;n--;)r=Re(r);return r}const We=new Set,Ge=new Set;function Ke(e){for(var n=0;n<e.length;n++)We.add(e[n]);for(var t of Ge)t(e)}function Ve(e){var t=this,l=t.ownerDocument,o=e.type,i=e.composedPath?.()||[],a=i[0]||e.target,u=0,s=e.__root;if(s){var f=i.indexOf(s);if(-1!==f&&(t===document||t===window))return void(e.__root=t);var c=i.indexOf(t);if(-1===c)return;f<=c&&(u=f)}if((a=i[u]||e.target)!==t){r(e,"currentTarget",{configurable:!0,get:()=>a||l});var v=te,d=le;re(null),oe(null);try{for(var p,h=[];null!==a;){var g=a.assignedSlot||a.parentNode||a.host||null;try{var m=a["__"+o];if(void 0!==m&&!a.disabled)if(n(m)){var[y,...b]=m;y.apply(a,[e,...b])}else m.call(a,e)}catch(e){p?h.push(e):p=e}if(e.cancelBubble||g===t||null===g)break;a=g}if(p){for(let e of h)queueMicrotask((()=>{throw e}));throw p}}finally{e.__root=t,delete e.currentTarget,re(v),oe(d)}}}function Fe(e,n){var t=le;null===t.nodes_start&&(t.nodes_start=e,t.nodes_end=n)}function Ue(e,n){var t,r=!!(1&n),l=!!(2&n),o=!e.startsWith("<!>");return()=>{var n,i;void 0===t&&(n=o?e:"<!>"+e,(i=document.createElement("template")).innerHTML=n,t=i.content,r||(t=Me(t)));var a=l?document.importNode(t,!0):t.cloneNode(!0);r?Fe(Me(a),a.lastChild):Fe(a,a);return a}}function Je(){var e=document.createDocumentFragment(),n=document.createComment(""),t=Ie();return e.append(n,t),Fe(n,t),e}function Qe(e,n){null!==e&&e.before(n)}const Xe=["touchstart","touchmove"];function Ye(e){return Xe.includes(e)}function Ze(e,n){var t=null==n?"":"object"==typeof n?n+"":n;t!==(e.__t??=e.nodeValue)&&(e.__t=t,e.nodeValue=null==t?"":t+"")}const en=new Map;let nn=new WeakMap;function tn(e,n,t,r=null,l=!1){var o=e,i=null,a=null,u=null;M((()=>{u!==(u=!!n())&&(u?(i?F(i):i=R((()=>t(o))),a&&K(a,(()=>{a=null}))):(a?F(a):r&&(a=R((()=>r(o)))),i&&K(i,(()=>{i=null}))))}),l?b:0)}let rn=!1;function ln(e,n){var t=e.__attributes??={};t.value!==(t.value=n)&&(e.value!==n||0===n&&"PROGRESS"===e.nodeName)&&(e.value=n)}function on(e,n,t,r){var l=e.__attributes??={};l[n]!==(l[n]=t)&&(null==t?e.removeAttribute(n):"string"!=typeof t&&function(e){var n,t=an.get(e.nodeName);if(t)return t;an.set(e.nodeName,t=[]);var r=u(e),l=Element.prototype;for(;l!==r;){for(var i in n=o(r))n[i].set&&t.push(i);r=u(r)}return t}(e).includes(n)?e[n]=t:e.setAttribute(n,t))}var an=new Map;function un(e,n,t,r=t){e.addEventListener(n,t);const l=e.__on_r;e.__on_r=l?()=>{l(),r()}:r,rn||(rn=!0,document.addEventListener("reset",(e=>{Promise.resolve().then((()=>{if(!e.defaultPrevented)for(const n of e.target.elements)n.__on_r?.()}))}),{capture:!0}))}function sn(e=!1){const n=ve,t=n.l.u;if(!t)return;let r=()=>function(e){if("object"==typeof e&&e&&!(e instanceof EventTarget))if(w in e)qe(e);else if(!Array.isArray(e))for(let n in e){const t=e[n];"object"==typeof t&&t&&w in t&&qe(t)}}(n.s);if(e){let e=0,t={};const l=O((()=>{let r=!1;const l=n.s;for(const e in l)l[e]!==t[e]&&(t[e]=l[e],r=!0);return r&&e++,e}));r=()=>Ee(l)}var l;t.b.length&&(l=()=>{fn(n,r),f(t.b)},C(),A(l)),j((()=>{const e=function(e){const n=te;try{return te=null,e()}finally{te=n}}((()=>t.m.map(s)));return()=>{for(const n of e)"function"==typeof n&&n()}})),t.a.length&&j((()=>{fn(n,r),f(t.a)}))}function fn(e,n){if(e.l.s)for(const n of e.l.s)Ee(n);n()}function cn(){const e=ve;return null===e&&function(){throw new Error("lifecycle_outside_component")}(),(t,r,l)=>{const o=e.s.$$events?.[t];if(o){const i=n(o)?o.slice():[o],a=function(e,n,{bubbles:t=!1,cancelable:r=!1}={}){return new CustomEvent(e,{detail:n,bubbles:t,cancelable:r})}(t,r,l);for(const n of i)n.call(e.x,a);return!a.defaultPrevented}return!0}}function vn(e,n){n("message",{response:!0})}var dn=Ue('<div class="svelte-emguho"><h1>Warning!</h1> <h2>Read Before Continuing</h2> <p>This tool is an approximate unofficial guide for the <strong>Box Breathing</strong> protocol described in <a href="https://doi.org/10.1016/j.xcrm.2022.100895" target="_blank" rel="noreferrer">Brief Structured Respiration Practices Enhance Mood and Reduce Physiological Arousal</a></p> <p>This tool is open source. The source code <a href="https://github.com/matthewnoel/CO2T4" target="_blank" rel="noreferrer">is available here</a>. Third-party licenses <a href="https://github.com/matthewnoel/CO2T4/blob/main/third-party-licenses.txt" target="_blank" rel="noreferrer">are available here</a>.</p> <p><strong class="important svelte-emguho">This tool is intended for educational use only.</strong></p> <p><strong class="important svelte-emguho">This tool is not affiliated with the authors of the aforementioned paper.</strong></p> <p><strong class="important svelte-emguho">This tool does not provide medical advice. Do not use this tool or any breathing exercise without consulting a licensed physician.</strong></p> <fieldset class="svelte-emguho"><legend>Terms of Use</legend> <div class="svelte-emguho"><input type="checkbox" name="Test" id="abc" class="svelte-emguho"> <label for="abc">I acknowledge this tool made by a random person on the internet is offered with no warranty and by continuing I accept full responsibility for my actions.</label></div> <input type="button" value="Acknowledge and Continue" class="svelte-emguho"></fieldset></div>');function pn(e,n){De(n,!0);const t=cn();let r=S(!1);var l=dn(),o=He(ze(l),14),i=He(ze(o),2),a=ze(i),u=He(i,2);u.__click=[vn,t],I((()=>u.disabled=!Ee(r))),function(e,n,t=n){un(e,"change",(()=>{var n=e.checked;t(n)})),null==n()&&t(!1),A((()=>{var t=n();e.checked=Boolean(t)}))}(a,(()=>Ee(r)),(e=>E(r,e))),Qe(e,l),$e()}Ke(["click"]);var hn=Ue('<p class="svelte-166we6n">Breath normally for now.</p> <p class="svelte-166we6n">Ideally through the nose.</p>',1);function gn(e,n){De(n,!1);const t=cn(),r=setInterval((()=>{clearInterval(r),t("message",{isDone:!0})}),8e3);sn(),Qe(e,hn()),$e()}var mn=Ue("<p>Breath in completely through your nose.</p> <p>Then start the timer and exhale as slowly as you can.</p>",1),yn=Ue('<p>Click "Stop" when you run out of air.</p> <p>Do not hold your breath.</p>',1),bn=Ue('<div class="svelte-1lzr0u3"><!> <input type="button" class="svelte-1lzr0u3"></div>');function _n(e,n){De(n,!0);const t=cn();let r=S(null);function l(){E(r,Ce(Date.now()))}function o(){const e=Date.now()-Ee(r);e<6e3||e>12e4?E(r,null):t("message",{milliseconds:e})}var i=bn(),a=ze(i);tn(a,(()=>null==Ee(r)),(e=>{Qe(e,mn())}),(e=>{Qe(e,yn())}));var u=He(a,2);u.__click=function(...e){(null==Ee(r)?l:o)?.apply(this,e)},I((()=>ln(u,null==Ee(r)?"Start":"Stop"))),Qe(e,i),$e()}function wn(e,n,t){n("message",{seconds:Ee(t)})}function xn(e,n,t){Ee(n)+1>t||Pe(n)}function kn(e,n,t){Ee(n)-1<t||Pe(n,-1)}Ke(["click"]);var Sn=Ue('<div><div class="number svelte-10kzgvq"><div><input class="symbol svelte-10kzgvq" type="button" value="-"></div> <div><h1 class="svelte-10kzgvq"> </h1></div> <div><input class="symbol svelte-10kzgvq" type="button" value="+"></div></div> <p class="svelte-10kzgvq">Second Box Breathing Interval</p> <input type="button" value="Start"></div>');Ke(["click"]);var En=Ue("<p>Great job</p>"),Tn=Ue("<p> </p> <h1> </h1>",1),On=Ue("<div><!></div>");var Pn=Ue("<p>Oops. Something went wrong</p>");function Dn(e){let n=S(0),t=S(void 0),r=S(void 0);function l(e,t){e.detail.isDone&&E(n,Ce(t))}function o(e){E(t,Ce(e.detail.milliseconds)),E(n,2)}function i(e){E(r,Ce(e.detail.seconds)),E(n,4)}var a=Je();tn(Le(a),(()=>0===Ee(n)),(e=>{gn(e,{$$events:{message:e=>l(e,1)}})}),(e=>{var a=Je();tn(Le(a),(()=>1===Ee(n)),(e=>{_n(e,{$$events:{message:o}})}),(e=>{var o=Je();tn(Le(o),(()=>2===Ee(n)),(e=>{gn(e,{$$events:{message:e=>l(e,3)}})}),(e=>{var l=Je();tn(Le(l),(()=>3===Ee(n)),(e=>{!function(e,n){De(n,!0);let t=S(Ce(Math.round(n.milliseconds/6e3)));const r=cn();var l=Sn(),o=ze(l),i=ze(o),a=ze(i);a.__click=[kn,t,1];var u=He(i,2),s=ze(u),f=ze(s),c=ze(He(u,2));c.__click=[xn,t,20],He(o,4).__click=[wn,r,t],I((()=>{a.disabled=Ee(t)-1<1,Ze(f,Ee(t)),c.disabled=Ee(t)+1>20})),Qe(e,l),$e()}(e,{get milliseconds(){return Ee(t)},$$events:{message:i}})}),(e=>{var t=Je();tn(Le(t),(()=>4===Ee(n)),(e=>{!function(e,n){let t=S(!1),r=0,l=S(0);const o=[["Breath in","👃"],["Hold","😶"],["Breath out","😮‍💨"],["Hold","😶"]];let i=O((()=>o[Ee(l)]));const a=setInterval((()=>{if(r+=n.seconds,r>=120)return clearInterval(a),void E(t,!0);Ee(l)>=0&&Ee(l)<=2?Pe(l):E(l,0)}),1e3*n.seconds);var u=On();tn(ze(u),(()=>Ee(t)),(e=>{Qe(e,En())}),(e=>{var n=Tn(),t=Le(n),r=ze(t),l=ze(He(t,2));I((()=>{Ze(r,Ee(i)[0]),Ze(l,Ee(i)[1])})),Qe(e,n)})),Qe(e,u)}(e,{get seconds(){return Ee(r)}})}),(e=>{Qe(e,Pn())}),!0),Qe(e,t)}),!0),Qe(e,l)}),!0),Qe(e,o)}),!0),Qe(e,a)})),Qe(e,a)}var $n=Ue('<input type="button" data-theme-toggle="">');Ke(["click"]);var qn=Ue('<main class="svelte-1wab2q"><!> <footer class="svelte-1wab2q"><!></footer></main>');var Cn,Nn,jn=(Cn=function(e){let n=S(!1);function t(e){E(n,Ce(Boolean(e.detail.response)))}var r=qn(),l=ze(r);tn(l,(()=>Ee(n)),(e=>{Dn(e)}),(e=>{pn(e,{$$events:{message:t}})})),function(e,n){De(n,!0);const t=e=>{E(i,Ce(e===l?"🌞":"🌚")),document.querySelector("html").setAttribute("data-theme",e)},r="light",l="dark";let o=(({localStorageTheme:e,systemSettingDark:n})=>null!==e?e:n.matches?l:r)({localStorageTheme:localStorage.getItem("theme"),systemSettingDark:window.matchMedia("(prefers-color-scheme: dark)")}),i=S("🌞");t(o);var a=$n();a.__click=()=>{const e=o===l?r:l;localStorage.setItem("theme",e),t(e),o=e},I((()=>{on(a,"aria-label","🌚"===Ee(i)?"Change to dark theme.":"Change to light theme."),ln(a,Ee(i))})),Qe(e,a),$e()}(ze(He(l,2)),{}),Qe(e,r)},Nn={target:document.body},function(e,{target:n,anchor:r,props:o={},events:i,context:a,intro:u=!0}){!function(){if(void 0===je){je=window;var e=Element.prototype,n=Node.prototype;Be=l(n,"firstChild").get,Ae=l(n,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}();var s=new Set,f=e=>{for(var t=0;t<e.length;t++){var r=e[t];if(!s.has(r)){s.add(r);var l=Ye(r);n.addEventListener(r,Ve,{passive:l});var o=en.get(r);void 0===o?(document.addEventListener(r,Ve,{passive:l}),en.set(r,1)):en.set(r,o+1)}}};f(t(We)),Ge.add(f);var c=void 0,v=function(e){const n=N(64,e,!0);return()=>{W(n)}}((()=>{var t=r??n.appendChild(Ie());return R((()=>{a&&(De({}),ve.c=a),i&&(o.$$events=i),c=e(t,o)||{},a&&$e()})),()=>{for(var e of s){n.removeEventListener(e,Ve);var l=en.get(e);0==--l?(document.removeEventListener(e,Ve),en.delete(e)):en.set(e,l)}Ge.delete(f),nn.delete(c),t!==r&&t.parentNode?.removeChild(t)}}));return nn.set(c,v),c}(Cn,Nn));return jn}();
//# sourceMappingURL=bundle.js.map
