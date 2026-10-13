let ctx = null
const SCALE = [0, 2, 4, 7, 9]
const BASE = 261.63

const ensureCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

const freqFor = (index) => {
  const i = ((index % 10) + 10) % 10
  const semis = SCALE[i % 5] + 12 * Math.floor(i / 5)
  return BASE * Math.pow(2, semis / 12)
}

const tone = (c, freq, vol) => {
  const t0 = c.currentTime
  const gain = c.createGain()
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6)
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 2200
  const osc = c.createOscillator()
  osc.type = 'triangle'
  osc.frequency.value = freq
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + 0.65)
}

const ready = () => {
  const c = ensureCtx()
  if (!c || c.state !== 'running') return null
  return c
}

export const playNote = (index) => {
  const c = ready()
  if (!c) return
  tone(c, freqFor(index), 0.1)
}

export const playChord = (index) => {
  const c = ready()
  if (!c) return
  const freq = freqFor(index)
  tone(c, freq, 0.1)
  tone(c, freq * Math.pow(2, 7 / 12), 0.06)
}

export const playKey = (semi, chord = false) => {
  const c = ready()
  if (!c) return
  const freq = BASE * Math.pow(2, semi / 12)
  tone(c, freq, chord ? 0.11 : 0.1)
  if (chord) tone(c, freq * Math.pow(2, 7 / 12), 0.06)
}
