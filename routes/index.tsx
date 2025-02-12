import i18next from '../i18n.ts';
import Navbar from '../islands/Navbar.tsx';
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Login from "../components/Login.tsx";

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <Navbar />
      <h1>hola</h1>
      <div>
        <div>
          You currently {data.isAllowed ? "are" : "are not"} logged in.
        </div>
        {!data.isAllowed ? <Login /> : <a href="/logout">Logout</a>}
      </div>
    </div>
  );
}
