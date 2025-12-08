import { handlerLogin, registerCommand, runCommand } from "./commands";
import { CommandsRegistry } from "./types";


function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry, 'login', handlerLogin);
  
  const args = process.argv.slice(2);
  if (args.length === 0) process.exit(1);
  const cmdName = args[0];
  const restArgs = [...args.slice(1)];
  try {
    runCommand(commandsRegistry, cmdName, ...restArgs);
  } catch (error) {
    console.log(error);
  };
};

main();
