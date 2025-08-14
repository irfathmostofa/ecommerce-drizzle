import { FastifyInstance } from "fastify";
import {
  registerHandler,
  loginHandler,
  getUsersHandler,
  loginHandlerAdmin,
  registerAdmin,
} from "./auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register-user", registerHandler);
  fastify.post("/login-user", loginHandler);
  fastify.post("/get-user", getUsersHandler);
  fastify.post("/register-admin", registerAdmin);
  fastify.post("/login-admin", loginHandlerAdmin);
}
