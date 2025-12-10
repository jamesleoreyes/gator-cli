import { userQueries } from "../db/queries/user.queries.js";
import { setUser } from "../configs/app.config.js";
import { User } from "../db/schema.js";
import { handleInvalidArgs } from "../utils/error.utils.js";

async function handlerRegisterUser(cmdName: string, ...args: string[]): Promise<void> {
  const [username] = args;
  if (!username) handleInvalidArgs(['username']);

  let newUser: User;
  try {
    newUser = await userQueries.create(username);
  } catch (error) {
    process.exit(1);
  };

  setUser(username);
  console.log(`User ${username} logged in successfully!`);
  console.debug(`New User:\n${JSON.stringify(newUser, null, 2)}`);
};

export { handlerRegisterUser };
