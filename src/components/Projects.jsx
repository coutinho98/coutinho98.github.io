import { motion as Motion } from 'motion/react'
import Reveal from './Reveal'
import sensei from '../assets/sensei.png'
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
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.name} delay={i * 0.12}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cuelume-navigate
              className="group block"
            >
              <Motion.div
                initial={{ rotate: rotations[i] }}
                animate={{ rotate: rotations[i] }}
                whileHover={{ rotate: 0, scale: 1.05, y: -4 }}
                transition={spring}
                className="rounded-2xl border-[3px] border-white bg-bg p-3 shadow-[0_10px_24px_rgba(29,28,26,0.2)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
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
                    className={`absolute top-2.5 right-2.5 rotate-3 rounded-full border-2 border-white px-2 py-0.5 text-[10px] font-medium tracking-wide text-white shadow-md ${
                      project.badge === 'live' ? 'bg-[#7EC8E3]' : 'bg-[#7C3AED]'
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>
              </Motion.div>
              <p className="mt-4 text-sm font-medium text-ink">{project.name}</p>
              <p className="mt-0.5 font-mono text-xs text-muted">{project.stack}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{project.description}</p>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default Projects
