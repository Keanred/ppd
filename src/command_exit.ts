import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandExit(state: State) {
  state.readlineInterface.close();
  PokeAPI.cache.stopReapLoop();
  console.log("Closing the Pokedex... Goodbye!");
  process.exit();
}
