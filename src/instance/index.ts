import * as mastodon from "./mastodon";
import * as misskey from "./misskey";

import { z } from "zod";

const INSTANCES = ["mastodon", "misskey"] as const;

export type Instance<T extends string = string> = {
  type: T;
  url: string;
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
    q: z.number().nullish(),
  }),
);
export type InstanceType = (typeof INSTANCES)[number];
export type Classifier<T extends string> = (
  domain: string,
) => Promise<{ status: true; instance: Instance<T> }>;
export type Generator = (instance: Instance, content: string) => string | null;

const classifiers: Classifier<InstanceType>[] = [
  mastodon.classify,
  misskey.classify,
];
const generators: Generator[] = [mastodon.generate, misskey.generate];

export const classify = (domain: string) =>
  Promise.any(classifiers.map((c) => c(domain)));
export const generate = (instance: Instance, content: string) =>
  generators
    .map((g) => g(instance, content))
    .filter((item) => item != null)[0] ?? null;
