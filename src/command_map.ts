import { State } from "./state";

export async function commandMap(state: State) {
  const response = await state.pokeAPI.fetchLocations(state.nextLocationURL);
  state.nextLocationURL = response.next;
  state.previousLocationURL = response.previous;
  const locations = response.results;
  for (const location of locations) {
    console.log(location.name);
  }
  return;
}

export async function commandBMap(state: State) {
  if (state.previousLocationURL == null) {
    console.log("Youre on the first page.");
    return;
  }
  const response = await state.pokeAPI.fetchLocations(
    state.previousLocationURL,
  );
  state.nextLocationURL = response.next;
  state.previousLocationURL = response.previous;
  const locations = response.results;
  for (const location of locations) {
    console.log(location.name);
  }
  return;
}
