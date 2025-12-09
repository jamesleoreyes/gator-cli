import { readConfig } from "src/configs/app.config";
import { feedQueries } from "src/db/queries/feed.queries";
import { userQueries } from "src/db/queries/user.queries";

async function handlerAddFeed(cmdName: string, ...args: string[]) {
  const [name, url] = args;
  if (!name || !url) process.exit(1);
  const config = readConfig();
  const currentUser = await userQueries.getUserByName(config.currentUserName);
  await feedQueries.create({
    userId: currentUser.id,
    name,
    url,
  });
};

export { handlerAddFeed };
