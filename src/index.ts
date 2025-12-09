import {
  registerCommand,
  runCommand,
  handlerLogin,
  handlerResetDb,
  handlerRegisterUser,
  handlerGetAllUsers,
  handlerAgg,
  handlerAddFeed,
  handlerGetAllFeeds,
  handlerFollowFeed
} from "./commands";
import { handlerAllFeedsFollowedByUser } from "./commands/following.command";
import { CommandsRegistry } from "./types";

async function main() {
  const commandsRegistry: CommandsRegistry = {};
  await registerCommand(commandsRegistry, 'reset', handlerResetDb);
  await registerCommand(commandsRegistry, 'login', handlerLogin);
  await registerCommand(commandsRegistry, 'register', handlerRegisterUser);
  await registerCommand(commandsRegistry, 'users', handlerGetAllUsers);
  await registerCommand(commandsRegistry, 'agg', handlerAgg);
  await registerCommand(commandsRegistry, 'addfeed', handlerAddFeed);
  await registerCommand(commandsRegistry, 'feeds', handlerGetAllFeeds);
  await registerCommand(commandsRegistry, 'follow', handlerFollowFeed);
  await registerCommand(commandsRegistry, 'following', handlerAllFeedsFollowedByUser);

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
