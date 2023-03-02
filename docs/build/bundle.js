var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode&&t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function d(){return a(" ")}function f(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let h;function $(t){h=t}function g(){const t=function(){if(!h)throw new Error("Function called outside component initialization");return h}();return(e,n,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[e];if(r){const s=function(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,o,e),r}(e,n,{cancelable:o});return r.slice().forEach((e=>{e.call(t,s)})),!s.defaultPrevented}return!0}}const b=[],v=[],y=[],x=[],w=Promise.resolve();let k=!1;function _(t){y.push(t)}const T=new Set;let C=0;function E(){if(0!==C)return;const t=h;do{try{for(;C<b.length;){const t=b[C];C++,$(t),B(t.$$)}}catch(t){throw b.length=0,C=0,t}for($(null),b.length=0,C=0;v.length;)v.pop()();for(let t=0;t<y.length;t+=1){const e=y[t];T.has(e)||(T.add(e),e())}y.length=0}while(b.length);for(;x.length;)x.pop()();k=!1,T.clear(),$(t)}function B(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const z=new Set;let S;function M(){S={r:0,c:[],p:S}}function H(){S.r||o(S.c),S=S.p}function I(t,e){t&&t.i&&(z.delete(t),t.i(e))}function L(t,e,n,o){if(t&&t.o){if(z.has(t))return;z.add(t),S.c.push((()=>{z.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function j(t){t&&t.c()}function A(t,n,s,c){const{fragment:i,after_update:l}=t.$$;i&&i.m(n,s),c||_((()=>{const n=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),l.forEach(_)}function O(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(b.push(t),k||(k=!0,w.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function N(e,r,s,c,i,u,a,d=[-1]){const f=h;$(e);const p=e.$$={fragment:null,ctx:[],props:u,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:r.target||f.$$.root};a&&a(p.root);let m=!1;if(p.ctx=s?s(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&i(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),m&&D(e,t)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!c&&c(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(l)}else p.fragment&&p.fragment.c();r.intro&&I(e.$$.fragment),A(e,r.target,r.anchor,r.customElement),E()}$(f)}class P{$destroy(){O(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function R(e){let n,r,s,a,m,h,$,g,b,v,y,x,w,k,_,T,C,E,B,z,S,M,H,I,L,j,A;return{c(){n=u("div"),r=u("h1"),r.textContent="Warning!",s=d(),a=u("h2"),a.textContent="Read Before Continuing",m=d(),h=u("p"),h.innerHTML='This tool is an approximate unofficial guide for the <strong>Box Breathing</strong> protocol described in <a href="https://doi.org/10.1016/j.xcrm.2022.100895" target="_blank" rel="noreferrer">Brief Structured Respiration Practices Enhance Mood and Reduce Physiological Arousal</a>',$=d(),g=u("p"),g.innerHTML='This tool is open source. The source code <a href="https://github.com/matthewnoel/CO2T4" target="_blank" rel="noreferrer">is available here</a>.',b=d(),v=u("p"),v.innerHTML='<strong class="important svelte-18yzgxh">This tool is intended for educational use only.</strong>',y=d(),x=u("p"),x.innerHTML='<strong class="important svelte-18yzgxh">This tool is not affiliated with the authors of the aforementioned paper.</strong>',w=d(),k=u("p"),k.innerHTML='<strong class="important svelte-18yzgxh">This tool does not provide medical advice. Do not use this tool or any breathing exercise without consulting a licensed physician.</strong>',_=d(),T=u("fieldset"),C=u("legend"),C.textContent="Terms of Use",E=d(),B=u("div"),z=u("input"),S=d(),M=u("label"),M.textContent="I acknowledge this tool made by a random person on the internet is offered with no warranty and by continuing I accept full responsibility for my actions.",H=d(),I=u("input"),p(z,"type","checkbox"),p(z,"name","Test"),p(z,"id","abc"),p(M,"for","abc"),p(I,"type","button"),I.value="Acknowledge and Continue",I.disabled=L=!e[0],p(T,"class","svelte-18yzgxh")},m(t,o){i(t,n,o),c(n,r),c(n,s),c(n,a),c(n,m),c(n,h),c(n,$),c(n,g),c(n,b),c(n,v),c(n,y),c(n,x),c(n,w),c(n,k),c(n,_),c(n,T),c(T,C),c(T,E),c(T,B),c(B,z),z.checked=e[0],c(B,S),c(B,M),c(T,H),c(T,I),j||(A=[f(z,"change",e[2]),f(I,"click",e[1])],j=!0)},p(t,[e]){1&e&&(z.checked=t[0]),1&e&&L!==(L=!t[0])&&(I.disabled=L)},i:t,o:t,d(t){t&&l(n),j=!1,o(A)}}}function q(t,e,n){const o=g();let r=!1;return[r,function(){o("message",{response:!0})},function(){r=this.checked,n(0,r)}]}class F extends P{constructor(t){super(),N(this,t,q,R,s,{})}}function G(e){let n;return{c(){n=u("p"),n.textContent="Breath normally",p(n,"class","svelte-166we6n")},m(t,e){i(t,n,e)},p:t,i:t,o:t,d(t){t&&l(n)}}}const U=4e3;function W(t){const e=g(),n=setInterval((()=>{clearInterval(n),e("message",{isDone:!0})}),U);return[]}class J extends P{constructor(t){super(),N(this,t,W,G,s,{})}}function K(e){let n,o,s,a,m,h,$;return{c(){n=u("div"),o=u("p"),o.textContent="Breath in fully then start the timer",s=d(),a=u("input"),p(a,"type","button"),a.value=m=null==e[0]?"Start":"Stop",p(a,"class","svelte-1gdbdr5"),p(n,"class","svelte-1gdbdr5")},m(t,l){i(t,n,l),c(n,o),c(n,s),c(n,a),h||($=f(a,"click",(function(){r(null==e[0]?e[1]:e[2])&&(null==e[0]?e[1]:e[2]).apply(this,arguments)})),h=!0)},p(t,[n]){e=t,1&n&&m!==(m=null==e[0]?"Start":"Stop")&&(a.value=m)},i:t,o:t,d(t){t&&l(n),h=!1,$()}}}const Q=6e3,V=12e4;function X(t,e,n){const o=Q,r=V,s=g();let c=null;return[c,function(){n(0,c=Date.now())},function(){const t=Date.now()-c;t<o||t>r?n(0,c=null):s("message",{milliseconds:t})}]}class Y extends P{constructor(t){super(),N(this,t,X,K,s,{})}}function Z(e){let n,r,s,h,$,g,b,v,y,x,w,k,_,T,C;return{c(){n=u("div"),r=u("p"),s=a(e[0]),h=a(" Second Box Breathing Interval"),$=d(),g=u("div"),b=u("input"),y=d(),x=u("input"),k=d(),_=u("input"),p(r,"class","svelte-13szeow"),p(b,"type","button"),b.value="-",b.disabled=v=e[0]-1<e[1],p(b,"class","svelte-13szeow"),p(x,"type","button"),x.value="+",x.disabled=w=e[0]+1>e[2],p(x,"class","svelte-13szeow"),p(_,"id","ok"),p(_,"type","button"),_.value="Ok",p(_,"class","svelte-13szeow"),p(n,"id","outer"),p(n,"class","svelte-13szeow")},m(t,o){i(t,n,o),c(n,r),c(r,s),c(r,h),c(n,$),c(n,g),c(g,b),c(g,y),c(g,x),c(n,k),c(n,_),T||(C=[f(b,"click",e[5]),f(x,"click",e[4]),f(_,"click",e[3])],T=!0)},p(t,[e]){1&e&&m(s,t[0]),1&e&&v!==(v=t[0]-1<t[1])&&(b.disabled=v),1&e&&w!==(w=t[0]+1>t[2])&&(x.disabled=w)},i:t,o:t,d(t){t&&l(n),T=!1,o(C)}}}const tt=1,et=20;function nt(t,e,n){let{milliseconds:o}=e,r=Math.round(o/6e3);const s=tt,c=et,i=g();return t.$$set=t=>{"milliseconds"in t&&n(6,o=t.milliseconds)},[r,s,c,function(){i("message",{seconds:r})},function(){r+1>c||n(0,r++,r)},function(){r-1<s||n(0,r--,r)},o]}class ot extends P{constructor(t){super(),N(this,t,nt,Z,s,{milliseconds:6})}}function rt(t){let e,n;return{c(){e=u("p"),n=a(t[1]),p(e,"class","svelte-166we6n")},m(t,o){i(t,e,o),c(e,n)},p(t,e){2&e&&m(n,t[1])},d(t){t&&l(e)}}}function st(e){let n;return{c(){n=u("p"),n.textContent="Great job",p(n,"class","svelte-166we6n")},m(t,e){i(t,n,e)},p:t,d(t){t&&l(n)}}}function ct(e){let n;function o(t,e){return t[0]?st:rt}let r=o(e),s=r(e);return{c(){n=u("div"),s.c()},m(t,e){i(t,n,e),s.m(n,null)},p(t,[e]){r===(r=o(t))&&s?s.p(t,e):(s.d(1),s=r(t),s&&(s.c(),s.m(n,null)))},i:t,o:t,d(t){t&&l(n),s.d()}}}const it=120;function lt(t,e,n){let o,{seconds:r}=e,s=!1,c=0,i=0;const l=["Breath in","Hold","Breath out","Hold"],u=setInterval((()=>{if(c+=r,c>=it)return clearInterval(u),void n(0,s=!0);i>=0&&i<=2?n(3,i++,i):n(3,i=0)}),1e3*r);return t.$$set=t=>{"seconds"in t&&n(2,r=t.seconds)},t.$$.update=()=>{8&t.$$.dirty&&n(1,o=l[i])},[s,o,r,i]}class ut extends P{constructor(t){super(),N(this,t,lt,ct,s,{seconds:2})}}function at(e){let n;return{c(){n=u("p"),n.textContent="Oops. Something went wrong"},m(t,e){i(t,n,e)},p:t,i:t,o:t,d(t){t&&l(n)}}}function dt(t){let e,n;return e=new ut({props:{seconds:t[2]}}),{c(){j(e.$$.fragment)},m(t,o){A(e,t,o),n=!0},p(t,n){const o={};4&n&&(o.seconds=t[2]),e.$set(o)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){L(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function ft(t){let e,n;return e=new ot({props:{milliseconds:t[1]}}),e.$on("message",t[5]),{c(){j(e.$$.fragment)},m(t,o){A(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.milliseconds=t[1]),e.$set(o)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){L(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function pt(e){let n,o;return n=new Y({}),n.$on("message",e[4]),{c(){j(n.$$.fragment)},m(t,e){A(n,t,e),o=!0},p:t,i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){L(n.$$.fragment,t),o=!1},d(t){O(n,t)}}}function mt(e){let n,o;return n=new J({}),n.$on("message",e[3]),{c(){j(n.$$.fragment)},m(t,e){A(n,t,e),o=!0},p:t,i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){L(n.$$.fragment,t),o=!1},d(t){O(n,t)}}}function ht(t){let e,n,o,r;const s=[mt,pt,ft,dt,at],c=[];function u(t,e){return 0===t[0]?0:1===t[0]?1:2===t[0]?2:3===t[0]?3:4}return e=u(t),n=c[e]=s[e](t),{c(){n.c(),o=a("")},m(t,n){c[e].m(t,n),i(t,o,n),r=!0},p(t,[r]){let i=e;e=u(t),e===i?c[e].p(t,r):(M(),L(c[i],1,1,(()=>{c[i]=null})),H(),n=c[e],n?n.p(t,r):(n=c[e]=s[e](t),n.c()),I(n,1),n.m(o.parentNode,o))},i(t){r||(I(n),r=!0)},o(t){L(n),r=!1},d(t){c[e].d(t),t&&l(o)}}}function $t(t,e,n){let o,r,s=0;return[s,o,r,function(t){t.detail.isDone&&n(0,s=1)},function(t){n(1,o=t.detail.milliseconds),n(0,s=2)},function(t){n(2,r=t.detail.seconds),n(0,s=3)}]}class gt extends P{constructor(t){super(),N(this,t,$t,ht,s,{})}}function bt(e){let n,o;return n=new F({}),n.$on("message",e[1]),{c(){j(n.$$.fragment)},m(t,e){A(n,t,e),o=!0},p:t,i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){L(n.$$.fragment,t),o=!1},d(t){O(n,t)}}}function vt(e){let n,o;return n=new gt({}),{c(){j(n.$$.fragment)},m(t,e){A(n,t,e),o=!0},p:t,i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){L(n.$$.fragment,t),o=!1},d(t){O(n,t)}}}function yt(t){let e,n,o,r;const s=[vt,bt],c=[];function a(t,e){return t[0]?0:1}return n=a(t),o=c[n]=s[n](t),{c(){e=u("main"),o.c(),p(e,"class","svelte-1jtbbiy")},m(t,o){i(t,e,o),c[n].m(e,null),r=!0},p(t,[r]){let i=n;n=a(t),n===i?c[n].p(t,r):(M(),L(c[i],1,1,(()=>{c[i]=null})),H(),o=c[n],o?o.p(t,r):(o=c[n]=s[n](t),o.c()),I(o,1),o.m(e,null))},i(t){r||(I(o),r=!0)},o(t){L(o),r=!1},d(t){t&&l(e),c[n].d()}}}function xt(t,e,n){let o=!1;return[o,function(t){n(0,o=Boolean(t.detail.response))}]}return new class extends P{constructor(t){super(),N(this,t,xt,yt,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
