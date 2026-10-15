import { useEffect, useState } from 'react'
import { motion as Motion } from 'motion/react'
import { Sun, Moon } from './Icons'

const ThemeToggle = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = (e) => {
    const next = !dark
    const apply = () => {
      setDark(next)
      document.documentElement.classList.toggle('dark', next)
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light')
      } catch {
        /* storage unavailable */
      }
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduced) {
      const root = document.documentElement
      root.style.setProperty('--tx', `${e.clientX}px`)
      root.style.setProperty('--ty', `${e.clientY}px`)
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }

  return (
    <Motion.button
      type="button"
      aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      aria-pressed={dark}
      data-cuelume-toggle
      whileTap={{ scale: 0.85 }}
      onClick={toggle}
      className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </Motion.button>
  )
}

export default ThemeToggle

export const initTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') document.documentElement.classList.add('dark')
  } catch {
    /* storage unavailable */
  }
}
