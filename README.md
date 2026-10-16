# 🎙️ Vocal DSP Coach & EQ Assistant

A 100% browser-based, real-time vocal spectrum analyzer and DSP assistant. It analyzes your microphone's frequency response, room boominess, sibilance harshness, and dynamics directly in your browser using the Web Audio API—with zero backend, zero installation, and complete privacy.

Designed and optimized to run out-of-the-box on **GitHub Pages**!

---

## 🌐 Language & Accessibility / Kieli
- **Default Language:** English (EN)
- **Suomenkielinen tila:** Napsauta yläpalkin **🇫🇮 Suomi** -painiketta vaihtaaksesi koko käyttöliittymän, ääniohjeet ja suositukset suomeksi.

---

## 🔬 What is the Recommended EQ Curve and How is it Calculated?
The recommended EQ curve is **not** a generic static preset. It is dynamically generated using 4 acoustic pillars:

1. **Live High-Resolution FFT Spectral Analysis:**
   - Evaluates real-time energy across 8 key vocal zones: Sub-bass (<80Hz), Chest Body (80-240Hz), Room Mud (240-480Hz), Boxiness (480-1kHz), Nasal honk (1-2.4kHz), Presence/Diction (2.4-5.2kHz), Sibilance (5.2-9kHz), and Air (>9kHz).
2. **Microphone Acoustic Model Compensation:**
   - **Electro-Voice RE20:** Uses patented *Variable-D* ports along the body to virtually eliminate the proximity effect (bass buildup when close). Its low-mids are naturally flat and tight, so heavy 300Hz cuts are avoided to preserve broadcast authority.
   - **Shure SM7B:** Warm and thick in the low-mids with a rolled-off top end. It benefits from a +1.5dB to +2.5dB presence boost at 3.5kHz and a +3dB Air Shelf (10-12kHz) to open up vocal sparkle.
   - **Røde PodMic:** Features an aggressive 7-8kHz presence bump that can produce harsh sibilance. A de-harsh dip around 7kHz is applied.
   - **Condensers (AT2020, Blue Yeti):** Compensates for sensitive room capture, desk thumps, and high-frequency peaks.
3. **Target Vocal Contour (Voiceover Tilt):**
   - Compares your speech against professional broadcast target curves:
     - 🎙️ *Clear & Articulate (Podcast / YouTube / Stream)*
     - 📻 *Warm & Deep (Broadcast Radio / Low-End Authority)*
     - 🌿 *Natural & Transparent (Acoustic Speech)*
     - 🎮 *Punchy & Cutting (Discord / Gaming / Noisy Room)*
4. **Room & Distance Correction:**
   - Targets the exact resonant peaks caused by small room reflections and desk flutter.

---

## 🎛️ Key Features

1. **Dual-Tier EQ Recommendations:**
   - **⚡ Easy Mode (HPF + 3 EQ Bands):**
     - **HPF (High-Pass Filter):** Cuts handling thumps and mechanical rumble (<80 Hz).
     - **EQ 1 (Low-Mid Mud Cut):** Precision notch to remove muddy room boominess (Freq, Gain, Q).
     - **EQ 2 (Mid Boxiness Cut):** Removes hollow cardboard resonance around 600 Hz (Freq, Gain, Q).
     - **EQ 3 (High-Mid Presence Boost):** Lifts consonant articulation (k, p, t, s) at 3.4 kHz (Freq, Gain, Q).
   - **🎛️ Advanced Mode (7-Band Parametric EQ):**
     - Complete table with Filter Type, Frequency (Hz), Gain (dB), Q factor, and acoustic rationale.

2. **Full Dynamics Suite:**
   - **Compressor:** Threshold, Ratio, Attack (15ms to let consonants punch), Release, and Makeup Gain based on speech crest factor.
   - **De-Esser:** Targets measured sibilant peaks (e.g., 6.8 kHz) with exact threshold and max reduction.
   - **Noise Gate:** Hysteresis-based Open and Close thresholds calculated from room ambient noise.

3. **🎧 Live A/B Headphone Audition:**
   - Toggle real-time DSP monitoring in your headphones to compare `RAW` microphone audio with `PROCESSED` EQ and compression.

4. **1-Click Export:**
   - Direct copy for OBS Studio filters, Equalizer APO configuration, or human-readable summary.

---

## 🚀 How to Publish to GitHub Pages (3 Steps)

1. Create a repository on [github.com/new](https://github.com/new) (e.g. `vocal-dsp-coach`).
2. Push or upload these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Go to **Settings** &rarr; **Pages** &rarr; Select Branch **main** and Folder **/(root)** &rarr; **Save**.
Your live site will be accessible at:  
`https://<your-username>.github.io/<repo-name>/`
