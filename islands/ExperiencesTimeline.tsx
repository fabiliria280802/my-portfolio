import { useEffect, useState } from "preact/hooks";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function ExperiencesTimeline({ locale }: { locale: string }) {
  const [exps, setExps] = useState<Experience[]>([]);

  useEffect(() => {
    fetch(`../data/${locale}/experiences.json`)
      .then((r) => r.json())
      .then(setExps);
  }, [locale]);

  return (
    <ol class="relative border-l border-gray-300">
      {exps.map((exp) => (
        <li key={exp.id} class="mb-10 ml-4">
          <div class="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white">
          </div>
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold text-lg">{exp.role}</h3>
            <span class="text-sm text-gray-500">
              {exp.company} &mdash; {exp.period}
            </span>
            <p class="mt-2 text-gray-700">{exp.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
