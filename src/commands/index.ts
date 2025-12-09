import { CommandHandler, CommandsRegistry } from "../types/index.js";

const registerCommand = async (
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
) => registry[cmdName] = handler;

const runCommand = async (
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) => registry[cmdName](cmdName, ...args);

export { registerCommand, runCommand };
export * from './login.command.js';