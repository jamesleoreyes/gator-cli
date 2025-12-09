import { userQueries } from "src/db/queries/user.queries";

async function handlerReset(cmdName: string, ...args: string[]) {
  try {
    await userQueries.deleteAllUsers();
    console.log('All users deleted');
  } catch (error) {
    process.exit(1);
  };
};

export { handlerReset };
