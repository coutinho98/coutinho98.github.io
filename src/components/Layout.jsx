import Image from "./Image"
import Navigation from "./Navigation"
import Profile from "./Profile"
import ProfileInfo from "./ProfileInfo"
import Social from "./Social"

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:p-6">
                <div className="flex mb-6 md:items-start">
                    <div className="mr-4 flex flex-col">
                        <Image />

                        <ProfileInfo />
                        <Social />
                    </div>
                    <div className="flex-1">
                        <Profile />
                        <Navigation />
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout