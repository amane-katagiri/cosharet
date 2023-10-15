import { Classifier, Generator, Instance } from ".";
import { NETWORK_ERROR_MESSAGE, UNKNOWN_INSTANCE_MESSAGE } from "../messages";
import { Params, buildShareText } from "../params";

/** @package */
export const classify: Classifier<"misskey"> = async (domain: string) => {
  try {
    let response = null;
    try {
      response = await (
        await fetch(`https://${domain}/api/meta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ detail: false }),
        })
      ).json();
    } catch {
      response = await (await fetch(`https://${domain}/api/meta`)).json();
    }
    if (response.version) {
      return {
        status: true,
        instance: {
          type: "misskey",
          url: domain,
          name: response?.name ?? null,
        },
      };
    }
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
  throw new Error(UNKNOWN_INSTANCE_MESSAGE);
};

/** @package */
export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "misskey") {
    return null;
  }
  const text = buildShareText(content);
  return text != null
    ? `https://${instance.url}/share?text=${encodeURIComponent(text)}`
    : null;
};
