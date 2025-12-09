import { feedFollowQueries } from "src/db/queries/feedFollow.queries.js";
import { feedQueries } from "../db/queries/feed.queries.js";
import { printFeed } from "../utils/feed.utils.js";
import { User } from "../db/schema.js";

async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const [name, url] = args;
  if (!name || !url) process.exit(1);
  const existingFeed = await feedQueries.getByUrl(url);
  if (existingFeed) process.exit(1);

  const newFeed = await feedQueries.create({
    userId: user.id,
    name,
    url,
  });
  await feedFollowQueries.create(newFeed.id, user.id);
  printFeed(newFeed, user);
};

export { handlerAddFeed };
