import { State } from "./state";

export async function commandInspect(state: State, pokemonName: string) {
  if (!pokemonName) {
    console.log("Please provide a Pokemon name to inspect.");
    return;
  }
  const pokemon = state.caughtPokemon[pokemonName];
  if (!pokemon) {
    console.log(`You haven't caught a Pokemon named ${pokemonName}.`);
    return;
  }
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(` -${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const type of pokemon.types) {
    console.log(` -${type.type.name}`);
  }
}
