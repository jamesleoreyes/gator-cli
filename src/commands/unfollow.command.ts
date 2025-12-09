import { feedFollowQueries } from "src/db/queries/feedFollow.queries";
import { User } from "../db/schema.js";

async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
  const [url] = args;
  if (!url) process.exit(1);

  await feedFollowQueries.delete(user.id, url);
};

export { handlerUnfollow };
