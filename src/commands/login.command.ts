import { setUser } from "../configs/app.js";


async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) process.exit(1);
  const username = args[0];

  setUser(username);
  console.log(`User ${username} logged in successfully!`);
};

export { handlerLogin };
