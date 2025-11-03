// ---------------- CONFIG ----------------
const STEP_REAL_TIME_MS = 1000; // update every 1 real second
const DISPLAY_INCREMENT = 3;    // +3 s shown per tick
const MAX_STEPS = 10;           // step 10 => show 30 s

// ---------------- STATE -----------------
let step = 0;          // 0..10 (shown seconds = step*3)
let timer = null;      // setInterval handle
let realSeconds = 0;   // counts only while running

// ---------------- ELEMENTS --------------
const displayEl = document.getElementById("display");
const stepInfoEl = document.getElementById("stepInfo");
const realTimeEl = document.getElementById("realTime");
const startBtn = document.getElementById("startBtn");
const stopBtn  = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// ---------------- RENDER ----------------
function render() {
  const shown = step * DISPLAY_INCREMENT;
  displayEl.textContent = `${shown} s`;
  stepInfoEl.textContent = `Step ${step} / ${MAX_STEPS}`;
  realTimeEl.textContent = `Real time: ${realSeconds} s`;  // NEW: render real-time

  const atMax = step >= MAX_STEPS;
  startBtn.disabled = !!timer || atMax;
  stopBtn.disabled  = !timer;
}

// ---------------- CORE LOGIC -----------
function tick() {
  // each real second: +1 real second, +3 shown seconds (via step++)
  if (step >= MAX_STEPS) {
    stop();
    return;
  }
  realSeconds += 1; // NEW: track real-time while running
  step += 1;
  render();

  if (step >= MAX_STEPS) {
    stop(); // auto-stop at 30s shown
  }
}

function start() {
  if (timer || step >= MAX_STEPS) return;
  timer = setInterval(tick, STEP_REAL_TIME_MS); // every real second
  render();
}

function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
  render();
}

function reset() {
  stop();
  step = 0;
  realSeconds = 0; // NEW: reset real-time too
  render();
}

// ---------------- INIT -----------------
document.addEventListener("DOMContentLoaded", () => {
  render();
  startBtn.addEventListener("click", start);
  stopBtn.addEventListener("click", stop);
  resetBtn.addEventListener("click", reset);
});
