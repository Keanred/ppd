import { State } from "./state";

export async function commandPokedex(state: State) {
  const pokemon = state.caughtPokemon;
  const length = Object.keys(pokemon).length;
  if (length === 0) {
    console.log("You haven't caught any Pokémon yet!");
  } else {
    console.log("Your Pokédex:");
    for (const name in pokemon) {
      const p = pokemon[name];
      console.log(`  - ${p.name}`);
    }
  }
}
