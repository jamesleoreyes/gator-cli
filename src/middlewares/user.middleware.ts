import { userQueries } from "../db/queries/user.queries.js";
import { readConfig } from "../configs/app.config.js";
import type { CommandHandler, UserCommandHandler } from "../types/index.js";

function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();
    const user = await userQueries.getUserByName(config.currentUserName);
    if (!user) throw new Error('User not found, please log in.');

    await handler(cmdName, user, ...args);
  };
};

export { middlewareLoggedIn };
