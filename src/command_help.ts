import type { State } from "./state.js";

export async function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n\n");

  for (const command in state.commands) {
    console.log(`${command}: ${state.commands[command].description}`);
  }
}
