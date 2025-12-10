import { feedQueries, postQueries } from "../db/queries/index.js";
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
      const existingPost = await postQueries.getByUrl(item.link);
      if (!existingPost) {
        const publishedAt = new Date(item.pubDate);
        await postQueries.create({
          url: item.link,
          feedId: feedToFetch.id,
          title: item.title,
          description: item.description,
          publishedAt
        });
      };
    };
  },
}

export { feedUtils };
