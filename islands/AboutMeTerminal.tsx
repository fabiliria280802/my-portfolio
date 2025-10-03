import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  AboutData,
  AboutMeTerminalProps,
  AboutValue,
  Cmd,
  KNOWN_CMDS,
} from "../types/index.ts";

export default function AboutMeTerminal({
  locale,
  initialData,
  promptUser = "fabs",
  promptHost = "flsh",
  titleCols = 120,
  titleRows = 30,
}: AboutMeTerminalProps) {
  const [data] = useState<AboutData>(initialData);

  // Historia inicial (sin "Last login" aún: lo inyectamos post-hidratación para usar la hora del cliente)
  const [history, setHistory] = useState<string[]>(() => [
    initialData._initial,
    `Type "help" — ${initialData._commands ?? "Available commands"}`,
  ]);
  const [input, setInput] = useState("");
  const [idx, setIdx] = useState(-1); // navegación del historial ↑/↓
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [didInjectLogin, setDidInjectLogin] = useState(false);

  // autocompletado (Tab)
  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    const pref = input.trim().toLowerCase();
    return KNOWN_CMDS.filter((c) => c.startsWith(pref));
  }, [input]);

  // Scroll al final al escribir
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Foco fácil al click
  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    document.addEventListener("click", focus);
    return () => document.removeEventListener("click", focus);
  }, []);

  // Inyecta "Last login: Mon Sep 29 10:00:03 on ttys002" con la hora de la máquina del usuario
  useEffect(() => {
    if (didInjectLogin) return;
    const d = new Date();

    // Ejemplo estilo macOS: Mon Sep 29 10:00:03 (en-US, 24h)
    const weekday = d.toLocaleString("en-US", { weekday: "short" });
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.toLocaleString("en-US", { day: "2-digit" });
    const time = d.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const ttyNum = Math.floor(Math.random() * 9); // 0–8
    const tty = `ttys00${ttyNum}`;

    const line = `Last login: ${weekday} ${month} ${day} ${time} on ${tty}`;
    // Inserta al principio
    setHistory((h) => [line, ...h]);
    setDidInjectLogin(true);
  }, [didInjectLogin]);

  function print(val: AboutValue) {
    if (Array.isArray(val)) {
      return setHistory((h) => [...h, ...val.map(String)]);
    }
    return setHistory((h) => [...h, String(val)]);
  }

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim().toLowerCase() as Cmd | string;
    if (!cmd) return;

    setHistory((h) => [...h, renderPromptLine(cmdRaw)]); // eco del comando
    setCmdHistory((h) => [...h.slice(-49), cmdRaw]); // guarda historial (máx 50)

    switch (cmd) {
      case "clear":
        setHistory([]);
        break;
      case "help":
        print([
          "Available commands:",
          "- whoami   : Short bio",
          "- skills   : Technical skills",
          "- contact  : Contact information",
          "- clear    : Clear the screen",
        ]);
        break;
      default: {
        const val = (data as any)[cmd];
        if (val != null) print(val);
        else print(data._error.replace("{command}", cmd));
      }
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input;
      setInput("");
      setIdx(-1);
      run(value);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === 1) setInput(suggestions[0]);
      else if (suggestions.length > 1) {
        setHistory((h) => [...h, suggestions.join("  ")]);
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdHistory.length - 1, idx + 1);
      if (next >= 0) {
        setIdx(next);
        setInput(cmdHistory[cmdHistory.length - 1 - next] ?? "");
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, idx - 1);
      setIdx(next);
      setInput(
        next === -1 ? "" : (cmdHistory[cmdHistory.length - 1 - next] ?? ""),
      );
      return;
    }
    // Ctrl+L — limpiar
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setHistory([]);
    }
  }

  function renderPromptLine(text = "") {
    const cwd = "~";
    return `${promptUser}@${promptHost}:${cwd}$ ${text}`;
  }

  return (
    <div class="w-full max-w-3xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
      {/* ——— Barra de título estilo macOS ——— */}
      <div class="flex items-center justify-between px-3 py-2 bg-neutral-800/90 border-b border-neutral-700 select-none">
        {/* “Semáforos” a la izquierda */}
        <div class="flex items-center gap-2">
          {/* cerrar */}
          <button
            aria-label="Close"
            class="h-3.5 w-3.5 rounded-full bg-[#ff5f57] grid place-items-center hover:brightness-110"
            title="Close"
          >
            <span class="text-[10px] leading-none font-bold text-black/50">
              ×
            </span>
          </button>
          {/* minimizar */}
          <button
            aria-label="Minimize"
            class="h-3.5 w-3.5 rounded-full bg-[#ffbd2e] grid place-items-center hover:brightness-110"
            title="Minimize"
          >
            <span class="text-[11px] leading-none font-bold text-black/60">
              –
            </span>
          </button>
          {/* maximizar */}
          <button
            aria-label="Zoom"
            class="h-3.5 w-3.5 rounded-full bg-[#28c840] grid place-items-center hover:brightness-110"
            title="Zoom"
          >
            <span class="text-[9px] leading-none font-bold text-black/60">
              +
            </span>
          </button>
        </div>

        {/* Título derecha: usuario — host — cols×rows */}
        <div class="text-[12px] font-medium text-neutral-300 tabular-nums">
          {promptUser} — {promptHost} — {titleCols}×{titleRows}
        </div>
      </div>

      {/* ——— Área de terminal ——— */}
      <div class="p-4 h-[28rem] bg-black text-neutral-100 font-mono overflow-y-auto">
        {/* salida */}
        {history.map((line, i) => (
          <pre key={i} class="whitespace-pre-wrap text-sm leading-6">
            {line}
          </pre>
        ))}

        {/* prompt */}
        <div class="flex items-center gap-2">
          <span class="text-emerald-400">{renderPromptLine()}</span>
          <div class="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              class="bg-transparent border-none outline-none w-full text-sm tracking-wide caret-emerald-400"
              value={input}
              onInput={(e) => setInput((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => onKeyDown(e as any)}
              aria-label="Terminal input"
              autoFocus
            />
            {/* cursor parpadeante visual */}
            <span class="absolute top-1/2 -translate-y-1/2 ml-1 w-2 h-5 inline-block animate-pulse bg-emerald-400 opacity-70 pointer-events-none" />
          </div>
        </div>

        {/* sugerencias inline */}
        {suggestions.length > 1 && (
          <div class="mt-2 text-xs text-neutral-400">
            {suggestions.join("  ")}
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
