import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  createChannelHandler,
  getAllChannelsHandler,
  getChannelByKeyNameHandler,
} from "./setup.controller";
export default async function setupRoutes(fastify: FastifyInstance) {
  fastify.post("/create-channels", createChannelHandler);
  fastify.get("/channels", getAllChannelsHandler);
  fastify.get("/channels/:keyName", getChannelByKeyNameHandler);
  fastify.post("/create-categories", createCategoryHandler);
}
