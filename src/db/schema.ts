import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

type User = typeof users.$inferSelect;

export const feeds = pgTable('feeds', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  url: text('url').notNull().unique(),
  name: text('name').notNull(),
  lastFetchedAt: timestamp('last_fetched_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

type Feed = typeof feeds.$inferSelect;
type NewFeed = typeof feeds.$inferInsert;

export const feedFollows = pgTable('feed_follows', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  feedId: uuid('feed_id')
    .notNull()
    .unique()
    .references(() => feeds.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

type FeedFollow = typeof feedFollows.$inferSelect;
type FeedFollowWithNames = Pick<FeedFollow, 'id' | 'createdAt' | 'updatedAt'> & {
  feedName: string;
  userName: string;
};

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  feedId: uuid('feed_id')
    .notNull()
    .references(() => feeds.id),
  url: text('url').notNull().unique(),
  title: text('title'),
  description: text('description'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

type Post = typeof posts.$inferSelect;
type NewPost = typeof posts.$inferInsert;

export type { User, Feed, NewFeed, FeedFollow, FeedFollowWithNames, NewPost, Post };
