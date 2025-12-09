import { eq } from "drizzle-orm";
import { db } from "..";
import { type User, users } from "../schema.js";

const userQueries = {
  async create(name: string): Promise<User> {
    const [result] = await db
      .insert(users)
      .values({ name: name })
      .returning();
    return result;
  },

  async getUserByName(name: string): Promise<User> {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.name, name))
    return result;
  },

  async getUserById(id: string): Promise<User> {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return result;
  },

  async getAllUsers(): Promise<User[]> {
    const result = await db
      .select()
      .from(users);
    return result;
  },

  async deleteAllUsers(): Promise<void> {
    await db.delete(users);
  },
};

export { userQueries };
