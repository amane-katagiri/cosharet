import { Classifier, Generator, Instance } from ".";
import { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

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
  throw new Error(t("alert/unknown_instance"));
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
