import { userQueries } from "../db/queries/index.js";
import { setUser } from "../configs/app.config.js";
import { handleInvalidArgs } from "../utils/error.utils.js";

async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  const [username] = args;
  if (!username) handleInvalidArgs(['username']);

  const user = await userQueries.getUserByName(username);
  if (!user) {
    process.exit(1);
  };

  setUser(username);
  console.log(`User ${username} logged in successfully!`);
};

export { handlerLogin };
