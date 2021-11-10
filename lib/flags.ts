import upstash from "@upstash/redis";
import * as Const from "./const";

const redisClient = upstash(Const.UPSTASH_REDIS_REST_URL, Const.UPSTASH_REDIS_REST_TOKEN);

const FLAGS_KEY = "flags";
const flagKey = (key: string) => `flag:${key}`;

export type Flag = Record<string, boolean>;

export const getFlag = async (key: string): Promise<boolean> => {
  const { data } = await redisClient.get(flagKey(key));
  return data === "1";
};

export const getFlags = async (): Promise<Flag> => {
  const { data: keys }: { data: string[] } = await redisClient.smembers(FLAGS_KEY);
  const sortedKeys = keys.sort();
  const { data: values } = await redisClient.mget(sortedKeys.map((key: string) => flagKey(key)));

  const mapped = keys.reduce((acc: Map<string, boolean>, key: string, index: number) => {
    acc.set(key, values[index] === "1");
    return acc;
  }, new Map<string, boolean>());

  return Object.fromEntries(mapped);
};

export const removeFlag = async (key: string) => {
  await redisClient.srem(FLAGS_KEY, [key]);
  await redisClient.del([flagKey(key)]);
};

export const enableFlag = async (key: string) => {
  await redisClient.sadd(FLAGS_KEY, [key]);
  await redisClient.set(flagKey(key), "1");
  return getFlag(key);
};

export const disableFlag = async (key: string) => {
  await redisClient.set(flagKey(key), "0");
};
