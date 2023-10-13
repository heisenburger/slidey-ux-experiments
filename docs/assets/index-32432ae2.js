var z=Object.defineProperty;var J=(s,t,e)=>t in s?z(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var r=(s,t,e)=>(J(s,typeof t!="symbol"?t+"":t,e),e),B=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var u=(s,t,e)=>(B(s,t,"read from private field"),e?e.call(s):t.get(s)),v=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},O=(s,t,e,i)=>(B(s,t,"write to private field"),i?i.call(s,e):t.set(s,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();class Q{constructor(t){r(this,"animationStartTime",0);r(this,"animationStartOffset",0);r(this,"networkDelay");r(this,"maxOffset");r(this,"offset",0);r(this,"parallax");r(this,"limitFingerDrag");this.networkDelay=t.networkDelay,this.maxOffset=t.targetOffset,this.parallax=t.parallax,this.limitFingerDrag=t.limitFingerDrag}startAnimating(t){this.animationStartTime=t,this.animationStartOffset=this.offset}pointerUp(t){return"success"}committed(){return performance.now()-this.animationStartTime>=this.networkDelay}}function W(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var _={exports:{}};(function(s){(function(){s.exports=t;function t(e,i,n,o){typeof n=="object"&&(o=n,n=!1),typeof o>"u"&&(o={});for(var a=0,m=0,D=0,d=0,l=e.length,c=0;c<l;++c)a+=e[c],m+=i[c],D+=e[c]*i[c],d+=e[c]*e[c];if(o.m=(D-a*m/l)/(d-a*a/l),o.b=m/l-o.m*a/l,n){for(var N=0,g=0;g<l;++g)N+=(i[g]-o.b-o.m*e[g])*(i[g]-o.b-o.m*e[g]);var L=l*d-a*a,A=1/(l-2)*N;o.bErr=Math.sqrt(A/L*d),o.mErr=Math.sqrt(l/L*A)}return function(Z){return o.m*Z+o.b}}})()})(_);var Y=_.exports;const j=W(Y);function f(){throw new Error("missing element")}function V(s){let t={m:0};const e=s.map(n=>n.offset),i=s.map(n=>n.time);return j(i,e,!1,t),t.m,t.m}const k=10,X=10;class q{constructor(t){r(this,"mass",1);r(this,"initialVelocity",0);r(this,"dampingRatio");r(this,"undampedNaturalFrequency");r(this,"dampedNaturalFrequency");r(this,"lastNFrames");r(this,"name");const e=(2*Math.PI/t.frequencyResponse)**2*this.mass;this.undampedNaturalFrequency=Math.sqrt(e/this.mass),this.dampedNaturalFrequency=this.undampedNaturalFrequency*Math.sqrt(Math.abs(1-t.dampingRatio**2)),this.dampingRatio=t.dampingRatio,this.lastNFrames=[],this.name=t.name}position(t,e){const i=this.undampedNaturalFrequency*this.dampingRatio,n=this.dampedNaturalFrequency,o=(this.initialVelocity+i*t)/n,a=t,m=Math.exp(-i*e)*(o*Math.sin(n*e)+a*Math.cos(n*e));if(isNaN(m)||!isFinite(m))throw"Spring config invalid. Position: "+m;this.lastNFrames.push({offset:m,time:e});let D=!1;if(this.lastNFrames.length>k){this.lastNFrames.shift();let d=0;for(let l of this.lastNFrames)d+=l.offset*l.offset;D=d<X*k}return{offset:m,done:D}}velocity(){return V(this.lastNFrames)}}var y,p,R;class tt extends Q{constructor(e){super(e);v(this,y,void 0);v(this,p,void 0);v(this,R,void 0);r(this,"lastRaf",null);r(this,"hasCommitted",!1);r(this,"hasAborted",!1);r(this,"pointerHistory",[]);r(this,"spring80FrequencyResponseInput",document.getElementById("spring80FrequencyResponse")??f());r(this,"spring80FrequencyResponseDisplay",document.getElementById("spring80FrequencyResponseDisplay")??f());r(this,"spring80DampingRatioInput",document.getElementById("spring80DampingRatio")??f());r(this,"spring80DampingRatioDisplay",document.getElementById("spring80DampingRatioDisplay")??f());r(this,"spring80FrequencyResponse",parseFloat(this.spring80FrequencyResponseInput.value));r(this,"spring80DampingRatio",parseFloat(this.spring80DampingRatioInput.value));this.animationStartOffset=0,this.spring80FrequencyResponseInput.addEventListener("input",()=>this.updateDisplays()),this.spring80DampingRatioInput.addEventListener("input",()=>this.updateDisplays()),O(this,y,new q({frequencyResponse:200,dampingRatio:.95,name:"100%"})),O(this,p,new q({frequencyResponse:this.spring80FrequencyResponse,dampingRatio:this.spring80DampingRatio,name:"80%"})),console.log(u(this,p)),O(this,R,new q({frequencyResponse:200,dampingRatio:.9,name:"0%"}))}updateDisplays(){console.log(this.spring80FrequencyResponseInput.value),this.spring80FrequencyResponseDisplay.innerHTML=this.spring80FrequencyResponseInput.value,this.spring80DampingRatioDisplay.innerHTML=this.spring80DampingRatioInput.value}advance(e){e=e,!this.hasCommitted&&this.committed()&&(this.startAnimating(this.lastRaf||e),this.hasCommitted=!0,u(this,y).initialVelocity=u(this,p).velocity());const i=e-this.animationStartTime;let n=null;return this.hasAborted?(n=u(this,R).position(this.animationStartOffset,i),this.offset=Math.max(n.offset,0)):this.hasCommitted?(n=u(this,y).position(this.maxOffset-this.animationStartOffset,i),this.offset=this.maxOffset-n.offset):(n=u(this,p).position(this.maxOffset*.8-this.animationStartOffset,i),this.offset=this.maxOffset*.8-n.offset),this.lastRaf=e,{done:n.done&&this.hasCommitted,fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset)}}pointerMove(e){return this.offset=this.fingerDragAdd(this.offset,e.movementX),this.pointerHistory.push({offset:this.offset,time:e.timeStamp}),this.pointerHistory.length>10&&this.pointerHistory.shift(),this.offset<0&&(this.offset=0),{done:!1,fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset)}}fingerDragAdd(e,i){return this.limitFingerDrag?e+.8*i:e+i}fgToBgOffset(e){return this.parallax?.25*(e-this.maxOffset):0}pointerUp(e){const i=-Math.max(-V(this.pointerHistory),-1.2);return console.log("offset",this.offset),console.log("velocity",i),(this.offset+i*100)/this.maxOffset<.3?(this.hasAborted=!0,u(this,R).initialVelocity=-i,"abort"):(u(this,p).initialVelocity=-i,"success")}}y=new WeakMap,p=new WeakMap,R=new WeakMap;let F,T,I=!1,w=!1,b=!1;const C=document.getElementById("scrim")??f(),$=document.getElementById("progress")??f(),x=document.getElementById("networkDelayInput")??f(),et=document.getElementById("networkDelayDisplay")??f(),st=document.getElementById("settingParallax")??f(),nt=document.getElementById("settingLimitFingerDrag")??f();let U="lightblue",P=0,E=100;function it(){E=E+1;const s=(E*185852+1)%34359738337/34359738337;return"#"+Math.floor(s*16777215).toString(16)}function ot(s){var t;((t=s.target)==null?void 0:t.id)!=""||I||(w=!0,h=M(),T=document.startViewTransition(),T.ready.then(()=>{U=document.documentElement.style.getPropertyValue("--main-background-color"),document.documentElement.style.setProperty("--main-background-color",it()),F=document.documentElement.animate({},{duration:0,pseudoElement:"::view-transition-new(root)"}),F.pause(),C.style.display="block"}))}function G(s){return .3+(1-s/document.documentElement.getBoundingClientRect().width)*.5}function rt(s){if(!w)return;let t=h.pointerMove(s);document.documentElement.style.setProperty("--fg-offset",`${t.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${t.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${G(t.fgOffset)}`)}function at(s){if(!w)return;w=!1,h.pointerUp(s)=="abort"&&(b=!0,E--),lt().then(()=>{document.documentElement.animate([{"--scrim":0}],{duration:100}).finished.then(S)})}let h=M();S();function K(s,t){const e=h.advance(s);document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${G(e.fgOffset)}`),s-P>800&&($.style.display="block"),e.done?t():requestAnimationFrame(i=>{K(i,t)})}function lt(){return I=!0,P=performance.now(),h.startAnimating(P),new Promise(s=>{K(performance.now(),s)})}function S(){I=!1,document.documentElement.style.setProperty("--fg-offset","0px"),document.documentElement.style.setProperty("--vertical-offset","0px"),document.documentElement.style.setProperty("--scrim","0.0"),b&&(document.documentElement.style.setProperty("--main-background-color",U),b=!1),F&&F.play(),C.style.display="none",$.style.display="none"}function M(){return new tt({networkDelay:parseFloat(x.value),targetOffset:document.documentElement.getBoundingClientRect().width,parallax:!!st.checked,limitFingerDrag:!!nt.checked})}function H(){et.innerHTML=x.value,h.updateDisplays(),h=M(),S()}function ft(){x.addEventListener("input",H),H(),window.addEventListener("pointerdown",ot),window.addEventListener("pointerup",at),window.addEventListener("pointermove",rt)}onload=ft;
