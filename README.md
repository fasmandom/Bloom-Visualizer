# 🌸 Bloom — Organic Audio Visualizer

**Bloom** is a zero-dependency, browser-based audio visualizer that transforms sound into a breathing, bioluminescent floral bloom. Built with pure HTML5 Canvas and the Web Audio API, Bloom dynamically translates audio frequencies, transients, and waveform amplitude into multi-layered petals, floating spores, fireflies, and camera physics.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Step-by-Step Tutorial](#-step-by-step-tutorial)
   - [Method 1: Playing Local Audio Files](#1-playing-local-audio-files)
   - [Method 2: Live Microphone / Line-In Input](#2-live-microphone--line-in-input)
   - [Method 3: YouTube Music & Spotify Integration (Chrome Extension)](#3-youtube-music--spotify-integration-chrome-extension)
4. [Interface & Controls Guide](#-interface--controls-guide)
5. [Keyboard & Mouse Shortcuts](#-keyboard--mouse-shortcuts)
6. [Technical Architecture](#-technical-architecture)
   - [Audio Processing Pipeline](#audio-processing-pipeline)
   - [Visual Layering & Particle Engine](#visual-layering--particle-engine)
   - [Beat Detection & Camera Physics](#beat-detection--camera-physics)
7. [Customization & Tweaks](#-customization--tweaks)
8. [Troubleshooting & FAQ](#-troubleshooting--faq)
9. [Roadmap](#-roadmap)

---

## ✨ Features

- **No Frameworks or Dependencies:** Single, self-contained `.html` file that runs instantly in any modern web browser.
- **Dynamic 3-Tier Petal Rings:**
  - **Inner Ring (12 petals):** Mapped to sub-bass and low frequencies for powerful core pulses.
  - **Middle Ring (24 petals):** Mapped to mid-range vocals, snares, and instruments.
  - **Outer Ring (48 petals):** Mapped to crisp high frequencies, hi-hats, and ambient sparkles.
- **Circular Oscilloscope Halo:** Real-time time-domain waveform circling the flower core.
- **Living Ecosystem Particles:**
  - Orbiting butterflies tethered to the floral field.
  - Floating bioluminescent spores ejected during heavy transients.
  - Ambient twinkling fireflies and floating bokeh lights.
  - Expanding shockwave ripples triggered by bass drops.
- **Physical Camera Feedback:** Bass-reactive camera thumps, subtle cinematic panning, and transient shake.
- **Flexible Audio Sources:** Local files (drag & drop or picker), live microphone input, and YouTube Music / Spotify streaming via the companion Chrome Extension.
- **Palette Modes:** Switch between dynamic RGB rainbow cycles and cohesive theme tones.
- **Accessibility Friendly:** Detects `prefers-reduced-motion` to tone down camera shakes and heavy bobbing.

---

## 🚀 Quick Start

Bloom requires no installation, npm packages, or server environment.

1. **Download:** Save `Bloom Visualizer.html` to your computer.
2. **Open:** Double-click the file to open it directly in your web browser (Chrome, Edge, Brave, Firefox, or Safari).
3. **Play:** Drag and drop any audio file (`.mp3`, `.wav`, `.flac`, `.ogg`, `.m4a`) onto the window, or click **"Choose a file"**.

*(Optional)* For the best experience, press **F11** (or **Cmd + Ctrl + F** on macOS) to switch your browser to **Full Screen Mode**.

---

## 📖 Step-by-Step Tutorial

### 1. Playing Local Audio Files

This is the primary offline mode for listening to your own music library, beat stems, or ambient soundscapes.

```
+-------------------------------------------------------------+
|                                                             |
|                    [ Drag & Drop Audio ]                    |
|                             or                              |
|                   Click "Choose a file"                     |
|                                                             |
+-------------------------------------------------------------+
```

1. **Load Track:**
   - Click the **Choose a file** button on the start screen, **or**
   - Click the **Upload (arrow up)** icon on the bottom dock, **or**
   - Simply drag an audio file from your file manager and drop it anywhere on the browser window.
2. **Control Playback:**
   - Use the **Play / Pause** button in the center of the dock.
   - Hover over the bottom dock to reveal the **time scrubber** slider.
   - Drag the slider to seek through the track.
3. **Toggle Loop:**
   - Click the **Loop** icon (`🔁`) on the dock to continuously repeat your favorite track or ambient background audio.

---

### 2. Live Microphone / Line-In Input

Bloom can visualize live instruments, vocals, voice chats, or ambient room audio.

1. Click the **Use microphone** button on the start screen or the **Microphone** icon (`🎤`) on the dock.
2. When your browser displays the permission prompt:
   - Select **"Allow"** to grant audio input access.
3. Sing, talk, or play music near your microphone. The bloom will pulse in real time.
4. **Pro Tip for System Audio Visualizing:**
   - To visualize audio playing from desktop apps (like Discord, DAW sessions, or games), route your desktop output to a virtual audio cable (such as *VB-Audio Cable* on Windows or *BlackHole* on macOS) and select that virtual cable as your browser's default microphone input.

---

### 3. YouTube Music & Spotify Integration (Chrome Extension)

Bloom features direct communication listeners designed to sync with YouTube Music and Spotify browser tabs using a companion Chrome Extension.

#### Setting Up the Extension:
If you want to set up the extension yourself:
1. Head over to the **`Extension_link_raw`** folder in this repository.
2. Inside the **`Extension_link_raw`** folder, you will find the extension source files along with a dedicated `README.md` that provides complete, step-by-step instructions on how to load and configure it in your browser (Developer Mode → "Load unpacked").

#### How to Connect Once Installed:
1. Open `Bloom Visualizer.html` in one browser tab.
2. Click the **YouTube Music** or **Spotify** button on the Bloom control dock to launch the web player tab.
3. On the music tab, click the **Bloom extension icon** in your browser toolbar to link audio streaming.
4. The extension will automatically:
   - Capture tab audio and analyze live frequency bands (Bass, Mid, Treble, RMS, and beat transients).
   - Transmit real-time audio analysis data directly to Bloom via secure window messaging.
   - Extract the currently playing track title and album artwork to project a blurred ambient backdrop.
   - Automatically adapt Bloom's color scheme to match the dominant colors of the song's album art.
5. Use Bloom's bottom dock controls to play, pause, or skip tracks directly from the visualizer.

---

## 🎛 Interface & Controls Guide

The floating glassmorphism dock at the bottom of the screen auto-hides when you are idle and wakes up on mouse movement, touch, or keypress.

```
+-----------------------------------------------------------------------------------------------+
| [Upload] [Prev]  ( Play/Pause )  [Next] [Mic] | [Loop] [YT Music] [Spotify] [Intensity] [Theme] |
+-----------------------------------------------------------------------------------------------+
```

| Icon / Control | Function | Description |
| :--- | :--- | :--- |
| **Dock Toggle Arrow** | Hide / Show Dock | Collapses the controls to enjoy an unobstructed visualization. |
| **Upload** (`↑`) | Select Local File | Opens the native file browser dialog. |
| **Previous / Next** | Track Skipping | Skips tracks when connected via the companion extension. |
| **Play / Pause** | Playback Toggle | Starts or pauses current local audio file (or connected streaming tab). |
| **Microphone** (`🎙`) | Audio Input | Switches input to the live microphone / default audio device. |
| **Loop** (`🔁`) | Repeat Track | Toggles continuous looping for local tracks. |
| **YT Music** | Stream Tab Link | Connects with YouTube Music tab via the extension in `Extension_link_raw`. |
| **Spotify** | Stream Tab Link | Connects with Spotify Web Player tab via the extension in `Extension_link_raw`. |
| **Sensitivity** (`📊`) | Visual Intensity | Cycles between **Calm (0.82x)**, **Balanced (1.0x)**, and **Intense (1.18x)**. |
| **Theme** (`🎨`) | Color Mode | Switches between dynamic cycling RGB mode and extracted cohesive theme tones. |

---

## ⌨ Keyboard & Mouse Shortcuts

| Action | Input | Behavior |
| :--- | :--- | :--- |
| **Play / Pause** | `Spacebar` | Toggles audio playback (when not focused on buttons). |
| **Play / Pause** | `Click Canvas` | Clicking anywhere on the visualizer canvas toggles play/pause. |
| **Wake Controls** | `Mouse Move / Keydown` | Automatically brings the floating control dock into view. |
| **Seek** | `Scrubber Drag` | Smoothly scrubs forward or backward through local audio. |
| **Fullscreen** | `F11` / `Cmd + Ctrl + F` | Hides browser chrome for a dedicated ambient display. |

---

## 🧠 Technical Architecture

Bloom is engineered to run at a consistent 60 FPS while keeping CPU/GPU utilization low.

```
                          [ Audio Source ]
             (Local File / Microphone / Tab Extension)
                                |
                                v
                       [ Web Audio API ]
                     AudioContext (1024 FFT)
                                |
             +------------------+------------------+
             |                                     |
    [ Frequency Data ]                    [ Time-Domain Data ]
   (getByteFrequencyData)                (getByteTimeDomainData)
             |                                     |
   +---------+---------+                           |
   |         |         |                           |
 Bass       Mid      Treble                        |
(12 Petals)(24 Petals)(48 Petals)         [ Oscilloscope Halo ]
   |         |         |                           |
   v         v         v                           v
  +--------------------------------------------------+
  |              HTML5 2D Canvas Engine              |
  |   - Petal Bezier Curves    - Shockwave Ripples   |
  |   - Drifting Fireflies     - Bioluminescent Spores|
  |   - Orbiting Butterflies   - Camera Punch & Shake |
  +--------------------------------------------------+
```

### Audio Processing Pipeline
- **FFT Size:** 1024 with a `smoothingTimeConstant` of `0.3` for responsive yet smooth transitions.
- **Frequency Spectrum Partitioning:**
  - **Bass:** Lower `0% – 8%` of frequency bins (dominant kick drum & sub frequencies).
  - **Mid:** `8% – 35%` of frequency bins (guitars, vocals, keys, snare bodies).
  - **Treble:** `35% – 100%` of frequency bins (air, hi-hats, vocal sibilance, cymbals).
- **Signal Normalization:** Linear interpolation (`lerp`) with exponential falloff prevents jittery visual artifacts.

### Visual Layering & Particle Engine
1. **Background Layer:** Dark navy/plum base gradient with dynamic chromatic edge glow.
2. **Backdrop Aurora & Bokeh:** Radial glow blobs that drift and pulse according to root-mean-square (RMS) energy.
3. **Shockwave Ripples:** Heavy transient hits instantiate expanding concentric shockwaves that dissipate outwards.
4. **Drifting Fireflies:** Autonomous particles modulated by double sine waves that speed up with musical activity.
5. **Petal Rings:** 3 concentric layers drawn using quadratic Bezier curve petal paths (`petalPath`).
6. **Oscilloscope Waveform:** Circular translated waveform loop mapped around the central floral core.
7. **Butterflies:** Procedurally animated fluttering wings orbiting within flower proximity.

### Beat Detection & Camera Physics
- An adaptive flux variance detector tracks transient energy spikes in the low bins (`bins 1–6`).
- When a spike exceeds standard deviations (`mean + 2.4 * stdDev`), a beat trigger fires:
  - Adds impulse energy to `bopEnergy`, `thumpEnergy`, and `shakeEnergy`.
  - Simulates physical camera movement via canvas translation and subtle scale punches.

---

## 🛠 Customization & Tweaks

Since Bloom is a single open HTML file, you can easily inspect and modify parameters in a text editor:

### Change Particle Counts
Open `Bloom Visualizer.html` and locate the particle initialization section (around line 430):
```javascript
const FIREFLY_COUNT = 30;   // Increase for denser ambient lighting (e.g. 50)
const SPORE_COUNT   = 34;   // Number of burst pollen spores (e.g. 60)
const BUTTERFLY_COUNT = 3;  // Number of orbiting butterflies
```

### Adjust Visual Sensitivity
Locate the sensitivity multiplier array:
```javascript
const sensitivities = [0.82, 1, 1.18]; // Add custom multipliers, e.g. [0.7, 1.0, 1.4]
```

### Custom Color Themes
Modify the root CSS variables at the top of the file to change default glow and interface accents:
```css
:root {
  --bg: #090a10;                     /* Main background darkness */
  --accent: hsl(250, 80%, 68%);      /* Primary control highlight */
  --edge-hue: 250;                   /* Border illumination hue */
  --edge-alpha: 0.04;                /* Peripheral glow intensity */
}
```

---

## ❓ Troubleshooting & FAQ

#### Q: The visualizer is silent or not reacting to my file.
- **Answer:** Ensure the file is a standard web-supported audio format (`.mp3`, `.wav`, `.ogg`, `.aac`, `.m4a`). If the browser blocks auto-play, click the center **Play** button on the dock.

#### Q: Microphone input isn't working.
- **Answer:** Check your browser's site permissions:
  - In Google Chrome, click the **tune icon** or **padlock** to the left of the URL bar and ensure **Microphone** is toggled to **Allow**.
  - Verify that the correct microphone is set as the default device in your operating system sound settings.

#### Q: How do I load the extension in Developer Mode?
- **Answer:** Refer directly to the `README.md` file located inside the `Extension_link_raw` folder in this repository for detailed step-by-step instructions on enabling Developer Mode and loading the extension unpacked.

#### Q: Can I run this offline?
- **Answer:** Yes! Bloom has zero external CDN links, web fonts, or remote assets. It functions 100% offline without an internet connection for local files and microphone input.

#### Q: How do I reduce motion if the camera movement makes me dizzy?
- **Answer:** Enable **"Reduce motion"** in your operating system accessibility preferences (or emulate `prefers-reduced-motion: reduce` in browser developer tools). Bloom will automatically disable camera shakes, thumps, and heavy oscillations while preserving the blooming petals.

---

## 🗺 Roadmap

- [x] HTML5 Canvas procedural flower visualizer
- [x] Multi-tier frequency petal splitting (Bass, Mid, Treble)
- [x] Local file audio playback with time scrubbing & looping
- [x] Live microphone input stream
- [x] Beat transient camera recoil & shockwave ripples
- [x] Chrome extension source available in `Extension_link_raw` folder with dedicated setup README
- [ ] Official Chrome Web Store one-click distribution
- [ ] Custom preset selector (Lotus, Neon Rose, Cyberpunk Sunflower)
- [ ] WebGL bloom shader mode for hardware-accelerated neon post-processing
- [ ] High-resolution canvas screenshot and video recording export

---

*Enjoy the music and watch it bloom.* 🌸
