import React from 'react'

const Readme = () => {
    return (
        <article className="mt-4 text-sm font-display">
            <p className=" text-stone-300 mb-4">An eternal student, almost finished college and passionate about web development.</p>

            <ul className="space-y-2">
                <li className="flex items-start">
                    <span className="text-gray-200 mr-2">•</span>
                    <p className="text-gray-200">
                        Currently studying <span className="text-violet-400 font-bold">Reactjs <span className="animate-pulse">💜</span></span> and everything that surrounds it
                    </p>
                </li>
                <li className="flex items-start">
                    <span className="text-gray-200 mr-2">•</span>
                    <p className="text-gray-200">
                        Fascinated by <span className="text-violet-400 font-bold">Design Systems</span> and <span className="text-violet-400 font-bold">UI/UX</span>
                    </p>
                </li>
{/*                 <li className="flex items-start">
                    <span className="text-gray-200 mr-2">•</span>
                    <p className="text-gray-200">
                        Building <a
                            href="http://groupgo-mcsh.onrender.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="underline underline-offset-4 text-violet-400 font-bold">
                            GroupGo
                        </a>
                        <span> </span>
                        completely solo
                        <span className="text-violet-400 font-bold"> [FrontEnd]</span>
                    </p>
                </li> */}
            </ul>
            <div className="mt-3 p-3 bg-zinc-800 rounded">
                <p className="text-base text-gray-200 italic">
                    "Nunca se esqueça de quem você é, porque é certo que o mundo não se lembrará. Faça disso sua força. Assim, não poderá ser nunca a sua fraqueza. Arme-se com esta lembrança, e ela nunca poderá ser usada para magoá-lo."
                </p>
            </div>
        </article>
    );
}

export default Readme