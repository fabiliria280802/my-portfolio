import {Database, MongoClient,} from "https://deno.land/x/mongo/mod.ts";
import { MONGO_URI } from "./envConfig.utils.ts";

let db: Database;

async function createMongoDBConnection() {
    try {
        const client = new MongoClient();
        await client.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        return client.database("auth");
    }catch(err){
        console.error(err);
    }
}

db: await createMongoDBConnection();

export { db, createMongoDBConnection };