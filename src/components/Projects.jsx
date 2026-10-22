import { m as Motion } from 'motion/react'
import Reveal from './Reveal'
import sensei from '../assets/sensei.webp'
import viewer from '../assets/shadys.png'
import downloader from '../assets/shadysdownloader.png'

const projects = [
  {
    name: 'Sensei',
    stack: 'react · typescript · nestjs · prisma',
    description: 'Math and physics exercise generator with randomized values, from middle school to college entrance exams.',
    image: sensei,
    cover: true,
    href: 'https://sensei.app.br',
    badge: 'live',
  },
  {
    name: 'Shadys Viewer',
    stack: 'react · typescript · tailwind',
    description: 'Web-based JSON viewer built to analyze and format data fast.',
    image: viewer,
    pixel: true,
    href: 'https://viewer-ruddy.vercel.app/',
    badge: 'live',
  },
  {
    name: 'Shadys Downloader',
    stack: 'python · yt-dlp · desktop',
    description: 'Desktop app to download videos quickly, without ads popping up.',
    image: downloader,
    pixel: true,
    href: 'https://github.com/coutinho98/ShadysDownloader',
    badge: 'github',
  },
]

const rotations = [-2.5, 1.8, -1.2]
const spring = { type: 'spring', stiffness: 380, damping: 16 }

const Projects = () => {
  return (
    <section aria-label="Projects" className="pb-20">
      <Reveal as="p" delay={0} className="mb-8 text-lg text-muted">
        some things I&rsquo;ve built
      </Reveal>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.name} delay={i * 0.12}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cuelume-navigate
              className="group flex items-center gap-4 sm:block"
            >
              <Motion.div
                initial={{ rotate: rotations[i] }}
                animate={{ rotate: rotations[i] }}
                whileHover={{ rotate: 0, scale: 1.05, y: -4 }}
                transition={spring}
                className="w-28 shrink-0 rounded-2xl border-[3px] border-white bg-bg p-1.5 shadow-sticker sm:w-full sm:p-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface sm:rounded-xl">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className={
                      project.cover
                        ? 'absolute inset-0 h-full w-full object-cover'
                        : 'absolute inset-0 m-auto h-3/5 w-3/5 object-contain'
                    }
                    style={project.pixel ? { imageRendering: 'pixelated' } : undefined}
                  />
                  <span
                    className={`absolute top-1.5 right-1.5 rotate-3 rounded-full border-2 border-white px-1.5 py-px text-[8px] font-medium tracking-wide text-white shadow-md sm:top-2.5 sm:right-2.5 sm:px-2 sm:py-0.5 sm:text-[10px] ${
                      project.badge === 'live' ? 'bg-[#7EC8E3]' : 'bg-[#7C3AED]'
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>
              </Motion.div>
              <div className="min-w-0 flex-1 sm:mt-4">
                <p className="text-sm font-medium text-ink">{project.name}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">{project.stack}</p>
                <p className="mt-1.5 hidden text-xs leading-relaxed text-muted sm:block">
                  {project.description}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default Projects
