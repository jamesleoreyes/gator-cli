import * as cmd from "./commands/index.js";
import { middlewareLoggedIn } from "./middlewares/user.middleware.js";
import { CommandsRegistry } from "./types/index.js";
import { registerCommand, runCommand } from "./utils/command.utils.js";

async function main(): Promise<void> {
  const commandsRegistry: CommandsRegistry = {};
  await registerCommand(commandsRegistry, 'reset', cmd.handlerResetDb);
  await registerCommand(commandsRegistry, 'login', cmd.handlerLogin);
  await registerCommand(commandsRegistry, 'register', cmd.handlerRegisterUser);
  await registerCommand(commandsRegistry, 'users', cmd.handlerGetAllUsers);
  await registerCommand(commandsRegistry, 'agg', cmd.handlerAgg);
  await registerCommand(commandsRegistry, 'addfeed', middlewareLoggedIn(cmd.handlerAddFeed));
  await registerCommand(commandsRegistry, 'feeds', cmd.handlerGetAllFeeds);
  await registerCommand(commandsRegistry, 'follow', middlewareLoggedIn(cmd.handlerFollowFeed));
  await registerCommand(commandsRegistry, 'unfollow', middlewareLoggedIn(cmd.handlerUnfollow));
  await registerCommand(commandsRegistry, 'following', middlewareLoggedIn(cmd.handlerAllFeedsFollowedByUser));

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
