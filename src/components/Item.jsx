const Item = ({ name, description, imageSrc, tags, links = [] }) => (
    <article className="grid gap-4 mt-5 text-white ">
        <h3 className="text-2xl leading-none font-bold tracking-wide">{name}</h3>

        <div className=" flex gap-8 justify-between w-full items-center">
            <p className="text-onBackgroundVariant text-sm text-justify">
                {description}
            </p>

            <img
                src={imageSrc}
                alt={name}
                width={70}
                height={70}
                className="shrink-0"
                style={{ imageRendering: "pixelated" }}
            />
        </div>

        {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="backticks text-xs bg-zinc-700 text-gray-100 px-2.5 py-1 rounded-md inline-flex items-center justify-center whitespace-nowrap">
                        {tag}
                    </div>
                ))}
            </div>
        )}

        {links.length > 0 && (
            <ul className="flex gap-2 text-violet-400 underline underline-offset-4 hover:text-violet-100 transition delay-300 duration-1000">
                {links.map((linkProps) => (
                    <li key={linkProps.href}>
                        <a {...linkProps} className="text-xs" target="_blank" rel="noopener noreferrer" />
                    </li>
                ))}
            </ul>
        )}
    </article>
);

export default Item