import type { Classifier, Generator, Instance } from ".";
import type { Params } from "../params";
import { getTranslator } from "../locale";

const { t } = getTranslator();

export const classify: Classifier<"wayback"> = (
  domain: string,
): { status: true; instance: Instance<"wayback"> } => {
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
