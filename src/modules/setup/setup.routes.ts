import { FastifyInstance } from "fastify";
import { createChannelHandler } from "./setup.controller";
export default async function setupRoutes(fastify: FastifyInstance) {
  fastify.post("/create-channels", createChannelHandler);
}
