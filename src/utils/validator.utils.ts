import type { RSSFeed, RSSItem } from "../types/index.js";

function validateRSSFeed(rss: RSSFeed): RSSFeed {
  let result: RSSFeed = rss;

  if (rss.channel.description) {
    if (typeof rss.channel.description !== 'string') {
      throw new TypeError('RSS channel description must be a string');
    };
  };

  if (rss.channel.title) {
    if (typeof rss.channel.title !== 'string') {
      throw new TypeError('RSS channel title must be a string');
    };
  };

  if (rss.channel.link) {
    if (typeof rss.channel.link !== 'string') {
      throw new TypeError('RSS channel title must be a string');
    };
  };

  if (rss.channel.item) {
    if (!Array.isArray(rss.channel.item)) {
      result.channel.item = [];
    };
  };

  return result;
};

function validateRSSItem(item: any): RSSItem | null {
  if (typeof item.title !== 'string') return null;
  if (typeof item.link !== 'string') return null;
  if (typeof item.description !== 'string') return null;
  if (typeof item.pubDate !== 'string') return null;

  return {
    title: item.title,
    link: item.link,
    description: item.description,
    pubDate: item.pubDate,
  };
};

export { validateRSSFeed, validateRSSItem };
