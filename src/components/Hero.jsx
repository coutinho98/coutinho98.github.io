import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { m as Motion, AnimatePresence } from 'motion/react'
import { Ram } from '@mirayavandiepen/ram'
import Reveal from './Reveal'
import Words from './Words'
import { playThemeNote, subscribeSteps } from '../lib/pentatonic'
import { noteClass } from '../lib/noteClass'
import avatar from '../assets/avatar.webp'

const WORD_COLORS = ['rgb(var(--c-ink))', '#7C3AED', '#DD5B26', '#2563EB']

const WORD_FONTS = [
  { name: 'Space Grotesk', family: null, scale: 1 },
  { name: 'Caveat', family: 'Caveat', scale: 1.12, weight: 600 },
  { name: 'Playfair Display', family: 'Playfair Display', scale: 0.95, weight: 500 },
  { name: 'Bebas Neue', family: 'Bebas Neue', scale: 1.02, weight: 400 },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', scale: 0.84, weight: 500 },
]

const fontUrl = (f) =>
  `https://fonts.googleapis.com/css2?family=${f.name.replace(/ /g, '+')}:wght@${f.weight ?? 500}&display=swap`

// the extra fonts are only fetched once someone reaches for the style toolbar
let fontsLoaded = false
const loadFonts = () => {
  if (fontsLoaded) return
  fontsLoaded = true
  WORD_FONTS.slice(1).forEach((f) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fontUrl(f)
    document.head.appendChild(link)
  })
}

const tap = { type: 'spring', stiffness: 500, damping: 20 }

// one size, one rhythm for the whole intro
const prose = 'text-[clamp(1.375rem,2.6vw,1.625rem)] leading-[1.45] tracking-[-0.01em] text-pretty text-muted'

const Hero = () => {
  const [font, setFont] = useState(WORD_FONTS[0])
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [color, setColor] = useState(WORD_COLORS[0])
  const [showPhoto, setShowPhoto] = useState(false)
  const [photoPos, setPhotoPos] = useState(null)
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => subscribeSteps(setActiveStep), [])

  return (
    <section id="top" className="pt-32 pb-20 md:pt-40">
      {createPortal(
        <AnimatePresence>
          {showPhoto && photoPos && (
            <>
              <Motion.div
                key="blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none fixed inset-0 z-40 bg-bg/50 backdrop-blur-sm"
              />
              <Motion.img
                key="photo"
                src={avatar}
                alt="Mateus"
                initial={{ opacity: 0, x: '-50%', y: '-85%', scale: 0.6 }}
                animate={{ opacity: 1, x: '-50%', y: '-108%', scale: 1 }}
                exit={{ opacity: 0, x: '-50%', y: '-96%', scale: 0.75 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                style={{ left: photoPos.x, top: photoPos.y }}
                className="pointer-events-none fixed z-50 h-24 w-24 rounded-full border border-line object-cover shadow-xl"
              />
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
      <Reveal as="p" delay={0} className={`mb-6 ${prose}`}>
        <Words text="Hey," />
      </Reveal>
      <Reveal as="div" delay={0.1} className={prose}>
        <h1 className="inline font-normal">
        <span className={noteClass(activeStep === 0)} onMouseEnter={() => playThemeNote(0)}>
          I&rsquo;m
        </span>{' '}
        <span
          tabIndex={0}
          aria-label="Mateus"
          className={`relative decoration-line underline-offset-4 outline-offset-4 hover:underline focus-visible:underline ${noteClass(activeStep === 1)}`}
          onMouseEnter={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setPhotoPos({ x: r.left + r.width / 2, y: r.top })
            setShowPhoto(true)
            playThemeNote(1)
          }}
          onMouseLeave={() => setShowPhoto(false)}
          onFocus={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setPhotoPos({ x: r.left + r.width / 2, y: r.top })
            setShowPhoto(true)
          }}
          onBlur={() => setShowPhoto(false)}
        >
          Mateus
        </span>
        ,{' '}
        <Words text="a" offset={2} activeStep={activeStep} />{' '}
        <Motion.span
          tabIndex={0}
          className="group relative inline-block outline-offset-4"
          onMouseEnter={() => {
            loadFonts()
            playThemeNote(3)
          }}
          onFocus={loadFonts}
          onTouchStart={loadFonts}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14 }}
        >
        <span
          style={{
            fontFamily: font.family ? `"${font.name}", sans-serif` : undefined,
            fontSize: font.scale !== 1 ? `${font.scale}em` : undefined,
            fontWeight: bold ? 700 : (font.weight ?? 500),
            color,
            transform: `${italic ? 'skewX(-10deg) ' : ''}translateY(${activeStep === 3 || activeStep === 4 ? -4 : 0}px)`,
            transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'inline-block',
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
          </Ram>
          {/* floats under the word on hover or tap, so it never pushes the text apart */}
          <span className="pointer-events-none absolute top-full left-1/2 z-20 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,transform] duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
          <span
            role="toolbar"
            aria-label="Word style"
            className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface px-1 py-0.5 text-base font-normal not-italic shadow-sm"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgb(var(--c-ink))', transform: 'none' }}
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
          </span>
        </span>
        </Motion.span>{' '}
        <Words text="from Salvador, Brazil." offset={5} activeStep={activeStep} />
        </h1>{' '}
        <Words text="Building products from database to interface." offset={8} activeStep={activeStep} />
      </Reveal>
      <Reveal as="p" delay={0.2} className={`mt-6 ${prose}`}>
        <Words text="My stack: React, TypeScript, Tailwind, NestJS, Prisma and Python." offset={14} activeStep={activeStep} />
      </Reveal>
      <Reveal as="p" delay={0.3} className={`mt-6 ${prose}`}>
        <Words text="I'm open to new roles. Let's talk." offset={23} activeStep={activeStep} />{' '}
        <Motion.a
          href="https://github.com/coutinho98"
          target="_blank"
          rel="noopener noreferrer"
          data-cuelume-navigate
          animate={{ rotate: -2.5 }}
          whileHover={{ rotate: 0, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="inline-block rounded-full border-[3px] border-white bg-[#7EC8E3] px-2.5 text-[0.8em] text-white shadow-badge"
        >
          @coutinho98
        </Motion.a>
      </Reveal>
    </section>
  )
}

export default Hero
