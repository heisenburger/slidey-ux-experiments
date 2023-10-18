import './style.css'
import { SpringPhysicsModel } from './SpringPhysicsModel.ts';
import { PhysicsModel } from './PhysicsModel.ts';
import { fail } from './util.ts';


let animating = false;
let pointingDown = false;
let aborting = false;
let hasCommitted = false;

// Tracking post commit animations.
let animatingLoadingBar = false;
let animatingScrim = false;

let screenshots = [
  "resources/srp-cats.png",
  "resources/srp-couches.png"
]
let nextImgIndex = 0;


const body = document.body ?? fail();
const scrim = document.getElementById("scrim") ?? fail();
const globalProgress = document.getElementById("globalProgress") ?? fail();
const attributedProgress = document.getElementById("attributedProgress") ?? fail();
const networkDelayInput = document.getElementById("networkDelayInput") as HTMLInputElement ?? fail();
const networkDelayDisplay = document.getElementById("networkDelayDisplay") as HTMLInputElement ?? fail();
const networkDelayLoadInput = document.getElementById("networkDelayLoadInput") as HTMLInputElement ?? fail();
const networkDelayLoadDisplay = document.getElementById("networkDelayLoadDisplay") as HTMLInputElement ?? fail();
const zoomDisplay = document.getElementById("zoomDisplay") as HTMLInputElement ?? fail();
const buttonTest = document.getElementById("buttonTest") as HTMLInputElement ?? fail();
const buttonSettings = document.getElementById("buttonSettings") as HTMLInputElement ?? fail();
const settingsPanel = document.getElementById("settingsPanel") ?? fail();
const screenshotsContainer = document.getElementById("screenshots") ?? fail();
const targetStopDisplay = document.getElementById("targetStopDisplay") ?? fail();

const frontimg = document.getElementById("frontimg")?.querySelector("img") as HTMLImageElement ?? fail();
const midimg = document.getElementById("midimg")?.querySelector("img") as HTMLImageElement ?? fail();
const backimg = document.getElementById("backimg")?.querySelector("img") as HTMLImageElement ?? fail();

const settingParallax = document.getElementById("settingParallax") as HTMLInputElement ?? fail();
const settingLimitFingerDrag = document.getElementById("settingLimitFingerDrag") as HTMLInputElement ?? fail();
const settingZoom = document.getElementById("settingZoom") as HTMLInputElement ?? fail();
const settingProgressAttribution = document.getElementById("settingProgressAttribution") as HTMLInputElement ?? fail();
const settingUnloadHandler = document.getElementById("settingUnloadHandler") as HTMLInputElement ?? fail();
const settingBoostVelocity = document.getElementById("settingBoostVelocity") as HTMLInputElement ?? fail();
const settingTargetStop = document.getElementById("settingTargetStop") as HTMLInputElement ?? fail();


let progress = attributedProgress;
let progress_bar = progress.querySelector(".bar") as HTMLProgressElement;

let lastColor = "lightblue";

let startTime = 0;
let commitTime = 0;
let loadTime = 0;

let bucket_name = ["P25", "P50", "P75", "P90", "P95", "P99"];
let bucket = [30, 100, 330, 660, 1000, 2360];

let zoom = 1.0;
let pop = 1.0;

function delayToFullLoadMs() {
  let commitDelay = bucket[parseInt(networkDelayInput.value)];
  let loadDelay = bucket[parseInt(networkDelayLoadInput.value)];
  return Math.max(commitDelay, loadDelay);
}

function handlePointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement)?.classList[0] != "touch-target" || animating) {
    return;
  }
  pointingDown = true;
  physicsModel = initPhysics();
}

function offsetToScrimPercent(offset:number) {
  let offsetAsPercent = offset / document.documentElement.getBoundingClientRect().width;
  return 0.3 + (1 - offsetAsPercent) * 0.5;
}

let popped = false;

function handlePointerMove(e: PointerEvent) {
  if (!pointingDown) {
    return;
  }

  let moveResult = physicsModel.pointerMove(e);
  console.log(moveResult);
  document.documentElement.style.setProperty("--fg-offset", `${moveResult.fgOffset}px`);
  document.documentElement.style.setProperty("--bg-offset", `${moveResult.bgOffset}px`);
  document.documentElement.style.setProperty("--scrim", `${offsetToScrimPercent(moveResult.fgOffset)}`);

  updateZoom(moveResult.fgOffset);
  updatePop(moveResult.fgOffset);
}

function updateZoom(offset: number) {
  let offsetAsPercent = offset / document.documentElement.getBoundingClientRect().width;
  let fgScale = 1.0 - (1.0 - pop) * offsetAsPercent;
  document.documentElement.style.setProperty("--fg-scale", `${fgScale}`);
}
function updatePop(offset:number) {
  let offsetAsPercent = offset / document.documentElement.getBoundingClientRect().width;
  if(offsetAsPercent > 0.5) {
    if(!popped) {
      let anim = document.documentElement.animate([{ '--bg-scale': pop }], { duration: 100, fill: "forwards" });
      anim.finished.then(() => {anim.commitStyles(); anim.cancel();});
      popped = true;
    }
  } else {
    if(popped) {
      let anim = document.documentElement.animate([{ '--bg-scale': zoom }], { duration: 100, fill: "forwards" });
      anim.finished.then(() => {anim.commitStyles(); anim.cancel();});
      popped = false;
    }
  }
}

function handlePointerUp(e: PointerEvent) {
  if (!pointingDown) {
    return;
  }
  pointingDown = false;
  hasCommitted = false;
  const aborted = physicsModel.pointerUp(e) == "abort";

  if (aborted) {
    animateOnAbort();
    // Reset the color when the animation finished.
    aborting = true;
  } else if (settingUnloadHandler.checked) {
    let offset = document.documentElement.style.getPropertyValue("--fg-offset");
    let scale = document.documentElement.style.getPropertyValue("--fg-scale");
    let p20 = document.documentElement.getBoundingClientRect().width * 10 / 100;
    let anim = document.documentElement.animate([{ '--fg-scale': 1.0, '--fg-offset': p20 + 'px' }], { duration: 300, fill: "forwards" });
    anim.finished.then(() => {
      anim.commitStyles();
      anim.cancel();
      if(window.confirm("are you sure you want to leave this page?  It's very nice.")) {
        let anim = document.documentElement.animate([{ '--fg-scale': scale, '--fg-offset': offset }], { duration: 200, fill: "forwards" });
        anim.finished.then(() => {
          anim.commitStyles();
          anim.cancel();
          animateOnAbort();
          startAnimation().then(animatePostCommitOrAbort);      
        });  
      }
    });
    return;
  }

  startAnimation().then(animatePostCommitOrAbort);
}

function animateOnCommit() {
  let anim = document.documentElement.animate([{ '--fg-scale': pop, '--bg-scale': 1.0 }], { duration: 100, fill: "forwards" });
  anim.finished.then(() => {anim.commitStyles(); anim.cancel(); });
}

function animateOnAbort() {
  let anim = document.documentElement.animate([{ '--fg-scale': 1.0, '--bg-scale': zoom }], { duration: 100, fill: "forwards" });
  anim.finished.then(() => {anim.commitStyles(); anim.cancel();});
}

function animatePostCommitOrAbort() {
  // scrim animation for screenshot to live, defaults to 100ms.
  animatingScrim = true;
  let scrimOut = document.documentElement.animate([{ '--scrim': 0 }], { duration: 100 });
  scrimOut.finished.then(finishScrimAnimation);

  animatingLoadingBar = !aborting;
  if (animatingLoadingBar) {
    animateLoadingProgressBar();
  } else {
    finishLoadingBarAnimation();
  }
}

function animateLoadingProgressBar() {
  let currentTime = performance.now();
  if (currentTime >= loadTime) {
    finishLoadingBarAnimation();
    return;
  }

  progress.style.display = "block";
  progress_bar.max = loadTime - startTime;
  progress_bar.value = currentTime - startTime;
  requestAnimationFrame(animateLoadingProgressBar);
}

let physicsModel: PhysicsModel = initPhysics();
finishAllAnimation();

function advance(rafTime: number, finished: (d?: unknown) => void) {
  const advanceResult = physicsModel.advance(rafTime);
  document.documentElement.style.setProperty("--fg-offset", `${advanceResult.fgOffset}px`);
  document.documentElement.style.setProperty("--bg-offset", `${advanceResult.bgOffset}px`);
  document.documentElement.style.setProperty("--scrim", `${offsetToScrimPercent(advanceResult.fgOffset)}`);
  updateZoom(advanceResult.fgOffset);
  if (rafTime-startTime > 800) {
     progress.style.display = "block";
  }
  if (advanceResult.hasCommitted && !hasCommitted) {
    animateOnCommit();
    hasCommitted = true;
  }
  if (advanceResult.done) {
    finished();
  } else {
    requestAnimationFrame((rafTime) => { advance(rafTime, finished) });
  }
}

function startAnimation() {
  animating = true;
  startTime = performance.now();
  commitTime = startTime + parseFloat(networkDelayInput.value);
  loadTime = startTime + delayToFullLoadMs();
  console.log("start : " + startTime + " commit : " + commitTime + " load : " + loadTime);
  physicsModel.startAnimating(startTime);
  return new Promise(resolve => {
    advance(performance.now(), resolve);
  });
}

function finishScrimAnimation() {
  animatingScrim = false;
  document.documentElement.style.setProperty("--fg-offset", '0px');
  document.documentElement.style.setProperty("--vertical-offset", '0px');
  document.documentElement.style.setProperty("--scrim", "0.0");
  document.documentElement.style.setProperty("--bg-scale", zoom.toString());
  document.documentElement.style.setProperty("--fg-scale", "1.0");

  if (aborting) {
    document.documentElement.style.setProperty("--main-background-color", lastColor);
    aborting = false;
  } else {
    rotateImgs();
  }

  if (!animatingLoadingBar)
    animating = false;
}

function finishLoadingBarAnimation() {
  animatingLoadingBar = false;
  progress.style.display = "none";
  progress_bar.removeAttribute('value');
  progress_bar.removeAttribute('max');

  if (!animatingScrim)
    animating = false;
}

function finishAllAnimation() {
  finishScrimAnimation();
  finishLoadingBarAnimation();
}

function initPhysics(): PhysicsModel {
  return new SpringPhysicsModel({
    networkDelay: bucket[parseInt(networkDelayInput.value)],
    targetOffset: document.documentElement.getBoundingClientRect().width,
    parallax: !!settingParallax.checked,
    limitFingerDrag: !!settingLimitFingerDrag.checked,
    boostVelocity: !!settingBoostVelocity.checked,
    targetStopPercent: parseFloat(settingTargetStop.value)
  });
}

function updateDisplays() {
  let bucketIndex = parseInt(networkDelayInput.value);
  networkDelayDisplay.innerHTML = bucket_name[bucketIndex] + "=" + bucket[bucketIndex].toString();
  networkDelayLoadDisplay.innerHTML = delayToFullLoadMs().toString();
  zoom = parseInt(settingZoom.value)/100.0;
  pop = zoom + (1.0 - zoom)/3; // 1/3 betwen zoom to 1.0
  zoomDisplay.innerHTML = settingZoom.value.toString();

  targetStopDisplay.innerHTML = `${100 * parseFloat(settingTargetStop.value)}`;

  physicsModel.updateDisplays();

  // This is a bit overkill, but with mode switching, these were sometimes getting out of sync.
  physicsModel = initPhysics();
  finishAllAnimation();
}

function rotateImgs() {
  frontimg.src = midimg.src;
  midimg.src = backimg.src;
  backimg.src = screenshots[nextImgIndex]
  nextImgIndex = (nextImgIndex + 1) % screenshots.length;
}

function runTest() {
  settingsPanel.style.display = "none";
  scrim.style.display = "block";
  screenshotsContainer.style.display = "block";
  body.classList.add("test");
}

function stopTest() {
  settingsPanel.style.display = "flex";
  scrim.style.display = "none";
  screenshotsContainer.style.display = "none";
  body.classList.remove("test");
}

function changeProgressAttribution() {
  if (!settingProgressAttribution.checked) {
    progress = globalProgress;
  } else {
    progress = attributedProgress;
  }
  progress_bar = progress.querySelector(".bar") as HTMLProgressElement;
}


function init() {
  networkDelayInput.addEventListener("input", updateDisplays);
  networkDelayLoadInput.addEventListener("input", updateDisplays);
  settingZoom.addEventListener("input", updateDisplays);
  settingTargetStop.addEventListener("input", updateDisplays);

  buttonTest.addEventListener("click", runTest);
  buttonSettings.addEventListener("click", stopTest);

  frontimg.src = screenshots[nextImgIndex];
  nextImgIndex = (nextImgIndex + 1) % screenshots.length;
  midimg.src = screenshots[nextImgIndex];
  nextImgIndex = (nextImgIndex + 1) % screenshots.length;
  backimg.src = screenshots[nextImgIndex];
  nextImgIndex = (nextImgIndex + 1) % screenshots.length;

  settingProgressAttribution.addEventListener("change", changeProgressAttribution);
  updateDisplays();



  window.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("pointermove", handlePointerMove);
}
onload = init
