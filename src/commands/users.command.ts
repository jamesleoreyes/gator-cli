import { readConfig } from "src/configs/app.config";
import { userQueries } from "src/db/queries/user.queries";

async function handlerUsers(cmdName: string, ...args: string[]) {
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

export { handlerUsers };
