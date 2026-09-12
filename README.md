# 🌸 Bloom — Organic Audio Visualizer

**Bloom** is a zero-dependency, browser-based audio visualizer that transforms sound into a breathing, bioluminescent floral bloom. Built with pure HTML5 Canvas and the Web Audio API, Bloom dynamically translates audio frequencies, transients, and waveform amplitude into multi-layered petals, floating spores, fireflies, and camera physics.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Step-by-Step Tutorial](#-step-by-step-tutorial)
   - [Method 1: Playing Local Audio Files](#1-playing-local-audio-files)
   - [Method 2: Live Microphone / Line-In Input](#2-live-microphone--line-in-input)
   - [Method 3: YouTube Music & Spotify Integration *(Coming Soon)*](#3-youtube-music--spotify-integration-coming-soon)
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
- **Flexible Audio Sources:** Local files (drag & drop or picker), live microphone input, and planned Chrome Extension streaming hooks.
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

### 3. YouTube Music & Spotify Integration *(Coming Soon)*

Bloom includes built-in message receivers for a companion Chrome Extension currently under development.

#### How It Works:
- The dock includes dedicated **YouTube Music** and **Spotify** connection buttons.
- Clicking either button opens the respective streaming platform in a new tab.
- Once the upcoming **Bloom Chrome Extension** is installed:
  1. Open Bloom in one tab and YouTube Music or Spotify in another.
  2. Click the Bloom extension icon on the music player tab.
  3. The extension captures tab audio, extracts frequency bands (Bass, Mid, Treble, RMS, and beat transients), and syncs album art and track metadata directly into Bloom via secure window messaging.
  4. The background dynamically mirrors the album artwork, and the palette automatically extracts the dominant colors of the album cover!

> 💡 *Note: Until the Chrome Extension is published, clicking these buttons will launch the streaming web players in a new tab.*

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
| **Previous / Next** | Track Skipping | Reserved for streaming services via the companion extension. |
| **Play / Pause** | Playback Toggle | Starts or pauses current local audio file. |
| **Microphone** (`🎙`) | Audio Input | Switches input to the live microphone / default audio device. |
| **Loop** (`🔁`) | Repeat Track | Toggles continuous looping for local tracks. |
| **YT Music** | Stream Tab Link | Opens YouTube Music *(Extension link coming soon)*. |
| **Spotify** | Stream Tab Link | Opens Spotify Web Player *(Extension link coming soon)*. |
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

#### Q: Can I run this offline?
- **Answer:** Yes! Bloom has zero external CDN links, web fonts, or remote assets. It functions 100% offline without an internet connection.

#### Q: How do I reduce motion if the camera movement makes me dizzy?
- **Answer:** Enable **"Reduce motion"** in your operating system accessibility preferences (or emulate `prefers-reduced-motion: reduce` in browser developer tools). Bloom will automatically disable camera shakes, thumps, and heavy oscillations while preserving the blooming petals.

---

## 🗺 Roadmap

- [x] HTML5 Canvas procedural flower visualizer
- [x] Multi-tier frequency petal splitting (Bass, Mid, Treble)
- [x] Local file audio playback with time scrubbing & looping
- [x] Live microphone input stream
- [x] Beat transient camera recoil & shockwave ripples
- [ ] **Bloom Chrome Extension (In Progress):**
  - Instant one-click audio capture from YouTube Music, Spotify, SoundCloud, and Bandcamp tabs.
  - Automatic extraction of album artwork, track title, and artist name.
  - Dynamic palette matching based on album art colors.
- [ ] Custom preset selector (Lotus, Neon Rose, Cyberpunk Sunflower).
- [ ] WebGL bloom shader mode for hardware-accelerated neon post-processing.
- [ ] High-resolution canvas screenshot and video recording export.

---

*Enjoy the music and watch it bloom.* 🌸
