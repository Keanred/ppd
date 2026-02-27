import { getCommands } from './repl.js';

export function commandHelp() {
  console.log('Welcome to the Pokedex!');
  console.log('Usage:\n\n');

  const commands = getCommands();

  for (const command in commands) {
    console.log(`${command}: ${commands[command].description}`);
  }
}
