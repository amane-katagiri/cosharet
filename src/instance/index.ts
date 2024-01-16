import { Params } from "../params";
import * as mastodon from "./mastodon";
import * as misskey from "./misskey";
import * as twitter from "./twitter";
import * as hatenabookmark from "./hatenabookmark";
import * as facebook from "./facebook";
import * as line from "./line";
import * as wayback from "./wayback";

import { z } from "zod";

const INSTANCES = [
  "mastodon",
  "misskey",
  "twitter",
  "hatenabookmark",
  "facebook",
  "line",
  "wayback",
] as const;

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
) =>
  | { href: string; action?: null }
  | { href?: null; action: () => void }
  | null;

const classifiers: { [k in InstanceType]: Classifier<k> } = {
  mastodon: mastodon.classify,
  misskey: misskey.classify,
  twitter: twitter.classify,
  hatenabookmark: hatenabookmark.classify,
  facebook: facebook.classify,
  line: line.classify,
  wayback: wayback.classify,
};
const generators: { [k in InstanceType]: Generator } = {
  mastodon: mastodon.generate,
  misskey: misskey.generate,
  twitter: twitter.generate,
  hatenabookmark: hatenabookmark.generate,
  facebook: facebook.generate,
  line: line.generate,
  wayback: wayback.generate,
};

export const classify = (domain: string) =>
  Promise.any(Object.values(classifiers).map((c) => c(domain)));
export const generate = (instance: Instance, content: Params["content"]) =>
  Object.values(generators)
    .map((g) => g(instance, content))
    .filter((item) => item != null)[0] ?? null;
