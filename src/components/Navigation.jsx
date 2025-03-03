import { NavLink } from "react-router";

const Navigation = ({ }) => {
    return (
        <div className="flex flex-wrap mb-4">
            <NavLink
                to='/'
                className={({ isActive }) => `font-mono font-bold text-2xl ${isActive ? 'font-mono font-bold text-violet-400  border-b-4 border-violet-400' : 'text-gray-400 hover:text-gray-200'}`}>
                README.md
            </NavLink>
            <NavLink
                to="/showcase"
                className={({ isActive }) =>
                    `ml-5 text-2xl ${isActive ? 'font-bold font-mono text-violet-400  border-b-4 border-violet-400' : 'text-gray-400 hover:text-violet-200'}`
                }
            >
                showcase
            </NavLink>
            <NavLink
                to="/commits"
                className={({ isActive }) =>
                    `ml-5 text-2xl ${isActive ? 'font-bold font-mono text-violet-400  border-b-4 border-violet-400' : 'text-gray-400 hover:text-gray-200'}`
                }
            >
                commits
            </NavLink>
        </div>
    )
}

export default Navigation