import type { Classifier, Generator, Instance } from ".";
import type { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

export const classify: Classifier<"facebook"> = (
  domain: string,
): { status: true; instance: Instance<"facebook"> } => {
  if (["www.facebook.com", "facebook.com"].includes(domain)) {
    return {
      status: true,
      instance: {
        type: "facebook",
        url: "www.facebook.com",
        name: "Facebook",
      },
    };
  }
  throw new Error(t("alert/unknown_instance"));
};

export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "facebook") {
    return null;
  }
  return {
    href: `https://${instance.url}/sharer/sharer.php?u=${encodeURIComponent(
      content.url ?? "",
    )}`,
  };
};
