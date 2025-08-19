import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

// Roles Table
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: varchar("description"),
});

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  roleId: integer("role_id").references(() => roles.id),
  status: varchar("status", { length: 15 }).notNull(),
  created_by: varchar("created_by", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_by: varchar("updated_by", { length: 255 }),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Admin User
export const adminUser = pgTable("admin_user", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  username: varchar("username", { length: 255 }),
  type: varchar("type", { length: 255 }),
  password: varchar("password", { length: 255 }),
});
