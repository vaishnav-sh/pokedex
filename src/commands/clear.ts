import { State } from "../state.js";

export async function commandClear(state: State) {
  console.clear();
  state.readLine.prompt();
}
