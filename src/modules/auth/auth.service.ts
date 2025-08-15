import { db } from "../../config/db";
import { adminUser, users } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/password";
import { signJWT } from "../../utils/jwt";
import {
  RegisterInput,
  LoginInput,
  adminUserInput,
  adminInput,
} from "./auth.types";

export async function registerUser(input: RegisterInput) {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email));

  if (existing.length > 0) throw new Error("Email already registered");

  const hashed = await hashPassword(input.password);

  const [user] = await db
    .insert(users)
    .values({
      username: input.username,
      name: input.name,
      phone: input.phone,
      email: input.email,
      password: hashed,
      role: input.role,
      status: input.status ?? "active",
      created_by: input.created_by ?? "system",
    })
    .returning({
      id: users.id,
      email: users.email,
    });

  return signJWT({ id: user.id, email: user.email });
}

export async function loginUser(input: LoginInput) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email));
  if (!user) throw new Error("Invalid email or password");

  const isValid = await comparePassword(input.password, user.password);
  if (!isValid) throw new Error("Invalid email or password");

  return signJWT({ id: user.id, email: user.email });
}

export async function getAllUsers() {
  const result = await db.execute(sql`SELECT * FROM users`);
  return result.rows;
}

export async function addAdminUser(input: adminUserInput) {
  const existing = await db
    .select()
    .from(adminUser)
    .where(eq(adminUser.user_id, input.user_id));

  if (existing.length > 0) throw new Error("User already registered");
  const hashed = await hashPassword(input.password);

  const [admin] = await db
    .insert(adminUser)
    .values({
      user_id: input.user_id,
      username: input.username,
      type: input.type,
      password: hashed,
    })
    .returning({
      id: adminUser.id,
      user_id: adminUser.user_id,
    });

  return signJWT({ id: admin.id, user_id: admin.user_id });
}

export async function loginAdmin(input: adminInput) {
  const [logadmin] = await db
    .select()
    .from(adminUser)
    .where(eq(adminUser.username, input.username));
  if (!logadmin) throw new Error("Invalid username or password");

  if (!logadmin.password) throw new Error("Invalid username or password");
  const isValid = await comparePassword(input.password, logadmin.password);
  if (!isValid) throw new Error("Invalid username or password");

  return signJWT({ id: logadmin.id, userId: logadmin.user_id });
}
