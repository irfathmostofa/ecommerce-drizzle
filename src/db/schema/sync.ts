import {
  pgTable,
  uuid,
  integer,
  varchar,
  text,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { channels } from "./core";

export const syncLogs = pgTable("sync_logs", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  channelId: integer("channel_id").references(() => channels.id, {
    onDelete: "set null",
  }),
  entityType: varchar("entity_type", { length: 100 }),
  entityId: uuid("entity_id"),
  externalId: varchar("external_id", { length: 255 }),
  eventType: varchar("event_type", { length: 100 }),
  status: varchar("status", { length: 50 }).default("pending"),
  attempt: integer("attempt").default(0),
  message: text("message"),
  rawRequest: jsonb("raw_request"),
  rawResponse: jsonb("raw_response"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
