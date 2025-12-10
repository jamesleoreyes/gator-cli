import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "../types/index.js";
import { validatorUtils } from "./validator.utils.js";

const rssUtils = {
  async fetchFeed(feedURL: string): Promise<RSSFeed> {
    try {
      const response = await fetch(feedURL, {
        headers: {
          'User-Agent': 'gator',
        },
      });

      if (!response.ok) throw new Error('NON-2XX response occurred');

      const data = await response.text();

      const parser = new XMLParser();
      const parsedXML = parser.parse(data);
      const rssFeed: RSSFeed = parsedXML.rss;

      if (!rssFeed.channel) {
        console.log(`Invalid XML data: ${rssFeed}`);
        process.exit(1);
      };


      const validRSS = validatorUtils.rssFeed(rssFeed);
      const { title, link, description, item: items } = validRSS.channel;

      let rssItems: RSSItem[] = [];

      for (const item of items) {
        const validItem = validatorUtils.rssItem(item);
        if (!validItem) continue;
        const { title: itemTitle, link: itemLink, description: itemDesc, pubDate } = validItem;
        rssItems.push({
          title: itemTitle,
          link: itemLink,
          description: itemDesc,
          pubDate
        });
      };

      const result: RSSFeed = {
        channel: {
          title,
          link,
          description,
          item: rssItems,
        },
      };

      return result;
    } catch (error) {
      throw new Error(`An error occurred when fetching RSS feed: ${error}`);
    };
  },
};

export { rssUtils };
