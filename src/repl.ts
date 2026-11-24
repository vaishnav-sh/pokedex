import { State } from "./state.js";

export function startREPL(state: State) {
  const { readLine, commands } = state;

  readLine.prompt();
  readLine.on("line", (input: string) => {
    if (!input.length) readLine.prompt();

    const isValidCommand = commands.hasOwnProperty(input);
    if (isValidCommand)
      commands[input].callback({
        readLine,
        commands,
      });
    else {
      console.log("Unknown command");
      readLine.prompt();
    }
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((str) => /\w+/g.test(str));
}
