import { State } from "./state.js";

export async function startREPL(state: State) {
  const {
    readLine,
    commands
  } = state;

  readLine.prompt();

  readLine.on("line", async (input: string) => {
    if (!input.length) readLine.prompt();

    const isValidCommand = commands.hasOwnProperty(input);
    if (isValidCommand) {
      try {
        await commands[input].callback(state);
      } catch (e) {
        console.log(e);
      } finally {
        readLine.prompt();
      }
    }
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
