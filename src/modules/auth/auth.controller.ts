import { FastifyReply, FastifyRequest } from "fastify";
import {
  registerUser,
  loginUser,
  getAllUsers,
  addAdminUser,
  loginAdmin,
  addRole,
} from "./auth.service";
import {
  RegisterInput,
  LoginInput,
  adminInput,
  adminUserInput,
  roleInput,
} from "./auth.types";

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

export async function getUsersHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getAllUsers();
    return reply.code(200).send(users);
  } catch (err) {
    return reply.code(500).send({ error: err.message });
  }
}

export async function registerAdmin(
  req: FastifyRequest<{ Body: adminUserInput }>,
  reply: FastifyReply
) {
  try {
    const token = await addAdminUser(req.body);
    return reply.code(201).send({ token });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}

export async function loginHandlerAdmin(
  req: FastifyRequest<{ Body: adminInput }>,
  reply: FastifyReply
) {
  try {
    const token = await loginAdmin(req.body);
    return reply.code(200).send({ token });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}

export async function createRole(
  req: FastifyRequest<{ Body: roleInput }>,
  reply: FastifyReply
) {
  try {
    const res = await addRole(req.body);
    return reply.code(201).send({ res });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}
