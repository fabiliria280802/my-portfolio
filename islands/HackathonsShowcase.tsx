import { useEffect, useState } from "preact/hooks";

interface Hackathon {
  id: string;
  name: string;
  year: string;
  award?: string;
  description: string;
  image?: string;
}

export default function HackathonsShowcase({ locale }: { locale: string }) {
  const [hacks, setHacks] = useState<Hackathon[]>([]);

  useEffect(() => {
    fetch(`../data/${locale}/hackathons.json`)
      .then((r) => r.json())
      .then(setHacks);
  }, [locale]);

  return (
    <div class="flex flex-wrap gap-6 justify-center">
      {hacks.map((hack) => (
        <div
          key={hack.id}
          class="w-80 bg-gradient-to-br from-yellow-100 to-blue-100 rounded-xl shadow-lg p-6 flex flex-col items-center"
        >
          {hack.image && (
            <img
              src={hack.image}
              alt={hack.name}
              class="w-24 h-24 object-cover rounded-full mb-4 shadow"
            />
          )}
          <h3 class="font-bold text-xl">{hack.name}</h3>
          <span class="text-sm text-gray-600">{hack.year}</span>
          {hack.award && (
            <span class="mt-1 px-2 py-1 bg-yellow-300 rounded text-xs font-semibold">
              {hack.award}
            </span>
          )}
          <p class="mt-2 text-center text-gray-700">{hack.description}</p>
        </div>
      ))}
    </div>
  );
}
