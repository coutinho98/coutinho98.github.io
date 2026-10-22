import { useState } from 'react'
import { m as Motion, useScroll, useMotionValueEvent, useSpring } from 'motion/react'
import { GitHub, Linkedin, Email } from './Icons'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: 'https://github.com/coutinho98', label: 'GitHub', Icon: GitHub },
  {
    href: 'https://www.linkedin.com/in/mateus-couto-027a2b220/',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  { href: 'mailto:mateuscouto98@outlook.com', label: 'Email', Icon: Email },
]

const Navbar = () => {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    if (y > prev + 6 && y > 160) setHidden(true)
    else if (y < prev - 6) setHidden(false)
  })

  const mx = useSpring(0, { stiffness: 260, damping: 18 })
  const my = useSpring(0, { stiffness: 260, damping: 18 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.15)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <Motion.nav
      aria-label="Main"
      initial={{ x: '-50%', y: -110, opacity: 0 }}
      animate={hidden ? { x: '-50%', y: -110, opacity: 0 } : { x: '-50%', y: 0, opacity: 1 }}
      transition={
        hidden
          ? { duration: 0.55, ease: [0.4, 0, 1, 1] }
          : { duration: 0.65, ease: [0, 0, 0.2, 1] }
      }
      className="fixed top-5 left-1/2 z-40"
    >
      <Motion.div
        style={{ x: mx, y: my }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="flex items-center gap-1 rounded-full border border-line bg-bg/85 py-1.5 pr-2 pl-2 shadow-sm backdrop-blur-sm"
      >
        {links.map(({ href, label, Icon }) => (
          <Motion.a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            data-cuelume-navigate
            whileTap={{ scale: 0.85 }}
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <Icon size={16} />
          </Motion.a>
        ))}
        <ThemeToggle />
      </Motion.div>
    </Motion.nav>
  )
}

export default Navbar
