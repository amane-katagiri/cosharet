import mastodon from "./mastodon";
import misskey from "./misskey";
import { z } from "zod";

export type Instance<T extends string = string> = { type: T; url: string };
export type Classifier<T extends string> = (
  domain: string,
) => Promise<{ status: true; instance: Instance<T> }>;

const classifiers: Classifier<"mastodon" | "misskey">[] = [mastodon, misskey];

const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
export const InstanceSchema = schemaForType<Instance>()(
  z.object({
    type: z.string(),
    url: z.string(),
  }),
);

export default (domain: string) =>
  Promise.any(classifiers.map((c) => c(domain)));
