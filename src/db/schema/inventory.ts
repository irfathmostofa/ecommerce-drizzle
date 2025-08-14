import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { variants } from "./products";
import { channels } from "./core";

export const inventories = pgTable(
  "inventories",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    variantId: uuid("variant_id")
      .notNull()
      .references(() => variants.id, { onDelete: "cascade" }),
    channelId: integer("channel_id")
      .notNull()
      .references(() => channels.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    reserved: integer("reserved").notNull().default(0),
    incoming: integer("incoming").notNull().default(0),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    uniq: {
      columns: [t.variantId, t.channelId],
      isUnique: true,
    },
  })
);

export const inventoryAudits = pgTable("inventory_audits", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  inventoryId: uuid("inventory_id").references(() => inventories.id, {
    onDelete: "set null",
  }),
  variantId: uuid("variant_id").references(() => variants.id, {
    onDelete: "set null",
  }),
  channelId: integer("channel_id").references(() => channels.id, {
    onDelete: "set null",
  }),
  previousQuantity: integer("previous_quantity"),
  newQuantity: integer("new_quantity"),
  reason: varchar("reason", { length: 255 }),
  rawPayload: jsonb("raw_payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

import { jsonb, varchar } from "drizzle-orm/pg-core";
