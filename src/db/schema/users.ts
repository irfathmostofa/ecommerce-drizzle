import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  status: varchar("status", { length: 15 }).notNull(),
  createdby: varchar("createdby", { length: 255 }),
  createdat: timestamp("created_at").defaultNow(),
  updateby: varchar("updateby", { length: 255 }),
  updateat: timestamp("updateat").defaultNow(),
});

