import { h } from "preact";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/works">Trabajos</a></li>
        <li><a href="/about">Acerca de</a></li>
        <li><a href="/contact">Contacto</a></li>
      </ul>
    </nav>
  );
}

