import { userQueries } from "../db/queries/index.js";

async function handlerResetDb(cmdName: string, ...args: string[]): Promise<void> {
  try {
    await userQueries.deleteAllUsers();
    console.log('All users deleted');
  } catch (error) {
    process.exit(1);
  };
};

export { handlerResetDb };
