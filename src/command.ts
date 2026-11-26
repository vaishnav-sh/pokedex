import { commandCatch } from "./commands/catch.js";
import { commandClear } from "./commands/clear.js";
import { commandExit } from "./commands/exit.js";
import { commandExplore } from "./commands/explore.js";
import { commandhelp } from "./commands/help.js";
import { commandInspect } from "./commands/inspect.js";
import { commandmap } from "./commands/map.js";
import { commandmapb } from "./commands/mapb.js";
import { commandPokedex } from "./commands/pokedex.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandhelp
    },
    map: {
      name: "map",
      description: "Displays Pokemon locations",
      callback: commandmap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous Pokemon locations",
      callback: commandmapb,
    },
    clear: {
      name: "clear",
      description: "Clears the console",
      callback: commandClear
    },
    explore: {
      name: "explore",
      description: "Explores a location for Pokemon",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "Catches a Pokemon",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Inspects a Pokemon",
      callback: commandInspect
    },
    pokedex: {
      name: "pokedex",
      description: "Displays all Pokemons in Pokedex",
      callback: commandPokedex
    }
  };
}
