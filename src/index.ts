import { handlerLogin, registerCommand, runCommand } from "./commands";
import { CommandsRegistry } from "./types";


async function main() {
  const commandsRegistry: CommandsRegistry = {};
  await registerCommand(commandsRegistry, 'login', handlerLogin);
  
  const args = process.argv.slice(2);
  if (args.length === 0) process.exit(1);
  const cmdName = args[0];
  const restArgs = [...args.slice(1)];
  try {
    await runCommand(commandsRegistry, cmdName, ...restArgs);

    process.exit(0);
  } catch (error) {
    console.log(error);
  };
};

main();
