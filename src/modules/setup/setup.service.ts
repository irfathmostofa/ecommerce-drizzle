import { db } from "../../config/db";
import { categories, channels } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { categoryInput, channelsInput } from "./setup.types";

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
export async function getChannelByKeyName(keyName: string) {
  const channel = await db
    .select()
    .from(channels)
    .where(eq(channels.keyName, keyName))
    .limit(1);

  return channel[0];
}

export async function getAllChannels() {
  const channelsList = await db
    .select()
    .from(channels);

  return channelsList;
}

export async function createCategory(input: categoryInput) {
  const { name, subCategories} = input;

  const [category] = await db
    .insert(categories)
    .values({
      name,
      subCategories,
    })
    .returning();

  return category;
}

