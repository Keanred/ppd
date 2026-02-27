import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((part) => part.length > 0);
}

export function startREPL(state: State) {
  state.readlineInterface.prompt();
  state.readlineInterface.on("line", async (input) => {
    const userInput = cleanInput(input);
    if (userInput.length === 0) {
      state.readlineInterface.prompt();
    }
    if (userInput[0] in state.commands) {
      try {
        await state.commands[userInput[0]].callback(state);
      } catch (error) {
        console.error(`Error executing command: ${error}`);
      }
    } else {
      console.log(`Unknown command: ${userInput[0]}`);
    }
    state.readlineInterface.prompt();
  });
}
