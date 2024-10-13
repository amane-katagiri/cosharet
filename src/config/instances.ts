import type { Instance } from "../instance/index.js";

export const defaultInstances: Instance[] = [
  { type: "mastodon", url: "fedibird.com" },
  { type: "misskey", url: "misskey.io" },
  { type: "twitter", url: "x.com" },
  { type: "hatenabookmark", url: "b.hatena.ne.jp" },
  { type: "wayback", url: "web.archive.org" },
];
