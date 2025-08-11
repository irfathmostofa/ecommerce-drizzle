import { db } from "../../config/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/password";
import { signJWT } from "../../utils/jwt";
import { RegisterInput, LoginInput } from "./auth.types";

export async function registerUser(input: RegisterInput) {
  // Check if email or phone already exists
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
      status: input.status ?? "active",
      createdby: input.createdby ?? "system",
    })
    .returning();

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
