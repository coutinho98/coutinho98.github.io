import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'motion/react'
import { Ram } from '@mirayavandiepen/ram'
import Reveal from './Reveal'
import avatar from '../assets/avatar.png'

const WORD_COLORS = ['#1D1C1A', '#7C3AED', '#DD5B26', '#2563EB']

const WORD_FONTS = [
  { name: 'Space Grotesk', family: null, scale: 1 },
  { name: 'Caveat', family: 'Caveat', scale: 1.12, weight: 600 },
  { name: 'Playfair Display', family: 'Playfair Display', scale: 0.95, weight: 500 },
  { name: 'Bebas Neue', family: 'Bebas Neue', scale: 1.02, weight: 400 },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', scale: 0.84, weight: 500 },
]

const fontUrl = (f) =>
  `https://fonts.googleapis.com/css2?family=${f.name.replace(/ /g, '+')}:wght@${f.weight ?? 500}&display=swap`

const tap = { type: 'spring', stiffness: 500, damping: 20 }

const Hero = () => {
  const [font, setFont] = useState(WORD_FONTS[0])
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [color, setColor] = useState(WORD_COLORS[0])
  const [showPhoto, setShowPhoto] = useState(false)

  useEffect(() => {
    WORD_FONTS.slice(1).forEach((f) => {
      const id = `font-${f.name.replace(/\s+/g, '-').toLowerCase()}`
      if (!document.getElementById(id)) {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = fontUrl(f)
        document.head.appendChild(link)
      }
    })
  }, [])

  return (
    <section id="top" className="pt-16 pb-20 md:pt-24">
      <Reveal as="p" delay={0} className="mb-8 text-[clamp(1.375rem,2.6vw,1.625rem)] leading-[1.35] text-muted">
        Hey,
      </Reveal>
      <Reveal
        as="h1"
        delay={0.1}
        className="text-[clamp(1.375rem,2.6vw,1.625rem)] leading-[1.35] font-normal whitespace-normal md:whitespace-nowrap text-ink"
      >
        I&rsquo;m{' '}
        <span
          tabIndex={0}
          aria-label="Mateus"
          className="relative inline-block cursor-default decoration-line underline-offset-4 outline-offset-4 hover:underline focus-visible:underline"
          onMouseEnter={() => setShowPhoto(true)}
          onMouseLeave={() => setShowPhoto(false)}
          onFocus={() => setShowPhoto(true)}
          onBlur={() => setShowPhoto(false)}
        >
          <AnimatePresence>
            {showPhoto && (
              <Motion.img
                src={avatar}
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, x: '-50%', y: 10, scale: 0.6, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: '-50%', y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: '-50%', y: 8, scale: 0.75, filter: 'blur(4px)' }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 h-20 w-20 rounded-full object-cover shadow-xl"
              />
            )}
          </AnimatePresence>
          Mateus
        </span>
        ,{' '}
        <span
          className="relative mx-2 inline-block md:w-[280px] md:text-center"
          style={{
            fontFamily: font.family ? `"${font.name}", sans-serif` : undefined,
            fontSize: font.scale !== 1 ? `${font.scale}em` : undefined,
            fontWeight: bold ? 700 : (font.weight ?? 500),
            color,
            transform: italic ? 'skewX(-10deg)' : undefined,
          }}
        >
          <Ram
            persistent
            delay={1400}
            duration={900}
            animation="static"
            style={{ '--ram-inset': '7px', padding: '0 6px' }}
          >
            fullstack developer
          </Ram>          <span
            role="toolbar"
            aria-label="Word style"
            className="absolute top-full left-1/2 z-10 mt-1.5 inline-flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-surface px-1 py-0.5"
          >
            {WORD_FONTS.map((f) => (
              <Motion.button
                key={f.name}
                type="button"
                aria-pressed={font.name === f.name}
                aria-label={`Font: ${f.name}`}
                data-cuelume-toggle
                whileTap={{ scale: 0.8 }}
                transition={tap}
                onClick={() => setFont(f)}
                className={`grid h-5 w-6 place-items-center rounded-full text-[13px] leading-none transition-colors ${
                  font.name === f.name ? 'bg-line text-ink' : 'text-muted hover:text-ink'
                }`}
                style={{
                  fontFamily: f.family ? `"${f.name}", sans-serif` : undefined,
                }}
              >
                Aa
              </Motion.button>
            ))}
            <span aria-hidden="true" className="h-3.5 w-px bg-line" />
            <Motion.button
              type="button"
              aria-pressed={bold}
              aria-label="Bold"
              data-cuelume-toggle
              whileTap={{ scale: 0.8 }}
              transition={tap}
              onClick={() => setBold((v) => !v)}
              className={`grid h-5 w-5 place-items-center rounded-full text-[11px] transition-colors ${
                bold ? 'bg-line text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className="font-bold">B</span>
            </Motion.button>
            <Motion.button
              type="button"
              aria-pressed={italic}
              aria-label="Italic"
              data-cuelume-toggle
              whileTap={{ scale: 0.8 }}
              transition={tap}
              onClick={() => setItalic((v) => !v)}
              className={`grid h-5 w-5 place-items-center rounded-full text-[11px] transition-colors ${
                italic ? 'bg-line text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className="italic">I</span>
            </Motion.button>
            <span aria-hidden="true" className="h-3.5 w-px bg-line" />
            {WORD_COLORS.map((c) => (
              <Motion.button
                key={c}
                type="button"
                aria-pressed={color === c}
                aria-label={`Color: ${c}`}
                data-cuelume-toggle
                whileTap={{ scale: 0.75 }}
                transition={tap}
                onClick={() => setColor(c)}
                className={`grid h-5 w-5 place-items-center rounded-full transition-transform hover:scale-110 ${
                  color === c ? 'ring-2 ring-line' : ''
                }`}
              >
                <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
              </Motion.button>
            ))}
          </span>
        </span>{' '}
        in Salvador.
      </Reveal>
      <Reveal as="p" delay={0.25} className="mt-12 text-[clamp(1.375rem,2.6vw,1.625rem)] leading-[1.4] text-muted">
        I care about the small stuff: clean layouts and tiny interactions that
        make software feel alive.
      </Reveal>
      <Reveal as="p" delay={0.35} className="mt-10 text-[clamp(1.375rem,2.6vw,1.625rem)] leading-[1.4] text-muted">
        Reach out to me{' '}
        <a
          href="https://github.com/coutinho98"
          target="_blank"
          rel="noopener noreferrer"
          data-cuelume-navigate
          className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          @coutinho98
        </a>
        . Open to work.
      </Reveal>
    </section>
  )
}

export default Hero
