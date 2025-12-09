import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema.js";

const usersQueries = {
  async create(name: string) {
    const [result] = await db
      .insert(users)
      .values({ name: name })
      .returning();
    return result;
  },

  async getUserByName(name: string) {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.name, name))
    return result;
  },

  async getAllUsers() {
    const result = await db
      .select()
      .from(users);
    return result;
  },

  async deleteAllUsers() {
    await db.delete(users);
  },
};

export { usersQueries };
