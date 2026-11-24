import { getCommands } from "../command.js";
import { State } from "../state.js";

export async function commandhelp(state: State) {
  const allCommands = state.commands;
  console.log("Welcome to the Pokedex!")
  console.log("Usage:")
  console.log("\n")

  for (let command in allCommands)
    console.log(`${command}: ${allCommands[command].description}`);
}
