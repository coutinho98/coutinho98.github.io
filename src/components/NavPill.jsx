import { GitHub, Home } from './Icons'

const NavPill = () => {
  return (
    <nav
      aria-label="Pages"
      className="nav-pill fixed top-5 left-1/2 z-40 -translate-x-1/2"
    >
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="nav-goo" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
          />
        </filter>
      </svg>

      <div className="goo-layer relative flex h-11 items-center rounded-full bg-surface p-1 ring-1 ring-line">
        <span
          aria-hidden="true"
          className="goo-blob absolute top-1 left-1 h-9 w-9 rounded-full bg-[#E8E7E3]"
        />
        <ul className="relative flex items-center gap-1">
          <li>
            <a
              href="#top"
              aria-label="Back to top"
              data-cuelume-navigate
              className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors"
            >
              <Home size={16} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/coutinho98"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cuelume-navigate
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-ink"
            >
              <GitHub size={16} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavPill
