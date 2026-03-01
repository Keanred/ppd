import { State } from "./state";

export async function commandExplore(state: State, explore: string) {
  if (!explore) {
    console.log("Please provide a location to explore.");
    return;
  }
  const response = await state.pokeAPI.fetchLocation(explore);
  console.log(`Exploring ${response.name}...`);
  console.log("Found Pokemon:");
  for (const pokemon of response.pokemon_encounters) {
    console.log(` - ${pokemon.pokemon.name}`);
  }
  return;
}
