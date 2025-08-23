import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  numeric,
  integer,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 128 }).unique(),
  title: varchar("title", { length: 1024 }).notNull(),
  description: text("description"),
  vendor: varchar("vendor", { length: 255 }),
  brand: varchar("brand", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const variants = pgTable("variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  sku: varchar("sku", { length: 128 }),
  barcode: varchar("barcode", { length: 128 }),
  price: numeric("price", { precision: 12, scale: 2 }).notNull().default("0"),
  msrp: numeric("msrp", { precision: 12, scale: 2 }),
  compareAtPrice: numeric("compare_at_price", { precision: 12, scale: 2 }),
  dimensions: jsonb("dimensions"),
  attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
  position: integer("position").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  variantId: integer("variant_id").references(() => variants.id, {
    onDelete: "set null",
  }),
  url: text("url").notNull(),
  altText: varchar("alt_text", { length: 1024 }),
  width: integer("width"),
  height: integer("height"),
  position: integer("position").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
