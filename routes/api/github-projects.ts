import { fetchRepos } from "../../utils/github.ts";
import { kv } from "../../utils/kv.ts";

export const handler = {
    async GET(_req: Request) {
        const user = Deno.env.get("GITHUB_USERNAME")!;
        const token = Deno.env.get("GITHUB_TOKEN");

        const key = ["gh", user];
        if (kv) {
            const cached = await kv.get(key);
            if (cached.value) return new Response(JSON.stringify(cached.value), { headers: { "content-type": "application/json" } });
        }

        const repos = await fetchRepos(user, token);
        // Example filter: exclude forks/archived, pick languages, etc.
        const filtered = repos.filter((r: any) => !r.fork && !r.archived);

        if (kv) await kv.set(key, filtered, { expireIn: 1000 * 60 * 15 }); // 15 min

        return new Response(JSON.stringify(filtered), { headers: { "content-type": "application/json" } });
    },
};