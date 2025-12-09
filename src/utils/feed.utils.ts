import type { Feed, User } from "../db/schema.js";

function printFeed(feed: Feed, user: User): void {
  console.log(feed);
  console.log(user);
};

export { printFeed };
