const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cachedRepositories = null;
let cacheTime = 0;

async function githubFetch(endpoint) {

    const response = await fetch(
        `https://api.github.com${endpoint}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json"
            }
        }
    );

    if (!response.ok) {

        const error = await response.json();

        throw new Error(
            `GitHub Error ${response.status}: ${error.message}`
        );
    }

    return response.json();
}



async function getRepositories(username) {

    const now = Date.now();

    if (
        cachedRepositories &&
        (now - cacheTime) < CACHE_DURATION
    ) {

        console.log("Using cached repositories");

        return cachedRepositories;
    }

    console.log("Fetching repositories from GitHub...");

    const repositories = await githubFetch(
        `/users/${username}/repos`
    );

    cachedRepositories = repositories;
    cacheTime = now;

    return repositories;
}



function getRecentProjects(repositories) {

    return repositories

        .filter(repo =>
            repo.name !== "Nidairshad" &&
            repo.name !== "resume"
        )

        .sort(
            (a, b) =>
                new Date(b.pushed_at) -
                new Date(a.pushed_at)
        )

        .slice(0, 3);
}

/*
|--------------------------------------------------------------------------
| Top Projects
|--------------------------------------------------------------------------
*/

function getTopProjects(repositories) {

    return repositories

        .filter(repo =>
            repo.name !== "Nidairshad" &&
            repo.name !== "resume"
        )

        .sort(
            (a, b) => b.size - a.size
        )

        .slice(0, 4);
}

module.exports = {

    getRepositories,

    getRecentProjects,

    getTopProjects

};