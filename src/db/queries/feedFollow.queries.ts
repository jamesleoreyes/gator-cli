import { eq } from "drizzle-orm";
import { db } from ".."
import { feedFollows, feeds, users } from "../schema"


const feedFollowQueries = {
  async create(feedId: string, userId: string) {
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

  async getAllByUserId(userId: string) {
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
};

export { feedFollowQueries };
