import { Classifier, Generator, Instance } from ".";
import { Params, buildShareText } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

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
    throw new Error(t("alert/network_error"));
  }
  throw new Error(t("alert/unknown_instance"));
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
    ? { href: `https://${instance.url}/share?text=${encodeURIComponent(text)}` }
    : null;
};
