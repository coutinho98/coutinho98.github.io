import { useRef } from 'react'
import Reveal from './Reveal'
import Words from './Words'
import { playMelody, resumeAudio } from '../lib/pentatonic'

const MELODY_COOLDOWN = 17000

const Footer = () => {
  const lastPlay = useRef(0)

  const trigger = () => {
    const now = performance.now()
    if (now - lastPlay.current < MELODY_COOLDOWN) return
    const played = playMelody()
    if (played) lastPlay.current = now
  }

  const onHover = () => {
    trigger()
  }

  const onClick = async () => {
    await resumeAudio()
    trigger()
  }

  return (
    <footer className="relative pt-28 pb-32">
      <Reveal as="p" delay={0.1} className="text-[clamp(1.375rem,2.6vw,1.625rem)] leading-[1.4] font-normal text-muted">
        <span onMouseEnter={onHover} onClick={onClick} className="cursor-pointer">
          <Words text="peace out." offset={24} interaction="none" />
        </span>
      </Reveal>
    </footer>
  )
}

export default Footer
