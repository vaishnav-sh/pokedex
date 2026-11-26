import { State } from "../state.js";

export async function commandInspect(state: State, ...args: string[]) {
  const [pokemonName] = args;
  if (!state.pokedex.hasOwnProperty(pokemonName)) {
    return console.log("you have not caught that pokemon");
  }

  const pokemon = state.pokedex[pokemonName];
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  pokemon.stats.forEach(({ base_stat, stat }) =>
    console.log(`-${stat.name}: ${base_stat}`),
  );
  console.log("Types:");
  pokemon.types.forEach(({ type }) =>
    console.log(`-${type.name}`),
  );
}
