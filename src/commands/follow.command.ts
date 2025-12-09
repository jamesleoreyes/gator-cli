import { readConfig } from "src/configs/app.config";
import { feedQueries } from "src/db/queries/feed.queries";
import { feedFollowQueries } from "src/db/queries/feedFollow.queries";
import { userQueries } from "src/db/queries/user.queries";

async function handlerFollowFeed(cmdName: string, ...args: string[]) {
  const [url] = args;
  if (!url) process.exit(1);

  const config = readConfig();
  const currentUser = await userQueries.getUserByName(config.currentUserName);
  const feed = await feedQueries.getByUrl(url);
  if (currentUser && feed) {
    const newFeedFollow = await feedFollowQueries.create(feed.id, currentUser.id);
    console.log(`User ${newFeedFollow.userName} followed feed ${newFeedFollow.feedName}`);
  };
};

export { handlerFollowFeed };
