import { useState, useEffect } from 'react';

const Commits = () => {
    const [commits, setCommits] = useState([]);
    const username = 'coutinho98';

    useEffect(() => {
        const lastCommits = async () => {
            const cachedData = localStorage.getItem('githubCommitsData');
            const lastFetchTine = localStorage.getItem('githubCommitsLastFetch')
            const currentTime = new Date().getTime();

            if (cachedData && lastFetchTine && (currentTime - parseInt(lastFetchTine) < 60 * 60 * 1000)) {

                const parsedCommits = JSON.parse(cachedData).map(commit => ({
                    ...commit,
                    date: new Date(commit.date)
                }));

                setCommits(parsedCommits)
                return
            }

            const response = await fetch(`https://api.github.com/search/commits?q=author:${username}&sort=committer-date&order=desc&per_page=5`);
            const data = await response.json();

            const commits = data.items.map((commit) => ({
                repoName: commit.repository.name,
                message: commit.commit.message,
                sha: commit.sha,
                date: new Date(commit.commit.author.date),
                url: commit.html_url,
            }));

            localStorage.setItem('githubCommitsData', JSON.stringify(commits))
            localStorage.setItem('githubCommitsLastFetch', currentTime.toString());
            setCommits(commits)
        };
        lastCommits();
    }, [username]);

    const getRelativeTime = (date) => {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        return `${diffDays} days ago`;
    };

    return (
        <section className="mt-4">
            <div className="space-y-2">
                {commits.map((commit, index) => (
                    <article key={index} className="overflow-hidden">
                        <div className={`bg-zinc-800 p-2.5 w-fit mb-2`}>
                            <div className="text-gray-300 text-xs font-bold">{commit.message}</div>
                        </div>
                        <div className="text-xs">
                            <a href={`https://github.com/${username}/${commit.repoName}`} className="text-violet-400 mr-1 underline underline-offset-2 hover:text-violet-200">{commit.repoName}</a>
                            <span className='mx-0.5 mr-1 text-gray-200'>/</span>
                            <a href={commit.url} className="text-violet-400 mr-1 underline underline-offset-2 hover:text-violet-200">{commit.sha.substring(0, 7)}</a>
                            <span className='mx-0.5 mr-1 text-gray-200'>/</span>
                            <span className="text-gray-300 ml-0.5">{getRelativeTime(commit.date)}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Commits;
