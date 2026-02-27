import { State } from "./state";

export async function commandExit(state: State) {
  state.readlineInterface.close();
  console.log("Closing the Pokedex... Goodbye!");
  process.exit();
}
