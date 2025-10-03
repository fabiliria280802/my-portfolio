import { useEffect, useState } from "preact/hooks";

interface Research {
  id: string;
  title: string;
  summary: string;
  url?: string;
}

interface Props {
  locale: string;
}

export default function ResearchCarousel({ locale }: Props) {
  const [items, setItems] = useState<Research[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch(`../data/${locale}/researchs.json`)
      .then((r) => r.json())
      .then(setItems);
  }, [locale]);

  if (items.length === 0) return <div>Loading...</div>;

  const current = items[active];

  return (
    <div class="research-carousel">
      <div class="carousel-content">
        <h3 class="text-xl font-semibold">{current.title}</h3>
        <p>{current.summary}</p>
        {current.url && (
          <a
            href={current.url}
            target="_blank"
            rel="noopener"
            class="text-blue-500 underline"
          >
            Read more
          </a>
        )}
      </div>
      <div class="carousel-controls mt-4 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            class={`w-3 h-3 rounded-full ${
              active === idx ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setActive(idx)}
            aria-label={`Show research ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
