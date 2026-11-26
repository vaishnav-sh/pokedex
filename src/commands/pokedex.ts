import { State } from "../state.js";

export async function commandPokedex(state: State) {
  const isPokedexEmpty = Object.keys(state.pokedex).length === 0;
  if (isPokedexEmpty) return console.log("your pokedex is empty")

  console.log("Your Pokedex:");
  for (const pokemon in state.pokedex) {
    console.log(`- ${pokemon}`)
  }
}
