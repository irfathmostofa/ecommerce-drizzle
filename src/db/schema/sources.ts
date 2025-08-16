import {
  pgTable,
  uuid,
  integer,
  varchar,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { channels } from "./users";
import { products, variants } from "./products";

export const productSources = pgTable(
  "product_sources",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    channelId: integer("channel_id")
      .notNull()
      .references(() => channels.id, { onDelete: "cascade" }),
    sourceProductId: varchar("source_product_id", { length: 255 }).notNull(),
    productId: uuid("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    rawPayload: jsonb("raw_payload").notNull(),
    mappedAt: timestamp("mapped_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    uniq: {
      columns: [t.channelId, t.sourceProductId],
      isUnique: true,
    },
  })
);

export const variantSources = pgTable(
  "variant_sources",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    channelId: integer("channel_id")
      .notNull()
      .references(() => channels.id, { onDelete: "cascade" }),
    sourceVariantId: varchar("source_variant_id", { length: 255 }).notNull(),
    variantId: uuid("variant_id").references(() => variants.id, {
      onDelete: "set null",
    }),
    rawPayload: jsonb("raw_payload"),
    mappedAt: timestamp("mapped_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    uniq: {
      columns: [t.channelId, t.sourceVariantId],
      isUnique: true,
    },
  })
);

export const channelProductOverrides = pgTable(
  "channel_product_overrides",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    channelId: integer("channel_id")
      .notNull()
      .references(() => channels.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    override: jsonb("override").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    uniq: {
      columns: [t.channelId, t.productId],
      isUnique: true,
    },
  })
);

export const channelVariantOverrides = pgTable(
  "channel_variant_overrides",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    channelId: integer("channel_id")
      .notNull()
      .references(() => channels.id, { onDelete: "cascade" }),
    variantId: uuid("variant_id")
      .notNull()
      .references(() => variants.id, { onDelete: "cascade" }),
    override: jsonb("override").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    uniq: {
      columns: [t.channelId, t.variantId],
      isUnique: true,
    },
  })
);
