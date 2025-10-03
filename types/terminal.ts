// /types/terminal.ts
export type AboutValue = string | string[];

export type AboutData = Record<string, AboutValue> & {
  _initial: string;
  _commands: string;
  _error: string; // e.g. "Command not found: {command}"
};

export interface AboutMeTerminalProps {
  locale: string;
  initialData: AboutData;
  promptUser?: string; // ej: "fabs"
  promptHost?: string; // ej: "flsh"
  titleCols?: number; // ej: 120
  titleRows?: number; // ej: 30
}

//TODO: validar estop
export const KNOWN_CMDS = [
  "help",
  "whoami",
  "skills",
  "contact",
  "clear",
] as const;
export type Cmd = (typeof KNOWN_CMDS)[number];
