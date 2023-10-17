import { Classifier, Generator, Instance } from ".";
import { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

/** @package */
export const classify: Classifier<"line"> = async (domain: string) => {
  if (["line.me"].includes(domain)) {
    return {
      status: true,
      instance: {
        type: "line",
        url: "line.me",
        name: "LINE",
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
  if (instance.type !== "line") {
    return null;
  }
  return `https://social-plugins.${
    instance.url
  }/lineit/share?url=${encodeURIComponent(content.url ?? "")}`;
};
