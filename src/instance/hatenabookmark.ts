import { Classifier, Generator, Instance } from ".";
import { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

/** @package */
export const classify: Classifier<"hatenabookmark"> = async (
  domain: string,
) => {
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

/** @package */
export const generate: Generator = (
  instance: Instance,
  content: Params["content"],
) => {
  if (instance.type !== "hatenabookmark") {
    return null;
  }
  return { href: `https://${instance.url}/entry/${content.url}` };
};
