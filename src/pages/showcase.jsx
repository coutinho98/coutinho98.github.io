import Item from '../components/Item'
import shadys from '../assets/shadysdownloader.png'
import shadysviewer from '../assets/shadys.png'

const Showcase = () => {
    return (
        <main className='grip gap-12'>
            <Item
                name="Shadys Media Donwloader"
                description="A desktop application to download your videos quickly without having ads pop up all the time."
                imageSrc={shadys}
                tags={["python", "yt-dlp api", "desktop application", "video/audio manipulation"]}
                links={[
                    { children: "github", href: "https://github.com/coutinho98/ShadysDownloader" },
                ]}
            />
            <Item
                name="Shadys Viewer"
                description="The shadys viewer project is a web-based JSON viewer, designed to quickly analyze and format JSON data."
                imageSrc={shadysviewer}
                tags={["reactjs ", "typescript", "tailwindcss",]}
                links={[
                    {
                        children: "github", href: "https://github.com/coutinho98/shadysviewer",
                    },
                    {
                        children: "website", href: "https://viewer-ruddy.vercel.app/"
                    },
                ]}
            />
        </main>
    )
}

export default Showcase

//