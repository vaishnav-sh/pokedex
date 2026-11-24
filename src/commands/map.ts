import { PokeAPI } from "../pokeapi.js";
import { State } from "../state.js";

export function commandmap(state: State) {
  const { readLine } = state;
  const { fetchLocations } = new PokeAPI();

  fetchLocations("location-area")
    .then((data) => data.forEach(({ name }) => console.log(name)))
    .catch((e) => console.error(e))
    .finally(() => readLine.prompt());
}
