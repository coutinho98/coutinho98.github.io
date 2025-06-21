import Item from '../components/Item'
import shadys from '../assets/shadysdownloader.png'

const Showcase = () => {
    return (
        <main className='grip gap-12'>
            <Item
                name="Shadys Media Donwloader"
                description="A desktop app to download and watch your favorite videos offline from multiple platforms."
                imageSrc={shadys}
                tags={["desktop application", "video downloader"]}
                links={[
                    { children: "github", href: "https://github.com/coutinho98/ShadysDownloader" },
                ]}
            />
        </main>
    )
}

export default Showcase