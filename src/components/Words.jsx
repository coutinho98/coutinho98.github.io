import { Fragment } from 'react'
import { motion as Motion } from 'motion/react'
import { playThemeNote, playThemeChord } from '../lib/pentatonic'

const Words = ({ text, offset = 0, interaction = 'full', activeStep }) => {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => {
        const active = activeStep !== undefined && activeStep === offset + i
        return (
          <Fragment key={i}>
            <Motion.span
              className="inline-block cursor-default"
              animate={{
                y: active ? -4 : 0,
                color: active ? '#1D1C1A' : '#6E6B66',
              }}
              whileHover={{ y: -3, color: '#1D1C1A' }}
              transition={{ type: 'spring', stiffness: 450, damping: 18 }}
              onMouseEnter={() => interaction === 'full' && playThemeNote(offset + i)}
              onClick={(e) => {
                if (interaction === 'none') return
                e.stopPropagation()
                playThemeChord(offset + i)
              }}
            >
              {w}
            </Motion.span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </>
  )
}

export default Words
