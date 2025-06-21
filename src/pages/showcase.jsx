import Item from '../components/Item'
import shadys from '../assets/shadysdownloader.png'

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
        </main>
    )
}

export default Showcase