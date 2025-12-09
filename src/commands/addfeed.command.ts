import { feedFollowQueries } from "src/db/queries/feedFollow.queries.js";
import { readConfig } from "../configs/app.config.js";
import { feedQueries } from "../db/queries/feed.queries.js";
import { userQueries } from "../db/queries/user.queries.js";
import { printFeed } from "../utils/feed.utils.js";

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
    await feedFollowQueries.create(newFeed.id, currentUser.id);
    printFeed(newFeed, currentUser);
  } else process.exit(1);
};

export { handlerAddFeed };
