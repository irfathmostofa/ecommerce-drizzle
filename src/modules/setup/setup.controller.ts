import { FastifyReply, FastifyRequest } from "fastify";
import { createCategory, createChannel, getAllChannels, getChannelByKeyName } from "./setup.service";
import { categoryInput, channelsInput } from "./setup.types";

export async function createChannelHandler(
  req: FastifyRequest<{ Body: channelsInput }>,
  reply: FastifyReply
) {
  try {
    const result = await createChannel(req.body);
    return reply.code(201).send({ result });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}

export async function getAllChannelsHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await getAllChannels();
    return reply.code(200).send({ result });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}
export async function getChannelByKeyNameHandler(
  req: FastifyRequest<{ Params: { keyName: string } }>,
  reply: FastifyReply
) {
  try {
    const result = await getChannelByKeyName(req.params.keyName);
    return reply.code(200).send({ result });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}

export async function createCategoryHandler(
  req: FastifyRequest<{ Body: categoryInput }>,
  reply: FastifyReply
) {
  try {
    const result = await createCategory(req.body);
    return reply.code(201).send({ result });
  } catch (error: any) {
    return reply.code(400).send({ error: error.message });
  }
}
