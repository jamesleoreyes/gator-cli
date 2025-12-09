import { User } from "../db/schema.js";

type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
type UserCommandHandler = (cmdName: string, user: User, ...args: string[]) => Promise<void>;

type CommandsRegistry = Record<string, CommandHandler>;

export type { CommandHandler, CommandsRegistry, UserCommandHandler };
