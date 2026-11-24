import type { State } from "../state.js";

export async function commandmapb(state: State) {
  const { pokeInstance } = state;
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    state.nextLocationsURL = null;
    return;
  }

  const data = await pokeInstance.fetchLocations(state.prevLocationsURL);
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
  data.results.forEach(({ name }) => console.log(name));
}
