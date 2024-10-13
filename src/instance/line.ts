import type { Classifier, Generator, Instance } from ".";
import type { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

export const classify: Classifier<"line"> = (
  domain: string,
): { status: true; instance: Instance<"line"> } => {
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

export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "line") {
    return null;
  }
  return {
    href: `https://social-plugins.${
      instance.url
    }/lineit/share?url=${encodeURIComponent(content.url ?? "")}`,
  };
};
