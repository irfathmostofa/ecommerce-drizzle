import { FastifyInstance } from "fastify";
import {
  registerHandler,
  loginHandler,
  getUsersHandler,
} from "./auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", registerHandler);
  fastify.post("/login", loginHandler);
  fastify.post("/get-user", getUsersHandler);
}
