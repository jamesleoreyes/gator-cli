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
export * from './reset.command.js';
export * from './login.command.js';
export * from './register.command.js';
export * from './users.command.js';
export * from './agg.command.js';
export * from './addfeed.command.js';
export * from './feeds.command.js';
export * from './follow.command.js';