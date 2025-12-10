import { and, eq } from "drizzle-orm";
import { db } from ".."
import { type FeedFollowWithNames, feedFollows, feeds, users } from "../schema.js"


const feedFollowQueries = {
  async create(feedId: string, userId: string): Promise<FeedFollowWithNames> {
    const [newFeedFollow] = await db
      .insert(feedFollows)
      .values({ feedId, userId })
      .returning();

    const [result] = await db
      .select({
        id: feedFollows.id,
        feedName: feeds.name,
        userName: users.name,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
      })
      .from(feedFollows)
      .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
      .innerJoin(users, eq(feedFollows.userId, users.id))
      .where(eq(feedFollows.id, newFeedFollow.id));

    return result;
  },

  async getAllByUserId(userId: string): Promise<FeedFollowWithNames[]> {
    const result = await db
      .select({
        id: feedFollows.id,
        feedName: feeds.name,
        userName: users.name,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
      })
      .from(feedFollows)
      .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
      .innerJoin(users, eq(feedFollows.userId, users.id))
      .where(eq(feedFollows.userId, userId));

    return result;
  },

  async delete(userId: string, feedUrl: string): Promise<void> {
    const feed = await db
      .select({id: feeds.id})
      .from(feeds)
      .where(eq(feeds.url, feedUrl))
      .limit(1);
    
    if (!feed || feed.length === 0) {
      return;
    };

    await db
      .delete(feedFollows)
      .where(
        and(
          eq(feedFollows.userId, userId),
          eq(feedFollows.feedId, feed[0].id)
        )
      );
  },
};

export { feedFollowQueries };
