import Image from "./Image"
import Navigation from "./Navigation"
import Profile from "./Profile"
import ProfileInfo from "./ProfileInfo"
import Social from "./Social"

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:p-6">
                <div className="flex flex-col md:flex-row mb-6 md:mb-0 md:items-start">
                    <div className="mr-5 flex flex-col space-y-4 md:space-y-0 p-4 md:p-0">
                        <div className="flex justify-center md:justify-center">
                            <Image />
                        </div>
                        <div className="text-center md:text-left whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal md:overflow-visible">
                            <ProfileInfo />
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <Social />
                        </div>
                    </div>
                    <div className="flex-1 md:p-0">
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