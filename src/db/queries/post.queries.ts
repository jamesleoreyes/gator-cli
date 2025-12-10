import { desc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { type Post, type NewPost, posts, User } from "../schema.js";

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

  async getManyByUser(user: User, count?: number): Promise<Post[]> {
    const result = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.publishedAt))
      .limit(count ? count : 5);
    return result;
  },
};

export { postQueries };
