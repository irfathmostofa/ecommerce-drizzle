import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { hashPassword } from "../../utils/password";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 225 }).notNull(),
  status: varchar("status", { length: 15 }).notNull(),
  created_by: varchar("created_by", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_by: varchar("updated_by", { length: 255 }),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const adminUser = pgTable("admin_user", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }),
  username: varchar("username", { length: 255 }),
  type: varchar("type", { length: 255 }),
  password: varchar("password", { length: 255 }),
});
