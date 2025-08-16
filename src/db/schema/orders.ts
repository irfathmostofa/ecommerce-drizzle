import {
  pgTable,
  uuid,
  integer,
  varchar,
  jsonb,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { channels } from "./users";
import { variants } from "./products";

export const orders = pgTable(
  "orders",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    channelId: integer("channel_id").references(() => channels.id),
    externalOrderId: varchar("external_order_id", { length: 255 }),
    customer: jsonb("customer"),
    totalAmount: numeric("total_amount", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 10 }),
    status: varchar("status", { length: 50 }),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    uniq: {
      columns: [t.channelId, t.externalOrderId],
      isUnique: true,
    },
  })
);

export const orderLines = pgTable("order_lines", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, {
    onDelete: "cascade",
  }),
  variantId: uuid("variant_id").references(() => variants.id),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
});
