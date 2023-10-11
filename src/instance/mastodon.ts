import { Classifier, Generator, Instance } from ".";
import { NETWORK_ERROR_MESSAGE, UNKNOWN_INSTANCE_MESSAGE } from "../messages";

/** @package */
export const classify: Classifier<"mastodon"> = async (domain: string) => {
  try {
    const response = await (
      await fetch(`https://${domain}/api/v1/instance`)
    ).json();
    if (response.version) {
      return { status: true, instance: { type: "mastodon", url: domain } };
    }
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
  throw new Error(UNKNOWN_INSTANCE_MESSAGE);
};

/** @package */
export const generate: Generator = (instance: Instance, content: string) => {
  if (instance.type !== "mastodon") {
    return null;
  }
  return `https://${instance.url}/share?text=${encodeURIComponent(content)}`;
};
