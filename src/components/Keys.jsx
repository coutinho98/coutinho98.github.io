import { motion as Motion, useReducedMotion } from 'motion/react'
import { playKey } from '../lib/pentatonic'

const WHITE = [
  { n: 'C', s: 0 },
  { n: 'D', s: 2 },
  { n: 'E', s: 4 },
  { n: 'F', s: 5 },
  { n: 'G', s: 7 },
  { n: 'A', s: 9 },
  { n: 'B', s: 11 },
]
const BLACK = [
  { s: 1, at: 1, n: 'C#' },
  { s: 3, at: 2, n: 'D#' },
  { s: 6, at: 4, n: 'F#' },
  { s: 8, at: 5, n: 'G#' },
  { s: 10, at: 6, n: 'A#' },
]
const OCTAVES = [4, 5]
const TOTAL = WHITE.length * OCTAVES.length

const whites = OCTAVES.flatMap((o) => WHITE.map((w) => ({ ...w, o })))
const blacks = OCTAVES.flatMap((o, oi) =>
  BLACK.map((b) => ({ ...b, o, boundary: oi * WHITE.length + b.at }))
)

const Defs = () => (
  <svg aria-hidden="true" width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="wk-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFE" />
        <stop offset="0.1" stopColor="#FBFAF6" />
        <stop offset="0.8" stopColor="#F2F0EA" />
        <stop offset="1" stopColor="#E9E6DF" />
      </linearGradient>
      <linearGradient id="wk-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="wk-bevel-l" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000000" stopOpacity="0.2" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="wk-bevel-r" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#000000" stopOpacity="0.2" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="wk-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D8D5CC" />
        <stop offset="0.35" stopColor="#CFCBBF" />
        <stop offset="1" stopColor="#BDB8AA" />
      </linearGradient>
      <linearGradient id="bk-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#514C5B" />
        <stop offset="0.12" stopColor="#38333F" />
        <stop offset="0.55" stopColor="#221E28" />
        <stop offset="0.88" stopColor="#2A2530" />
        <stop offset="1" stopColor="#100E15" />
      </linearGradient>
      <linearGradient id="bk-sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="0.14" stopColor="#FFFFFF" stopOpacity="0.35" />
        <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="bk-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0C0A10" />
        <stop offset="0.5" stopColor="#1C1822" />
        <stop offset="1" stopColor="#332E3B" />
      </linearGradient>
      <linearGradient id="felt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#93303E" />
        <stop offset="0.45" stopColor="#742430" />
        <stop offset="1" stopColor="#521722" />
      </linearGradient>
      <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3E322B" />
        <stop offset="0.5" stopColor="#4A3B31" />
        <stop offset="1" stopColor="#2C231E" />
      </linearGradient>
    </defs>
  </svg>
)

const WhiteKeyArt = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 140"
    preserveAspectRatio="none"
    className="pointer-events-none absolute inset-0 h-full w-full"
  >
    <path d="M0 0 H40 V132 Q40 138 34 138 H6 Q0 138 0 132 Z" fill="url(#wk-top)" />
    <rect x="0" y="0" width="6" height="138" fill="url(#wk-bevel-l)" />
    <rect x="34" y="0" width="6" height="138" fill="url(#wk-bevel-r)" />
    <rect x="0" y="0" width="40" height="7" fill="url(#wk-shine)" />
    <rect x="1" y="130" width="38" height="8" rx="2" fill="url(#wk-front)" />
    <rect x="1" y="129" width="38" height="1.3" fill="#000" opacity="0.18" />
  </svg>
)

const BlackKeyArt = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 30 92"
    preserveAspectRatio="none"
    className="pointer-events-none absolute inset-0 h-full w-full"
  >
    <path d="M5 0 H25 L30 78 Q30 84 24 84 H6 Q0 84 0 78 Z" fill="url(#bk-body)" />
    <path d="M0 74 L30 74 L30 78 Q30 84 24 84 H6 Q0 84 0 78 Z" fill="url(#bk-front)" />
    <path d="M5 0 H25 L30 78 L0 78 Z" fill="url(#bk-sheen)" />
    <path d="M5 0.8 H25" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
  </svg>
)

const Keys = () => {
  const reduced = useReducedMotion()

  return (
    <div role="group" aria-label="Piano: passe o mouse ou toque as teclas" className="relative mt-12 pb-4">
      <Defs />
      <div
        aria-hidden="true"
        className="relative z-10 h-2.5 rounded-t-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_3px_4px_rgba(0,0,0,0.45)]"
        style={{ backgroundImage: 'linear-gradient(to bottom, #93303E, #742430 45%, #521722)' }}
      />
      <div
        className="relative h-36 rounded-b-xl p-[4px] pb-[7px] shadow-[0_16px_34px_rgba(29,28,26,0.4)]"
        style={{ background: 'linear-gradient(to bottom, #3E322B, #4A3B31 50%, #2C231E)' }}
      >
        <div className="relative h-full w-full rounded-[3px] bg-[#0E0D11]" style={{ perspective: '900px' }}>
          <div className="flex h-full w-full gap-[2.5px]">
            {whites.map((w, i) => (
              <Motion.button
                key={`w${i}`}
                type="button"
                aria-label={`${w.n}${w.o}`}
                whileHover={reduced ? {} : { rotateX: 3.5, filter: 'brightness(0.965)' }}
                whileTap={{ rotateX: 6, filter: 'brightness(0.94)' }}
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                onMouseEnter={() => playKey(w.s + (w.o - 4) * 12)}
                onClick={() => playKey(w.s + (w.o - 4) * 12, true)}
                className="relative h-full flex-1 cursor-pointer overflow-hidden rounded-b-[7px]"
                style={{ transformOrigin: 'top center' }}
              >
                <WhiteKeyArt />
                <span className="absolute inset-x-0 bottom-2 z-10 text-center text-[9px] font-medium text-[#8a877f]">
                  {w.n}
                  {w.o}
                </span>
              </Motion.button>
            ))}
          </div>
          {blacks.map((b, i) => (
            <Motion.button
              key={`b${i}`}
              type="button"
              aria-label={`${b.n} ${b.o}`}
              whileHover={reduced ? {} : { rotateX: 4.5, filter: 'brightness(1.15)' }}
              whileTap={{ rotateX: 7 }}
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              onMouseEnter={() => playKey(b.s + (b.o - 4) * 12)}
              onClick={() => playKey(b.s + (b.o - 4) * 12, true)}
              className="absolute top-0 z-20 h-[60%] cursor-pointer"
              style={{
                left: `${(b.boundary / TOTAL) * 100}%`,
                width: `calc(${100 / TOTAL}% * 0.62)`,
                transform: 'translateX(-50%)',
                transformOrigin: 'top center',
                filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.55))',
              }}
            >
              <BlackKeyArt />
            </Motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Keys
