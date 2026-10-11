import { motion } from 'motion/react'

const TAGS = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  li: motion.li,
  section: motion.section,
  footer: motion.footer,
  blockquote: motion.blockquote,
  span: motion.span,
}

const Reveal = ({ as = 'div', delay = 0, className = '', children }) => {
  const Tag = TAGS[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.06 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

export default Reveal
