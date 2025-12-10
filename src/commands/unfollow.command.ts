import { feedFollowQueries } from "../db/queries/feedFollow.queries.js";
import { User } from "../db/schema.js";

async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const [url] = args;
  if (!url) throw new Error('Feed URL argument is required');

  await feedFollowQueries.delete(user.id, url);
};

export { handlerUnfollow };
