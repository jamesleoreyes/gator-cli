import { fetchFeed } from "../utils/rss.utils.js";

async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
  const response = await fetchFeed('https://www.wagslane.dev/index.xml');
  console.log(JSON.stringify(response, null, 2));
};

export { handlerAgg };
