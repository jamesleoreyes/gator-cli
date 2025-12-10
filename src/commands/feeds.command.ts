import { feedQueries, userQueries } from "../db/queries/index.js";

async function handlerGetAllFeeds(cmdName: string, ...args: string[]): Promise<void> {
  const feeds = await feedQueries.getAll();

  for (const feed of feeds) {
    console.log();
    console.log(`Feed Name: ${feed.name}`);
    console.log(`Feed URL: ${feed.url}`);
    const user = await userQueries.getUserById(feed.userId);
    console.log(`Added by: ${user.name}`);
  };
};

export { handlerGetAllFeeds };
