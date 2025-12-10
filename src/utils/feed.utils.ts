import { feedQueries } from "src/db/queries/feed.queries.js";
import type { Feed, User } from "../db/schema.js";
import { rssUtils } from "./rss.utils.js";

const feedUtils = {
  printFeed(feed: Feed, user: User): void {
    console.log(feed);
    console.log(user);
  },
  
  async scrapeFeeds() {
    const feedToFetch = await feedQueries.getNextFeedToFetch();
    await feedQueries.markFeedFetched(feedToFetch.id);
    const rssFeed = await rssUtils.fetchFeed(feedToFetch.url);
  
    for (const item of rssFeed.channel.item) {
      console.log(`Title: ${item.title}`);
    };
  },
}

export { feedUtils };
