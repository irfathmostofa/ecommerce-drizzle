import { db } from "../../config/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/password";
import { signJWT } from "../../utils/jwt";
import { RegisterInput, LoginInput } from "./auth.types";

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
