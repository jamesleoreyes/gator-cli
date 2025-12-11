import * as cmd from "./commands/index.js";
import { middlewareLoggedIn } from "./middlewares/user.middleware.js";
import { CommandsRegistry } from "./types/index.js";
import { cmdUtils } from "./utils/command.utils.js";

async function main(): Promise<void> {
  const commandsRegistry: CommandsRegistry = {};
  await cmdUtils.registerCommand(commandsRegistry, 'reset', cmd.handlerResetDb);
  await cmdUtils.registerCommand(commandsRegistry, 'login', cmd.handlerLogin);
  await cmdUtils.registerCommand(commandsRegistry, 'register', cmd.handlerRegisterUser);
  await cmdUtils.registerCommand(commandsRegistry, 'users', cmd.handlerGetAllUsers);
  await cmdUtils.registerCommand(commandsRegistry, 'agg', cmd.handlerAgg);
  await cmdUtils.registerCommand(commandsRegistry, 'addfeed', middlewareLoggedIn(cmd.handlerAddFeed));
  await cmdUtils.registerCommand(commandsRegistry, 'feeds', cmd.handlerGetAllFeeds);
  await cmdUtils.registerCommand(commandsRegistry, 'follow', middlewareLoggedIn(cmd.handlerFollowFeed));
  await cmdUtils.registerCommand(commandsRegistry, 'unfollow', middlewareLoggedIn(cmd.handlerUnfollow));
  await cmdUtils.registerCommand(commandsRegistry, 'following', middlewareLoggedIn(cmd.handlerAllFeedsFollowedByUser));
  await cmdUtils.registerCommand(commandsRegistry, 'browse', middlewareLoggedIn(cmd.handlerBrowse));

  const args = process.argv.slice(2);
  if (args.length === 0) process.exit(1);
  const cmdName = args[0];
  const restArgs = [...args.slice(1)];
  try {
    await cmdUtils.runCommand(commandsRegistry, cmdName, ...restArgs);

    process.exit(0);
  } catch (error) {
    console.log(error);
  };
};

main();
