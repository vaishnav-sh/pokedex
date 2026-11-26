import { State } from "./state.js";

export async function startREPL(state: State) {
  const {
    readLine,
    commands
  } = state;

  readLine.prompt();

  readLine.on("line", async (input: string) => {
    if (!input.length) readLine.prompt();

    const cleanedInput = cleanInput(input);
    const command = cleanedInput[0];
    const arg = cleanedInput.slice(1);

    const isValidCommand = commands.hasOwnProperty(command);
    if (isValidCommand) {
      try {
        await commands[command].callback(state, ...arg);
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
