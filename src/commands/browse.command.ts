import { postQueries } from "../db/queries/index.js";
import { Post, User } from "../db/schema.js";

async function handlerBrowse(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const [limit] = args;
  let posts: Post[];

  if (limit) posts = await postQueries.getManyByUser(user, parseInt(limit));
  else posts = await postQueries.getManyByUser(user, 2);

  for (const post of posts) {
    console.log(`\nTitle: ${post.title}`);
    console.log(`URL: ${post.url}`);
    if (post.publishedAt) {
      console.log(`Published: ${new Date(post.publishedAt).toLocaleString()}`);
    };
  };
};

export { handlerBrowse };
