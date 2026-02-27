import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { CLICommand } from "./types/command.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
  };
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((part) => part.length > 0);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (input) => {
    const userInput = cleanInput(input);
    if (userInput.length === 0) {
      rl.prompt();
    }
    if (userInput[0] in getCommands()) {
      getCommands()[userInput[0]].callback(getCommands());
    } else if (userInput[0] in getCommands()) {
      getCommands()[userInput[0]].callback(getCommands());
    } else {
      console.log(`Unknown command: ${userInput[0]}`);
    }
    rl.prompt();
  });
}
