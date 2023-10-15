import { Classifier, Generator, Instance } from ".";
import { UNKNOWN_INSTANCE_MESSAGE } from "../messages";
import { Params } from "../params";

/** @package */
export const classify: Classifier<"twitter"> = async (domain: string) => {
  if (["twitter.com", "x.com"].includes(domain)) {
    return {
      status: true,
      instance: {
        type: "twitter",
        url: domain,
        name: "X (formerly Twitter)",
      },
    };
  }
  throw new Error(UNKNOWN_INSTANCE_MESSAGE);
};

/** @package */
export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "twitter") {
    return null;
  }
  return `https://${instance.url}/intent/tweet/?text=${encodeURIComponent(
    content.text ?? "",
  )}&url=${encodeURIComponent(content.url ?? "")}&hashtags=${encodeURIComponent(
    content.hashtags ?? "",
  )}`;
};
