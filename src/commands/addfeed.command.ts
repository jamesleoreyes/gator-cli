import { feedQueries, feedFollowQueries } from "../db/queries/index.js";
import { feedUtils } from "../utils/feed.utils.js";
import { User } from "../db/schema.js";
import { handleInvalidArgs } from "../utils/error.utils.js";

async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const [name, url] = args;
  if (!name || !url) handleInvalidArgs(['name', 'url']);
  const existingFeed = await feedQueries.getByUrl(url);
  if (existingFeed) throw new Error('Feed not found');

  const newFeed = await feedQueries.create({
    userId: user.id,
    name,
    url,
  });
  await feedFollowQueries.create(newFeed.id, user.id);
  feedUtils.printFeed(newFeed, user);
};

export { handlerAddFeed };
