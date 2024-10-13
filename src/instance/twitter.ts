import type { Classifier, Generator, Instance } from ".";
import type { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

export const classify: Classifier<"twitter"> = (
  domain: string,
): { status: true; instance: Instance<"twitter"> } => {
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

export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "twitter") {
    return null;
  }
  return {
    href: `https://${instance.url}/intent/tweet/?text=${encodeURIComponent(
      content.text ?? "",
    )}&url=${encodeURIComponent(
      content.url ?? "",
    )}&hashtags=${encodeURIComponent(content.hashtags ?? "")}`,
  };
};
