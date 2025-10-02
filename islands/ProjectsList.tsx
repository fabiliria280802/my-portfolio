import { useEffect, useState } from "preact/hooks";

export default function ProjectsList({ locale }: { locale: string }) {
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/github-projects`).then(r => r.json()).then(setRepos).finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading…</p>;

    return (
        <ul class="grid">
            {repos.map((r) => (
                <li>
                    <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
                    {r.description && <p>{r.description}</p>}
                    <small>{r.language} • ⭐ {r.stargazers_count}</small>
                </li>
            ))}
        </ul>
    );
}