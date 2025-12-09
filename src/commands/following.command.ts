import { readConfig } from "src/configs/app.config";
import { feedFollowQueries } from "src/db/queries/feedFollow.queries";
import { userQueries } from "src/db/queries/user.queries";

async function handlerAllFeedsFollowedByUser(cmdName: string, ...args: string[]) {
  const config = readConfig();
  const currentUser = await userQueries.getUserByName(config.currentUserName);
  if (currentUser) {
    const allFeeds = await feedFollowQueries.getAllByUserId(currentUser.id);

    for (const feed of allFeeds) {
      console.log(feed.feedName);
    };
  };
};

export { handlerAllFeedsFollowedByUser };
