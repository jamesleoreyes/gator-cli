import { CommandHandler, CommandsRegistry } from "../types/index.js";

const registerCommand = async (
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
): Promise<CommandHandler> => registry[cmdName] = handler;

const runCommand = async (
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
): Promise<void> => registry[cmdName](cmdName, ...args);

export { registerCommand, runCommand };
