import { Classifier, Generator, Instance } from ".";
import { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

/** @package */
export const classify: Classifier<"wayback"> = async (domain: string) => {
  if (["web.archive.org", "archive.org"].includes(domain)) {
    return {
      status: true,
      instance: {
        type: "wayback",
        url: "web.archive.org",
        name: "Wayback Machine",
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
  if (instance.type !== "wayback") {
    return null;
  }
  return {
    action: () => {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `https://${instance.url}/save/`;
      form.style.display = "none";
      const url = document.createElement("input");
      url.name = "url";
      url.value = content.url ?? "";
      form.appendChild(url);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    },
  };
};
