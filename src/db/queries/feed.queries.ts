import { eq } from "drizzle-orm";
import { db } from "..";
import { Feed, feeds } from "../schema.js";

const feedQueries = {
  async create(feed: Pick<Feed, 'userId' | 'name' | 'url'>) {
    const [result] = await db
      .insert(feeds)
      .values(feed)
      .returning();
    return result;
  },

  async getByUrl(url: string) {
    const [result] = await db
      .select()
      .from(feeds)
      .where(eq(feeds.url, url));
    return result;
  },

  async getAll() {
    const result = await db
      .select()
      .from(feeds)
    return result;
  },

  async markFeedFetched(feedId: string) {
    await db
      .update(feeds)
      .set({
        lastFetchedAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      })
      .where(eq(feeds.id, feedId));
  },
};

export { feedQueries };
