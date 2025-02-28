import { GitHub, Linkedin, Email } from "./Icons";

const Presentation = ({ name, fullName, github, linkedin, email }) => {
    return (
        <div className="text-center translate-x-[-20rem] mt-[-1.7rem]">
            <h2 className="text-4xl oldstyle-nums text-stone-200 font-semibold">{name}</h2>
            <p className="text-stone-300 mt-[-0.3rem]">
                {fullName}
            </p>
            <div className="flex justify-center space-x-2 mt-1 translate-x-[-3.3rem] text-stone-300">
                <a href={`https://github.com/${github}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="hover:text-indigo-400">
                    <GitHub />
                </a>
                <a href={`https://www.linkedin.com/in/${linkedin}/`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="hover:text-indigo-400 ">
                    <Linkedin />
                </a>
                <a href={`mailto:${email}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="hover:text-indigo-400">
                    <Email />
                </a>
            </div>
        </div>
    )

}

export default Presentation;