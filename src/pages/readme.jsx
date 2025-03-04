const Readme = () => {
    return (
        <div className="mt-4 text-sm font-display">
            <p className=" text-stone-300 mb-4">an eternal student, almost finished college and passionate about web development.</p>

            <ul className="space-y-2">
                <li className="flex items-start">
                    <span className="text-stone-200 mr-2">•</span>
                    <p className="text-stone-200">
                        Currently studying <span className="text-violet-400 font-bold">Reactjs</span> and everything that surrounds it
                    </p>
                </li>
                <li className="flex items-start">
                    <span className="text-stone-200 mr-2">•</span>
                    <p className="text-stone-200">
                        Fascinated by <span className="text-violet-400 font-bold">Design Systems</span> and <span className="text-violet-400 font-bold">UI/UX</span>
                    </p>
                </li>
                <li className="flex items-start">
                    <span className="text-stone-200 mr-2">•</span>
                    <p className="text-stone-200">
                        Building <a
                            href="http://groupgo-mcsh.onrender.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="underline underline-offset-4 text-violet-400 font-bold">
                            GroupGo
                        </a>
                        <span> </span>
                         completely solo
                        <span className="text-violet-400 font-bold">[FrontEnd]</span>
                    </p>
                </li>
            </ul>
            <div className="mt-3 p-5 bg-gray-800 rounded">
                <p className="text-base text-gray-300 italic">
                    "I understand what it's like to be different. I'm very different too."
                </p>
            </div>
        </div>
    );
}

export default Readme