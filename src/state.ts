import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandBMap } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

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
    explore: {
      name: "explore",
      description:
        "Explores a location and shows the pokemon that can be found there",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to catch a pokemon by name",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspects a caught pokemon by name",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Displays the pokemon you have caught so far",
      callback: commandPokedex,
    },
  };
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  caughtPokemon: Record<string, Pokemon>;
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
    caughtPokemon: {},
    nextLocationURL: "https://pokeapi.co/api/v2/location-area/",
    previousLocationURL: null,
  };
}
