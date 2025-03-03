import { useLocation } from 'react-router'

const Profile = ({ }) => {
    const location = useLocation()
    const path = location.pathname === '/' ? 'README.md' :
        location.pathname === '/showcase' ? 'showcase' :
            location.pathname === '/commits' ? 'commits' : 'README.md';

    return (
        <div className="text-xs text-stone-300 mb-2">
            coutinho98 / {path}
        </div>
    )
}

export default Profile;