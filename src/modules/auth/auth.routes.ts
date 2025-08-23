import { FastifyInstance } from "fastify";
import {
  registerHandler,
  loginHandler,
  getUsersHandler,
  loginHandlerAdmin,
  registerAdmin,
  createRole,
} from "./auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/create-user", registerHandler);
  fastify.post("/login-user", loginHandler);
  fastify.post("/get-user", getUsersHandler);
  fastify.post("/create-admin", registerAdmin);
  fastify.post("/login-admin", loginHandlerAdmin);
  fastify.post("/add-role", createRole);
}
