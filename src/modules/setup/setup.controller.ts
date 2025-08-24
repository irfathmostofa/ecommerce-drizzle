import { FastifyReply, FastifyRequest } from "fastify";
import { createChannel } from "./setup.service";
import { channelsInput } from "./setup.types";

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
