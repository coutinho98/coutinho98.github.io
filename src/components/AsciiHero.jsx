import { useEffect, useRef, useState } from 'react'
import { mount, names, load } from 'ascii.rest'
import * as stormPlains from 'ascii.rest/pieces/storm-plains'

const SCENES = [
  'storm-plains',
  'tokyo-rain',
  'night-coast',
  'ocean-sunset',
  'misty-forest',
  'kyoto-dusk',
  'alpine-dawn',
  'aurora-fjord',
  'deep-reef',
  'desert-night',
  'earthrise',
  'lantern-lake',
  'marine-drive',
  'taj-dawn',
  'varanasi-ghats',
]
const COLORED_NAMES = SCENES.filter((n) => names.includes(n))
const STORAGE_KEY = 'ascii-scene'

const savedScene = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
})()
const START_INDEX = Math.max(0, COLORED_NAMES.indexOf(savedScene))
const MAX_FONT = 48

const AsciiHero = () => {
  const [index, setIndex] = useState(START_INDEX)
  const [piece, setPiece] = useState(stormPlains)
  const ref = useRef(null)

  const name = COLORED_NAMES[index]

  useEffect(() => {
    if (name === 'storm-plains') {
      setPiece(stormPlains)
      return
    }
    let live = true
    load[name]().then((m) => {
      if (live) setPiece(m)
    })
    return () => {
      live = false
    }
  }, [name])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, COLORED_NAMES[index])
    } catch {
      /* storage unavailable */
    }
  }, [index])

  const isCanvas = !!piece.meta.palette
  const pieceName = piece.meta.name

  useEffect(() => {
    const el = ref.current
    if (!el || !piece) return
    if (!isCanvas) {
      const w = Math.min(el.parentElement.clientWidth * 0.92, 1180)
      const byWidth = w / (piece.meta.cols * 0.6)
      const byHeight = 590 / (piece.meta.rows * 1.2)
      el.style.fontSize = `${Math.floor(Math.min(MAX_FONT, byWidth, byHeight))}px`
    }
    return mount(el, piece)
  }, [piece, isCanvas])

  const next = () => setIndex((i) => (i + 1) % COLORED_NAMES.length)

  return (
    <section
      aria-label="Animated ASCII art. Click to see the next piece."
      className="flex w-full cursor-pointer items-center justify-center bg-bg py-10 md:h-svh"
      data-cuelume-tap
      onClick={next}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          next()
        }
      }}
      tabIndex={0}
      role="button"
    >
      {isCanvas ? (
        <canvas
          key={pieceName}
          ref={ref}
          role="img"
          aria-label={piece.meta.note}
          className="block w-full max-w-[1180px] rounded-[16px] transition-[filter] duration-700 ease-out md:translate-y-10 md:hover:brightness-125"
        />
      ) : (
        <pre
          key={pieceName}
          ref={ref}
          aria-label={piece.meta.note}
          className="m-0 overflow-visible font-mono leading-[1.2] text-ink transition-[filter] duration-700 ease-out md:translate-y-10 md:hover:brightness-125"
        />
      )}
    </section>
  )
}

export default AsciiHero
