import { desc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { type Post, type NewPost, posts, feeds, User } from "../schema.js";

const postQueries = {
  async create(post: NewPost): Promise<Post> {
    const [result] = await db
      .insert(posts)
      .values(post)
      .returning();
    return result;
  },

  async getByUrl(url: string): Promise<Post> {
    const [result] = await db
      .select()
      .from(posts)
      .where(eq(posts.url, url));
    return result;
  },

  async getManyByUser(user: User, limit?: number): Promise<Post[]> {
    const baseQuery = db
      .select({
        id: posts.id,
        feedId: posts.feedId,
        url: posts.url,
        title: posts.title,
        description: posts.description,
        publishedAt: posts.publishedAt,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .innerJoin(feeds, eq(posts.feedId, feeds.id))
      .where(eq(feeds.userId, user.id))
      .orderBy(desc(posts.publishedAt));

    const result = limit !== undefined
      ? await baseQuery.limit(limit)
      : await baseQuery;

    console.log(`Returning posts`);
    return result;
  },
};

export { postQueries };
