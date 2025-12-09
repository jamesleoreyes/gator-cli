import type { Feed, User } from "../db/schema.js";

function printFeed(feed: Feed, user: User) {
  console.log(feed);
  console.log(user);
};

export { printFeed };
