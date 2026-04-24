const Readme = () => {
    return (
        <article className="mt-4 text-sm font-display">
            <p className=" text-stone-300 mb-4">Built <span className="text-violet-400 font-bold">Sensei</span>, completely solo - <a href="https://sensei.app.br" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 text-violet-400 font-bold">sensei.app.br</a></p>

            <ul className="space-y-2">
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
                    "Never forget what you are, for surely the world will not. Make it your strength. Then it can never be your weakness. Armour yourself in it, and it will never be used to hurt you."
                </p>
            </div>
        </article>
    );
}

export default Readme