import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandBMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the current location and next locations",
      callback: commandMap,
    },
    bmap: {
      name: "bmap",
      description: "Displays the previous location and previous locations",
      callback: commandBMap,
    },
  };
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  readlineInterface: Interface;
  pokeAPI: PokeAPI;
  nextLocationURL: string;
  previousLocationURL: string | null;
};

export function initState(): State {
  return {
    commands: getCommands(),
    readlineInterface: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    pokeAPI: new PokeAPI(),
    nextLocationURL: "https://pokeapi.co/api/v2/location-area/",
    previousLocationURL: null,
  };
}
