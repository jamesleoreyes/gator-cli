import { readConfig } from "src/configs/app.config";
import { feedQueries } from "src/db/queries/feed.queries";
import { userQueries } from "src/db/queries/user.queries";
import { printFeed } from "src/utils/feed.utils";

async function handlerAddFeed(cmdName: string, ...args: string[]) {
  const [name, url] = args;
  if (!name || !url) process.exit(1);
  const existingFeed = await feedQueries.getByUrl(url);
  if (existingFeed) process.exit(1);

  const config = readConfig();
  const currentUser = await userQueries.getUserByName(config.currentUserName);
  if (currentUser) {
    const newFeed = await feedQueries.create({
      userId: currentUser.id,
      name,
      url,
    });
    printFeed(newFeed, currentUser);
  } else process.exit(1);
};

export { handlerAddFeed };
