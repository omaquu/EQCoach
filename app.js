/**
 * Vocal DSP Coach & EQ Assistant
 * 100% Client-side Web Audio API Speech Analyzer and Processor
 */

// --- GLOBAL AUDIO STATE ---
let audioCtx = null;
let mediaStream = null;
let sourceNode = null;
let analyserNode = null;
let auditionGainNode = null;
let isAuditionMonitoring = false;
let auditionMode = 'raw'; // 'raw' or 'processed'

// Audition DSP Nodes
let auditionHPF = null;
let auditionLowMud = null;
let auditionMidBox = null;
let auditionPresence = null;
let auditionSibilance = null;
let auditionHighAir = null;
let auditionCompressor = null;
let auditionMakeupGain = null;

// Metering & Analysis Buffers
let freqData = null;
let timeData = null;
let animationFrameId = null;
let isMicActive = false;

// Voice Benchmark Data (Calculated live or from 10s test)
let benchmarkData = {
  peakDb: -60,
  rmsDb: -60,
  noiseFloorDb: -58,
  crestFactor: 12,
  fundamentalFreq: 130,
  bandEnergy: {
    sub: -50,
    body: -30,
    mud: -32,
    box: -36,
    nasal: -38,
    presence: -40,
    sibilance: -45,
    air: -55
  },
  tested: false
};

// Test Runner State
let isTesting = false;
let testTimer = null;
let testSecondsLeft = 10;
let testVoicedSamples = [];
let testSilentSamples = [];

// Recommendations Object
let currentRecommendations = null;

// UI Elements
const micSelect = document.getElementById('micSelect');
const toggleMicBtn = document.getElementById('toggleMicBtn');
const micBtnText = document.getElementById('micBtnText');
const startTestBtn = document.getElementById('startTestBtn');
const rawAudioToggle = document.getElementById('rawAudioToggle');
const showCurveToggle = document.getElementById('showCurveToggle');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const canvas = document.getElementById('spectrumCanvas');
const ctx = canvas.getContext('2d');
const canvasOverlayNote = document.getElementById('canvasOverlayNote');

const peakMeterFill = document.getElementById('peakMeterFill');
const peakValueText = document.getElementById('peakValueText');
const rmsMeterFill = document.getElementById('rmsMeterFill');
const rmsValueText = document.getElementById('rmsValueText');
const noiseFloorText = document.getElementById('noiseFloorText');
const pitchValueText = document.getElementById('pitchValueText');

const testCard = document.getElementById('testCard');
const testCountdownBadge = document.getElementById('testCountdownBadge');
const testInstructionTitle = document.getElementById('testInstructionTitle');
const testInstructionText = document.getElementById('testInstructionText');
const testProgressBar = document.getElementById('testProgressBar');

const targetToneSelect = document.getElementById('targetToneSelect');
const diagnosisContent = document.getElementById('diagnosisContent');
const metricLow = document.getElementById('metricLow');
const metricMud = document.getElementById('metricMud');
const metricPresence = document.getElementById('metricPresence');
const metricSibilance = document.getElementById('metricSibilance');
const metricDynamicRange = document.getElementById('metricDynamicRange');

const tabEasy = document.getElementById('tabEasy');
const tabAdv = document.getElementById('tabAdv');
const easyModeContent = document.getElementById('easyModeContent');
const advModeContent = document.getElementById('advModeContent');
const easyCardsContainer = document.getElementById('easyCardsContainer');
const advTableBody = document.getElementById('advTableBody');

const compParamsContainer = document.getElementById('compParamsContainer');
const compDescText = document.getElementById('compDescText');
const compTipText = document.getElementById('compTipText');

const deessParamsContainer = document.getElementById('deessParamsContainer');
const deessDescText = document.getElementById('deessDescText');
const deessTipText = document.getElementById('deessTipText');

const gateParamsContainer = document.getElementById('gateParamsContainer');
const gateDescText = document.getElementById('gateDescText');
const gateTipText = document.getElementById('gateTipText');

const toggleAuditionBtn = document.getElementById('toggleAuditionBtn');
const auditionBtnText = document.getElementById('auditionBtnText');
const abToggleWrap = document.getElementById('abToggleWrap');
const btnRawSound = document.getElementById('btnRawSound');
const btnProcessedSound = document.getElementById('btnProcessedSound');

const copySummaryBtn = document.getElementById('copySummaryBtn');
const copyObsBtn = document.getElementById('copyObsBtn');
const copyApoBtn = document.getElementById('copyApoBtn');
const copyAlert = document.getElementById('copyAlert');

// Frequency Band Limits (Hz)
const BANDS = {
  sub: [20, 80],
  body: [80, 240],
  mud: [240, 480],
  box: [480, 1000],
  nasal: [1000, 2400],
  presence: [2400, 5200],
  sibilance: [5200, 9000],
  air: [9000, 20000]
};

// Canvas Frequency Bounds (Logarithmic)
const MIN_FREQ = 20;
const MAX_FREQ = 20000;
const MIN_DB = -90;
const MAX_DB = -6;

// Peak hold array for spectrum
let peakHoldSpectrum = new Float32Array(512);

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  initDeviceList();
  setupEventListeners();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Calculate initial baseline recommendations
  recalculateRecommendations();
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = 380 * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

// Enumerate input devices
async function initDeviceList() {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      micSelect.innerHTML = '<option value="">Mikrofonilistaa ei tueta</option>';
      return;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter(d => d.kind === 'audioinput');
    
    micSelect.innerHTML = '';
    if (audioInputs.length === 0) {
      micSelect.innerHTML = '<option value="">Ei mikrofoneja havaittu</option>';
      return;
    }

    audioInputs.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.text = device.label || `Mikrofoni ${index + 1}`;
      micSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Virhe laitteiden haussa:', err);
    micSelect.innerHTML = '<option value="">Mikin haku epäonnistui</option>';
  }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  toggleMicBtn.addEventListener('click', toggleMicrophone);
  startTestBtn.addEventListener('click', startVoiceTest);
  
  rawAudioToggle.addEventListener('change', () => {
    if (isMicActive) {
      // Restart mic stream with new constraints
      stopMicrophone();
      startMicrophone();
    }
  });

  micSelect.addEventListener('change', () => {
    if (isMicActive) {
      stopMicrophone();
      startMicrophone();
    }
  });

  targetToneSelect.addEventListener('change', () => {
    recalculateRecommendations();
  });

  tabEasy.addEventListener('click', () => {
    tabEasy.classList.add('active');
    tabAdv.classList.remove('active');
    easyModeContent.classList.add('active');
    advModeContent.classList.remove('active');
  });

  tabAdv.addEventListener('click', () => {
    tabAdv.classList.add('active');
    tabEasy.classList.remove('active');
    advModeContent.classList.add('active');
    easyModeContent.classList.remove('active');
  });

  toggleAuditionBtn.addEventListener('click', toggleAuditionMonitoring);
  btnRawSound.addEventListener('click', () => setAuditionMode('raw'));
  btnProcessedSound.addEventListener('click', () => setAuditionMode('processed'));

  copySummaryBtn.addEventListener('click', copySummaryToClipboard);
  copyObsBtn.addEventListener('click', copyObsToClipboard);
  copyApoBtn.addEventListener('click', copyApoToClipboard);
}

// --- MICROPHONE MANAGEMENT ---
async function toggleMicrophone() {
  if (isMicActive) {
    stopMicrophone();
  } else {
    await startMicrophone();
  }
}

async function startMicrophone() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    } else if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    const isRaw = rawAudioToggle.checked;
    const deviceId = micSelect.value ? { exact: micSelect.value } : undefined;

    const constraints = {
      audio: {
        deviceId: deviceId,
        echoCancellation: !isRaw,
        noiseSuppression: !isRaw,
        autoGainControl: !isRaw
      }
    };

    mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    // Refresh devices list with proper labels now that permission is granted
    initDeviceList();

    sourceNode = audioCtx.createMediaStreamSource(mediaStream);
    
    // Analyser setup (High FFT size 4096 gives ~11.7 Hz bin resolution)
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 4096;
    analyserNode.minDecibels = -100;
    analyserNode.maxDecibels = -6;
    analyserNode.smoothingTimeConstant = 0.75;

    freqData = new Uint8Array(analyserNode.frequencyBinCount);
    timeData = new Float32Array(analyserNode.fftSize);

    // Setup Audition DSP Chain (for headphone live preview)
    setupAuditionChain();

    // Connect source to analyser
    sourceNode.connect(analyserNode);

    isMicActive = true;
    toggleMicBtn.classList.remove('btn-primary');
    toggleMicBtn.classList.add('btn-secondary');
    micBtnText.textContent = 'Pysäytä mikrofoni';
    statusDot.classList.add('active');
    statusText.textContent = 'Reaaliaikainen signaali aktiivinen';
    startTestBtn.disabled = false;
    canvasOverlayNote.classList.add('hidden');

    // Start render & measurement loop
    renderLoop();
  } catch (err) {
    console.error('Mikrofonin käynnistys epäonnistui:', err);
    alert('Mikrofonin avaaminen epäonnistui. Varmista, että olet antanut selaimelle luvan käyttää mikrofonia.');
  }
}

function stopMicrophone() {
  isMicActive = false;
  if (isTesting) cancelVoiceTest();
  if (isAuditionMonitoring) stopAuditionMonitoring();

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }

  toggleMicBtn.classList.remove('btn-secondary');
  toggleMicBtn.classList.add('btn-primary');
  micBtnText.textContent = 'Käynnistä mikrofoni';
  statusDot.classList.remove('active');
  statusText.textContent = 'Mikrofoni ei aktiivinen';
  startTestBtn.disabled = true;
  canvasOverlayNote.classList.remove('hidden');

  peakValueText.textContent = '-∞ dBFS';
  rmsValueText.textContent = '-∞ dBFS';
  peakMeterFill.style.width = '0%';
  rmsMeterFill.style.width = '0%';
}

// --- AUDITION DSP CHAIN SETUP ---
function setupAuditionChain() {
  if (!audioCtx) return;

  // HPF
  auditionHPF = audioCtx.createBiquadFilter();
  auditionHPF.type = 'highpass';
  auditionHPF.frequency.value = 80;

  // Low-Mid Mud Bell
  auditionLowMud = audioCtx.createBiquadFilter();
  auditionLowMud.type = 'peaking';
  auditionLowMud.frequency.value = 320;
  auditionLowMud.gain.value = 0;
  auditionLowMud.Q.value = 1.5;

  // Mid Boxiness Bell
  auditionMidBox = audioCtx.createBiquadFilter();
  auditionMidBox.type = 'peaking';
  auditionMidBox.frequency.value = 650;
  auditionMidBox.gain.value = 0;
  auditionMidBox.Q.value = 2.0;

  // Presence Bell
  auditionPresence = audioCtx.createBiquadFilter();
  auditionPresence.type = 'peaking';
  auditionPresence.frequency.value = 3400;
  auditionPresence.gain.value = 0;
  auditionPresence.Q.value = 1.3;

  // Sibilance Notch/Bell
  auditionSibilance = audioCtx.createBiquadFilter();
  auditionSibilance.type = 'peaking';
  auditionSibilance.frequency.value = 6800;
  auditionSibilance.gain.value = 0;
  auditionSibilance.Q.value = 2.5;

  // Air Shelf
  auditionHighAir = audioCtx.createBiquadFilter();
  auditionHighAir.type = 'highshelf';
  auditionHighAir.frequency.value = 11000;
  auditionHighAir.gain.value = 0;

  // Dynamics Compressor
  auditionCompressor = audioCtx.createDynamicsCompressor();
  auditionCompressor.threshold.value = -18;
  auditionCompressor.knee.value = 6;
  auditionCompressor.ratio.value = 3.2;
  auditionCompressor.attack.value = 0.015;
  auditionCompressor.release.value = 0.080;

  // Makeup / Safety Gain
  auditionMakeupGain = audioCtx.createGain();
  auditionMakeupGain.gain.value = 1.0;

  // Master Audition Mute/Volume Node
  auditionGainNode = audioCtx.createGain();
  auditionGainNode.gain.value = 0.0; // muted by default until user enables headphones

  // Connect filter chain: HPF -> LowMud -> MidBox -> Presence -> Sibilance -> Air -> Comp -> Makeup -> AuditionGain -> Destination
  auditionHPF.connect(auditionLowMud);
  auditionLowMud.connect(auditionMidBox);
  auditionMidBox.connect(auditionPresence);
  auditionPresence.connect(auditionSibilance);
  auditionSibilance.connect(auditionHighAir);
  auditionHighAir.connect(auditionCompressor);
  auditionCompressor.connect(auditionMakeupGain);
  auditionMakeupGain.connect(auditionGainNode);
  auditionGainNode.connect(audioCtx.destination);
}

function updateAuditionFilters() {
  if (!currentRecommendations || !auditionHPF) return;

  if (auditionMode === 'raw') {
    // Flat response
    auditionHPF.frequency.setValueAtTime(20, audioCtx.currentTime);
    auditionLowMud.gain.setValueAtTime(0, audioCtx.currentTime);
    auditionMidBox.gain.setValueAtTime(0, audioCtx.currentTime);
    auditionPresence.gain.setValueAtTime(0, audioCtx.currentTime);
    auditionSibilance.gain.setValueAtTime(0, audioCtx.currentTime);
    auditionHighAir.gain.setValueAtTime(0, audioCtx.currentTime);
    auditionCompressor.threshold.setValueAtTime(0, audioCtx.currentTime);
    auditionCompressor.ratio.setValueAtTime(1, audioCtx.currentTime);
    auditionMakeupGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
  } else {
    // Processed with recommendations
    const adv = currentRecommendations.advEq;
    const comp = currentRecommendations.compressor;

    auditionHPF.frequency.setValueAtTime(adv[0].freq, audioCtx.currentTime);
    
    auditionLowMud.frequency.setValueAtTime(adv[2].freq, audioCtx.currentTime);
    auditionLowMud.gain.setValueAtTime(adv[2].gain, audioCtx.currentTime);
    auditionLowMud.Q.setValueAtTime(adv[2].q, audioCtx.currentTime);

    auditionMidBox.frequency.setValueAtTime(adv[3].freq, audioCtx.currentTime);
    auditionMidBox.gain.setValueAtTime(adv[3].gain, audioCtx.currentTime);
    auditionMidBox.Q.setValueAtTime(adv[3].q, audioCtx.currentTime);

    auditionPresence.frequency.setValueAtTime(adv[4].freq, audioCtx.currentTime);
    auditionPresence.gain.setValueAtTime(adv[4].gain, audioCtx.currentTime);
    auditionPresence.Q.setValueAtTime(adv[4].q, audioCtx.currentTime);

    auditionSibilance.frequency.setValueAtTime(adv[5].freq, audioCtx.currentTime);
    auditionSibilance.gain.setValueAtTime(adv[5].gain, audioCtx.currentTime);
    auditionSibilance.Q.setValueAtTime(adv[5].q, audioCtx.currentTime);

    auditionHighAir.frequency.setValueAtTime(adv[6].freq, audioCtx.currentTime);
    auditionHighAir.gain.setValueAtTime(adv[6].gain, audioCtx.currentTime);

    auditionCompressor.threshold.setValueAtTime(comp.threshold, audioCtx.currentTime);
    auditionCompressor.ratio.setValueAtTime(comp.ratioNum, audioCtx.currentTime);
    auditionCompressor.attack.setValueAtTime(comp.attackMs / 1000, audioCtx.currentTime);
    auditionCompressor.release.setValueAtTime(comp.releaseMs / 1000, audioCtx.currentTime);

    const linearMakeup = Math.pow(10, comp.makeupGain / 20);
    auditionMakeupGain.gain.setValueAtTime(Math.min(2.0, linearMakeup), audioCtx.currentTime);
  }
}

function toggleAuditionMonitoring() {
  if (!isMicActive) {
    alert('Käynnistä mikrofoni ensin!');
    return;
  }
  if (!isAuditionMonitoring) {
    startAuditionMonitoring();
  } else {
    stopAuditionMonitoring();
  }
}

function startAuditionMonitoring() {
  isAuditionMonitoring = true;
  sourceNode.connect(auditionHPF);
  auditionGainNode.gain.setValueAtTime(0.85, audioCtx.currentTime);
  
  toggleAuditionBtn.classList.remove('btn-secondary');
  toggleAuditionBtn.classList.add('btn-accent');
  auditionBtnText.textContent = 'Sammuta monitorointi';
  abToggleWrap.style.opacity = '1';
  abToggleWrap.style.pointerEvents = 'auto';

  updateAuditionFilters();
}

function stopAuditionMonitoring() {
  isAuditionMonitoring = false;
  if (auditionGainNode) {
    auditionGainNode.gain.setValueAtTime(0.0, audioCtx.currentTime);
  }
  try {
    sourceNode.disconnect(auditionHPF);
  } catch (e) {}

  toggleAuditionBtn.classList.remove('btn-accent');
  toggleAuditionBtn.classList.add('btn-secondary');
  auditionBtnText.textContent = 'Käynnistä monitorointi (Kuulokkeet)';
  abToggleWrap.style.opacity = '0.5';
  abToggleWrap.style.pointerEvents = 'none';
}

function setAuditionMode(mode) {
  auditionMode = mode;
  if (mode === 'raw') {
    btnRawSound.classList.add('active');
    btnProcessedSound.classList.remove('active');
  } else {
    btnProcessedSound.classList.add('active');
    btnRawSound.classList.remove('active');
  }
  updateAuditionFilters();
}

// --- 10S GUIDED VOICE TEST ---
function startVoiceTest() {
  if (!isMicActive) return;
  isTesting = true;
  testSecondsLeft = 10;
  testVoicedSamples = [];
  testSilentSamples = [];

  testCard.classList.remove('hidden');
  startTestBtn.disabled = true;
  testCountdownBadge.textContent = '10';
  testProgressBar.style.width = '0%';
  testInstructionTitle.textContent = 'Puhu mikrofoniin normaalilla äänellä';
  testInstructionText.innerHTML = 'Lue testilause: <em>"Yksi, kaksi, kolme... Tänään säädetään mikrofonin taajuusvaste, leikataan mutaisuus ja vaimennetaan liian terävät ässät."</em>';

  testTimer = setInterval(() => {
    testSecondsLeft--;
    testCountdownBadge.textContent = testSecondsLeft;
    const progressPercent = ((10 - testSecondsLeft) / 10) * 100;
    testProgressBar.style.width = `${progressPercent}%`;

    // Phase 2: Silence detection for noise floor & gate (last 3 seconds)
    if (testSecondsLeft === 3) {
      testCountdownBadge.style.background = '#0ea5e9';
      testInstructionTitle.textContent = 'Ole nyt täysin hiljaa (Taustamelun mittaus)';
      testInstructionText.textContent = 'Älä puhu, jotta saamme mitattua huoneesi pohjakohinan ja tuulettimet Noise Gatea varten.';
    }

    if (testSecondsLeft <= 0) {
      finishVoiceTest();
    }
  }, 1000);
}

function cancelVoiceTest() {
  if (testTimer) clearInterval(testTimer);
  isTesting = false;
  testCard.classList.add('hidden');
  startTestBtn.disabled = false;
}

function finishVoiceTest() {
  if (testTimer) clearInterval(testTimer);
  isTesting = false;
  testCard.classList.add('hidden');
  startTestBtn.disabled = false;

  // Process collected test samples
  processTestResults();
}

function processTestResults() {
  if (testVoicedSamples.length === 0) {
    alert('Ääntä ei havaittu riittävästi testin aikana. Yritä uudelleen ja puhu lähempänä mikrofonia.');
    return;
  }

  // 1. Calculate Average Voiced Spectral Energy
  const numBins = testVoicedSamples[0].spectrum.length;
  const avgSpectrum = new Float32Array(numBins);
  for (let s of testVoicedSamples) {
    for (let i = 0; i < numBins; i++) {
      avgSpectrum[i] += s.spectrum[i];
    }
  }
  for (let i = 0; i < numBins; i++) {
    avgSpectrum[i] /= testVoicedSamples.length;
  }

  // 2. Measure Peak & RMS
  let maxPeak = -999;
  let rmsSum = 0;
  for (let s of testVoicedSamples) {
    if (s.peak > maxPeak) maxPeak = s.peak;
    rmsSum += Math.pow(10, s.rms / 10);
  }
  const avgSpeechRms = 10 * Math.log10(rmsSum / testVoicedSamples.length);

  // 3. Measure Noise Floor from silence phase
  let noiseFloorDb = -58;
  if (testSilentSamples.length > 0) {
    let silentRmsSum = 0;
    for (let s of testSilentSamples) {
      silentRmsSum += Math.pow(10, s.rms / 10);
    }
    noiseFloorDb = 10 * Math.log10(silentRmsSum / testSilentSamples.length);
    noiseFloorDb = Math.min(-30, Math.max(-85, noiseFloorDb));
  }

  // 4. Fundamental Frequency (F0)
  const pitches = testVoicedSamples.filter(s => s.pitch > 65 && s.pitch < 320).map(s => s.pitch);
  const avgPitch = pitches.length > 0 ? pitches.reduce((a, b) => a + b, 0) / pitches.length : 125;

  // 5. Band Energy Averages
  const sampleRate = audioCtx.sampleRate;
  const nyquist = sampleRate / 2;
  const binWidth = nyquist / numBins;

  function getBandAverage(lowF, highF) {
    const startBin = Math.max(0, Math.floor(lowF / binWidth));
    const endBin = Math.min(numBins - 1, Math.ceil(highF / binWidth));
    let sum = 0, count = 0;
    for (let b = startBin; b <= endBin; b++) {
      sum += avgSpectrum[b];
      count++;
    }
    return count > 0 ? sum / count : -60;
  }

  benchmarkData = {
    peakDb: maxPeak,
    rmsDb: avgSpeechRms,
    noiseFloorDb: noiseFloorDb,
    crestFactor: maxPeak - avgSpeechRms,
    fundamentalFreq: Math.round(avgPitch),
    bandEnergy: {
      sub: getBandAverage(BANDS.sub[0], BANDS.sub[1]),
      body: getBandAverage(BANDS.body[0], BANDS.body[1]),
      mud: getBandAverage(BANDS.mud[0], BANDS.mud[1]),
      box: getBandAverage(BANDS.box[0], BANDS.box[1]),
      nasal: getBandAverage(BANDS.nasal[0], BANDS.nasal[1]),
      presence: getBandAverage(BANDS.presence[0], BANDS.presence[1]),
      sibilance: getBandAverage(BANDS.sibilance[0], BANDS.sibilance[1]),
      air: getBandAverage(BANDS.air[0], BANDS.air[1])
    },
    tested: true
  };

  recalculateRecommendations();

  // Scroll smoothly to results
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// --- RECOMMENDATION ENGINE ---
function recalculateRecommendations() {
  const target = targetToneSelect.value;
  const b = benchmarkData;

  // Analysis Ratios
  const subExcess = b.bandEnergy.sub - b.bandEnergy.body; // If > -8, heavy rumble
  const mudExcess = b.bandEnergy.mud - b.bandEnergy.presence; // High mud vs clarity
  const sibilanceHarshness = b.bandEnergy.sibilance - b.bandEnergy.presence; // High sibilance
  const airRollOff = b.bandEnergy.presence - b.bandEnergy.air;

  // Voice Diagnostic Text
  let diagHtml = '';
  let subDiag = '';
  let mudDiag = '';
  let presDiag = '';
  let sibDiag = '';

  if (b.tested) {
    diagHtml += `<strong>Äänitestin havainnot:</strong> Perustaajuutesi (F0) on keskimäärin <strong>${b.fundamentalFreq} Hz</strong>. `;
    if (subExcess > -10) {
      diagHtml += `Mikrofonissa on havaittavissa voimakasta matalaa jyminää tai tärinää (&lt;80 Hz). `;
      subDiag = 'Korkea (jyminää)';
    } else {
      subDiag = 'Puhdas';
    }

    if (mudExcess > 2.0) {
      diagHtml += `Huone- tai läheisyyskuminaa (280-350 Hz) on runsaasti, mikä tekee äänestä hieman puuromaisen. `;
      mudDiag = 'Korostunut (kuminaa)';
    } else {
      diagHtml += `Alakeskialue on hyvin tasapainossa. `;
      mudDiag = 'Tasapainoinen';
    }

    if (sibilanceHarshness > -4.0) {
      diagHtml += `Ässät (6-8 kHz) erottuvat voimakkaina ja terävinä, De-Esser on erittäin suositeltava. `;
      sibDiag = 'Terävä / Piikikäs';
    } else {
      diagHtml += `Konsonantit ja ässät soivat pehmeästi. `;
      sibDiag = 'Pehmeä';
    }

    presDiag = b.bandEnergy.presence > -45 ? 'Hyvä purevuus' : 'Vaatii nostoa';
  } else {
    diagHtml += `<strong>Oletusprofiili (reaaliaikainen mukautus):</strong> Tee 10s äänitesti saadaksesi juuri sinun huoneeseesi ja mikrofonillesi räätälöidyt arvot.`;
    subDiag = 'Normaali';
    mudDiag = 'Normaali';
    presDiag = 'Kohtalainen';
    sibDiag = 'Normaali';
  }

  // Update Metrics Badges
  metricLow.textContent = `${b.fundamentalFreq} Hz`;
  metricMud.textContent = mudDiag;
  metricPresence.textContent = presDiag;
  metricSibilance.textContent = sibDiag;
  metricDynamicRange.textContent = `${Math.round(b.crestFactor)} dB`;
  diagnosisContent.innerHTML = diagHtml;

  // --- COMPUTE EQ PARAMETERS BASED ON TARGET & MEASUREMENTS ---
  let hpfFreq = 80;
  let mudCutFreq = 320;
  let mudCutGain = -3.0;
  let mudCutQ = 1.6;

  let boxCutFreq = 620;
  let boxCutGain = -2.0;
  let boxCutQ = 2.0;

  let presBoostFreq = 3400;
  let presBoostGain = 2.5;
  let presBoostQ = 1.3;

  let deharshFreq = 6800;
  let deharshGain = -2.0;
  let deharshQ = 2.5;

  let airShelfFreq = 11000;
  let airShelfGain = 2.0;

  let lowWarmthFreq = Math.max(100, Math.min(180, b.fundamentalFreq * 1.1));
  let lowWarmthGain = 0.0;

  // Fine-tune by Voice Test
  if (b.tested) {
    if (subExcess > -10) hpfFreq = 95;
    if (mudExcess > 3.0) mudCutGain = -4.5;
    if (mudExcess < 0.0) mudCutGain = -1.5;
    if (sibilanceHarshness > -3.0) deharshGain = -3.5;
  }

  // Modulate according to Target Profile
  if (target === 'podcast') {
    // Clear, punchy, articulate modern sound
    hpfFreq = Math.max(80, hpfFreq);
    mudCutGain -= 0.5;
    presBoostGain = 3.0;
    airShelfGain = 2.5;
  } else if (target === 'radio') {
    // Warm, deep broadcast sound with rich chest resonance
    hpfFreq = 70;
    lowWarmthGain = 2.0;
    mudCutGain = -2.0;
    presBoostGain = 1.5;
    presBoostFreq = 3000;
    airShelfGain = 0.5;
  } else if (target === 'natural') {
    // Transparent, minimal surgical cuts
    mudCutGain = -1.5;
    boxCutGain = -1.0;
    presBoostGain = 1.0;
    airShelfGain = 1.0;
  } else if (target === 'gaming') {
    // Aggressive cuts for noisy environments, discord, streams
    hpfFreq = 95;
    mudCutGain = -4.5;
    boxCutGain = -2.5;
    presBoostGain = 4.0;
    presBoostFreq = 3200;
    airShelfGain = 1.5;
  }

  // EASY MODE 3-POINTS
  const easyCards = [
    {
      step: '1',
      title: 'Ylipäästösuodatin (HPF / Low Cut)',
      type: 'High-Pass',
      freq: `${Math.round(hpfFreq)} Hz`,
      gain: 'Leikkaus',
      gainClass: 'cut',
      q: '12 dB/oct',
      why: 'Leikkaa pois mikrofonin käsittelyäänet, pöytätärinät ja alle 80 Hz pohjamörinän, jota ihmisäänessä ei tarvita.'
    },
    {
      step: '2',
      title: 'Mutaisuuden siivous (Mud Cut)',
      type: 'Bell / Peaking',
      freq: `${Math.round(mudCutFreq)} Hz`,
      gain: `${mudCutGain.toFixed(1)} dB`,
      gainClass: 'cut',
      q: mudCutQ.toFixed(1),
      why: 'Poistaa tunkkaisen "pahvilaatikkosoundin" ja huonekaiun kumun, jolloin puhe erottuu heti kirkkaammin taustamusiikista.'
    },
    {
      step: '3',
      title: 'Selkeyden ja puheen nosto (Presence)',
      type: 'Bell / Peaking',
      freq: `${(presBoostFreq / 1000).toFixed(1)} kHz`,
      gain: `+${presBoostGain.toFixed(1)} dB`,
      gainClass: 'boost',
      q: presBoostQ.toFixed(1),
      why: 'Tuo konsonantit (k, p, t, s) ja puheen artikulaation esiin ilman äänenvoimakkuuden nostamista.'
    }
  ];

  // ADVANCED MODE TABLE
  const advEq = [
    { band: 1, type: 'High-Pass (HPF)', freq: Math.round(hpfFreq), gain: 0, q: 0.71, gainDisplay: '18 dB/oct', gainClass: 'pass', why: 'Eliminoi pöydän tärinät, tuuletinmörinät ja plosiivit (p- ja b-paukahdukset).' },
    { band: 2, type: 'Low Bell / Warmth', freq: Math.round(lowWarmthFreq), gain: lowWarmthGain, q: 1.4, gainDisplay: lowWarmthGain > 0 ? `+${lowWarmthGain.toFixed(1)} dB` : '0 dB', gainClass: lowWarmthGain > 0 ? 'boost' : 'pass', why: 'Puheen luonnollisen kehon ja rintaäänen lämpö.' },
    { band: 3, type: 'Bell (Mud)', freq: Math.round(mudCutFreq), gain: mudCutGain, q: mudCutQ, gainDisplay: `${mudCutGain.toFixed(1)} dB`, gainClass: 'cut', why: 'Puhdistaa huoneheijastukset ja puuromaisen 300 Hz kumun.' },
    { band: 4, type: 'Bell (Boxy)', freq: Math.round(boxCutFreq), gain: boxCutGain, q: boxCutQ, gainDisplay: `${boxCutGain.toFixed(1)} dB`, gainClass: 'cut', why: 'Poistaa onttoa, muovista tai tynnyrimäistä sointia.' },
    { band: 5, type: 'Bell (Presence)', freq: Math.round(presBoostFreq), gain: presBoostGain, q: presBoostQ, gainDisplay: `+${presBoostGain.toFixed(1)} dB`, gainClass: 'boost', why: 'Parantaa puheen ymmärrettävyyttä ja modernia läsnäoloa.' },
    { band: 6, type: 'Bell (De-Harsh)', freq: Math.round(deharshFreq), gain: deharshGain, q: deharshQ, gainDisplay: `${deharshGain.toFixed(1)} dB`, gainClass: 'cut', why: 'Pehmentää teräviä metallisia mikrofoniheijastuksia ja ässiä.' },
    { band: 7, type: 'High Shelf (Air)', freq: Math.round(airShelfFreq), gain: airShelfGain, q: 0.71, gainDisplay: `+${airShelfGain.toFixed(1)} dB`, gainClass: 'boost', why: 'Lisää studiomaista ilmavuutta ja hengittävyyttä äänen yläpäähän.' }
  ];

  // DYNAMICS: COMPRESSOR
  let compRatio = '3.0 : 1';
  let compRatioNum = 3.0;
  let compThreshold = Math.round(b.rmsDb - 2.5);
  compThreshold = Math.max(-28, Math.min(-12, compThreshold));
  let compAttack = 15;
  let compRelease = 80;
  let compMakeup = Math.abs(compThreshold) > 16 ? 3.5 : 2.5;

  if (target === 'radio') {
    compRatio = '2.5 : 1';
    compRatioNum = 2.5;
    compAttack = 25;
    compRelease = 110;
  } else if (target === 'gaming') {
    compRatio = '4.5 : 1';
    compRatioNum = 4.5;
    compAttack = 10;
    compRelease = 65;
    compMakeup += 1.0;
  }

  // DYNAMICS: DE-ESSER
  let deessFreq = Math.round(deharshFreq);
  let deessThreshold = Math.round(b.rmsDb - 5);
  deessThreshold = Math.max(-32, Math.min(-16, deessThreshold));
  let deessReduction = sibilanceHarshness > -3.0 ? -6.0 : -4.0;

  // DYNAMICS: NOISE GATE
  let gateOpenThreshold = Math.round(b.noiseFloorDb + 7);
  gateOpenThreshold = Math.max(-55, Math.min(-32, gateOpenThreshold));
  let gateCloseThreshold = gateOpenThreshold - 5;
  let gateAttack = 2;
  let gateHold = 60;
  let gateRelease = 180;

  if (target === 'gaming') {
    gateOpenThreshold += 3; // tighter gate for mechanical keyboards
    gateCloseThreshold = gateOpenThreshold - 4;
    gateHold = 40;
    gateRelease = 140;
  }

  currentRecommendations = {
    target,
    easyCards,
    advEq,
    compressor: {
      threshold: compThreshold,
      ratio: compRatio,
      ratioNum: compRatioNum,
      attackMs: compAttack,
      releaseMs: compRelease,
      makeupGain: compMakeup
    },
    deesser: {
      freq: deessFreq,
      threshold: deessThreshold,
      reduction: deessReduction,
      q: 2.2
    },
    gate: {
      openThreshold: gateOpenThreshold,
      closeThreshold: gateCloseThreshold,
      attackMs: gateAttack,
      holdMs: gateHold,
      releaseMs: gateRelease
    }
  };

  // Render to DOM
  renderEasyModeCards();
  renderAdvancedTable();
  renderDynamicsCards();

  // If audition active, update DSP
  if (isAuditionMonitoring) {
    updateAuditionFilters();
  }
}

// --- RENDER FUNCTIONS FOR UI ---
function renderEasyModeCards() {
  easyCardsContainer.innerHTML = '';
  currentRecommendations.easyCards.forEach(c => {
    const card = document.createElement('div');
    card.className = 'easy-eq-card';
    card.innerHTML = `
      <div class="easy-card-header">
        <span class="card-step-badge">${c.step}</span>
        <h4>${c.title}</h4>
      </div>
      <div class="easy-card-values">
        <div class="val-box">
          <span class="val-title">Taajuus</span>
          <span class="val-number">${c.freq}</span>
        </div>
        <div class="val-box">
          <span class="val-title">Gain</span>
          <span class="val-number ${c.gainClass}">${c.gain}</span>
        </div>
        <div class="val-box">
          <span class="val-title">Q-Arvo</span>
          <span class="val-number neutral">${c.q}</span>
        </div>
      </div>
      <p class="easy-card-why">${c.why}</p>
    `;
    easyCardsContainer.appendChild(card);
  });
}

function renderAdvancedTable() {
  advTableBody.innerHTML = '';
  currentRecommendations.advEq.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="band-chip">${row.band}</span></td>
      <td><strong>${row.type}</strong></td>
      <td class="table-num">${row.freq} Hz</td>
      <td><span class="gain-tag ${row.gainClass}">${row.gainDisplay}</span></td>
      <td class="table-num">Q ${row.q.toFixed(2)}</td>
      <td style="color: var(--text-muted);">${row.why}</td>
    `;
    advTableBody.appendChild(tr);
  });
}

function renderDynamicsCards() {
  const comp = currentRecommendations.compressor;
  compParamsContainer.innerHTML = `
    <div class="param-pill">
      <span class="param-name">Kynnystaso (Threshold)</span>
      <span class="param-val" style="color: var(--accent-blue);">${comp.threshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Suhde (Ratio)</span>
      <span class="param-val">${comp.ratio}</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Reagointi (Attack)</span>
      <span class="param-val">${comp.attackMs} ms</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Palautus (Release)</span>
      <span class="param-val">${comp.releaseMs} ms</span>
    </div>
    <div class="param-pill" style="grid-column: span 2;">
      <span class="param-name">Korvausvahvistus (Makeup Gain)</span>
      <span class="param-val" style="color: var(--accent-emerald);">+${comp.makeupGain.toFixed(1)} dB</span>
    </div>
  `;

  const deess = currentRecommendations.deesser;
  deessParamsContainer.innerHTML = `
    <div class="param-pill">
      <span class="param-name">Kohdetaajuus (Frequency)</span>
      <span class="param-val" style="color: var(--accent-purple);">${deess.freq} Hz</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Kynnysarvo (Threshold)</span>
      <span class="param-val">${deess.threshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Maksimivaimennus (Range)</span>
      <span class="param-val" style="color: var(--accent-rose);">${deess.reduction} dB</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Kaistanleveys (Q)</span>
      <span class="param-val">${deess.q}</span>
    </div>
  `;

  const gate = currentRecommendations.gate;
  gateParamsContainer.innerHTML = `
    <div class="param-pill">
      <span class="param-name">Avauskynnys (Open)</span>
      <span class="param-val" style="color: var(--accent-emerald);">${gate.openThreshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Sulkukynnys (Close)</span>
      <span class="param-val">${gate.closeThreshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Avautumisaika (Attack)</span>
      <span class="param-val">${gate.attackMs} ms</span>
    </div>
    <div class="param-pill">
      <span class="param-name">Pitoaika (Hold)</span>
      <span class="param-val">${gate.holdMs} ms</span>
    </div>
    <div class="param-pill" style="grid-column: span 2;">
      <span class="param-name">Vaimennusaika (Release)</span>
      <span class="param-val">${gate.releaseMs} ms</span>
    </div>
  `;
}

// --- REAL-TIME RENDER & AUDIO ANALYSIS LOOP ---
function renderLoop() {
  if (!isMicActive) return;

  animationFrameId = requestAnimationFrame(renderLoop);

  analyserNode.getByteFrequencyData(freqData);
  analyserNode.getFloatTimeDomainData(timeData);

  // 1. Calculate Peak and RMS from Time Domain
  let peak = 0;
  let sumSq = 0;
  for (let i = 0; i < timeData.length; i++) {
    const val = Math.abs(timeData[i]);
    if (val > peak) peak = val;
    sumSq += val * val;
  }
  const rms = Math.sqrt(sumSq / timeData.length);
  const peakDb = peak > 0.00001 ? 20 * Math.log10(peak) : -90;
  const rmsDb = rms > 0.00001 ? 20 * Math.log10(rms) : -90;

  // Update Meter DOM
  updateMeterDisplay(peakDb, rmsDb);

  // 2. Pitch / F0 Estimation (Autocorrelation in 70-350 Hz)
  const pitch = estimatePitch(timeData, audioCtx.sampleRate);
  if (pitch > 65 && pitch < 350 && rmsDb > -38) {
    pitchValueText.textContent = `${Math.round(pitch)} Hz`;
  }

  // 3. Collect Data if 10s Test is Active
  if (isTesting) {
    if (testSecondsLeft > 3) {
      // Voiced Phase: Record if user is talking (RMS > -42 dB)
      if (rmsDb > -42) {
        testVoicedSamples.push({
          peak: peakDb,
          rms: rmsDb,
          pitch: pitch,
          spectrum: new Uint8Array(freqData)
        });
      }
    } else {
      // Silent Phase: Record room tone
      testSilentSamples.push({
        rms: rmsDb,
        peak: peakDb
      });
    }
  }

  // 4. Draw Spectrum on Canvas
  drawSpectrum(freqData);
}

function updateMeterDisplay(peakDb, rmsDb) {
  peakValueText.textContent = `${peakDb.toFixed(1)} dB`;
  rmsValueText.textContent = `${rmsDb.toFixed(1)} dB`;

  // Scale -60 dB -> 0 dB to 0% -> 100%
  const peakPct = Math.max(0, Math.min(100, ((peakDb + 60) / 60) * 100));
  const rmsPct = Math.max(0, Math.min(100, ((rmsDb + 60) / 60) * 100));

  peakMeterFill.style.width = `${peakPct}%`;
  rmsMeterFill.style.width = `${rmsPct}%`;

  if (benchmarkData.tested) {
    noiseFloorText.textContent = `${benchmarkData.noiseFloorDb.toFixed(1)} dBFS`;
  } else {
    // Live estimate: slow upward crawl, fast downward fall
    if (rmsDb < -48) {
      noiseFloorText.textContent = `${rmsDb.toFixed(1)} dBFS`;
    }
  }
}

// Simple Autocorrelation for vocal pitch detection
function estimatePitch(buffer, sampleRate) {
  const SIZE = buffer.length;
  let r1 = 0, r2 = SIZE - 1;
  const thres = 0.05;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  }
  const buf = buffer.slice(r1, r2);
  const c = new Array(buf.length).fill(0);
  for (let i = 0; i < buf.length; i++) {
    for (let j = 0; j < buf.length - i; j++) {
      c[i] = c[i] + buf[j] * buf[j + i];
    }
  }
  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < buf.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;
  return sampleRate / T0;
}

// --- SPECTRUM & EQ CURVE CANVAS DRAWING ---
function freqToX(freq, width) {
  const minLog = Math.log10(MIN_FREQ);
  const maxLog = Math.log10(MAX_FREQ);
  const logF = Math.log10(Math.max(MIN_FREQ, Math.min(MAX_FREQ, freq)));
  return ((logF - minLog) / (maxLog - minLog)) * width;
}

function xToFreq(x, width) {
  const minLog = Math.log10(MIN_FREQ);
  const maxLog = Math.log10(MAX_FREQ);
  return Math.pow(10, minLog + (x / width) * (maxLog - minLog));
}

function dbToY(db, height) {
  // Map -90 dB to -6 dB
  const clamped = Math.max(MIN_DB, Math.min(MAX_DB, db));
  const range = MAX_DB - MIN_DB;
  return height - ((clamped - MIN_DB) / range) * height;
}

function drawSpectrum(data) {
  const width = canvas.width / window.devicePixelRatio;
  const height = 380;

  ctx.clearRect(0, 0, width, height);

  // 1. Draw Grid Lines & Frequencies
  const gridFreqs = [30, 60, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
  ctx.strokeStyle = '#1b2432';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px "JetBrains Mono", monospace';

  for (let f of gridFreqs) {
    const x = freqToX(f, width);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();

    const label = f >= 1000 ? `${f / 1000}k` : `${f}`;
    ctx.fillText(label, x + 3, height - 8);
  }

  // Horizontal dB grid lines (-12, -24, -36, -48, -60, -72)
  const dbLines = [-12, -24, -36, -48, -60, -72];
  for (let db of dbLines) {
    const y = dbToY(db, height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    ctx.fillText(`${db} dB`, 6, y - 4);
  }

  // 2. Draw Real-Time Spectrum Fill and Outline
  const nyquist = audioCtx ? audioCtx.sampleRate / 2 : 24000;
  const numBins = data.length;
  const binWidth = nyquist / numBins;

  ctx.beginPath();
  ctx.moveTo(0, height);

  const numPoints = Math.floor(width);
  for (let x = 0; x < width; x += 2) {
    const freq = xToFreq(x, width);
    const bin = Math.min(numBins - 1, Math.round(freq / binWidth));
    const byteVal = data[bin];
    // Map byteVal (0..255) to dB (-100..-6)
    const db = -100 + (byteVal / 255) * 94;
    const y = dbToY(db, height);

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.lineTo(width, height);
  ctx.closePath();

  // Gradient Fill
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, 'rgba(0, 242, 254, 0.45)');
  grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.05)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Spectrum Stroke Line
  ctx.beginPath();
  for (let x = 0; x < width; x += 2) {
    const freq = xToFreq(x, width);
    const bin = Math.min(numBins - 1, Math.round(freq / binWidth));
    const byteVal = data[bin];
    const db = -100 + (byteVal / 255) * 94;
    const y = dbToY(db, height);

    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#00f2fe';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // 3. Draw Recommended EQ Curve Overlay (Amber / Gold)
  if (showCurveToggle.checked && currentRecommendations) {
    drawEqResponseCurve(width, height);
  }
}

// Draw mathematical filter curve response on canvas
function drawEqResponseCurve(width, height) {
  const adv = currentRecommendations.advEq;
  const zeroY = dbToY(-36, height); // Let 0 dB on EQ correspond to -36 dBFS grid line

  // Draw 0 dB EQ Reference Line
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(0, zeroY);
  ctx.lineTo(width, zeroY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('0 dB EQ Ref', width - 85, zeroY - 4);

  // Compute composite response for each X pixel
  ctx.beginPath();
  for (let x = 0; x < width; x += 2) {
    const freq = xToFreq(x, width);
    let totalGainDb = 0;

    // HPF response (18 dB/oct butterworth approximation)
    const hpfF = adv[0].freq;
    if (freq < hpfF) {
      const octavesBelow = Math.log2(hpfF / Math.max(1, freq));
      totalGainDb -= Math.min(48, octavesBelow * 18);
    }

    // Peaking Bell filters response: G * exp(-0.5 * (ln(f/f0) / (1/Q))^2)
    for (let i = 1; i < 6; i++) {
      const b = adv[i];
      if (b.gain !== 0) {
        const bandwidth = 1 / b.q;
        const logRatio = Math.log(freq / b.freq);
        const factor = Math.exp(-0.5 * Math.pow(logRatio / bandwidth, 2));
        totalGainDb += b.gain * factor;
      }
    }

    // High shelf response
    const airF = adv[6].freq;
    const airG = adv[6].gain;
    if (freq > airF * 0.5) {
      const shelfFactor = 1 / (1 + Math.exp(-2.5 * Math.log(freq / airF)));
      totalGainDb += airG * shelfFactor;
    }

    // Plot: 1 dB EQ boost/cut = 6 pixels on canvas
    const curveY = zeroY - (totalGainDb * 6);

    if (x === 0) ctx.moveTo(x, curveY);
    else ctx.lineTo(x, curveY);
  }

  // Amber glow stroke
  ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
  ctx.shadowBlur = 8;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Draw node handles on curve
  for (let row of adv) {
    if (row.gain !== 0 || row.band === 1) {
      const nodeX = freqToX(row.freq, width);
      let effGain = row.gain;
      if (row.band === 1) effGain = -3;
      const nodeY = zeroY - (effGain * 6);

      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

// --- EXPORT TO CLIPBOARD ---
function showCopyAlert(text) {
  copyAlert.textContent = text;
  copyAlert.classList.remove('hidden');
  setTimeout(() => {
    copyAlert.classList.add('hidden');
  }, 2500);
}

function copySummaryToClipboard() {
  if (!currentRecommendations) return;
  const r = currentRecommendations;
  const text = `=== VOCAL DSP COACH - ÄÄNIPROFIILI JA SUOSITUKSET ===
Tavoitetyyli: ${r.target.toUpperCase()}
Mittaustulokset: F0: ${benchmarkData.fundamentalFreq} Hz, Kohinataso: ${benchmarkData.noiseFloorDb.toFixed(1)} dBFS, Dynamiikka: ${benchmarkData.crestFactor.toFixed(1)} dB

1. EQ SUOSITUKSET (HELPPO):
- HPF: ${r.easyCards[0].freq}
- Leikkaus: ${r.easyCards[1].freq} | Gain: ${r.easyCards[1].gain} | Q: ${r.easyCards[1].q}
- Preesens: ${r.easyCards[2].freq} | Gain: ${r.easyCards[2].gain} | Q: ${r.easyCards[2].q}

2. PARAMETRINEN EQ (EDISTYNYT):
${r.advEq.map(b => `Band ${b.band} [${b.type}]: ${b.freq} Hz | Gain: ${b.gainDisplay} | Q: ${b.q.toFixed(2)}`).join('\n')}

3. DYNAMIIKKA:
- Kompressori: Threshold: ${r.compressor.threshold} dBFS, Ratio: ${r.compressor.ratio}, Attack: ${r.compressor.attackMs} ms, Release: ${r.compressor.releaseMs} ms, Makeup: +${r.compressor.makeupGain} dB
- De-Esser: Kohdetaajuus: ${r.deesser.freq} Hz, Threshold: ${r.deesser.threshold} dBFS, Vaimennus: ${r.deesser.reduction} dB
- Noise Gate: Open: ${r.gate.openThreshold} dBFS, Close: ${r.gate.closeThreshold} dBFS, Attack: ${r.gate.attackMs} ms, Hold: ${r.gate.holdMs} ms, Release: ${r.gate.releaseMs} ms
`;

  navigator.clipboard.writeText(text).then(() => {
    showCopyAlert('Tiivistelmä kopioitu!');
  });
}

function copyObsToClipboard() {
  if (!currentRecommendations) return;
  const r = currentRecommendations;
  const text = `=== OBS STUDIO SUODATINJÄRJESTYS & ASETUKSET ===
Lisää mikrofoniisi OBS:ssä suodattimet (Filters) tässä järjestyksessä:

1. KOHINAPORTTI (Noise Gate):
   - Sulkeutumiskynnys (Close): ${r.gate.closeThreshold} dB
   - Avautumiskynnys (Open): ${r.gate.openThreshold} dB
   - Reagointiaika (Attack): ${r.gate.attackMs} ms
   - Pitoaika (Hold): ${r.gate.holdMs} ms
   - Vapautusaika (Release): ${r.gate.releaseMs} ms

2. 3-KAISTAINEN TAAJUUSKORJAIN TAI VST-PLUGARI (EQ):
   - Matalat (Low): ${r.advEq[0].freq} Hz leikkaus / mutaleikkaus ${r.advEq[2].gainDisplay} (${r.advEq[2].freq} Hz)
   - Keskialue (Mid): ${r.advEq[4].freq} Hz artikulaatio ${r.advEq[4].gainDisplay}
   - Korkeat (High): +${r.advEq[6].gain.toFixed(1)} dB (11 kHz)

3. KOMPRESSORI (Compressor):
   - Suhde (Ratio): ${r.compressor.ratio}
   - Kynnysarvo (Threshold): ${r.compressor.threshold} dB
   - Reagointiaika (Attack): ${r.compressor.attackMs} ms
   - Vapautusaika (Release): ${r.compressor.releaseMs} ms
   - Lähtövahvistus (Output Gain): +${r.compressor.makeupGain.toFixed(1)} dB

4. RAJOITIN (Limiter):
   - Kynnysarvo: -2.0 dB
   - Vapautus: 60 ms
`;

  navigator.clipboard.writeText(text).then(() => {
    showCopyAlert('OBS Studio -ohjeet kopioitu!');
  });
}

function copyApoToClipboard() {
  if (!currentRecommendations) return;
  const adv = currentRecommendations.advEq;
  const text = `# Equalizer APO Configuration
# Generoitu Vocal DSP Coach -sovelluksella
Filter 1: ON HP Fc ${adv[0].freq} Hz
Filter 2: ON PK Fc ${adv[1].freq} Hz Gain ${adv[1].gain.toFixed(1)} dB Q ${adv[1].q.toFixed(2)}
Filter 3: ON PK Fc ${adv[2].freq} Hz Gain ${adv[2].gain.toFixed(1)} dB Q ${adv[2].q.toFixed(2)}
Filter 4: ON PK Fc ${adv[3].freq} Hz Gain ${adv[3].gain.toFixed(1)} dB Q ${adv[3].q.toFixed(2)}
Filter 5: ON PK Fc ${adv[4].freq} Hz Gain ${adv[4].gain.toFixed(1)} dB Q ${adv[4].q.toFixed(2)}
Filter 6: ON PK Fc ${adv[5].freq} Hz Gain ${adv[5].gain.toFixed(1)} dB Q ${adv[5].q.toFixed(2)}
Filter 7: ON HS Fc ${adv[6].freq} Hz Gain ${adv[6].gain.toFixed(1)} dB
`;

  navigator.clipboard.writeText(text).then(() => {
    showCopyAlert('Equalizer APO -koodi kopioitu!');
  });
}
