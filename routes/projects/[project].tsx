import { PageProps } from "$fresh/server.ts";

export default function Projects(props: PageProps) {
  return (
    <div>
      <h2>Mis Proyectos</h2>
      <ul>
        <li>Proyecto 1 - Descripción</li>
        <li>Proyecto 2 - Descripción</li>
      </ul>
    </div>
  );
}
