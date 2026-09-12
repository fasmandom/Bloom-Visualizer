let visualizerTabId = null;
let youtubeTabId = null;
let musicTabId = null;
let captureRequestId = 0;

function log(...args) {
  console.log("[Bloom YouTube Link]", ...args);
}

async function ensureOffscreen() {
  const contexts = await chrome.runtime.getContexts({});
  if (contexts.some(context => context.contextType === "OFFSCREEN_DOCUMENT")) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["USER_MEDIA"],
    justification: "Analyze YouTube Music audio for the Bloom visualizer."
  });
}

async function startAudioCapture(tabId) {
  const requestId = ++captureRequestId;
  log("Starting tab audio capture", { tabId, visualizerTabId, requestId });
  await ensureOffscreen();
  await chrome.tabs.update(tabId, { active: true });
  await new Promise(resolve => setTimeout(resolve, 250));
  const streamId = await chrome.tabCapture.getMediaStreamId({ targetTabId: tabId });
  log("Received tab stream id", { requestId });
  await chrome.runtime.sendMessage({ target: "bloom-offscreen", type: "capture", streamId });
}

function stopAudioCapture() {
  chrome.runtime.sendMessage({ target: "bloom-offscreen", type: "stop" }).catch(() => {});
}

async function findOrOpenYouTubeMusic() {
  const tabs = await chrome.tabs.query({ url: "https://music.youtube.com/*" });
  if (tabs.length) {
    youtubeTabId = tabs[0].id;
    await chrome.tabs.update(youtubeTabId, { active: true });
    return youtubeTabId;
  }
  const tab = await chrome.tabs.create({ url: "https://music.youtube.com" });
  youtubeTabId = tab.id;
  return youtubeTabId;
}

async function findOrOpenMusic(provider) {
  const url = provider === "spotify" ? "https://open.spotify.com/*" : "https://music.youtube.com/*";
  const tabs = await chrome.tabs.query({ url });
  if (tabs.length) {
    musicTabId = tabs[0].id;
    await chrome.tabs.update(musicTabId, { active: true });
    return musicTabId;
  }
  const tab = await chrome.tabs.create({ url: provider === "spotify" ? "https://open.spotify.com" : "https://music.youtube.com" });
  musicTabId = tab.id;
  return tab.id;
}

function waitForTabReady(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, tab => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (tab.status === "complete") {
        resolve(tab);
        return;
      }

      const timeout = setTimeout(() => {
        chrome.tabs.onUpdated.removeListener(onUpdated);
        log("YouTube Music still reports loading; continuing with the active tab");
        resolve(tab);
      }, 15000);
      function onUpdated(updatedTabId, changeInfo, updatedTab) {
        if (updatedTabId !== tabId || changeInfo.status !== "complete") return;
        clearTimeout(timeout);
        chrome.tabs.onUpdated.removeListener(onUpdated);
        resolve(updatedTab);
      }
      chrome.tabs.onUpdated.addListener(onUpdated);
    });
  });
}

function requestYouTubeState(tabId) {
  return chrome.tabs.sendMessage(tabId, { source: "bloom-extension", type: "yt-get-state" })
    .then(() => log("Requested YouTube Music metadata", tabId))
    .catch(error => log("Metadata request will rely on content-script polling", String(error)));
}

function sendToVisualizer(message) {
  if (visualizerTabId !== null) {
    chrome.tabs.sendMessage(visualizerTabId, message).catch(() => {});
  }
}

chrome.runtime.onMessage.addListener((message, sender) => {
  log("Message", message.source, message.type || "");
  if (message.source === "bloom-visualizer") {
    visualizerTabId = sender.tab?.id ?? visualizerTabId;
    if (message.type === "yt-open" || message.type === "music-open") {
      const provider = message.provider || "youtube";
      findOrOpenMusic(provider).then(tabId => {
        musicTabId = tabId;
        requestYouTubeState(tabId);
        sendToVisualizer({
          source: "bloom-extension",
          type: "yt-awaiting-toolbar",
          tabId
        });
      }).catch(error => {
        console.error("[Bloom YouTube Link] Could not start YouTube mode", error);
        sendToVisualizer({ source: "bloom-extension", type: "yt-audio-unavailable", error: String(error) });
      });
    }
    if (message.type === "yt-close" || message.type === "music-close") {
      stopAudioCapture();
      sendToVisualizer({ source: "bloom-extension", type: "yt-disconnected" });
    }
    if (message.type === "yt-control") {
      if (youtubeTabId !== null) {
        chrome.tabs.sendMessage(youtubeTabId, {
          source: "bloom-extension",
          type: "yt-control",
          command: message.command
        }).catch(error => console.warn("[Bloom YouTube Link] Control failed", error));
      }
    }
    return;
  }

  if (message.source === "bloom-youtube" || message.source === "bloom-music") {
    youtubeTabId = sender.tab?.id ?? youtubeTabId;
    musicTabId = sender.tab?.id ?? musicTabId;
    sendToVisualizer({
      source: "bloom-extension",
      type: "yt-state",
      title: message.title,
      artwork: message.artwork,
      primaryColor: message.primaryColor
    });
  }

  if (message.source === "bloom-youtube-audio") {
    log("Audio sample", message.bass, message.rms);
    sendToVisualizer({
      source: "bloom-extension",
      type: "yt-audio",
      bass: message.bass,
      mid: message.mid,
      treb: message.treb,
      rms: message.rms
    });
  }

  if (message.source === "bloom-youtube-beat") {
    log("Beat detected", { flux: message.flux, threshold: message.threshold });
    sendToVisualizer({
      source: "bloom-extension",
      type: "yt-beat",
      flux: message.flux,
      threshold: message.threshold
    });
  }

  if (message.source === "bloom-youtube-audio-error") {
    console.error("[Bloom YouTube Link] Offscreen audio error", message.error);
    sendToVisualizer({ source: "bloom-extension", type: "yt-audio-unavailable", error: message.error });
  }
});

chrome.action.onClicked.addListener(tab => {
  const isSupportedTab = tab.url?.startsWith("https://music.youtube.com/") || tab.url?.startsWith("https://open.spotify.com/");
  if (!tab.id || !isSupportedTab) {
    log("Toolbar capture requires an active YouTube Music or Spotify tab");
    return;
  }
  youtubeTabId = tab.id;
  musicTabId = tab.id;
  waitForTabReady(tab.id).then(() => {
    requestYouTubeState(tab.id);
    return startAudioCapture(tab.id);
  }).catch(error => {
    console.error("[Bloom YouTube Link] Toolbar capture failed", error);
    sendToVisualizer({
      source: "bloom-extension",
      type: "yt-audio-unavailable",
      error: error?.message || String(error)
    });
  });
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (tabId === youtubeTabId || tabId === musicTabId) {
    youtubeTabId = null;
    musicTabId = null;
    stopAudioCapture();
    sendToVisualizer({ source: "bloom-extension", type: "yt-disconnected" });
  }
});
