/**
 * Vocal DSP Coach & EQ Assistant
 * Real-time Speech Analysis, Microphone Profiling, Nasality Detection & DSP Recommender
 * 100% Client-Side Web Audio API (GitHub Pages Compatible)
 */

// --- BILINGUAL DICTIONARY (Default: English, Toggle: Finnish) ---
const I18N = {
  en: {
    subtitle: "Real-time voice analysis, EQ curve recommendations, compressor, de-esser & gate",
    micInputLabel: "Input:",
    micModelLabel: "Mic Model:",
    startMic: "Start Microphone",
    stopMic: "Stop Microphone",
    takeVoiceTest: "Run 10s Voice Test",
    spectrumTitle: "Real-Time Frequency Spectrum & EQ Curve",
    statusInactive: "Microphone inactive",
    statusActive: "Live microphone active",
    whyEqCurveBtn: "Why this EQ Curve?",
    rawAudioLabel: "Raw Audio (No Browser DSP)",
    showCurveLabel: "Show Recommended EQ Curve",
    zoneSub: "Sub <80Hz",
    zoneBody: "Body 80-240Hz",
    zoneMud: "Mud 240-480Hz",
    zoneBox: "Boxy 480-1k",
    zoneNasal: "Nasal 1-2.4k",
    zonePresence: "Clarity 2.4-5.2k",
    zoneSibilance: "Sibilance 5.2-9k",
    zoneAir: "Air >9k",
    canvasEmpty: 'Click <strong>"Start Microphone"</strong> to see your live voice frequency response.',
    peakLabel: "Peak Level:",
    rmsLabel: "RMS Level:",
    noiseFloorLabel: "Noise Floor:",
    pitchLabel: "Pitch (F0):",
    howItWorksTitle: "The Acoustic Science: Why & How is this EQ Curve Calculated?",
    testSpeakTitle: "Speak naturally into your microphone",
    testSpeakText: 'Read the sample phrase: <em>"One, two, three... Testing microphone frequency response, cutting low-mid muddiness, and taming harsh sibilance."</em>',
    testSilenceTitle: "Remain completely silent (Measuring background noise)",
    testSilenceText: "Stay quiet for 3 seconds so we can capture your room's ambient noise floor for the Noise Gate.",
    profileBadge: "VOICE PROFILE & TARGET",
    profileTitle: "Voice Diagnostic & Desired Sound Profile",
    targetLabel: "Target Style:",
    optPodcast: "🎙️ Clear & Articulate (Podcast / YouTube / Stream)",
    optRadio: "📻 Warm & Deep (Broadcast Radio / Low-End Authority)",
    optNatural: "🌿 Natural & Transparent (Acoustic Speech)",
    optGaming: "🎮 Punchy & Cutting (Discord / Gaming / Noisy Room)",
    traitsLabel: "Customize Voice Correction / Remove Specific Flaws:",
    nasalDetectedLabel: "Nasal Peak Detected:",
    traitNasalName: "Nasal Voice / Honkiness",
    traitNasalDesc: "Auto-detects & notches your exact nasal resonance (800-1800 Hz)",
    traitHighName: "High / Thin Voice",
    traitHighDesc: "Adds chest body (200-260 Hz) & softens shrill treble",
    traitLowName: "Deep / Boomy Voice",
    traitLowDesc: "Tightens heavy bass (70 Hz) & adds subtle air articulation",
    traitHarshName: "Harsh / Piercing",
    traitHarshDesc: "Tames fatiguing 3.5-5 kHz bite & sibilance",
    metricPitch: "Fundamental Pitch",
    metricPitchSub: "F0 vocal center",
    metricMud: "Mud / Resonance",
    metricMudSub: "250-450 Hz boom",
    metricPresence: "Presence / Diction",
    metricPresenceSub: "3-4 kHz bite",
    metricSibilance: "Sibilance / S-Peak",
    metricSibilanceSub: "6-8 kHz energy",
    metricDynamic: "Dynamic Range",
    metricDynamicSub: "Crest Factor (Peak-RMS)",
    eqBadge: "EQUALIZATION (EQ)",
    eqTitle: "Recommended Equalizer Settings",
    tabEasy: "Easy Mode (HPF + 3 EQ Bands)",
    tabAdv: "Advanced Mode (7-Band Parametric)",
    intensityLabel: "EQ Intensity / Naturalness:",
    optSubtle: "🌿 Subtle / Natural (Recommended - Preserves Warmth & Body)",
    optModerate: "🎛️ Moderate (Standard Room Correction)",
    optFull: "🚀 Full / Heavy (Dense Noise / Strong Resonances)",
    troubleshootBtn: "Sounds worse? Click here",
    troubleshootTitle: "⚠️ Why does your voice sound worse? (Acoustic Diagnostics & Fixes)",
    easyExplainer: "Easy Mode gives you a High-Pass Filter (HPF) plus 3 essential parametric EQ bands to shape your voice musically without over-processing.",
    advExplainer: "Full 7-band parametric equalizer for surgical resonance cuts and tonal sculpting (compatible with FabFilter Pro-Q, ReaEQ, OBS Studio, TDR Nova, iZotope, etc.).",
    thBand: "Band #",
    thType: "Filter Type",
    thFreq: "Frequency",
    thGain: "Gain",
    thQ: "Bandwidth (Q)",
    thWhy: "Acoustic Purpose & Reason",
    compTitle: "Compressor",
    compSubtitle: "Smooths out volume variations",
    deessTitle: "De-Esser (Sibilance Control)",
    deessSubtitle: "Tames piercing 'S' and 'T' sibilants with Range & Width",
    gateTitle: "Noise Gate / Expander",
    gateSubtitle: "Silences room noise & keyboard clicks",
    auditionBadge: "LIVE A/B HEADPHONE TEST",
    auditionWarning: "🎧 Use Headphones (Avoid Feedback)",
    auditionTitle: "Hear the recommended processing live in your ears",
    auditionDesc: "Compare your raw microphone sound with the recommended real-time EQ and compressor filters directly in your browser.",
    startMonitoring: "Start Monitoring (Headphones)",
    stopMonitoring: "Stop Monitoring",
    rawBtn: "RAW (Pure Mic)",
    processedBtn: "PROCESSED (DSP Active)",
    exportTitle: "Copy Recommendations to Your Favorite Software",
    exportSubtitle: "Instantly use these parameters in OBS Studio, Equalizer APO, Reaper, Premiere, or any VST plugin.",
    btnCopySummary: "📋 Copy Summary",
    btnCopyObs: "🎥 Copy OBS Studio Instructions",
    btnCopyApo: "💻 Copy Equalizer APO Config",
    copiedAlert: "Copied to clipboard!",
    footerText: "Vocal DSP Coach • 100% Client-Side Web Audio API • No audio ever leaves your computer • GitHub Pages Ready"
  },
  fi: {
    subtitle: "Reaaliaikainen äänen analyysi, EQ-käyräsuositukset, kompressori, de-esser ja gate",
    micInputLabel: "Äänilaite:",
    micModelLabel: "Mikkimalli:",
    startMic: "Käynnistä mikrofoni",
    stopMic: "Pysäytä mikrofoni",
    takeVoiceTest: "Tee 10s Äänitesti",
    spectrumTitle: "Reaaliaikainen taajuusspektri & EQ-käyrä",
    statusInactive: "Mikrofoni ei aktiivinen",
    statusActive: "Reaaliaikainen mikrofoni aktiivinen",
    whyEqCurveBtn: "Mihin EQ-käyrä perustuu?",
    rawAudioLabel: "Raw Audio (Ei selaimen kohinanvaimennusta)",
    showCurveLabel: "Näytä suositeltu EQ-käyrä",
    zoneSub: "Sub <80Hz",
    zoneBody: "Keho 80-240Hz",
    zoneMud: "Mutaisuus 240-480Hz",
    zoneBox: "Pahvi 480-1k",
    zoneNasal: "Nenä 1-2.4k",
    zonePresence: "Selkeys 2.4-5.2k",
    zoneSibilance: "Ässät 5.2-9k",
    zoneAir: "Ilma >9k",
    canvasEmpty: 'Napsauta <strong>"Käynnistä mikrofoni"</strong> nähdäksesi äänesi reaaliaikaisen taajuusvasteen.',
    peakLabel: "Huipputaso (Peak):",
    rmsLabel: "Keskitaso (RMS):",
    noiseFloorLabel: "Taustamelu (Floor):",
    pitchLabel: "Perussävel (F0):",
    howItWorksTitle: "Akustinen tausta: Mihin ja miten tämä EQ-käyrä lasketaan?",
    testSpeakTitle: "Puhu mikrofoniin normaalilla äänellä",
    testSpeakText: 'Lue testilause: <em>"Yksi, kaksi, kolme... Tänään säädetään mikrofonin taajuusvaste, leikataan mutaisuus ja vaimennetaan liian terävät ässät."</em>',
    testSilenceTitle: "Ole nyt täysin hiljaa (Taustamelun mittaus)",
    testSilenceText: "Älä puhu 3 sekuntiin, jotta saamme mitattua huoneesi pohjakohinan ja tuulettimet Noise Gatea varten.",
    profileBadge: "ÄÄNEN ANALYYSI JA TAVOITE",
    profileTitle: "Äänesi profiiliarvio & tavoitesoundi",
    targetLabel: "Tavoitetyyli:",
    optPodcast: "🎙️ Selkeä & Erottuva (Podcast / YouTube / Striimi)",
    optRadio: "📻 Lämmin & Syvä (Radio / Voiceover / Broadcast Low-End)",
    optNatural: "🌿 Luonnollinen & Neutraali (Akustinen puhe)",
    optGaming: "🎮 Läpitunkeva (Discord / Peliääni / Meluisa tila)",
    traitsLabel: "Äänen erityispiirteiden korjaus / Ongelmien poisto:",
    nasalDetectedLabel: "Tunnistettu nenäresonanssi:",
    traitNasalName: "Nenäkäs ääni / Honkiness",
    traitNasalDesc: "Paikantaa automaattisesti nenäsointisi tarkan taajuuden (800–1800 Hz) ja leikkaa sen",
    traitHighName: "Korkea / Ohut ääni",
    traitHighDesc: "Lisää rintakehon lämpöä (200–260 Hz) ja rauhoittaa kimeää yläpäätä",
    traitLowName: "Matala / Jylisevä ääni",
    traitLowDesc: "Kiinteyttää matalaa kumua (70 Hz) ja lisää selkeyttävää ilmaa",
    traitHarshName: "Kireä / Terävä ääni",
    traitHarshDesc: "Pehmentää korvia rasittavaa 3.5–5 kHz purevuutta ja ässiä",
    metricPitch: "Perustaajuus (F0)",
    metricPitchSub: "Äänen pohjasävel",
    metricMud: "Mutaisuus",
    metricMudSub: "250-450 Hz kumina",
    metricPresence: "Selkeys / Preesens",
    metricPresenceSub: "3-4 kHz purevuus",
    metricSibilance: "Ässäterävyys (Sibilanssi)",
    metricSibilanceSub: "6-8 kHz energia",
    metricDynamic: "Dynamiikka-alue",
    metricDynamicSub: "Crest Factor (Peak-RMS)",
    eqBadge: "TAAJUUSKORJAUS (EQ)",
    eqTitle: "Suositeltu Taajuuskorjain",
    tabEasy: "Helppo tila (HPF + 3 EQ-aluetta)",
    tabAdv: "Edistynyt tila (7-kaistainen Parametric)",
    intensityLabel: "EQ-voimakkuus / Luonnollisuus:",
    optSubtle: "🌿 Hienovarainen / Luonnollinen (Suositeltu - Säilyttää lämmön & kehon)",
    optModerate: "🎛️ Kohtalainen (Normaali huonekorjaus)",
    optFull: "🚀 Voimakas (Meluisa tila / Voimakkaat resonanssit)",
    troubleshootBtn: "Kuulostaako huonommalta? Klikkaa tästä",
    troubleshootTitle: "⚠️ Miksi äänesi kuulostaa huonommalta? (Akustiset syyt ja korjaukset)",
    easyExplainer: "Helppo tila antaa ylipäästösuodattimen (HPF) sekä 3 keskeistä parametrista aluetta (1, 2, 3). 'Hienovarainen' tila varmistaa, ettei ääni koverru ontoksi.",
    advExplainer: "Täydellinen 7-alueen parametrinen monikaistakorjain ongelmataajuuksien kirurgiseen leikkaukseen ja soundin optimointiin (sopii FabFilter Pro-Q, ReaEQ, OBS Studio, TDR Nova jne.).",
    thBand: "Kaista #",
    thType: "Suodatin (Type)",
    thFreq: "Taajuus (Freq)",
    thGain: "Vahvistus (Gain)",
    thQ: "Kaistanleveys (Q)",
    thWhy: "Tarkoitus & Syy",
    compTitle: "Kompressori (Compressor)",
    compSubtitle: "Tasoittaa äänenvoimakkuuden erot",
    deessTitle: "De-Esser (Ässävaimennin)",
    deessSubtitle: "Taltuttaa viiltävät 'S'- ja 'T'-äänet (Range & Width)",
    gateTitle: "Kohinaportti (Noise Gate)",
    gateSubtitle: "Hiljentää taustamelun ja näppäinäänet",
    auditionBadge: "LIVE A/B KUUNTELUTESTI",
    auditionWarning: "🎧 Käytä kuulokkeita (kierron esto!)",
    auditionTitle: "Kuuntele suositeltua prosessointia livenä korvissasi",
    auditionDesc: "Voit testata selainpohjaisilla filttereillä miltä äänesi kuulostaa raakana verrattuna suositeltuun EQ:hun ja kompressioon suoraan selaimessa.",
    startMonitoring: "Käynnistä monitorointi (Kuulokkeet)",
    stopMonitoring: "Sammuta monitorointi",
    rawBtn: "RAW (Puhdas mikki)",
    processedBtn: "PROSESSOITU (DSP Päällä)",
    exportTitle: "Kopioi suositukset suoraan ohjelmaasi",
    exportSubtitle: "Ota arvot heti käyttöön OBS Studiossa, Equalizer APO:ssa tai missä tahansa äänieditorissa (Reaper, Audacity, Premiere Pro).",
    btnCopySummary: "📋 Kopioi tiivistelmä",
    btnCopyObs: "🎥 Kopioi OBS Studio -ohjeet",
    btnCopyApo: "💻 Kopioi Equalizer APO -koodi",
    copiedAlert: "Kopioitu leikepöydälle!",
    footerText: "Vocal DSP Coach • 100% Selainpohjainen Web Audio API • Ei lähetä ääntä koneeltasi • GitHub Pages yhteensopiva"
  }
};

let currentLang = localStorage.getItem('vocal_dsp_lang') || 'en';

// --- MICROPHONE PROFILES (ACOUSTIC COMPENSATION CONTROLS) ---
const MIC_PROFILES = {
  generic_dynamic: {
    name: "Generic Dynamic",
    hpfOffset: 0,
    mudCutOffset: 0,
    boxCutOffset: 0,
    presenceOffset: 0,
    airOffset: 0,
    deharshOffset: 0,
    noteEn: "Standard dynamic vocal microphone with typical proximity effect.",
    noteFi: "Tavallinen dynaaminen laulumikrofoni tavanomaisella läheisyysvaikutuksella."
  },
  re20: {
    name: "Electro-Voice RE20",
    // EV's patented Variable-D eliminates proximity effect bass buildup.
    // Low-mids are naturally flat and tight, so aggressive 300Hz and 600Hz cuts DESTROY the vocal body!
    // HPF is gentle (70 Hz). Mud cut is minimized (-0.8 to -1.0 dB). Box cut is 0 dB.
    // Presence boost is reduced (-1.8 dB) to prevent harsh nasal honk.
    hpfOffset: -10, // 70 Hz
    mudCutOffset: +2.2, // Keeps mud cut very subtle (-0.8 dB)
    boxCutOffset: +2.0, // Eliminates box cut (0 dB)
    presenceOffset: -1.8, // Gentle +0.7 dB presence instead of harsh +3.5 dB
    airOffset: +0.5,
    deharshOffset: 0,
    noteEn: "Electro-Voice RE20 features Variable-D technology (virtually zero proximity bass buildup). Over-EQing (scooping 300-600Hz) hollows out the voice and ruins its legendary broadcast warmth. Subtle, gentle settings are applied to keep your voice rich and full.",
    noteFi: "Electro-Voice RE20 sisältää Variable-D -teknologian, joka poistaa läheisyyskuminan. Liiallinen taajuusleikkaus (300-600 Hz koverrus) tekee RE20-äänestä onton, ohuen ja purkkimaisen! Suositus käyttää hienovaraisia arvoja, jotta äänesi säilyttää rintaäänen ja täyteläisyyden."
  },
  sm7b: {
    name: "Shure SM7B",
    hpfOffset: 0,
    mudCutOffset: -0.5,
    boxCutOffset: 0,
    presenceOffset: +1.2,
    airOffset: +2.5,
    deharshOffset: +0.5,
    noteEn: "Shure SM7B is warm and low-mid heavy with a rolled-off top end. It benefits from a gentle presence boost at 3.5kHz and an Air Shelf (11kHz) to sound modern and open.",
    noteFi: "Shure SM7B on tunnetusti lämmin ja yläpäästään tumma. Se hyötyy maltillisesta preesens-nostosta (3.5 kHz) ja ilmahyllystä (11 kHz) avoimen soundin saavuttamiseksi."
  },
  podmic: {
    name: "Røde PodMic / Procaster",
    hpfOffset: +5,
    mudCutOffset: -0.5,
    boxCutOffset: 0,
    presenceOffset: -0.5,
    airOffset: 0,
    deharshOffset: -2.5,
    noteEn: "Røde PodMic has an aggressive 7-8kHz presence bump. Compensation applies a de-harsh dip around 7kHz and activates tighter de-essing.",
    noteFi: "Røde PodMicissä on voimakas 7-8 kHz preesens-piikki, joka voi tehdä ässistä viiltäviä. Korjaus lisää pienen pehmennysleikkauksen 7 kHz kohdalle."
  },
  sm58: {
    name: "Shure SM58 / Beta 58A",
    hpfOffset: +5,
    mudCutOffset: -1.5,
    boxCutOffset: -0.5,
    presenceOffset: +0.5,
    airOffset: +1.5,
    deharshOffset: 0,
    noteEn: "Shure SM58 exhibits strong proximity bass buildup when close to the mouth. Mud cut is slightly increased to preserve vocal clarity.",
    noteFi: "Shure SM58 kerää voimakasta läheisyyskuminaa lähellä puhuttaessa. 300 Hz mutaleikkausta tehostetaan selkeyden säilyttämiseksi."
  },
  at2020: {
    name: "Audio-Technica AT2020",
    hpfOffset: +10,
    mudCutOffset: -1.0,
    boxCutOffset: 0,
    presenceOffset: 0,
    airOffset: -1.0,
    deharshOffset: -1.5,
    noteEn: "AT2020 is a bright condenser sensitive to room reflections and desk rumble. Higher HPF and high-frequency smoothing are applied.",
    noteFi: "AT2020 on herkkä kondensaattorimikrofoni kirkkaalla yläpäällä. Suositellaan napakampaa HPF-leikkausta ja maltillisempaa yläpään korostusta."
  },
  blue_yeti: {
    name: "Blue Yeti (USB Condenser)",
    hpfOffset: +15,
    mudCutOffset: -1.8,
    boxCutOffset: -1.0,
    presenceOffset: +0.5,
    airOffset: 0,
    deharshOffset: -1.0,
    noteEn: "Blue Yeti picks up desk vibrations and surface reflections. A higher HPF (95Hz) and low-mid cut (320Hz) clean up table coupling.",
    noteFi: "Blue Yeti pöydällä kerää tärinöitä ja pöytäheijastuksia. Korkeampi 95 Hz HPF ja napakka mutaleikkaus puhdistavat pöytäkumun."
  },
  generic_condenser: {
    name: "Generic Studio Condenser",
    hpfOffset: +5,
    mudCutOffset: -0.5,
    boxCutOffset: 0,
    presenceOffset: 0,
    airOffset: 0,
    deharshOffset: -0.5,
    noteEn: "Broadband studio condenser with wide frequency response and sensitive transient capture.",
    noteFi: "Laajakaistainen studiokondensaattori laajalla taajuusvasteella."
  }
};

// --- GLOBAL AUDIO STATE ---
let audioCtx = null;
let mediaStream = null;
let sourceNode = null;
let analyserNode = null;
let auditionGainNode = null;
let isAuditionMonitoring = false;
let auditionMode = 'raw';

// Active Custom Voice Traits
let activeVoiceTraits = {
  nasal: false,
  highPitch: false,
  lowPitch: false,
  harsh: false
};
let detectedNasalFreq = 1180; // Live auto-detected nasal resonance frequency in Hz

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

// Voice Benchmark Data
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
const langToggleBtn = document.getElementById('langToggleBtn');
const flagIcon = document.getElementById('flagIcon');
const langText = document.getElementById('langText');

const micSelect = document.getElementById('micSelect');
const micModelSelect = document.getElementById('micModelSelect');
const toggleMicBtn = document.getElementById('toggleMicBtn');
const micBtnText = document.getElementById('micBtnText');
const startTestBtn = document.getElementById('startTestBtn');
const rawAudioToggle = document.getElementById('rawAudioToggle');
const showCurveToggle = document.getElementById('showCurveToggle');
const howItWorksBtn = document.getElementById('howItWorksBtn');
const howItWorksModal = document.getElementById('howItWorksModal');
const closeExplainerBtn = document.getElementById('closeExplainerBtn');
const explainerBodyContent = document.getElementById('explainerBodyContent');

const eqIntensitySelect = document.getElementById('eqIntensitySelect');
const troubleshootToggleBtn = document.getElementById('troubleshootToggleBtn');
const troubleshootBox = document.getElementById('troubleshootBox');
const closeTroubleshootBtn = document.getElementById('closeTroubleshootBtn');
const troubleshootGridContent = document.getElementById('troubleshootGridContent');

const detectedNasalBadge = document.getElementById('detectedNasalBadge');
const detectedNasalFreqText = document.getElementById('detectedNasalFreqText');
const traitNasalBtn = document.getElementById('traitNasalBtn');
const traitHighPitchBtn = document.getElementById('traitHighPitchBtn');
const traitLowPitchBtn = document.getElementById('traitLowPitchBtn');
const traitHarshBtn = document.getElementById('traitHarshBtn');

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

const MIN_FREQ = 20;
const MAX_FREQ = 20000;
const MIN_DB = -90;
const MAX_DB = -6;

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  initDeviceList();
  setupEventListeners();
  applyLanguage(currentLang);
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  recalculateRecommendations();
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = 380 * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

// --- LANGUAGE SWITCHER ---
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'fi' : 'en';
  localStorage.setItem('vocal_dsp_lang', currentLang);
  applyLanguage(currentLang);
  recalculateRecommendations();
}

function applyLanguage(lang) {
  const t = I18N[lang];
  document.documentElement.lang = lang;

  if (lang === 'en') {
    flagIcon.textContent = '🇫🇮';
    langText.textContent = 'Suomi';
  } else {
    flagIcon.textContent = '🇬🇧';
    langText.textContent = 'In English';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  micBtnText.textContent = isMicActive ? t.stopMic : t.startMic;
  statusText.textContent = isMicActive ? t.statusActive : t.statusInactive;
  auditionBtnText.textContent = isAuditionMonitoring ? t.stopMonitoring : t.startMonitoring;

  renderExplainerContent(lang);
  renderTroubleshootContent(lang);
}

function renderExplainerContent(lang) {
  if (lang === 'fi') {
    explainerBodyContent.innerHTML = `
      <div class="explainer-col">
        <h4><span>📊</span> 1. Spektrianalyysi & Nenäskanneri</h4>
        <p>Sovellus lukee mikrofonisi signaalia 4096 pisteen FFT-tarkkuudella. Puheen aikana se mittaa 8 kriittistä äänivyöhykettä ja skannaa erityisesti 850–1800 Hz aluetta löytääkseen äänesi tarkan nenäsointipiikin (nasal formant peak).</p>
      </div>
      <div class="explainer-col">
        <h4><span>🎙️</span> 2. Mikrofonin korjausprofiili (RE20)</h4>
        <p>Eri mikrofoneilla on tunnetut akustiset ominaisuudet:</p>
        <ul>
          <li><strong>Electro-Voice RE20:</strong> Variable-D -rakenteen ansiosta mikki ei kärsi läheisyyskuminasta. Siksi RE20:lle ei tule tehdä raskasta 300-600 Hz leikkausta, jottei ääni koverru ontoksi.</li>
          <li><strong>Shure SM7B:</strong> Luonnostaan tumma ja pyöreä yläpää. Vaatii maltillisen preesens-noston (3.5 kHz) ja ilmahyllyn (11 kHz).</li>
        </ul>
      </div>
      <div class="explainer-col">
        <h4><span>🎯</span> 3. Kultainen sääntö: "Less is more"</h4>
        <p>Paras puhesoundi syntyy hienovaraisilla korjauksilla. Jos EQ on liian voimakas (-4 dB leikkaukset), puhe kuulostaa keinotekoiselta ja ohuelta. Valitse EQ-voimakkuudeksi <strong>Hienovarainen (50%)</strong> luonnollisen lämmön säilyttämiseksi!</p>
      </div>
    `;
  } else {
    explainerBodyContent.innerHTML = `
      <div class="explainer-col">
        <h4><span>📊</span> 1. Live Spectral Measurement & Nasality Scanner</h4>
        <p>The app continuously inspects your microphone using a 4096-point FFT. During speech, it measures 8 key vocal zones and scans the 850-1800 Hz range to locate your exact nasal formant resonance peak.</p>
      </div>
      <div class="explainer-col">
        <h4><span>🎙️</span> 2. Microphone Acoustic Contours (RE20)</h4>
        <p>Different microphones have distinct acoustic signatures:</p>
        <ul>
          <li><strong>Electro-Voice RE20:</strong> Features Variable-D ports eliminating proximity effect. Its low-mids are naturally flat, so heavy 300Hz-600Hz scooping must be avoided to keep vocal body!</li>
          <li><strong>Shure SM7B:</strong> Renowned for warm, thick low-mids and rolled-off highs. It benefits from a gentle presence boost at 3.5kHz and an Air Shelf (11kHz).</li>
        </ul>
      </div>
      <div class="explainer-col">
        <h4><span>🎯</span> 3. The Golden Rule: "Less is More"</h4>
        <p>Over-EQing ruins great microphones. Heavy cuts (-4 dB) make voices sound thin and nasal. Use the <strong>Subtle / Natural (50%)</strong> intensity setting to preserve natural vocal warmth while gently cleaning up room acoustic flaws.</p>
      </div>
    `;
  }
}

function renderTroubleshootContent(lang) {
  if (lang === 'fi') {
    troubleshootGridContent.innerHTML = `
      <div class="troubleshoot-item">
        <h4>1. Ääni kuulostaa ohuelta, ontolta tai peltipurkkimaiselta?</h4>
        <p><strong>Syy:</strong> Alakeskialuetta (250–600 Hz) on leikattu liikaa. Varsinkin <strong>Electro-Voice RE20</strong> -mikrofonilla, jossa Variable-D poistaa läheisyyskuminan valmiiksi, 300 Hz ja 600 Hz lisäleikkaukset kovertavat puheesta kaiken rintakehon ja lämmön pois!</p>
        <div class="troubleshoot-fix">✅ <strong>Korjaus:</strong> Vaihda EQ-voimakkuudeksi <em>"Hienovarainen / Luonnollinen"</em> tai nollaa EQ 1 (Muta) ja EQ 2 (Pahvi) arvoon 0 dB. Pidä HPF 70 Hz:ssä.</div>
      </div>

      <div class="troubleshoot-item">
        <h4>2. Ääni kuulostaa pistävältä, kireältä tai nenäkkäältä?</h4>
        <p><strong>Syy:</strong> Artikulaatiota / preesensiä (3–4 kHz) on nostettu liikaa (+2.5...3.5 dB), tai äänessäsi on kapea nenäresonanssi 1000–1400 Hz alueella.</p>
        <div class="troubleshoot-fix">✅ <strong>Korjaus:</strong> Kytke päälle ylhäältä <strong>"👃 Nenäkäs ääni"</strong>, jolloin sovellus etsii tarkan nenätaajuutesi ja tekee siihen kapean täsmäleikkauksen. Laske samalla EQ 3 (Selkeys) arvoon +0.5 dB.</div>
      </div>

      <div class="troubleshoot-item">
        <h4>3. Ässät sammaltavat tai ääni kuulostaa tunkkaiselta?</h4>
        <p><strong>Syy:</strong> De-Esserin <strong>Range</strong> (vaimennusvara) on liian syvä tai kynnystaso leikkaa liikaa normaalia puhetta.</p>
        <div class="troubleshoot-fix">✅ <strong>Korjaus:</strong> Aseta De-Esserin Range arvoon -4 dB tai -5 dB, ja varmista että Width (Q) on noin 2.0 (Bell). Näin vaimennus koskee vain terävintä suhahdusta.</div>
      </div>
    `;
  } else {
    troubleshootGridContent.innerHTML = `
      <div class="troubleshoot-item">
        <h4>1. Voice sounds thin, hollow, or like a tin can?</h4>
        <p><strong>Cause:</strong> Over-cutting low-mids (250–600 Hz). Especially with an <strong>Electro-Voice RE20</strong>, which already has Variable-D (flat low-mids), scooping 320 Hz and 620 Hz destroys its natural broadcast chest resonance.</p>
        <div class="troubleshoot-fix">✅ <strong>Fix:</strong> Switch EQ Intensity to <em>"Subtle / Natural"</em>, or set Mud Cut and Box Cut to 0 dB or -0.8 dB. Keep HPF at 70 Hz.</div>
      </div>

      <div class="troubleshoot-item">
        <h4>2. Voice sounds harsh, sharp, or nasal?</h4>
        <p><strong>Cause:</strong> Over-boosting presence (3–4 kHz) or unaddressed nasal resonance around 1000-1400 Hz.</p>
        <div class="troubleshoot-fix">✅ <strong>Fix:</strong> Toggle on <strong>"👃 Nasal Voice"</strong> above to auto-detect and notch your exact nasal peak. Lower Presence (EQ 3) to +0.5 dB.</div>
      </div>

      <div class="troubleshoot-item">
        <h4>3. Lisping on 'S' sounds or muffled top end?</h4>
        <p><strong>Cause:</strong> De-Esser <strong>Range</strong> is clamped too deep (past -8 dB) or threshold is too low.</p>
        <div class="troubleshoot-fix">✅ <strong>Fix:</strong> Set De-Esser Range to -4 dB or -5 dB, and keep Width (Q) at 2.0 (Bell) so only the harsh whistle is ducked without lisping.</div>
      </div>
    `;
  }
}

// Enumerate input devices
async function initDeviceList() {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      micSelect.innerHTML = '<option value="">Not supported</option>';
      return;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter(d => d.kind === 'audioinput');
    
    micSelect.innerHTML = '';
    if (audioInputs.length === 0) {
      micSelect.innerHTML = '<option value="">No microphones found</option>';
      return;
    }

    audioInputs.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.text = device.label || `Microphone ${index + 1}`;
      micSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Error querying audio devices:', err);
    micSelect.innerHTML = '<option value="">Mic query failed</option>';
  }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  langToggleBtn.addEventListener('click', toggleLanguage);
  toggleMicBtn.addEventListener('click', toggleMicrophone);
  startTestBtn.addEventListener('click', startVoiceTest);
  
  micModelSelect.addEventListener('change', () => {
    recalculateRecommendations();
  });

  eqIntensitySelect.addEventListener('change', () => {
    recalculateRecommendations();
  });

  // Voice Trait Toggles
  traitNasalBtn.addEventListener('click', () => toggleVoiceTrait('nasal'));
  traitHighPitchBtn.addEventListener('click', () => toggleVoiceTrait('highPitch'));
  traitLowPitchBtn.addEventListener('click', () => toggleVoiceTrait('lowPitch'));
  traitHarshBtn.addEventListener('click', () => toggleVoiceTrait('harsh'));

  howItWorksBtn.addEventListener('click', () => {
    howItWorksModal.classList.toggle('hidden');
    if (!howItWorksModal.classList.contains('hidden')) {
      howItWorksModal.scrollIntoView({ behavior: 'smooth' });
    }
  });

  closeExplainerBtn.addEventListener('click', () => {
    howItWorksModal.classList.add('hidden');
  });

  troubleshootToggleBtn.addEventListener('click', () => {
    troubleshootBox.classList.toggle('hidden');
    if (!troubleshootBox.classList.contains('hidden')) {
      troubleshootBox.scrollIntoView({ behavior: 'smooth' });
    }
  });

  closeTroubleshootBtn.addEventListener('click', () => {
    troubleshootBox.classList.add('hidden');
  });

  rawAudioToggle.addEventListener('change', () => {
    if (isMicActive) {
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

// --- VOICE TRAIT MANAGEMENT ---
function toggleVoiceTrait(trait) {
  activeVoiceTraits[trait] = !activeVoiceTraits[trait];

  // High pitch and low pitch are mutually exclusive
  if (trait === 'highPitch' && activeVoiceTraits.highPitch) {
    activeVoiceTraits.lowPitch = false;
  } else if (trait === 'lowPitch' && activeVoiceTraits.lowPitch) {
    activeVoiceTraits.highPitch = false;
  }

  updateVoiceTraitUI();
  recalculateRecommendations();
}

function updateVoiceTraitUI() {
  traitNasalBtn.classList.toggle('active', activeVoiceTraits.nasal);
  traitHighPitchBtn.classList.toggle('active', activeVoiceTraits.highPitch);
  traitLowPitchBtn.classList.toggle('active', activeVoiceTraits.lowPitch);
  traitHarshBtn.classList.toggle('active', activeVoiceTraits.harsh);

  if (activeVoiceTraits.nasal) {
    detectedNasalBadge.classList.remove('hidden');
    detectedNasalFreqText.textContent = `${detectedNasalFreq} Hz`;
  } else {
    detectedNasalBadge.classList.add('hidden');
  }
}

// --- ACOUSTIC NASALITY FORMANT DETECTOR ---
// Scans FFT spectrum in 850 Hz - 1850 Hz range to locate exact resonance peak
function detectNasalResonancePeak(spectrum, sampleRate) {
  if (!spectrum || spectrum.length === 0) return 1180;
  const nyquist = sampleRate / 2;
  const binWidth = nyquist / spectrum.length;

  const startBin = Math.max(1, Math.floor(850 / binWidth));
  const endBin = Math.min(spectrum.length - 2, Math.ceil(1850 / binWidth));

  let maxVal = -999;
  let peakBin = Math.floor(1180 / binWidth);

  for (let b = startBin + 1; b < endBin; b++) {
    if (spectrum[b] > spectrum[b - 1] && spectrum[b] > spectrum[b + 1]) {
      const localAvg = (spectrum[b - 2] + spectrum[b + 2]) / 2;
      const prom = spectrum[b] - localAvg;
      if (spectrum[b] > maxVal && prom >= 0.5) {
        maxVal = spectrum[b];
        peakBin = b;
      }
    }
  }

  // Parabolic interpolation around peakBin
  const y1 = spectrum[peakBin - 1] || maxVal;
  const y2 = spectrum[peakBin];
  const y3 = spectrum[peakBin + 1] || maxVal;
  const denom = 2 * (2 * y2 - y1 - y3);
  const delta = denom !== 0 ? (y1 - y3) / denom : 0;
  const exactBin = peakBin + delta;

  let detectedFreq = Math.round(exactBin * binWidth);
  detectedFreq = Math.max(850, Math.min(1850, detectedFreq));
  return detectedFreq;
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

    initDeviceList();

    sourceNode = audioCtx.createMediaStreamSource(mediaStream);
    
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 4096;
    analyserNode.minDecibels = -100;
    analyserNode.maxDecibels = -6;
    analyserNode.smoothingTimeConstant = 0.75;

    freqData = new Uint8Array(analyserNode.frequencyBinCount);
    timeData = new Float32Array(analyserNode.fftSize);

    setupAuditionChain();

    sourceNode.connect(analyserNode);

    isMicActive = true;
    toggleMicBtn.classList.remove('btn-primary');
    toggleMicBtn.classList.add('btn-secondary');
    micBtnText.textContent = I18N[currentLang].stopMic;
    statusDot.classList.add('active');
    statusText.textContent = I18N[currentLang].statusActive;
    startTestBtn.disabled = false;
    canvasOverlayNote.classList.add('hidden');

    renderLoop();
  } catch (err) {
    console.error('Microphone startup failed:', err);
    alert(currentLang === 'fi' 
      ? 'Mikrofonin avaaminen epäonnistui. Varmista mikrofonin luvat selaimessa.' 
      : 'Failed to access microphone. Please allow microphone permissions in your browser.');
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
  micBtnText.textContent = I18N[currentLang].startMic;
  statusDot.classList.remove('active');
  statusText.textContent = I18N[currentLang].statusInactive;
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

  auditionHPF = audioCtx.createBiquadFilter();
  auditionHPF.type = 'highpass';
  auditionHPF.frequency.value = 80;

  auditionLowMud = audioCtx.createBiquadFilter();
  auditionLowMud.type = 'peaking';
  auditionLowMud.frequency.value = 320;
  auditionLowMud.gain.value = 0;
  auditionLowMud.Q.value = 1.5;

  auditionMidBox = audioCtx.createBiquadFilter();
  auditionMidBox.type = 'peaking';
  auditionMidBox.frequency.value = 650;
  auditionMidBox.gain.value = 0;
  auditionMidBox.Q.value = 2.0;

  auditionPresence = audioCtx.createBiquadFilter();
  auditionPresence.type = 'peaking';
  auditionPresence.frequency.value = 3400;
  auditionPresence.gain.value = 0;
  auditionPresence.Q.value = 1.3;

  auditionSibilance = audioCtx.createBiquadFilter();
  auditionSibilance.type = 'peaking';
  auditionSibilance.frequency.value = 6800;
  auditionSibilance.gain.value = 0;
  auditionSibilance.Q.value = 2.5;

  auditionHighAir = audioCtx.createBiquadFilter();
  auditionHighAir.type = 'highshelf';
  auditionHighAir.frequency.value = 11000;
  auditionHighAir.gain.value = 0;

  auditionCompressor = audioCtx.createDynamicsCompressor();
  auditionCompressor.threshold.value = -18;
  auditionCompressor.knee.value = 6;
  auditionCompressor.ratio.value = 3.2;
  auditionCompressor.attack.value = 0.015;
  auditionCompressor.release.value = 0.080;

  auditionMakeupGain = audioCtx.createGain();
  auditionMakeupGain.gain.value = 1.0;

  auditionGainNode = audioCtx.createGain();
  auditionGainNode.gain.value = 0.0;

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
    alert(currentLang === 'fi' ? 'Käynnistä mikrofoni ensin!' : 'Start the microphone first!');
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
  auditionBtnText.textContent = I18N[currentLang].stopMonitoring;
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
  auditionBtnText.textContent = I18N[currentLang].startMonitoring;
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
  testInstructionTitle.textContent = I18N[currentLang].testSpeakTitle;
  testInstructionText.innerHTML = I18N[currentLang].testSpeakText;

  testTimer = setInterval(() => {
    testSecondsLeft--;
    testCountdownBadge.textContent = testSecondsLeft;
    const progressPercent = ((10 - testSecondsLeft) / 10) * 100;
    testProgressBar.style.width = `${progressPercent}%`;

    if (testSecondsLeft === 3) {
      testCountdownBadge.style.background = '#0ea5e9';
      testInstructionTitle.textContent = I18N[currentLang].testSilenceTitle;
      testInstructionText.textContent = I18N[currentLang].testSilenceText;
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

  processTestResults();
}

function processTestResults() {
  if (testVoicedSamples.length === 0) {
    alert(currentLang === 'fi' 
      ? 'Ääntä ei havaittu riittävästi testin aikana. Yritä uudelleen ja puhu lähempänä mikrofonia.' 
      : 'Insufficient voice signal detected. Please try again and speak closer to the microphone.');
    return;
  }

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

  let maxPeak = -999;
  let rmsSum = 0;
  for (let s of testVoicedSamples) {
    if (s.peak > maxPeak) maxPeak = s.peak;
    rmsSum += Math.pow(10, s.rms / 10);
  }
  const avgSpeechRms = 10 * Math.log10(rmsSum / testVoicedSamples.length);

  let noiseFloorDb = -58;
  if (testSilentSamples.length > 0) {
    let silentRmsSum = 0;
    for (let s of testSilentSamples) {
      silentRmsSum += Math.pow(10, s.rms / 10);
    }
    noiseFloorDb = 10 * Math.log10(silentRmsSum / testSilentSamples.length);
    noiseFloorDb = Math.min(-30, Math.max(-85, noiseFloorDb));
  }

  const pitches = testVoicedSamples.filter(s => s.pitch > 65 && s.pitch < 320).map(s => s.pitch);
  const avgPitch = pitches.length > 0 ? pitches.reduce((a, b) => a + b, 0) / pitches.length : 125;

  const sampleRate = audioCtx.sampleRate;
  const nyquist = sampleRate / 2;
  const binWidth = nyquist / numBins;

  // Auto-detect nasal resonance peak accurately from the averaged voice spectrum
  const nasalPeak = detectNasalResonancePeak(avgSpectrum, sampleRate);
  if (nasalPeak >= 850 && nasalPeak <= 1850) {
    detectedNasalFreq = nasalPeak;
    if (detectedNasalFreqText) detectedNasalFreqText.textContent = `${detectedNasalFreq} Hz`;
  }

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

  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// --- RECOMMENDATION ENGINE (WITH NASAL AUTO-NOTCH & TRAITS) ---
function recalculateRecommendations() {
  const target = targetToneSelect.value;
  const b = benchmarkData;
  const micModelKey = micModelSelect.value || 'generic_dynamic';
  const micProfile = MIC_PROFILES[micModelKey] || MIC_PROFILES.generic_dynamic;

  const intensityMode = eqIntensitySelect ? eqIntensitySelect.value : 'subtle';
  let intensityFactor = 0.5;
  if (intensityMode === 'moderate') intensityFactor = 0.75;
  if (intensityMode === 'full') intensityFactor = 1.0;

  // Analysis Ratios
  const subExcess = b.bandEnergy.sub - b.bandEnergy.body;
  const mudExcess = b.bandEnergy.mud - b.bandEnergy.presence;
  const sibilanceHarshness = b.bandEnergy.sibilance - b.bandEnergy.presence;

  // Voice Diagnostic Text
  let diagHtml = '';
  let subDiag = '';
  let mudDiag = '';
  let presDiag = '';
  let sibDiag = '';

  const isFi = currentLang === 'fi';

  if (b.tested) {
    if (isFi) {
      diagHtml += `<strong>Äänitestin havainnot:</strong> Perustaajuutesi (F0) on keskimäärin <strong>${b.fundamentalFreq} Hz</strong>. `;
      if (subExcess > -10) {
        diagHtml += `Mikrofonissa on voimakasta matalaa jyminää (&lt;80 Hz). `;
        subDiag = 'Korkea (jyminää)';
      } else {
        subDiag = 'Puhdas';
      }

      if (mudExcess > 2.0) {
        diagHtml += `Huone- tai läheisyyskuminaa (280-350 Hz) on havaittavissa. `;
        mudDiag = 'Korostunut';
      } else {
        mudDiag = 'Tasapainoinen';
      }

      if (sibilanceHarshness > -4.0) {
        diagHtml += `Ässät (6-8 kHz) ovat teräviä, De-Esser suositellaan. `;
        sibDiag = 'Terävä';
      } else {
        sibDiag = 'Pehmeä';
      }

      diagHtml += `<br><em>Mikrofoniprofiili (${micProfile.name}):</em> ${micProfile.noteFi}`;
    } else {
      diagHtml += `<strong>Voice Test Findings:</strong> Average fundamental pitch (F0) is <strong>${b.fundamentalFreq} Hz</strong>. `;
      if (subExcess > -10) {
        diagHtml += `Noticeable low rumble detected (<80 Hz). `;
        subDiag = 'High rumble';
      } else {
        subDiag = 'Clean';
      }

      if (mudExcess > 2.0) {
        diagHtml += `Elevated room/proximity mud (280-350 Hz). `;
        mudDiag = 'Boomy';
      } else {
        mudDiag = 'Balanced';
      }

      if (sibilanceHarshness > -4.0) {
        diagHtml += `Pronounced sibilant energy (6-8 kHz), De-Esser recommended. `;
        sibDiag = 'Sharp';
      } else {
        sibDiag = 'Smooth';
      }

      diagHtml += `<br><em>Microphone Profile (${micProfile.name}):</em> ${micProfile.noteEn}`;
    }
  } else {
    if (isFi) {
      diagHtml += `<strong>Oletusprofiili (${micProfile.name}):</strong> ${micProfile.noteFi} Käytetään ${intensityMode === 'subtle' ? 'hienovaraista (50%)' : 'kohtalaista'} korjausta luonnollisen soinnin takaamiseksi.`;
      subDiag = 'Normaali';
      mudDiag = 'Normaali';
      presDiag = 'Kohtalainen';
      sibDiag = 'Normaali';
    } else {
      diagHtml += `<strong>Default Profile (${micProfile.name}):</strong> ${micProfile.noteEn} Operating in ${intensityMode === 'subtle' ? 'subtle (50%)' : 'moderate'} intensity to preserve natural vocal body.`;
      subDiag = 'Normal';
      mudDiag = 'Normal';
      presDiag = 'Moderate';
      sibDiag = 'Normal';
    }
  }

  // Append voice traits feedback to diagnosis
  if (activeVoiceTraits.nasal) {
    diagHtml += isFi 
      ? `<br>👃 <strong>Nenäkkyyden poisto aktiivinen:</strong> Tunnistettu nenäresonanssi taajuudella <strong>${detectedNasalFreq} Hz</strong>. Kapea suodatus kytketty poistamaan torvisointi.`
      : `<br>👃 <strong>Nasal Notch Active:</strong> Detected nasal resonance at <strong>${detectedNasalFreq} Hz</strong>. Targeted surgical cut applied to remove honkiness.`;
  }
  if (activeVoiceTraits.highPitch) {
    diagHtml += isFi 
      ? `<br>📢 <strong>Korkean/ohuen äänen korjaus:</strong> Rintakehoa tuettu ja kimeää yläpäätä rauhoitettu.`
      : `<br>📢 <strong>High/Thin Voice Treatment:</strong> Added lower body warmth and softened upper mid bite.`;
  }
  if (activeVoiceTraits.lowPitch) {
    diagHtml += isFi 
      ? `<br>🔊 <strong>Matalan/jylisevän äänen korjaus:</strong> HPF pidetty 68 Hz:ssä rintaäänen säilyttämiseksi, mutaa tiukennettu ja lisätty ilmaa.`
      : `<br>🔊 <strong>Deep/Boomy Voice Treatment:</strong> HPF kept at 68 Hz to protect fundamental bass, boomy mud tightened.`;
  }

  metricLow.textContent = `${b.fundamentalFreq} Hz`;
  metricMud.textContent = mudDiag;
  metricPresence.textContent = presDiag;
  metricSibilance.textContent = sibDiag;
  metricDynamicRange.textContent = `${Math.round(b.crestFactor)} dB`;
  diagnosisContent.innerHTML = diagHtml;

  // --- BASELINE FILTER COMPUTATION ---
  let hpfFreq = 75 + micProfile.hpfOffset;
  let mudCutFreq = 320;
  let mudCutGainRaw = -2.5 + micProfile.mudCutOffset;
  let mudCutQ = 1.6;

  let midBandFreq = 620;
  let midBandGainRaw = (micModelKey === 're20') ? 0.0 : (-1.5 + (micProfile.boxCutOffset || 0));
  let midBandQ = 1.9;
  let isNasalActive = activeVoiceTraits.nasal;

  // If Nasal trait is active, configure midBand as the surgical nasal notch!
  if (isNasalActive) {
    midBandFreq = detectedNasalFreq || 1180;
    midBandGainRaw = -2.5;
    midBandQ = 3.2; // Surgical narrow notch
  }

  let presBoostFreq = 3400;
  let presBoostGainRaw = 2.0 + micProfile.presenceOffset;
  let presBoostQ = 1.3;

  let deharshFreq = 6500;
  let deharshGainRaw = -1.5 + (micProfile.deharshOffset || 0);
  let deharshQ = 2.5;

  let airShelfFreq = 11000;
  let airShelfGainRaw = 1.5 + micProfile.airOffset;

  let lowWarmthFreq = Math.max(100, Math.min(180, b.fundamentalFreq * 1.1));
  let lowWarmthGainRaw = 0.0;

  // Fine-tune if voice test was run
  if (b.tested) {
    if (subExcess > -10) hpfFreq = Math.max(hpfFreq, 85);
    if (mudExcess > 3.0 && micModelKey !== 're20') mudCutGainRaw -= 1.0;
    if (sibilanceHarshness > -3.0) deharshGainRaw -= 1.0;
  }

  // Modulate according to Target Profile
  if (target === 'podcast') {
    hpfFreq = Math.max(75, hpfFreq);
    mudCutGainRaw -= 0.5;
    presBoostGainRaw += 0.5;
    airShelfGainRaw += 0.5;
  } else if (target === 'radio') {
    hpfFreq = Math.min(70, hpfFreq);
    lowWarmthGainRaw = 1.5;
    mudCutGainRaw += 0.8;
    presBoostGainRaw = Math.max(0.5, presBoostGainRaw - 0.5);
    presBoostFreq = 3000;
    airShelfGainRaw = 0.5;
  } else if (target === 'natural') {
    mudCutGainRaw = Math.min(0, mudCutGainRaw + 1.0);
    presBoostGainRaw = 0.5;
    airShelfGainRaw = 0.5;
  } else if (target === 'gaming') {
    hpfFreq = Math.max(90, hpfFreq);
    mudCutGainRaw -= 1.0;
    presBoostGainRaw += 1.0;
    presBoostFreq = 3200;
  }

  // Modulate according to Voice Traits
  if (activeVoiceTraits.highPitch) {
    lowWarmthGainRaw += 1.8;
    presBoostGainRaw = Math.max(0, presBoostGainRaw - 1.5);
    hpfFreq = Math.max(88, hpfFreq);
  }
  if (activeVoiceTraits.lowPitch) {
    hpfFreq = Math.min(68, hpfFreq);
    lowWarmthGainRaw = Math.min(0, lowWarmthGainRaw - 1.0);
    airShelfGainRaw += 1.5;
  }
  if (activeVoiceTraits.harsh) {
    presBoostGainRaw = Math.max(0, presBoostGainRaw - 1.5);
    deharshGainRaw -= 1.5;
  }

  // Scale gains with intensityFactor
  const mudCutGain = Number((mudCutGainRaw * intensityFactor).toFixed(1));
  const midBandGain = Number((midBandGainRaw * intensityFactor).toFixed(1));
  const presBoostGain = Number((presBoostGainRaw * intensityFactor).toFixed(1));
  const deharshGain = Number((deharshGainRaw * intensityFactor).toFixed(1));
  const airShelfGain = Number((airShelfGainRaw * intensityFactor).toFixed(1));
  const lowWarmthGain = Number((lowWarmthGainRaw * intensityFactor).toFixed(1));

  // --- EASY MODE CARDS: EXACTLY HPF + 1, 2, 3 EQ BANDS ---
  const easyCards = [
    {
      step: 'HPF',
      title: isFi ? 'Ylipäästösuodatin (HPF / Low Cut)' : 'High-Pass Filter (HPF / Low Cut)',
      type: 'High-Pass',
      freq: `${Math.round(hpfFreq)} Hz`,
      gain: isFi ? 'Leikkaus' : 'Cutoff',
      gainClass: 'pass',
      q: '18 dB/oct',
      why: isFi 
        ? 'Leikkaa pois pöytätärinät ja alajyminät (<80 Hz) hävittämättä luonnollista puheääntä.'
        : 'Removes desk rumbles and handling thumps (<80 Hz) without thinning out speech warmth.'
    },
    {
      step: 'EQ 1',
      title: isFi ? 'Mutaisuuden siivous (Mud Cut)' : 'Mud & Room Boom Cut (Low-Mid)',
      type: 'Bell / Peaking',
      freq: `${Math.round(mudCutFreq)} Hz`,
      gain: `${mudCutGain.toFixed(1)} dB`,
      gainClass: mudCutGain === 0 ? 'neutral' : 'cut',
      q: mudCutQ.toFixed(1),
      why: isFi 
        ? (micModelKey === 're20' 
            ? 'RE20 ei kerrytä läheisyyskuminaa. Pidetään leikkaus pienenä, jotta rintaääni säilyy!' 
            : 'Siivoaa tunkkaista huonekaiun kumua ja läheisyysvaikutusta säilyttäen puheen kehon.')
        : (micModelKey === 're20'
            ? 'RE20 has Variable-D (no proximity boom). Kept minimal so voice remains full and rich.'
            : 'Gently cleans up muddy room reflections and proximity boom without hollowing out speech.')
    },
    {
      step: isNasalActive ? 'EQ 2 (Nenä)' : 'EQ 2',
      title: isNasalActive 
        ? (isFi ? 'Nenäkkyyden täsmäleikkaus (Nasal Cut)' : 'Nasal Resonance Notch (Nasal Cut)')
        : (isFi ? 'Laatikkomaisuuden siivous (Boxy Mid)' : 'Cardboard Boxiness Cut (Mid)'),
      type: 'Bell / Peaking',
      freq: `${Math.round(midBandFreq)} Hz`,
      gain: `${midBandGain.toFixed(1)} dB`,
      gainClass: midBandGain === 0 ? 'neutral' : 'cut',
      q: midBandQ.toFixed(1),
      why: isNasalActive
        ? (isFi 
            ? `Täsmäleikkaus havaittuun ${midBandFreq} Hz nenäresonanssiin poistaa torvisoinnin tekemättä äänestä ohutta.` 
            : `Surgical notch at detected ${midBandFreq} Hz nasal peak eliminates honkiness without thinning speech.`)
        : (isFi
            ? (midBandGain === 0 
                ? 'Pahvisuuden leikkaus jätetty neutraaliksi (0 dB), jotta äänesi ei muutu ohueksi.' 
                : 'Puhdistaa tynnyrimäistä onttoa sointia 600 Hz alueelta.')
            : (midBandGain === 0
                ? 'Boxiness cut left flat (0 dB) to prevent thinning out your natural voice.'
                : 'Trims hollow, plastic cardboard reflections around 620 Hz.'))
    },
    {
      step: 'EQ 3',
      title: isFi ? 'Selkeys ja artikulaatio (Presence)' : 'Clarity & Vocal Presence Boost',
      type: 'Bell / Peaking',
      freq: `${(presBoostFreq / 1000).toFixed(1)} kHz`,
      gain: presBoostGain > 0 ? `+${presBoostGain.toFixed(1)} dB` : `${presBoostGain.toFixed(1)} dB`,
      gainClass: presBoostGain > 0 ? 'boost' : 'neutral',
      q: presBoostQ.toFixed(1),
      why: isFi
        ? 'Tuo konsonanttien (k, p, t, s) artikulaation esiin maltillisesti ilman kireää metallista sointia.'
        : 'Elevates consonant diction and speech intelligibility smoothly without causing ear fatigue.'
    }
  ];

  // --- ADVANCED MODE 7-BAND PARAMETRIC TABLE ---
  const advEq = [
    { band: 1, type: 'High-Pass (HPF)', freq: Math.round(hpfFreq), gain: 0, q: 0.71, gainDisplay: '18 dB/oct', gainClass: 'pass', why: isFi ? 'Eliminoi pöydän tärinät, tuulettimet ja plosiivit.' : 'Eliminates desk thumps, AC hum, and plosive wind blasts.' },
    { band: 2, type: 'Low Bell / Warmth', freq: Math.round(lowWarmthFreq), gain: lowWarmthGain, q: 1.4, gainDisplay: lowWarmthGain > 0 ? `+${lowWarmthGain.toFixed(1)} dB` : '0 dB', gainClass: lowWarmthGain > 0 ? 'boost' : 'pass', why: isFi ? 'Rintaäänen ja perussävelen miellyttävä täyteläisyys.' : 'Richness and body around fundamental voice frequencies.' },
    { band: 3, type: 'Bell (Mud)', freq: Math.round(mudCutFreq), gain: mudCutGain, q: mudCutQ, gainDisplay: `${mudCutGain.toFixed(1)} dB`, gainClass: mudCutGain === 0 ? 'pass' : 'cut', why: isFi ? 'Puhdistaa huoneheijastukset ilman onttoutta.' : 'Cleans up boomy room acoustic reflections.' },
    { 
      band: 4, 
      type: isNasalActive ? 'Bell (Nasal Notch)' : 'Bell (Boxy)', 
      freq: Math.round(midBandFreq), 
      gain: midBandGain, 
      q: midBandQ, 
      gainDisplay: `${midBandGain.toFixed(1)} dB`, 
      gainClass: midBandGain === 0 ? 'pass' : 'cut', 
      why: isNasalActive 
        ? (isFi ? `Havaittu nenäresonanssi (${midBandFreq} Hz).` : `Auto-detected nasal formant peak (${midBandFreq} Hz).`)
        : (isFi ? 'Poistaa onttoa, muovista tai tynnyrimäistä sointia.' : 'Cuts hollow, cardboard resonances.') 
    },
    { band: 5, type: 'Bell (Presence)', freq: Math.round(presBoostFreq), gain: presBoostGain, q: presBoostQ, gainDisplay: presBoostGain > 0 ? `+${presBoostGain.toFixed(1)} dB` : '0 dB', gainClass: presBoostGain > 0 ? 'boost' : 'pass', why: isFi ? 'Parantaa puheen ymmärrettävyyttä ja läsnäoloa.' : 'Boosts speech intelligibility and crisp consonant clarity.' },
    { band: 6, type: 'Bell (De-Harsh)', freq: Math.round(deharshFreq), gain: deharshGain, q: deharshQ, gainDisplay: `${deharshGain.toFixed(1)} dB`, gainClass: deharshGain === 0 ? 'pass' : 'cut', why: isFi ? 'Pehmentää teräviä mikrofoniheijastuksia ja ässiä.' : 'Smooths piercing resonance peaks & harsh sibilance.' },
    { band: 7, type: 'High Shelf (Air)', freq: Math.round(airShelfFreq), gain: airShelfGain, q: 0.71, gainDisplay: `+${airShelfGain.toFixed(1)} dB`, gainClass: 'boost', why: isFi ? 'Lisää studiomaista ilmavuutta äänen yläpäähän.' : 'Adds studio breathiness and open top-end sheen.' }
  ];

  // --- DYNAMICS: COMPRESSOR ---
  let compRatio = '2.5 : 1';
  let compRatioNum = 2.5;
  let compThreshold = Math.round(b.rmsDb - 2.5);
  compThreshold = Math.max(-26, Math.min(-14, compThreshold));
  let compAttack = 18;
  let compRelease = 85;
  let compMakeup = Math.abs(compThreshold) > 16 ? 2.5 : 2.0;

  if (target === 'radio') {
    compRatio = '2.2 : 1';
    compRatioNum = 2.2;
    compAttack = 25;
    compRelease = 110;
  } else if (target === 'gaming') {
    compRatio = '4.0 : 1';
    compRatioNum = 4.0;
    compAttack = 12;
    compRelease = 65;
    compMakeup += 1.0;
  }

  // --- DYNAMICS: DE-ESSER (WITH EXPLICIT RANGE & WIDTH) ---
  let deessFreq = Math.round(deharshFreq);
  let deessThreshold = Math.round(b.rmsDb - 4);
  deessThreshold = Math.max(-30, Math.min(-16, deessThreshold));
  let deessRange = sibilanceHarshness > -3.0 || activeVoiceTraits.harsh ? -6.0 : -4.5;
  let deessWidthQ = 2.0;

  // --- DYNAMICS: NOISE GATE ---
  let gateOpenThreshold = Math.round(b.noiseFloorDb + 7);
  gateOpenThreshold = Math.max(-55, Math.min(-32, gateOpenThreshold));
  let gateCloseThreshold = gateOpenThreshold - 5;
  let gateAttack = 2;
  let gateHold = 60;
  let gateRelease = 180;

  if (target === 'gaming') {
    gateOpenThreshold += 3;
    gateCloseThreshold = gateOpenThreshold - 4;
    gateHold = 40;
    gateRelease = 140;
  }

  currentRecommendations = {
    target,
    intensityMode,
    micProfile,
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
      range: deessRange,
      reduction: deessRange,
      widthQ: deessWidthQ,
      widthDisplay: isFi ? 'Q 2.0 (Keskikapea / Bell)' : 'Q 2.0 (Medium-Narrow / Bell)',
      mode: 'Split-band (Bell)'
    },
    gate: {
      openThreshold: gateOpenThreshold,
      closeThreshold: gateCloseThreshold,
      attackMs: gateAttack,
      holdMs: gateHold,
      releaseMs: gateRelease
    }
  };

  renderEasyModeCards();
  renderAdvancedTable();
  renderDynamicsCards();

  if (isAuditionMonitoring) {
    updateAuditionFilters();
  }
}

// --- RENDER FUNCTIONS ---
function renderEasyModeCards() {
  easyCardsContainer.innerHTML = '';
  const isFi = currentLang === 'fi';
  const freqLabel = isFi ? 'Taajuus' : 'Frequency';
  const qLabel = isFi ? 'Q-Arvo' : 'Q Factor';

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
          <span class="val-title">${freqLabel}</span>
          <span class="val-number">${c.freq}</span>
        </div>
        <div class="val-box">
          <span class="val-title">Gain</span>
          <span class="val-number ${c.gainClass}">${c.gain}</span>
        </div>
        <div class="val-box">
          <span class="val-title">${qLabel}</span>
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
  const isFi = currentLang === 'fi';
  const comp = currentRecommendations.compressor;
  compParamsContainer.innerHTML = `
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Kynnystaso (Threshold)' : 'Threshold'}</span>
      <span class="param-val" style="color: var(--accent-blue);">${comp.threshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Suhde (Ratio)' : 'Ratio'}</span>
      <span class="param-val">${comp.ratio}</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Reagointi (Attack)' : 'Attack'}</span>
      <span class="param-val">${comp.attackMs} ms</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Palautus (Release)' : 'Release'}</span>
      <span class="param-val">${comp.releaseMs} ms</span>
    </div>
    <div class="param-pill" style="grid-column: span 2;">
      <span class="param-name">${isFi ? 'Korvausvahvistus (Makeup Gain)' : 'Makeup Gain'}</span>
      <span class="param-val" style="color: var(--accent-emerald);">+${comp.makeupGain.toFixed(1)} dB</span>
    </div>
  `;

  compTipText.innerHTML = isFi 
    ? '<strong>Vinkki:</strong> Attack 18ms päästää puheen alun terävät konsonantit (k, p, t) läpi ennen kuin kompressio puree, jolloin puhe säilyy luonnollisena.'
    : '<strong>Tip:</strong> Attack of 18ms lets initial transients (k, p, t) punch through before clamping down, preserving natural speech articulation.';

  const deess = currentRecommendations.deesser;
  deessParamsContainer.innerHTML = `
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Kohdetaajuus (Frequency)' : 'Center Frequency'}</span>
      <span class="param-val" style="color: var(--accent-purple);">${deess.freq} Hz</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Kynnystaso (Threshold)' : 'Threshold'}</span>
      <span class="param-val">${deess.threshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name" style="color: var(--accent-rose);">${isFi ? 'Range (Vaimennusvara)' : 'Range (Max Reduction)'}</span>
      <span class="param-val" style="color: var(--accent-rose);">${deess.range} dB</span>
    </div>
    <div class="param-pill">
      <span class="param-name" style="color: var(--accent-cyan);">${isFi ? 'Width (Kaistanleveys / Q)' : 'Width (Filter Q)'}</span>
      <span class="param-val" style="font-size: 0.95rem; color: var(--accent-cyan);">${deess.widthDisplay}</span>
    </div>
  `;

  deessTipText.innerHTML = isFi
    ? `<strong>Range & Width -ohje:</strong><br>
       • <strong>Range (${deess.range} dB):</strong> Määrittää suurimman sallitun vaimennuksen. Tämä estää puhetta alkamasta sammaltamaan ("lisping").<br>
       • <strong>Width (Q 2.0 / Bell):</strong> Keskikapea kaistanleveys vaimentaa nimenomaan viheltävät ässät ilman että puheen luonnollinen kirkkaus tummuu.`
    : `<strong>Range & Width Guide:</strong><br>
       • <strong>Range (${deess.range} dB):</strong> Limits the maximum dB reduction so your voice never lisps on hard 'S' words.<br>
       • <strong>Width (Q 2.0 / Bell):</strong> Medium-narrow bandwidth targets only the whistling sibilance frequencies without dulling overall vocal air.`;

  const gate = currentRecommendations.gate;
  gateParamsContainer.innerHTML = `
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Avauskynnys (Open)' : 'Open Threshold'}</span>
      <span class="param-val" style="color: var(--accent-emerald);">${gate.openThreshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Sulkukynnys (Close)' : 'Close Threshold'}</span>
      <span class="param-val">${gate.closeThreshold} dBFS</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Avautumisaika (Attack)' : 'Attack'}</span>
      <span class="param-val">${gate.attackMs} ms</span>
    </div>
    <div class="param-pill">
      <span class="param-name">${isFi ? 'Pitoaika (Hold)' : 'Hold'}</span>
      <span class="param-val">${gate.holdMs} ms</span>
    </div>
    <div class="param-pill" style="grid-column: span 2;">
      <span class="param-name">${isFi ? 'Vaimennusaika (Release)' : 'Release'}</span>
      <span class="param-val">${gate.releaseMs} ms</span>
    </div>
  `;

  gateTipText.innerHTML = isFi
    ? '<strong>Vinkki:</strong> Sulkeutumiskynnys pidetään ~5 dB matalammalla kuin Open (hystereesi) estämään portin hakkauksen lauseiden lopussa.'
    : '<strong>Tip:</strong> Close threshold is set 5 dB lower than Open (hysteresis) to prevent word cutoff at sentence endings.';
}

// --- REAL-TIME AUDIO LOOP ---
function renderLoop() {
  if (!isMicActive) return;

  animationFrameId = requestAnimationFrame(renderLoop);

  analyserNode.getByteFrequencyData(freqData);
  analyserNode.getFloatTimeDomainData(timeData);

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

  updateMeterDisplay(peakDb, rmsDb);

  const pitch = estimatePitch(timeData, audioCtx.sampleRate);
  if (pitch > 65 && pitch < 350 && rmsDb > -38) {
    pitchValueText.textContent = `${Math.round(pitch)} Hz`;
  }

  // Live auto-detection of nasal formant peak during active speech
  if (rmsDb > -38 && freqData) {
    const liveNasal = detectNasalResonancePeak(freqData, audioCtx.sampleRate);
    if (liveNasal >= 850 && liveNasal <= 1850) {
      detectedNasalFreq = Math.round(detectedNasalFreq * 0.9 + liveNasal * 0.1);
      if (detectedNasalFreqText) detectedNasalFreqText.textContent = `${detectedNasalFreq} Hz`;
    }
  }

  if (isTesting) {
    if (testSecondsLeft > 3) {
      if (rmsDb > -42) {
        testVoicedSamples.push({
          peak: peakDb,
          rms: rmsDb,
          pitch: pitch,
          spectrum: new Uint8Array(freqData)
        });
      }
    } else {
      testSilentSamples.push({
        rms: rmsDb,
        peak: peakDb
      });
    }
  }

  drawSpectrum(freqData);
}

function updateMeterDisplay(peakDb, rmsDb) {
  peakValueText.textContent = `${peakDb.toFixed(1)} dB`;
  rmsValueText.textContent = `${rmsDb.toFixed(1)} dB`;

  const peakPct = Math.max(0, Math.min(100, ((peakDb + 60) / 60) * 100));
  const rmsPct = Math.max(0, Math.min(100, ((rmsDb + 60) / 60) * 100));

  peakMeterFill.style.width = `${peakPct}%`;
  rmsMeterFill.style.width = `${rmsPct}%`;

  if (benchmarkData.tested) {
    noiseFloorText.textContent = `${benchmarkData.noiseFloorDb.toFixed(1)} dBFS`;
  } else {
    if (rmsDb < -48) {
      noiseFloorText.textContent = `${rmsDb.toFixed(1)} dBFS`;
    }
  }
}

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

// --- CANVAS SPECTRUM & CURVE DRAWING ---
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
  const clamped = Math.max(MIN_DB, Math.min(MAX_DB, db));
  const range = MAX_DB - MIN_DB;
  return height - ((clamped - MIN_DB) / range) * height;
}

function drawSpectrum(data) {
  const width = canvas.width / window.devicePixelRatio;
  const height = 380;

  ctx.clearRect(0, 0, width, height);

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

  const dbLines = [-12, -24, -36, -48, -60, -72];
  for (let db of dbLines) {
    const y = dbToY(db, height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    ctx.fillText(`${db} dB`, 6, y - 4);
  }

  const nyquist = audioCtx ? audioCtx.sampleRate / 2 : 24000;
  const numBins = data.length;
  const binWidth = nyquist / numBins;

  ctx.beginPath();
  ctx.moveTo(0, height);

  for (let x = 0; x < width; x += 2) {
    const freq = xToFreq(x, width);
    const bin = Math.min(numBins - 1, Math.round(freq / binWidth));
    const byteVal = data[bin];
    const db = -100 + (byteVal / 255) * 94;
    const y = dbToY(db, height);

    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, 'rgba(0, 242, 254, 0.45)');
  grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.05)');
  ctx.fillStyle = grad;
  ctx.fill();

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

  if (showCurveToggle.checked && currentRecommendations) {
    drawEqResponseCurve(width, height);
  }
}

function drawEqResponseCurve(width, height) {
  const adv = currentRecommendations.advEq;
  const zeroY = dbToY(-36, height);

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

  ctx.beginPath();
  for (let x = 0; x < width; x += 2) {
    const freq = xToFreq(x, width);
    let totalGainDb = 0;

    const hpfF = adv[0].freq;
    if (freq < hpfF) {
      const octavesBelow = Math.log2(hpfF / Math.max(1, freq));
      totalGainDb -= Math.min(48, octavesBelow * 18);
    }

    for (let i = 1; i < 6; i++) {
      const b = adv[i];
      if (b.gain !== 0) {
        const bandwidth = 1 / b.q;
        const logRatio = Math.log(freq / b.freq);
        const factor = Math.exp(-0.5 * Math.pow(logRatio / bandwidth, 2));
        totalGainDb += b.gain * factor;
      }
    }

    const airF = adv[6].freq;
    const airG = adv[6].gain;
    if (freq > airF * 0.5) {
      const shelfFactor = 1 / (1 + Math.exp(-2.5 * Math.log(freq / airF)));
      totalGainDb += airG * shelfFactor;
    }

    const curveY = zeroY - (totalGainDb * 6);

    if (x === 0) ctx.moveTo(x, curveY);
    else ctx.lineTo(x, curveY);
  }

  ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
  ctx.shadowBlur = 8;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.shadowBlur = 0;

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
  const isFi = currentLang === 'fi';

  const traitsStr = Object.keys(activeVoiceTraits).filter(k => activeVoiceTraits[k]).join(', ') || 'None';

  const text = isFi ? `=== VOCAL DSP COACH - ÄÄNIPROFIILI JA SUOSITUKSET ===
Mikrofonimalli: ${r.micProfile.name}
EQ-voimakkuus: ${r.intensityMode.toUpperCase()}
Aktiiviset korjaukset: ${traitsStr}
Tunnistettu nenäresonanssi: ${detectedNasalFreq} Hz
Tavoitetyyli: ${r.target.toUpperCase()}
Mittaustulokset: F0: ${benchmarkData.fundamentalFreq} Hz, Kohinataso: ${benchmarkData.noiseFloorDb.toFixed(1)} dBFS, Dynamiikka: ${benchmarkData.crestFactor.toFixed(1)} dB

1. HELPPO TILA (HPF + 3 EQ-ALUETTA):
- HPF: ${r.easyCards[0].freq}
- EQ 1 (Muta): ${r.easyCards[1].freq} | Gain: ${r.easyCards[1].gain} | Q: ${r.easyCards[1].q}
- ${r.easyCards[2].title}: ${r.easyCards[2].freq} | Gain: ${r.easyCards[2].gain} | Q: ${r.easyCards[2].q}
- EQ 3 (Selkeys): ${r.easyCards[3].freq} | Gain: ${r.easyCards[3].gain} | Q: ${r.easyCards[3].q}

2. PARAMETRINEN EQ (EDISTYNYT):
${r.advEq.map(b => `Band ${b.band} [${b.type}]: ${b.freq} Hz | Gain: ${b.gainDisplay} | Q: ${b.q.toFixed(2)}`).join('\n')}

3. DYNAMIIKKA:
- Kompressori: Kynnys: ${r.compressor.threshold} dBFS, Suhde: ${r.compressor.ratio}, Attack: ${r.compressor.attackMs} ms, Release: ${r.compressor.releaseMs} ms, Makeup: +${r.compressor.makeupGain} dB
- De-Esser: Taajuus: ${r.deesser.freq} Hz, Kynnys: ${r.deesser.threshold} dBFS, Range: ${r.deesser.range} dB, Width: ${r.deesser.widthDisplay}
- Noise Gate: Open: ${r.gate.openThreshold} dBFS, Close: ${r.gate.closeThreshold} dBFS, Attack: ${r.gate.attackMs} ms, Hold: ${r.gate.holdMs} ms, Release: ${r.gate.releaseMs} ms
` : `=== VOCAL DSP COACH - VOICE PROFILE & RECOMMENDATIONS ===
Microphone Model: ${r.micProfile.name}
EQ Intensity: ${r.intensityMode.toUpperCase()}
Active Traits: ${traitsStr}
Detected Nasal Peak: ${detectedNasalFreq} Hz
Target Style: ${r.target.toUpperCase()}
Measurements: F0: ${benchmarkData.fundamentalFreq} Hz, Noise Floor: ${benchmarkData.noiseFloorDb.toFixed(1)} dBFS, Crest Factor: ${benchmarkData.crestFactor.toFixed(1)} dB

1. EASY MODE (HPF + 3 EQ BANDS):
- HPF: ${r.easyCards[0].freq}
- EQ 1 (Mud Cut): ${r.easyCards[1].freq} | Gain: ${r.easyCards[1].gain} | Q: ${r.easyCards[1].q}
- ${r.easyCards[2].title}: ${r.easyCards[2].freq} | Gain: ${r.easyCards[2].gain} | Q: ${r.easyCards[2].q}
- EQ 3 (Presence Boost): ${r.easyCards[3].freq} | Gain: ${r.easyCards[3].gain} | Q: ${r.easyCards[3].q}

2. ADVANCED PARAMETRIC EQ:
${r.advEq.map(b => `Band ${b.band} [${b.type}]: ${b.freq} Hz | Gain: ${b.gainDisplay} | Q: ${b.q.toFixed(2)}`).join('\n')}

3. DYNAMICS:
- Compressor: Threshold: ${r.compressor.threshold} dBFS, Ratio: ${r.compressor.ratio}, Attack: ${r.compressor.attackMs} ms, Release: ${r.compressor.releaseMs} ms, Makeup: +${r.compressor.makeupGain} dB
- De-Esser: Frequency: ${r.deesser.freq} Hz, Threshold: ${r.deesser.threshold} dBFS, Range: ${r.deesser.range} dB, Width: ${r.deesser.widthDisplay}
- Noise Gate: Open: ${r.gate.openThreshold} dBFS, Close: ${r.gate.closeThreshold} dBFS, Attack: ${r.gate.attackMs} ms, Hold: ${r.gate.holdMs} ms, Release: ${r.gate.releaseMs} ms
`;

  navigator.clipboard.writeText(text).then(() => {
    showCopyAlert(I18N[currentLang].copiedAlert);
  });
}

function copyObsToClipboard() {
  if (!currentRecommendations) return;
  const r = currentRecommendations;
  const isFi = currentLang === 'fi';

  const text = isFi ? `=== OBS STUDIO SUODATINJÄRJESTYS & ASETUKSET ===
Lisää mikrofoniisi OBS:ssä suodattimet (Filters) tässä järjestyksessä:

1. KOHINAPORTTI (Noise Gate):
   - Sulkeutumiskynnys (Close): ${r.gate.closeThreshold} dB
   - Avautumiskynnys (Open): ${r.gate.openThreshold} dB
   - Reagointiaika (Attack): ${r.gate.attackMs} ms
   - Pitoaika (Hold): ${r.gate.holdMs} ms
   - Vapautusaika (Release): ${r.gate.releaseMs} ms

2. TAAJUUSKORJAIN (3-Band EQ tai VST EQ):
   - HPF: ${r.advEq[0].freq} Hz
   - Matalat (Mud): ${r.advEq[2].gainDisplay} (${r.advEq[2].freq} Hz)
   - Keskialue (Nenä / Pahvi): ${r.advEq[3].gainDisplay} (${r.advEq[3].freq} Hz)
   - Preesens (Artikulaatio): ${r.advEq[4].gainDisplay} (${r.advEq[4].freq} Hz)
   - Korkeat (High): +${r.advEq[6].gain.toFixed(1)} dB (11 kHz)

3. KOMPRESSORI (Compressor):
   - Suhde (Ratio): ${r.compressor.ratio}
   - Kynnysarvo (Threshold): ${r.compressor.threshold} dB
   - Reagointiaika (Attack): ${r.compressor.attackMs} ms
   - Vapautusaika (Release): ${r.compressor.releaseMs} ms
   - Lähtövahvistus (Output Gain): +${r.compressor.makeupGain.toFixed(1)} dB

4. DE-ESSER (VST-plugari, esim. TDR Nova tai ReaXcomp):
   - Kohdetaajuus (Frequency): ${r.deesser.freq} Hz
   - Kynnys (Threshold): ${r.deesser.threshold} dB
   - Range (Maksimivaimennus): ${r.deesser.range} dB
   - Width (Kaistanleveys Q): ${r.deesser.widthQ}

5. RAJOITIN (Limiter):
   - Kynnysarvo: -2.0 dB
   - Vapautus: 60 ms
` : `=== OBS STUDIO FILTER CHAIN & RECOMMENDED SETTINGS ===
Add filters to your microphone in OBS Studio in this order:

1. NOISE GATE:
   - Close Threshold: ${r.gate.closeThreshold} dB
   - Open Threshold: ${r.gate.openThreshold} dB
   - Attack Time: ${r.gate.attackMs} ms
   - Hold Time: ${r.gate.holdMs} ms
   - Release Time: ${r.gate.releaseMs} ms

2. 3-BAND EQ OR PARAMETRIC VST (EQ):
   - HPF: High-pass at ${r.advEq[0].freq} Hz
   - Low: Mud cut ${r.advEq[2].gainDisplay} at ${r.advEq[2].freq} Hz
   - Mid (Nasal/Boxy Notch): ${r.advEq[3].gainDisplay} at ${r.advEq[3].freq} Hz
   - Presence: Boost ${r.advEq[4].gainDisplay} at ${r.advEq[4].freq} Hz
   - High: Air shelf +${r.advEq[6].gain.toFixed(1)} dB at 11 kHz

3. COMPRESSOR:
   - Ratio: ${r.compressor.ratio}
   - Threshold: ${r.compressor.threshold} dB
   - Attack: ${r.compressor.attackMs} ms
   - Release: ${r.compressor.releaseMs} ms
   - Output Gain: +${r.compressor.makeupGain.toFixed(1)} dB

4. DE-ESSER (VST Plugin, e.g. TDR Nova or ReaXcomp):
   - Frequency: ${r.deesser.freq} Hz
   - Threshold: ${r.deesser.threshold} dB
   - Range (Max Reduction): ${r.deesser.range} dB
   - Width (Q factor): ${r.deesser.widthQ}

5. LIMITER:
   - Threshold: -2.0 dB
   - Release: 60 ms
`;

  navigator.clipboard.writeText(text).then(() => {
    showCopyAlert(I18N[currentLang].copiedAlert);
  });
}

function copyApoToClipboard() {
  if (!currentRecommendations) return;
  const adv = currentRecommendations.advEq;
  const text = `# Equalizer APO Configuration
# Generated by Vocal DSP Coach for ${currentRecommendations.micProfile.name} (${currentRecommendations.intensityMode})
Filter 1: ON HP Fc ${adv[0].freq} Hz
Filter 2: ON PK Fc ${adv[1].freq} Hz Gain ${adv[1].gain.toFixed(1)} dB Q ${adv[1].q.toFixed(2)}
Filter 3: ON PK Fc ${adv[2].freq} Hz Gain ${adv[2].gain.toFixed(1)} dB Q ${adv[2].q.toFixed(2)}
Filter 4: ON PK Fc ${adv[3].freq} Hz Gain ${adv[3].gain.toFixed(1)} dB Q ${adv[3].q.toFixed(2)}
Filter 5: ON PK Fc ${adv[4].freq} Hz Gain ${adv[4].gain.toFixed(1)} dB Q ${adv[4].q.toFixed(2)}
Filter 6: ON PK Fc ${adv[5].freq} Hz Gain ${adv[5].gain.toFixed(1)} dB Q ${adv[5].q.toFixed(2)}
Filter 7: ON HS Fc ${adv[6].freq} Hz Gain ${adv[6].gain.toFixed(1)} dB
`;

  navigator.clipboard.writeText(text).then(() => {
    showCopyAlert(I18N[currentLang].copiedAlert);
  });
}
