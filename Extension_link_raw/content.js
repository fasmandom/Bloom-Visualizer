const isVisualizer = location.protocol === "file:" || location.hostname === "fasmandom.github.io";
const isSpotify = location.hostname === "open.spotify.com";

function safeSendMessage(message) {
  try {
    const result = chrome.runtime.sendMessage(message);
    if (result && typeof result.catch === "function") result.catch(() => {});
  } catch (error) {
    // The page may outlive a reloaded unpacked extension.
  }
}

async function getDominantColor(url) {
  if (!url) return null;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(bitmap, 0, 0, 24, 24);
    const pixels = context.getImageData(0, 0, 24, 24).data;
    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;
    for (let i = 0; i < pixels.length; i += 16) {
      if (pixels[i + 3] < 180) continue;
      r += pixels[i];
      g += pixels[i + 1];
      b += pixels[i + 2];
      count++;
    }
    return count ? { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) } : null;
  } catch (error) {
    console.warn("Bloom artwork color extraction failed", error);
    return null;
  }
}

async function sendState() {
  if (isVisualizer) return;
  const titleElement = isSpotify
    ? document.querySelector("[data-testid='now-playing-widget'] [data-testid='context-item-link'], [data-testid='now-playing-widget'] a")
    : document.querySelector("ytmusic-player-bar .title, ytmusic-player-bar [class*='title'], #player-bar .title");
  const title = (titleElement?.textContent || document.title.replace(/\s*-\s*(YouTube Music|Spotify)\s*$/i, "")).trim();
  const image = isSpotify
    ? document.querySelector("[data-testid='now-playing-widget'] img")
    : document.querySelector("ytmusic-player-bar img, #player-bar img, ytmusic-player-page img");
  const primaryColor = await getDominantColor(image?.src || "");
  safeSendMessage({
    source: isSpotify ? "bloom-music" : "bloom-youtube",
    title,
    artwork: image?.src || "",
    primaryColor
  });
}

if (isVisualizer) {
  window.addEventListener("message", event => {
    if (event.source !== window || event.data?.source !== "bloom-visualizer") return;
    safeSendMessage(event.data);
  });

  chrome.runtime.onMessage.addListener(message => {
    window.postMessage(message, "*");
  });
} else {
  function clickPlayerControl(command) {
    const selectors = {
      play: ["#play-pause-button", "ytmusic-player-bar #play-pause-button"],
      previous: ["#previous-button", "ytmusic-player-bar #previous-button"],
      next: ["#next-button", "ytmusic-player-bar #next-button"]
    };
    const button = (selectors[command] || []).map(selector => document.querySelector(selector)).find(Boolean);
    if (button) {
      button.click();
      return true;
    }
    return false;
  }

  chrome.runtime.onMessage.addListener(message => {
    if (message.source !== "bloom-extension") return;
    if (message.type === "yt-get-state") sendState().catch(() => {});
    if (message.type === "yt-control") {
      const command = message.command === "toggle-play" ? "play" : message.command;
      if (!clickPlayerControl(command)) {
        console.warn("[Bloom YouTube Link] YouTube control not found", command);
      }
    }
  });

  const observer = new MutationObserver(() => sendState().catch(() => {}));
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  setTimeout(() => sendState().catch(() => {}), 1500);
  setInterval(() => sendState().catch(() => {}), 3000);
}
