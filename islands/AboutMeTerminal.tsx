import { useState, useEffect, useRef } from "preact/hooks";

interface AboutData {
  [command: string]: string | string[];
  _initial: string;
  _commands: string;
  _error: string;
}

const HELP_TEXT = `Available commands:
- whoami: Get a short bio.
- skills: List my technical skills.
- contact: Show contact information.
- clear: Clear the terminal screen.`;

export default function AboutMeTerminal({ locale }: { locale: string }) {
  const [data, setData] = useState<AboutData | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const endOfTerminalRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/data/${locale}/about.json`)
      .then((r) => r.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setHistory([fetchedData._initial, HELP_TEXT]);
      });
  }, [locale]);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || !data) return;
    e.preventDefault();

    const command = input.trim().toLowerCase();
    let newHistory = [...history, `> ${input}`];

    if (command === "clear") {
      newHistory = [];
    } else if (command === "help") {
      newHistory.push(HELP_TEXT);
    } else if (data[command]) {
      const result = data[command];
      if (Array.isArray(result)) {
        newHistory = [...newHistory, ...result];
      } else {
        newHistory.push(result);
      }
    } else {
      newHistory.push(data._error.replace('{command}', command));
    }

    setHistory(newHistory);
    setInput("");
  };

  if (!data) return <div>Loading interactive terminal...</div>;

  return (
    <div class="w-full max-w-2xl mx-auto bg-gray-900 text-white font-mono rounded-lg shadow-xl p-4 h-96 overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {history.map((line, i) => (
        <pre key={i} class="whitespace-pre-wrap text-sm">{line}</pre>
      ))}
      <div class="flex items-center">
        <span class="text-green-400 mr-2">{">"}</span>
        <input
          id="terminal-input"
          type="text"
          class="bg-transparent border-none text-white w-full focus:outline-none"
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
      <div ref={endOfTerminalRef} />
    </div>
  );
}