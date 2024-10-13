import type { Classifier, Generator, Instance } from ".";
import type { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

export const classify: Classifier<"hatenabookmark"> = (
  domain: string,
): { status: true; instance: Instance<"hatenabookmark"> } => {
  if (["b.hatena.ne.jp"].includes(domain)) {
    return {
      status: true,
      instance: {
        type: "hatenabookmark",
        url: domain,
        name: "はてなブックマーク",
      },
    };
  }
  throw new Error(t("alert/unknown_instance"));
};

export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "hatenabookmark") {
    return null;
  }
  return { href: `https://${instance.url}/entry/${content.url}` };
};
