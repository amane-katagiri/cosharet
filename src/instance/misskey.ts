import type { Classifier, Generator, Instance } from ".";
import { type Params, buildShareText } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

type MisskeyResponse = { name?: string; version?: string } | null;

export const classify: Classifier<"misskey"> = async (
  domain: string,
): Promise<{ status: true; instance: Instance<"misskey"> }> => {
  try {
    let response: MisskeyResponse = null;
    try {
      response = (await (
        await fetch(`https://${domain}/api/meta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ detail: false }),
        })
      ).json()) as MisskeyResponse;
    } catch {
      response = (await (
        await fetch(`https://${domain}/api/meta`)
      ).json()) as MisskeyResponse;
    }
    if (response?.version != null) {
      return {
        status: true,
        instance: {
          type: "misskey",
          url: domain,
          name: response.name ?? null,
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
  if (instance.type !== "misskey") {
    return null;
  }
  const text = buildShareText(content);
  return text != null
    ? { href: `https://${instance.url}/share?text=${encodeURIComponent(text)}` }
    : null;
};
