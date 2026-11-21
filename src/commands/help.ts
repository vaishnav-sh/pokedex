import { getCommands } from "../command.js";

export function commandhelp() {
  const allCommands = getCommands()
  console.log("Welcome to the Pokedex!")
  console.log("Usage:")
  console.log("\n")

  for (let command in allCommands)
    console.log(`${command}: ${allCommands[command].description}`);
}
