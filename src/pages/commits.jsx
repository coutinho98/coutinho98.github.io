import React, { useState, useEffect } from 'react';

const GitHubCommits = () => {
    const [commits, setCommits] = useState([]);
    const username = 'coutinho98';

    useEffect(() => {
        const lastCommits = async () => {
            const cachedData = localStorage.getItem('githubCommitsData');
            const lastFetchTine = localStorage.getItem('githubCommitsLastFetch')
            const currentTime = new Date().getTime();

            if (cachedData && lastFetchTine && (currentTime - parseInt(lastFetchTine) < 60 * 60 * 1000)) {
                setCommits(JSON.parse(cachedData))
                return
            }

            const repositoryResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            const repos = await repositoryResponse.json();

            const repoPromise = repos.slice(0, 5).map((repo) =>
                fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=5`)
                    .then((response) => response.json())
                    .then((repoCommits) =>
                        repoCommits.map((commit) => ({
                            repoName: repo.name,
                            message: commit.commit.message,
                            sha: commit.sha,
                            date: new Date(commit.commit.author.date),
                            url: commit.html_url,
                        }))
                    )
            );

            const commits = await Promise.all(repoPromise)
            const allCommits = commits.flat();

            allCommits.sort((a, b) => b.date - a.date);
            const slicedCommits = allCommits.slice(0, 5);

            localStorage.setItem('githubCommitsData', JSON.stringify(slicedCommits))
            localStorage.setItem('githubCommitsLastFetch', currentTime.toString());

            setCommits(slicedCommits)
        };

        lastCommits();

    }, [username, setCommits]);

    const getRelativeTime = (date) => {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        return `${diffDays} days ago`;
    };

    return (
        <div className="mt-4">
            <div className="space-y-2">
                {commits.map((commit, index) => (
                    <div key={index} className="overflow-hidden">
                        <div className={`bg-gray-800 p-0.5 mr-`}>
                            <div className="text-gray-300">{commit.message}</div>
                        </div>
                        <div className="pl-2 pt-1 pb-2 text-xs">
                            <a href={`https://github.com/${username}/${commit.repoName}`} className="text-violet-400 mr-3">{commit.repoName}</a>
                            <a href={commit.url} className="text-violet-400 mr-3">{commit.sha.substring(0, 7)}</a>
                            <span className="text-gray-400">{getRelativeTime(commit.date)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GitHubCommits;