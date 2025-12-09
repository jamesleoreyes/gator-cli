ALTER TABLE "feeds" ADD COLUMN "last_fetched_at" timestamp;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_feed_id_unique" UNIQUE("feed_id");--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_user_id_unique" UNIQUE("user_id");