import { State } from "../state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const { pokeInstance } = state;
  const [locationName] = args;
  console.log(`Exploring ${locationName}...`);

  const data = await pokeInstance.fetchLocation(locationName);
  console.log("Found Pokemon: ");
  return data.pokemon_encounters.forEach(({ pokemon }) =>
    console.log(pokemon.name),
  );
}
