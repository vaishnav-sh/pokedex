import { State } from "../state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const { pokeInstance } = state;
  const [pokemonName] = args;

  if (state.pokedex.hasOwnProperty(pokemonName))
    return console.log(`You already caught ${pokemonName}!`);

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const data = await pokeInstance.fetchPokemon(pokemonName);

  const chance = 100 / (100 + (data.base_experience ?? 100));
  if (Math.random() < chance) {
    console.log(`${data.name} was caught!`);
    state.pokedex[data.name] = data;
  } else {
    console.log(`${data.name} escaped!`);
  }
}
