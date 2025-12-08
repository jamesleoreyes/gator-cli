type CommandHandler = (cmdName: string, ...args: string[]) => void;

type CommandsRegistry = {
  [name: string]: CommandHandler;
};

export type { CommandHandler, CommandsRegistry };
