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
};

export { feedQueries };
