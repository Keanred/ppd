import { State } from "./state";

export async function commandCatch(state: State, pokemonName: string) {
  if (!pokemonName) {
    console.log("Please provide a Pokemon name to catch.");
    return;
  }
  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
  if (!pokemon) {
    console.log(`Could not find a Pokemon named ${pokemonName}.`);
    return;
  }
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const catchRate = pokemon.base_experience; // Using base_experience as a proxy for catch rate
  const randomValue = Math.random() * 255;
  if (randomValue < catchRate) {
    state.caughtPokemon[pokemonName] = pokemon;
    console.log(`Congratulations! You caught ${pokemonName}!`);
  } else {
    console.log(`${pokemonName} escaped! Better luck next time.`);
  }
}
