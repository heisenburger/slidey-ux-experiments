var Ot=Object.defineProperty;var Rt=(n,t,e)=>t in n?Ot(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var a=(n,t,e)=>(Rt(n,typeof t!="symbol"?t+"":t,e),e),tt=(n,t,e)=>{if(!t.has(n))throw TypeError("Cannot "+e)};var m=(n,t,e)=>(tt(n,t,"read from private field"),e?e.call(n):t.get(n)),F=(n,t,e)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,e)},B=(n,t,e,i)=>(tt(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class wt{constructor(t){a(this,"animationStartTime",0);a(this,"animationStartOffset",0);a(this,"networkDelay");a(this,"maxOffset");a(this,"offset",0);a(this,"parallax");a(this,"limitFingerDrag");a(this,"boostVelocity");a(this,"targetStopPercent");a(this,"loadStart",0);this.networkDelay=t.networkDelay,this.maxOffset=t.targetOffset,this.parallax=t.parallax,this.limitFingerDrag=t.limitFingerDrag,this.boostVelocity=t.boostVelocity,this.targetStopPercent=t.targetStopPercent}startAnimating(t){this.loadStart=t,this.animationStartTime=t,this.animationStartOffset=this.offset}restartAnimating(t){this.animationStartTime=t,this.animationStartOffset=this.offset}pointerUp(t){return"success"}committed(t){return t-this.loadStart>=this.networkDelay}}function At(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var ct={exports:{}};(function(n){(function(){n.exports=t;function t(e,i,s,o){typeof s=="object"&&(o=s,s=!1),typeof o>"u"&&(o={});for(var l=0,c=0,S=0,E=0,f=e.length,h=0;h<f;++h)l+=e[h],c+=i[h],S+=e[h]*i[h],E+=e[h]*e[h];if(o.m=(S-l*c/f)/(E-l*l/f),o.b=c/f-o.m*l/f,s){for(var Q=0,P=0;P<f;++P)Q+=(i[P]-o.b-o.m*e[P])*(i[P]-o.b-o.m*e[P]);var j=f*E-l*l,X=1/(f-2)*Q;o.bErr=Math.sqrt(X/j*E),o.mErr=Math.sqrt(f/j*X)}return function(Dt){return o.m*Dt+o.b}}})()})(ct);var Ft=ct.exports;const Bt=At(Ft);function r(){throw new Error("missing element")}function mt(n){let t={m:0};const e=n.map(s=>s.offset),i=n.map(s=>s.time);return Bt(i,e,!1,t),t.m,t.m}const et=10,kt=10;class U{constructor(t){a(this,"mass",1);a(this,"initialVelocity",0);a(this,"dampingRatio");a(this,"undampedNaturalFrequency");a(this,"dampedNaturalFrequency");a(this,"lastNFrames");a(this,"name");a(this,"overshootCurve",t=>t);const e=(2*Math.PI/t.frequencyResponse)**2*this.mass;this.undampedNaturalFrequency=Math.sqrt(e/this.mass),this.dampedNaturalFrequency=this.undampedNaturalFrequency*Math.sqrt(Math.abs(1-t.dampingRatio**2)),this.dampingRatio=t.dampingRatio,this.lastNFrames=[],this.name=t.name,t.overshootCurve&&(this.overshootCurve=t.overshootCurve)}position(t,e){const i=this.undampedNaturalFrequency*this.dampingRatio,s=this.dampedNaturalFrequency,o=(this.initialVelocity+i*t)/s,l=t;let c=Math.exp(-i*e)*(o*Math.sin(s*e)+l*Math.cos(s*e));if(c<0&&(c=this.overshootCurve(c)),isNaN(c)||!isFinite(c))throw"Spring config invalid. Position: "+c;this.lastNFrames.push({offset:c,time:e});let S=!1;if(this.lastNFrames.length>et){this.lastNFrames.shift();let E=0;for(let f of this.lastNFrames)E+=f.offset*f.offset;S=E<kt*et}return c<1&&(S=!0),{offset:c,done:S}}velocity(){return mt(this.lastNFrames)}}var p,d,O;class qt extends wt{constructor(e){super(e);F(this,p,void 0);F(this,d,void 0);F(this,O,void 0);a(this,"lastRaf",null);a(this,"hasCommitted",!1);a(this,"hasAborted",!1);a(this,"pointerHistory",[]);a(this,"spring80FrequencyResponseInput",document.getElementById("spring80FrequencyResponse")??r());a(this,"spring80FrequencyResponseDisplay",document.getElementById("spring80FrequencyResponseDisplay")??r());a(this,"spring80DampingRatioInput",document.getElementById("spring80DampingRatio")??r());a(this,"spring80DampingRatioDisplay",document.getElementById("spring80DampingRatioDisplay")??r());a(this,"hookAtInput",document.getElementById("hookAt")??r());a(this,"hookAtDisplay",document.getElementById("hookAtDisplay")??r());a(this,"spring80FrequencyResponse",parseFloat(this.spring80FrequencyResponseInput.value));a(this,"spring80DampingRatio",parseFloat(this.spring80DampingRatioInput.value));a(this,"hookAtPercent",parseFloat(this.hookAtInput.value));a(this,"hooked",!1);this.animationStartOffset=0,this.spring80FrequencyResponseInput.addEventListener("input",()=>this.updateDisplays()),this.spring80DampingRatioInput.addEventListener("input",()=>this.updateDisplays()),this.hookAtInput.addEventListener("input",()=>this.updateDisplays()),B(this,p,new U({frequencyResponse:200,dampingRatio:.95,name:"100%"})),B(this,d,new U({frequencyResponse:this.spring80FrequencyResponse,dampingRatio:this.spring80DampingRatio,name:"80%"})),B(this,O,new U({frequencyResponse:200,dampingRatio:.9,name:"0%"}))}updateDisplays(){this.spring80FrequencyResponseDisplay.innerHTML=this.spring80FrequencyResponseInput.value,this.spring80DampingRatioDisplay.innerHTML=this.spring80DampingRatioInput.value,this.hookAtDisplay.innerHTML=this.hookAtInput.value}advance(e){e=e,!this.hasCommitted&&this.committed(e)&&(this.startAnimating(this.lastRaf||e),this.hasCommitted=!0,this.hooked?m(this,p).initialVelocity=m(this,d).velocity():(this.hooked=!0,m(this,p).initialVelocity=m(this,d).initialVelocity),isNaN(m(this,p).initialVelocity)&&(m(this,p).initialVelocity=-2));const i=e-this.animationStartTime;let s=null;this.hooked?this.hasAborted?(s=m(this,O).position(this.animationStartOffset,i),this.offset=Math.max(s.offset,0)):this.hasCommitted?(s=m(this,p).position(this.maxOffset-this.animationStartOffset,i),this.offset=this.maxOffset-s.offset):(s=m(this,d).position(this.maxOffset*this.targetStopPercent-this.animationStartOffset,i),this.offset=this.maxOffset*this.targetStopPercent-s.offset):this.offset=this.animationStartOffset-i*m(this,d).initialVelocity,!this.hooked&&this.offset>this.maxOffset*this.hookAtPercent/100&&(this.restartAnimating(this.lastRaf||e),this.hooked=!0,this.animationStartOffset=this.offset);let o=s?s.done:!1;return this.lastRaf=e,{done:o&&(this.hasCommitted||this.hasAborted),fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset),hasCommitted:this.hasCommitted}}pointerMove(e){return this.offset=this.fingerDragAdd(this.offset,e.movementX),this.pointerHistory.push({offset:this.offset,time:e.timeStamp}),this.pointerHistory.length>10&&this.pointerHistory.shift(),this.offset<0&&(this.offset=0),{done:!1,fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset),hasCommitted:!1}}fingerDragAdd(e,i){return this.limitFingerDrag?e+this.targetStopPercent*i:e+i}fgToBgOffset(e){return this.parallax?.25*(e-this.maxOffset):0}setDefaultVelocity(){this.offset=this.maxOffset/4,m(this,d).initialVelocity=this.boostVelocity?-2.5:-1}pointerUp(e){let i=mt(this.pointerHistory);return console.log("before: "+i),this.boostVelocity&&(i*=3,i=Math.max(i,1)),console.log("post boost: "+i),i=Math.min(i,2.5),i=Math.max(i,.3),console.log("post clamp: "+i),(this.offset+i*100)/this.maxOffset<.3||i<-.1?(this.hasAborted=!0,m(this,O).initialVelocity=-i,"abort"):(m(this,d).initialVelocity=-i,"success")}}p=new WeakMap,d=new WeakMap,O=new WeakMap;let T=!1,q=!1,A=!1,Z=!1,R=!1,W=!1,v=[{main:"resources/srp-couches.png"},{main:"resources/pants-hemming-srp.png",precommit:"resources/pants-srp.png"},{main:"resources/srp-cats.png"},{main:"resources/banana-pie-srp.png"},{main:"resources/goo.gl-stock-a.png",precommit:"resources/goo.gl-stock-b.png"},{main:"resources/news-frontpage.png"},{main:"resources/news-article.png"}],u=0;const ft=document.body??r(),ut=document.getElementById("scrim")??r(),N=document.getElementById("globalProgress")??r(),dt=document.getElementById("attributedProgress")??r(),w=document.getElementById("networkDelayInput")??r(),Lt=document.getElementById("networkDelayDisplay")??r(),xt=document.getElementById("zoomDisplay")??r(),Mt=document.getElementById("buttonTest")??r(),Tt=document.getElementById("buttonSettings")??r(),pt=document.getElementById("settingsPanel")??r(),gt=document.getElementById("screenshots")??r(),Nt=document.getElementById("targetStopDisplay")??r();var at;const L=((at=document.getElementById("frontimg"))==null?void 0:at.querySelector("img"))??r();var rt;const z=((rt=document.getElementById("midimg"))==null?void 0:rt.querySelector("img"))??r();var lt;const V=((lt=document.getElementById("midimgprecommit"))==null?void 0:lt.querySelector("img"))??r(),G=document.getElementById("settingZoom")??r(),ht=document.getElementById("settingProgressAttribution")??r(),Vt=document.getElementById("settingUnloadHandler")??r(),yt=document.getElementById("settingBoostVelocity")??r(),C=document.getElementById("settingTargetStop")??r(),Ct=document.getElementById("settingFadeForeground")??r();let I=dt,K=I.querySelector(".bar"),x=N.querySelector(".bar"),g=0,nt=0,M=0,Ht=["P25","P50","P75","P90","P95","P99"],H=[30,100,330,660,1e3,2360],D=1,_=1;function _t(){let n=H[parseInt(w.value)];return Math.min(Math.max(n+500,n*2),n+1e3)}function $t(n){var t;((t=n.target)==null?void 0:t.classList[0])!="screenshot"||T&&!R||(A=!0,J(),q=!0,b=$())}function vt(n){return .3+(1-n)*.5}let k=!1;function Ut(n){if(!q)return;let t=b.pointerMove(n);console.log(t);let e=t.fgOffset/document.documentElement.getBoundingClientRect().width;document.documentElement.style.setProperty("--fg-offset",`${t.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${t.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${vt(e)}`),It(e),Et(t.fgOffset),Zt(t.fgOffset)}function Et(n){let t=n/document.documentElement.getBoundingClientRect().width,e=1-(1-_)*t;document.documentElement.style.setProperty("--fg-scale",`${e}`)}function Zt(n){if(n/document.documentElement.getBoundingClientRect().width>.5){if(!k){let e=document.documentElement.animate([{"--bg-scale":_}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),k=!0}}else if(k){let e=document.documentElement.animate([{"--bg-scale":D}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),k=!1}}function zt(n){if(!q)return;if(q=!1,Z=!1,b.pointerUp(n)=="abort")st(),A=!0;else if(Vt.checked){let e=document.documentElement.style.getPropertyValue("--fg-offset"),i=document.documentElement.style.getPropertyValue("--fg-scale"),s=document.documentElement.getBoundingClientRect().width*10/100,o=document.documentElement.animate([{"--fg-scale":1,"--fg-offset":s+"px"}],{duration:300,fill:"forwards"});o.finished.then(()=>{if(o.commitStyles(),o.cancel(),window.confirm("are you sure you want to leave this page?  It's very nice.")){let l=document.documentElement.animate([{"--fg-scale":i,"--fg-offset":e}],{duration:200,fill:"forwards"});l.finished.then(()=>{l.commitStyles(),l.cancel(),st(),ot().then(it)})}});return}ot().then(it)}function Gt(){let n=document.documentElement.animate([{"--fg-scale":_,"--bg-scale":1}],{duration:100,fill:"forwards"});console.log("SET OPACITY TO 0"),n.finished.then(()=>{n.commitStyles(),n.cancel()});const t=V.animate({opacity:0},{duration:100,fill:"forwards"});t.finished.then(()=>{t.commitStyles(),t.cancel()})}function st(){let n=document.documentElement.animate([{"--fg-scale":1,"--bg-scale":D}],{duration:100,fill:"forwards"});n.finished.then(()=>{n.commitStyles(),n.cancel()})}function it(){W=!0,document.documentElement.animate([{"--scrim":0}],{duration:100}).finished.then(Pt),R=!A,R?bt():Y()}function bt(){if(!R)return;let n=performance.now();if(n>=M){Y();return}console.log("tick loading bar"),N.style.display="block",x.max=M-g,x.value=n-g,requestAnimationFrame(bt)}let b=$();J();function St(n,t){const e=b.advance(n);document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`);let i=e.fgOffset/document.documentElement.getBoundingClientRect().width;const s=vt(i);It(i);const o=s+.1*Math.sin((n-g)/200);document.documentElement.style.setProperty("--scrim",`${o}`),Et(e.fgOffset),n-g>800&&(I.style.display="block"),e.hasCommitted&&!Z&&(Gt(),Z=!0),e.done?t():requestAnimationFrame(l=>{St(l,t)})}function ot(){return T=!0,g=performance.now(),nt=g+parseFloat(w.value),M=g+_t(),console.log("start : "+g+" commit : "+nt+" load : "+M),b.startAnimating(g),new Promise(n=>{St(performance.now(),n)})}function Pt(){W=!1,document.documentElement.style.setProperty("--fg-offset","0px"),document.documentElement.style.setProperty("--vertical-offset","0px"),document.documentElement.style.setProperty("--scrim","0.0"),document.documentElement.style.setProperty("--bg-scale",D.toString()),document.documentElement.style.setProperty("--fg-scale","1.0"),V.style.opacity="1",A||Wt(),A=!1,R||(T=!1)}function Y(){console.log("finishing loading bar anim"),R=!1,I.style.display="none",K.removeAttribute("value"),K.removeAttribute("max"),N.style.display="none",x.removeAttribute("value"),x.removeAttribute("max"),W||(T=!1)}function J(){Y(),Pt()}function $(){return new qt({networkDelay:H[parseInt(w.value)],targetOffset:document.documentElement.getBoundingClientRect().width,parallax:!0,limitFingerDrag:!0,boostVelocity:!!yt.checked,targetStopPercent:parseFloat(C.value)})}function Kt(){let n=document.documentElement.getBoundingClientRect().width,t=$();t.setDefaultVelocity(),t.startAnimating(0);var e=document.getElementById("plot")??r();let i=e.width/1e3;e.height=n*i;var s=e.getContext("2d");if(!s)return;s.scale(i,i),s.lineWidth=3,s.strokeStyle="black",s.beginPath(),s.moveTo(0,0);for(var o=0;o<1e3;o++)s.lineTo(o,t.advance(o).fgOffset);s.stroke(),s.strokeStyle="red";let l=n*parseFloat(C.value);s.beginPath(),s.moveTo(0,l),s.lineTo(1e3,l),s.stroke(),s.strokeStyle="green";let c=H[parseInt(w.value)];s.beginPath(),s.moveTo(c,0),s.lineTo(c,n),s.stroke()}function y(){let n=parseInt(w.value);Lt.innerHTML=Ht[n]+"="+H[n].toString(),D=parseInt(G.value)/100,_=D+(1-D)/3,xt.innerHTML=G.value.toString(),Nt.innerHTML=`${100*parseFloat(C.value)}`,b.updateDisplays(),Kt(),b=$(),J()}function It(n){Ct.checked&&(L.style.filter=`grayscale(${n})`)}function Wt(){L.style.filter="",L.src=z.src,z.src=v[u].main,V.src=v[u].precommit??"",u=(u+1)%v.length}function Yt(){pt.style.display="none",ut.style.display="block",gt.style.display="block",ft.classList.add("test")}function Jt(){pt.style.display="flex",ut.style.display="none",gt.style.display="none",ft.classList.remove("test")}function Qt(){ht.checked?I=dt:I=N,K=I.querySelector(".bar")}function jt(){w.addEventListener("input",y),G.addEventListener("input",y),C.addEventListener("input",y),yt.addEventListener("input",y);let n=document.getElementById("spring80FrequencyResponse")??r(),t=document.getElementById("spring80DampingRatio")??r(),e=document.getElementById("hookAt")??r();n.addEventListener("input",y),t.addEventListener("input",y),e.addEventListener("input",y),Mt.addEventListener("click",Yt),Tt.addEventListener("click",Jt),L.src=v[u].main,u=(u+1)%v.length,z.src=v[u].main,V.src=v[u].precommit??"",u=(u+1)%v.length,ht.addEventListener("change",Qt),y(),window.addEventListener("pointerdown",$t),window.addEventListener("pointerup",zt),window.addEventListener("pointermove",Ut)}onload=jt;
