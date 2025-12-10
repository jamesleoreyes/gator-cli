import { feedFollowQueries } from "../db/queries/feedFollow.queries.js";
import { User } from "../db/schema.js";

async function handlerAllFeedsFollowedByUser(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const allFeeds = await feedFollowQueries.getAllByUserId(user.id);

  for (const feed of allFeeds) {
    console.log(feed.feedName);
  };
};

export { handlerAllFeedsFollowedByUser };
