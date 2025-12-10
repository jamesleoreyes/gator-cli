import { feedQueries, feedFollowQueries } from "../db/queries/index.js";
import { User } from "../db/schema.js";
import { handleInvalidArgs } from "../utils/error.utils.js";

async function handlerFollowFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const [url] = args;
  if (!url) handleInvalidArgs(['url']);

  const feed = await feedQueries.getByUrl(url);
  if (feed) {
    const newFeedFollow = await feedFollowQueries.create(feed.id, user.id);
    console.log(`User ${newFeedFollow.userName} followed feed ${newFeedFollow.feedName}`);
  };
};

export { handlerFollowFeed };
