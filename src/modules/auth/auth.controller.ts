import { FastifyReply, FastifyRequest } from "fastify";
import { registerUser, loginUser } from "./auth.service";
import { RegisterInput, LoginInput } from "./auth.types";

export async function registerHandler(
  req: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply
) {
  try {
    const token = await registerUser(req.body);
    return reply.code(201).send({ token });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}

export async function loginHandler(
  req: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  try {
    const token = await loginUser(req.body);
    return reply.code(200).send({ token });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}
