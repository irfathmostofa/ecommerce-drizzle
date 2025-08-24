import { db } from "../../config/db";
import { channels } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { channelsInput } from "./setup.types";

export async function createChannel(input: channelsInput) {
  const { keyName, displayName, metadata } = input;

  const [channel] = await db
    .insert(channels)
    .values({
      keyName,
      displayName,
      metadata: JSON.stringify(metadata),
    })
    .returning();

  return channel;
}
