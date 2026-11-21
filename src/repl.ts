import { createInterface } from "node:readline";
import { getCommands } from "./command.js";

const allCommands = getCommands();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex>",
});

rl.prompt();
rl.on("line", (input: string) => {
  if (!input.length) rl.prompt();

  const isValidCommand = allCommands.hasOwnProperty(input)
  if (isValidCommand)
    allCommands[input].callback();
  else
    console.log("Unknown command");

  // const res = cleanInput(input);
  rl.prompt();
});

export function startREPL() {
  return true;
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((str) => /\w+/g.test(str));
}
