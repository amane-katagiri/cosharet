import { Classifier, Generator, Instance } from ".";
import { Params, buildShareText } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

/** @package */
export const classify: Classifier<"mastodon"> = async (domain: string) => {
  try {
    const response = await (
      await fetch(`https://${domain}/api/v1/instance`)
    ).json();
    if (response.version) {
      return {
        status: true,
        instance: {
          type: "mastodon",
          url: domain,
          name: response?.title ?? null,
        },
      };
    }
  } catch {
    throw new Error(t("alert/network_error"));
  }
  throw new Error(t("alert/unknown_instance"));
};

/** @package */
export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "mastodon") {
    return null;
  }
  const text = buildShareText(content);
  return text != null
    ? `https://${instance.url}/share?text=${encodeURIComponent(text)}`
    : null;
};
