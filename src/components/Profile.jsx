import { useLocation } from 'react-router'

const Profile = ({ }) => {
    const location = useLocation()
    
    const pathMap = {
        '/': 'README.md',
        '/showcase': 'showcase',
        '/commits': 'commits',
    }

    const path = pathMap[location.pathname] || 'README.md'

    return (
        <h2 className="text-xs text-stone-300 mb-2">
            coutinho98 / {path}
        </h2>
    )
}

export default Profile;