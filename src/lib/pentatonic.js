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

const HEDWIG = [
  [-1, 0.34], [4, 0.51], [7, 0.17], [6, 0.34], [4, 0.68], [11, 0.34], [9, 1.01],
  [6, 1.01], [4, 0.51], [7, 0.17], [6, 0.34], [3, 0.67], [5, 0.34], [-1, 1.01],
  [-1, 0.67], [-1, 0.34], [4, 0.51], [7, 0.17], [6, 0.34], [4, 0.68], [11, 0.34],
  [14, 0.67], [13, 0.34], [12, 1.01], [12, 0.51], [11, 0.17], [10, 1.01],
  [7, 0.34], [4, 1.8],
]

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

export const playMelody = () => {
  const c = ready()
  if (!c) return false
  let t = 0.1
  for (const [semi, gap] of HEDWIG) {
    const freq = BASE * Math.pow(2, semi / 12)
    chime(c, freq, 0.13, t)
    chime(c, freq, 0.03, t + 0.3)
    t += gap
  }
  return true
}

export const resumeAudio = async () => {
  const c = ensureCtx()
  if (!c || c.state === 'running') return
  await c.resume().catch(() => {})
}
