import { usersQueries } from "src/db/queries/user.queries.js";
import { setUser } from "../configs/app.js";
import { User } from "../db/schema.js";

async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) process.exit(1);
  const username = args[0];

  let newUser: User;
  try {
    newUser = await usersQueries.create(username);
  } catch (error) {
    process.exit(1);
  };

  setUser(username);
  console.log(`User ${username} logged in successfully!`);
  console.debug(`New User:\n${JSON.stringify(newUser, null, 2)}`);
};

export { handlerRegister };
