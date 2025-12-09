import { userQueries } from "src/db/queries/user.queries.js";
import { setUser } from "../configs/app.config.js";

async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) process.exit(1);
  const username = args[0];

  const user = await userQueries.getUserByName(username);
  if (!user) {
    process.exit(1);
  };

  setUser(username);
  console.log(`User ${username} logged in successfully!`);
};

export { handlerLogin };
