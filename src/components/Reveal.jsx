import { m } from 'motion/react'

const TAGS = {
  div: m.div,
  p: m.p,
  h1: m.h1,
  li: m.li,
  section: m.section,
  footer: m.footer,
  blockquote: m.blockquote,
  span: m.span,
}

// opacity + transform only: both run on the compositor, unlike a blur filter
const Reveal = ({ as = 'div', delay = 0, className = '', children }) => {
  const Tag = TAGS[as] || m.div
  return (
    <Tag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

export default Reveal
