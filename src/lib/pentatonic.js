let ctx = null
const SCALE = [4, 7, 9, 11, 14]
const BASE = 523.25

const ensureCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    const unlock = () => ctx.resume()
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

const ready = () => {
  const c = ensureCtx()
  if (!c || c.state !== 'running') return null
  return c
}

const freqFor = (index) => {
  const n = Math.max(0, index)
  const oct = Math.min(Math.floor(n / 5), 2)
  const semis = SCALE[n % 5] - 12 + 12 * oct
  return BASE * Math.pow(2, semis / 12)
}

const chime = (c, freq, vol, when = 0) => {
  const t0 = c.currentTime + when
  const partials = [
    { ratio: 1, vol: 1, decay: 2.6 },
    { ratio: 2, vol: 0.18, decay: 1.3 },
    { ratio: 3, vol: 0.06, decay: 0.35 },
  ]
  for (const p of partials) {
    const gain = c.createGain()
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(vol * p.vol, t0 + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.decay)
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq * p.ratio
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(t0)
    osc.stop(t0 + p.decay + 0.05)
  }
}

export const playNote = (index) => {
  const c = ready()
  if (!c) return
  chime(c, freqFor(index), 0.14)
}

export const playChord = (index) => {
  const c = ready()
  if (!c) return
  const freq = freqFor(index)
  chime(c, freq, 0.14)
  chime(c, freq * Math.pow(2, 7 / 12), 0.09, 0.08)
}

// Hedwig's Theme, 30 melody notes as [semitones from C5, duration in s]
// B E G F# E B A F# | E G F# D# F B | B E G F# E B D C# C G# | C B A# A# G E
const HEDWIG = [
  [-1, 0.34], [4, 0.5], [7, 0.17], [6, 0.33], [4, 0.68], [11, 0.33], [9, 1.01], [6, 1.01],
  [4, 0.5], [7, 0.17], [6, 0.34], [3, 0.67], [5, 0.33], [-1, 1.68],
  [-1, 0.34], [4, 0.5], [7, 0.17], [6, 0.34], [4, 0.67], [11, 0.34], [14, 0.67], [13, 0.33], [12, 0.68], [8, 0.33],
  [12, 0.51], [11, 0.16], [10, 0.34], [-2, 0.67], [7, 0.34], [4, 1.8],
]

const MIX = [[-1,0,0.13],[4,0.34,0.13],[-8,0.34,0.05],[7,0.84,0.13],[6,1.01,0.13],[4,1.34,0.13],[-8,1.34,0.05],[11,2.02,0.13],[-8,2.35,0.05],[9,2.35,0.13],[-8,3.36,0.05],[6,3.36,0.13],[4,4.37,0.13],[-8,4.37,0.05],[7,4.87,0.13],[6,5.04,0.13],[-2,5.38,0.13],[3,5.38,0.13],[-13,6.05,0.05],[5,6.05,0.13],[-8,6.38,0.05],[-1,6.38,0.13],[-13,8.06,0.05],[-1,8.06,0.13],[4,8.4,0.13],[-8,8.4,0.05],[7,8.9,0.13],[6,9.07,0.13],[4,9.41,0.13],[-8,9.41,0.05],[11,10.08,0.13],[14,10.42,0.13],[-10,10.42,0.05],[-5,10.42,0.13],[-2,10.42,0.13],[2,10.42,0.13],[7,10.42,0.13],[13,11.09,0.13],[12,11.42,0.13],[-12,11.42,0.05],[-7,11.42,0.13],[-4,11.42,0.13],[0,11.42,0.13],[5,11.42,0.13],[8,12.1,0.13],[12,12.43,0.13],[-12,12.43,0.05],[-8,12.43,0.05],[-3,12.43,0.13],[0,12.43,0.13],[4,12.43,0.13],[11,12.94,0.13],[10,13.1,0.13],[-2,13.44,0.13],[-11,13.44,0.05],[-8,13.44,0.05],[-6,13.44,0.13],[7,14.11,0.13],[-8,14.45,0.05],[4,14.45,0.13]]

const themeStep = (step) =>
  HEDWIG[((step % HEDWIG.length) + HEDWIG.length) % HEDWIG.length]

export const playThemeNote = (step) => {
  const c = ready()
  if (!c) return
  chime(c, BASE * Math.pow(2, themeStep(step)[0] / 12), 0.14)
}

export const playThemeChord = (step) => {
  const c = ready()
  if (!c) return
  const freq = BASE * Math.pow(2, themeStep(step)[0] / 12)
  chime(c, freq, 0.14)
  chime(c, freq * Math.pow(2, 7 / 12), 0.09, 0.08)
}

const MELODY_TIMES = [0, 0.34, 0.84, 1.01, 1.34, 2.02, 2.35, 3.36, 4.37, 4.87, 5.04, 5.38, 6.05, 6.38, 8.06, 8.4, 8.9, 9.07, 9.41, 10.08, 10.42, 11.09, 11.42, 12.1, 12.43, 12.94, 13.1, 13.44, 14.11, 14.45]

const stepListeners = new Set()
let stepTimers = []

export const subscribeSteps = (cb) => {
  stepListeners.add(cb)
  return () => stepListeners.delete(cb)
}

const emitStep = (step) => stepListeners.forEach((cb) => cb(step))

export const playMelody = () => {
  const c = ready()
  if (!c) return false
  stepTimers.forEach(clearTimeout)
  stepTimers = []
  for (const [semi, when, vol] of MIX) {
    chime(c, BASE * Math.pow(2, semi / 12), vol, 0.1 + when)
  }
  MELODY_TIMES.forEach((t, step) => {
    stepTimers.push(setTimeout(() => emitStep(step), (0.1 + t) * 1000))
  })
  const end = MELODY_TIMES[MELODY_TIMES.length - 1] + 1
  stepTimers.push(setTimeout(() => emitStep(-1), (0.1 + end) * 1000))
  return true
}

export const resumeAudio = async () => {
  const c = ensureCtx()
  if (!c || c.state === 'running') return
  await c.resume().catch(() => {})
}
