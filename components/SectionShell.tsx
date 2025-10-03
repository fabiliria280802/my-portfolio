import { ComponentChildren } from "preact";

interface SectionShellProps {
  title: string;
  description?: string;
  children: ComponentChildren;
}

export default function SectionShell({ title, description, children }: SectionShellProps) {
  return (
    <section class="section-shell py-6 px-4">
      <header class="mb-4">
        <h2 class="text-2xl font-bold">{title}</h2>
        {description && <p class="text-gray-500">{description}</p>}
      </header>
      <div>
        {children}
      </div>
    </section>
  );
}