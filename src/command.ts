import { commandExit } from "./commands/exit.js";
import { commandhelp } from "./commands/help.js";
import { commandmap } from "./commands/map.js";
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
    }
  };
}
