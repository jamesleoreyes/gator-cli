import { feedQueries } from "src/db/queries/feed.queries";
import { feedFollowQueries } from "src/db/queries/feedFollow.queries";
import { User } from "../db/schema.js";

async function handlerFollowFeed(cmdName: string, user: User, ...args: string[]) {
  const [url] = args;
  if (!url) process.exit(1);

  const feed = await feedQueries.getByUrl(url);
  if (feed) {
    const newFeedFollow = await feedFollowQueries.create(feed.id, user.id);
    console.log(`User ${newFeedFollow.userName} followed feed ${newFeedFollow.feedName}`);
  };
};

export { handlerFollowFeed };
