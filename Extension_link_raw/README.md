# Bloom YouTube Music Link

This companion Chrome extension connects the Bloom HTML visualizer to YouTube Music or Spotify without screen sharing.

## Install

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select this `yt_music_link` folder.
4. Open the extension details and enable **Allow access to file URLs**.
5. Open `audio-visualizer.html` from the parent `music_visualizer` folder.
6. Click the YouTube Music or Spotify button in Bloom. A music tab opens.
7. While that music tab is active, click the Bloom extension icon in Chrome's toolbar to authorize and start audio analysis.
8. Return to Bloom. Its audio analysis now drives the visualizer.

The webpage does not play a second copy of the YouTube audio. Chrome tab capture is handled inside the extension and routed back through the captured tab's audio path.

Chrome only grants `activeTab` capture permission when the extension is invoked on the active music tab. If capture fails, reload the extension, activate YouTube Music or Spotify, and click the Bloom toolbar icon again.
