import { handleInvalidArgs } from "../utils/error.utils.js";
import { feedUtils } from "../utils/feed.utils.js";
import { parseUtils } from "../utils/parse.utils.js";

async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
  const [time_between_reqs] = args;
  if (!time_between_reqs) handleInvalidArgs(['time_between_reqs']);

  const duration = parseUtils.duration(time_between_reqs);
  if (!duration) throw new Error('Invalid time string. Use `1s`, `1m`, `1h`, etc.');

  console.log(`Collecting feeds every ${time_between_reqs}`);

  feedUtils.scrapeFeeds();
  const interval = setInterval(() => {
    feedUtils.scrapeFeeds();
  }, duration);

  await new Promise<void>(resolve => {
    process.on('SIGINT', () => {
      console.log('Shutting down feed aggregator...');
      clearInterval(interval);
      resolve();
    });
  });
};

export { handlerAgg };
