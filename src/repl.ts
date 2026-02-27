import { createInterface } from "readline";
import { commandExit } from "./command_exit";

export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}

export function cleanInput(input: string): string[] {
  return input
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
    rl.prompt();
  });
}
