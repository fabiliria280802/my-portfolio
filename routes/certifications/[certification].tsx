import type { PageProps } from "$fresh/server.ts";

export default function CertificationPage(props: PageProps) {
  const { certification } = props.params; 
  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold">Certificación: {certification}</h1>
      <p>Aquí van los detalles de la certificación {certification}.</p>
    </div>
  );
}
