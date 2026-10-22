// plain spans + a springy CSS curve: same lift as before, no animation instance per word
export const noteClass = (active) =>
  `inline-block cursor-default transition-[color,transform] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:text-ink motion-reduce:transform-none ${
    active ? '-translate-y-1 text-ink' : 'text-muted'
  }`
