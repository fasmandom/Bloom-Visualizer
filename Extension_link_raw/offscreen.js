let audioContext = null;
let analyser = null;
let source = null;
let stream = null;
let frequencyData = null;
let timeData = null;
let timer = null;
let previousBandEnergy = 0;
let fluxHistory = [];
let lastBeatTime = 0;
const HISTORY_SIZE = 35;
const MIN_BEAT_INTERVAL = 140;
const LOW_BIN = 1;
const HIGH_BIN = 6;

function log(...args) {
  console.log("[Bloom YouTube Link][offscreen]", ...args);
}

async function stopCapture() {
  if (timer) clearInterval(timer);
  timer = null;
  if (source) source.disconnect();
  if (audioContext) await audioContext.close();
  if (stream) stream.getTracks().forEach(track => track.stop());
  audioContext = null;
  analyser = null;
  source = null;
  stream = null;
  previousBandEnergy = 0;
  fluxHistory = [];
  lastBeatTime = 0;
}

async function startCapture(streamId) {
  try {
    log("Capture command received");
    await stopCapture();
    stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId
      }
    },
    video: false
    });
    log("Tab media stream opened");

  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.3;
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  timeData = new Uint8Array(analyser.fftSize);
  source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
  source.connect(audioContext.destination);
  log("Analyzer connected");

    timer = setInterval(() => {
    if (!analyser) return;
    analyser.getByteFrequencyData(frequencyData);
    analyser.getByteTimeDomainData(timeData);
    const bassEnd = Math.floor(frequencyData.length * 0.08);
    const midEnd = Math.floor(frequencyData.length * 0.35);
    let bass = 0;
    let mid = 0;
    let treb = 0;
    let sumSq = 0;
    let bandEnergy = 0;
    for (let i = LOW_BIN; i <= HIGH_BIN; i++) bandEnergy += frequencyData[i];
    bandEnergy /= HIGH_BIN - LOW_BIN + 1;
    const flux = Math.max(0, bandEnergy - previousBandEnergy);
    previousBandEnergy = bandEnergy;
    fluxHistory.push(flux);
    if (fluxHistory.length > HISTORY_SIZE) fluxHistory.shift();
    let mean = 0;
    for (let i = 0; i < fluxHistory.length; i++) mean += fluxHistory[i];
    mean /= fluxHistory.length || 1;
    let variance = 0;
    for (let i = 0; i < fluxHistory.length; i++) variance += (fluxHistory[i] - mean) ** 2;
    const threshold = mean + 2.4 * Math.sqrt(variance / (fluxHistory.length || 1)) + 1.5;
    const now = performance.now();
    if (flux > threshold && flux > 3 && now - lastBeatTime > MIN_BEAT_INTERVAL) {
      lastBeatTime = now;
      chrome.runtime.sendMessage({
        source: "bloom-youtube-beat",
        flux,
        threshold
      });
    }
    for (let i = 0; i < bassEnd; i++) bass += frequencyData[i];
    for (let i = bassEnd; i < midEnd; i++) mid += frequencyData[i];
    for (let i = midEnd; i < frequencyData.length; i++) treb += frequencyData[i];
    for (let i = 0; i < timeData.length; i++) {
      const value = (timeData[i] - 128) / 128;
      sumSq += value * value;
    }
      chrome.runtime.sendMessage({
      source: "bloom-youtube-audio",
      bass: bass / (bassEnd * 255),
      mid: mid / ((midEnd - bassEnd) * 255),
      treb: treb / ((frequencyData.length - midEnd) * 255),
      rms: Math.sqrt(sumSq / timeData.length)
      });
    }, 16);
  } catch (error) {
    console.error("[Bloom YouTube Link][offscreen] Audio capture failed", error);
    chrome.runtime.sendMessage({
      source: "bloom-youtube-audio-error",
      error: error?.message || String(error)
    });
    await stopCapture();
  }
}

chrome.runtime.onMessage.addListener(message => {
  if (message.target !== "bloom-offscreen") return;
  if (message.type === "capture") startCapture(message.streamId);
  if (message.type === "stop") stopCapture();
});
