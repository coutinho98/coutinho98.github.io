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
  { s: 1, at: 1 },
  { s: 3, at: 2 },
  { s: 6, at: 4 },
  { s: 8, at: 5 },
  { s: 10, at: 6 },
]
const OCTAVES = [4, 5]
const TOTAL = WHITE.length * OCTAVES.length

const whites = OCTAVES.flatMap((o) => WHITE.map((w) => ({ ...w, o })))
const blacks = OCTAVES.flatMap((o, oi) =>
  BLACK.map((b) => ({ ...b, o, boundary: oi * WHITE.length + b.at }))
)

const Keys = () => {
  const reduced = useReducedMotion()

  return (
    <div
      role="group"
      aria-label="Piano: passe o mouse ou toque as teclas"
      className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-1.5 pb-1.5"
    >
      <div className="relative h-32">
        {/* Container das teclas brancas */}
        <div className="flex h-full w-full">
          {whites.map((w, i) => (
            <Motion.button
              key={`w${i}`}
              type="button"
              aria-label={`${w.n}${w.o}`}
              whileHover={reduced ? {} : { y: 2 }}
              whileTap={{ y: 4 }}
              transition={{ type: 'spring', stiffness: 600, damping: 25 }}
              onMouseEnter={() => playKey(w.s + (w.o - 4) * 12)}
              onClick={() => playKey(w.s + (w.o - 4) * 12, true)}
              className="relative flex h-full flex-1 cursor-pointer items-end justify-center rounded-b-lg border-[3px] border-white bg-gradient-to-b from-white to-[#EFEEEA] pb-2 shadow-[inset_0_-6px_0_#DFDDD7,0_8px_16px_rgba(29,28,26,0.1)] transition-colors duration-100 hover:from-[#DCEEf7] hover:to-[#A9D9EF]"
            >
              <span className="text-[10px] font-medium text-muted">
                {w.n}
                {w.o}
              </span>
            </Motion.button>
          ))}
        </div>

        {/* Container / mapeamento das teclas pretas sobrepostas */}
        {blacks.map((b, i) => (
          <Motion.button
            key={`b${i}`}
            type="button"
            aria-label={`tecla preta semi ${b.s} oitava ${b.o}`}
            whileHover={reduced ? {} : { y: 2 }}
            whileTap={{ y: 4 }}
            transition={{ type: 'spring', stiffness: 600, damping: 25 }}
            onMouseEnter={() => playKey(b.s + (b.o - 4) * 12)}
            onClick={() => playKey(b.s + (b.o - 4) * 12, true)}
            className="absolute top-0 z-10 h-[62%] cursor-pointer rounded-b-md border border-b-[4px] border-b-[#0d0c0f] bg-gradient-to-b from-[#33313A] to-[#1D1C1A] shadow-[0_6px_10px_rgba(29,28,26,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors duration-100 hover:from-[#4C3A8C] hover:to-[#2A2350]"
            style={{
              left: `${(b.boundary / TOTAL) * 100}%`,
              width: `calc(${100 / TOTAL}% * 0.62)`,
              transform: 'translateX(-50%)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Keys