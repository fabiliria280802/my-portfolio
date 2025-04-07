import { config } from "https://deno.land/x/dotenv/mod.ts";

const {MONGO_URI, PORT, MONGO_TEST_NORMAL_URL, GITHUB_USERNAME} = config();

export { MONGO_URI, PORT, MONGO_TEST_NORMAL_URL, GITHUB_USERNAME };