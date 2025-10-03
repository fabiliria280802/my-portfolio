import { useEffect, useState } from "preact/hooks";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

export default function CertificatesFlipGrid({ locale }: { locale: string }) {
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    fetch(`../data/${locale}/certificates.json`)
      .then((r) => r.json())
      .then(setCerts);
  }, [locale]);

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {certs.map((cert) => (
        <div key={cert.id} class="group perspective">
          <div class="relative w-full h-56 transition-transform duration-500 transform group-hover:rotate-y-180 preserve-3d">
            {/* Front */}
            <div class="absolute inset-0 bg-white rounded-xl shadow-lg flex flex-col justify-center items-center backface-hidden">
              <h3 class="font-bold text-lg text-center">{cert.name}</h3>
              <p class="text-sm text-gray-500">{cert.issuer}</p>
              <span class="mt-2 text-xs text-gray-400">{cert.date}</span>
            </div>
            {/* Back */}
            <div class="absolute inset-0 bg-blue-50 rounded-xl shadow-lg flex flex-col justify-center items-center rotate-y-180 backface-hidden p-4">
              <p class="text-gray-700 text-center mb-2">{cert.description}</p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener"
                  class="text-blue-600 underline font-semibold"
                >
                  Ver certificado
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      <style>
        {`
          .perspective { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}
      </style>
    </div>
  );
}
