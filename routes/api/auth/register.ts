import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { Users } from "../../../interfaces/Users.ts";
import { db } from "../../../utils/DBConnection.utils.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";

const loginCollection = db.collection<Users>("users");

export const handler: Handlers = {
  async POST(req) {
    try {
      const { username, password } = await req.json();
      const existingUser = await loginCollection.findOne({
        username: username,
      });
      if (existingUser) {
        return new Response("User already exists", {
          status: STATUS_CODE.Conflict,
          statusText: "User already exists",
        });
      } else {
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
          username: username,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await loginCollection.insertOne(newUser);
      }
      return new Response(null, {
        status: STATUS_CODE.Created,
        statusText: "Registered successfully",
      });
    } catch (error) {
      console.error("Error in register handler:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
