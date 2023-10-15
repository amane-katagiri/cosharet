import { Params } from "../params";
import * as mastodon from "./mastodon";
import * as misskey from "./misskey";
import * as twitter from "./twitter";

import { z } from "zod";

const INSTANCES = ["mastodon", "misskey", "twitter"] as const;

export type Instance<T extends string = string> = {
  type: T;
  url: string;
  name?: string | null;
  q?: number | null;
};
export const getInstanceKey = (instance: Instance) =>
  `${instance.type}-${instance.url}`;
export const sortInstance = (a: Instance, b: Instance) =>
  (b.q ?? 0) - (a.q ?? 0);
const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
export const InstanceSchema = schemaForType<Instance>()(
  z.object({
    type: z.string(),
    url: z.string(),
    name: z.string().nullish(),
    q: z.number().nullish(),
  }),
);
export type InstanceType = (typeof INSTANCES)[number];
export type Classifier<T extends string> = (
  domain: string,
) => Promise<{ status: true; instance: Instance<T> }>;
export type Generator = (
  instance: Instance,
  content: Params["content"],
) => string | null;

const classifiers: { [k in InstanceType]: Classifier<k> } = {
  mastodon: mastodon.classify,
  misskey: misskey.classify,
  twitter: twitter.classify,
};
const generators: { [k in InstanceType]: Generator } = {
  mastodon: mastodon.generate,
  misskey: misskey.generate,
  twitter: twitter.generate,
};

export const classify = (domain: string) =>
  Promise.any(Object.values(classifiers).map((c) => c(domain)));
export const generate = (instance: Instance, content: Params["content"]) =>
  Object.values(generators)
    .map((g) => g(instance, content))
    .filter((item) => item != null)[0] ?? null;
