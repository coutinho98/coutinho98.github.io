import { GitHub, Linkedin, Email } from './Icons'

const Social = () => {
    return (
        <div className="flex space-x-4">
            <a href="https://github.com/coutinho98" target='_blank' className="text-stone-300 hover:text-violet-400 transition delay-150 duration-400">
                <GitHub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mateus-couto-027a2b220/" target='_blank' className="text-stone-300 hover:text-violet-400 transition delay-150 duration-400">
                <Linkedin size={24} />
            </a>
            <a href="mailto:mateuscouto98@outlook.com" className="text-stone-300 hover:text-violet-400 transition delay-150 duration-400">
                <Email size={24} />
            </a>
        </div>
    )
}

export default Social;
