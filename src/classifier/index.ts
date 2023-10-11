import mastodon from "./mastodon";
import misskey from "./misskey";

export type Instance<T extends string = string> = { type: T; url: string };
export type Classifier<T extends string> = (
  domain: string,
) => Promise<{ status: true; instance: Instance<T> }>;

const classifiers: Classifier<"mastodon" | "misskey">[] = [mastodon, misskey];

export default (domain: string) =>
  Promise.any(classifiers.map((c) => c(domain)));
