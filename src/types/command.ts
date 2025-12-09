type CommandHandler = (cmdName: string, ...args: string[]) => void;

type CommandsRegistry = Record<string, CommandHandler>;

export type { CommandHandler, CommandsRegistry };
