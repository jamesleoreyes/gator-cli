import { readConfig } from "../configs/app.config.js";
import { userQueries } from "../db/queries/index.js";

async function handlerGetAllUsers(cmdName: string, ...args: string[]): Promise<void> {
  try {
    const currentUser = readConfig();
    const users = await userQueries.getAllUsers();
    for (const user of users) {
      if (currentUser.currentUserName === user.name) {
        console.log(`* ${user.name} (current)`)
      } else {
        console.log(`* ${user.name}`);
      }
    };
  } catch (error) {
    process.exit(1);
  };
};

export { handlerGetAllUsers };
