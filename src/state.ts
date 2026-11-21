import { type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { createInterface } from "node:readline/promises";

export type State = {
  readLine: Interface,
  commands: Record<string, CLICommand>
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
  });

  return {
    readLine: rl,
    commands: getCommands()
  }
}
