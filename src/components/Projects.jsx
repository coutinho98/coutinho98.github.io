import { useReducedMotion } from 'motion/react'
import { Atropos } from 'atropos/react'
import 'atropos/css'
import Reveal from './Reveal'
import { ArrowUpRight } from './Icons'
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

const Card = ({ project }) => (
  <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 group-hover:border-accent/40">
    <img
      src={project.image}
      alt=""
      loading="lazy"
      className={
        project.cover
          ? 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          : 'absolute inset-0 m-auto h-3/5 w-3/5 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3'
      }
      style={project.pixel ? { imageRendering: 'pixelated' } : undefined}
    />
    <span className="absolute top-3 right-3 flex translate-y-1 items-center gap-1 rounded-full bg-bg/80 px-2.5 py-1 text-[11px] text-muted opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      {project.badge}
      <ArrowUpRight />
    </span>
  </div>
)

const Projects = () => {
  const reduced = useReducedMotion()

  return (
    <section aria-label="Projects" className="pb-20">
      <Reveal as="p" delay={0} className="mb-6 text-lg text-muted">
        some things I&rsquo;ve built
      </Reveal>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.name} delay={i * 0.12}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cuelume-navigate
              className="group block"
            >
              {reduced ? (
                <Card project={project} />
              ) : (
                <Atropos
                  className="w-full"
                  shadow={false}
                  highlight={false}
                  activeOffset={30}
                  rotateTouch="squeeze"
                >
                  <Card project={project} />
                </Atropos>
              )}
              <p className="mt-3 text-sm font-medium text-ink">{project.name}</p>
              <p className="mt-0.5 text-xs text-muted">{project.stack}</p>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default Projects
