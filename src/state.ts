import { type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { createInterface } from "node:readline/promises";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  readLine: Interface
  commands: Record<string, CLICommand>
  pokeInstance: PokeAPI
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\x1b[31mPokedex>\x1b[0m",
  });

  return {
    readLine: rl,
    commands: getCommands(),
    pokeInstance: new PokeAPI(300_000),
    nextLocationsURL: null,
    prevLocationsURL: null
  }
}
