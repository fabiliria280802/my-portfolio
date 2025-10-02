export type Repo = {
    id: number; name: string; description: string | null; html_url: string;
    language: string | null; stargazers_count: number; topics?: string[];
};

export async function fetchRepos(user: string, token?: string): Promise<Repo[]> {
    const headers: HeadersInit = { "Accept": "application/vnd.github+json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, { headers });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    return data as Repo[];
}