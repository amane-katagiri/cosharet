import { Classifier, Generator, Instance } from ".";
import { NETWORK_ERROR_MESSAGE, UNKNOWN_INSTANCE_MESSAGE } from "../messages";

/** @package */
export const classify: Classifier<"misskey"> = async (domain: string) => {
  try {
    const response = await (await fetch(`https://${domain}/api/meta`)).json();
    if (response.version) {
      return { status: true, instance: { type: "misskey", url: domain } };
    }
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
  throw new Error(UNKNOWN_INSTANCE_MESSAGE);
};

/** @package */
export const generate: Generator = (instance: Instance, content: string) => {
  if (instance.type !== "misskey") {
    return null;
  }
  return `https://${instance.url}/share?text=${encodeURIComponent(content)}`;
};
