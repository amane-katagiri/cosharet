import type { Classifier, Generator, Instance } from ".";
import { type Params, buildShareText } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

type MastodonRespone = { title?: string; version?: string } | null;

export const classify: Classifier<"mastodon"> = async (
  domain: string,
): Promise<{ status: true; instance: Instance<"mastodon"> }> => {
  try {
    const response = (await (
      await fetch(`https://${domain}/api/v1/instance`)
    ).json()) as MastodonRespone;
    if (response?.version != null) {
      return {
        status: true,
        instance: {
          type: "mastodon",
          url: domain,
          name: response.title ?? null,
        },
      };
    }
  } catch {
    throw new Error(t("alert/network_error"));
  }
  throw new Error(t("alert/unknown_instance"));
};

export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "mastodon") {
    return null;
  }
  const text = buildShareText(content);
  return text != null
    ? { href: `https://${instance.url}/share?text=${encodeURIComponent(text)}` }
    : null;
};
