import { Classifier, Generator, Instance } from ".";
import { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

/** @package */
export const classify: Classifier<"facebook"> = async (domain: string) => {
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

/** @package */
export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "facebook") {
    return null;
  }
  return `https://${instance.url}/sharer/sharer.php?u=${encodeURIComponent(
    content.url ?? "",
  )}`;
};
