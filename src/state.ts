import { type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { createInterface } from "node:readline/promises";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  readLine: Interface;
  commands: Record<string, CLICommand>;
  pokeInstance: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\x1b[31mPokedex> \x1b[0m",
  });

  return {
    readLine: rl,
    commands: getCommands(),
    pokeInstance: new PokeAPI(300_000),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}
