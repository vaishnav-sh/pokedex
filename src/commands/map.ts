import type { State } from "../state.js";

export async function commandmap(state: State) {
  const { pokeInstance } = state;
  const data = await pokeInstance.fetchLocations(state.nextLocationsURL);
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
  return data.results.forEach(({ name }) => console.log(name));
}
