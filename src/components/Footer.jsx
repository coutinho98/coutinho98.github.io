import Reveal from './Reveal'
import Keys from './Keys'
import { GitHub, Linkedin, Email } from './Icons'

const socials = [
  { href: 'https://github.com/coutinho98', label: 'GitHub', Icon: GitHub },
  {
    href: 'https://www.linkedin.com/in/mateus-couto-027a2b220/',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  { href: 'mailto:mateuscouto98@outlook.com', label: 'Email', Icon: Email },
]

const Footer = () => {
  return (
    <footer className="relative">
      <Reveal className="relative z-10 flex items-center gap-4 border-t border-line pt-6">
        <nav aria-label="Social media">
          <ul className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cuelume-navigate
                  className="text-muted transition-colors hover:text-ink"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
      <Keys />
    </footer>
  )
}

export default Footer
