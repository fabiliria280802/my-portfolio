#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "../my-portfolio/fresh.config.ts";

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
