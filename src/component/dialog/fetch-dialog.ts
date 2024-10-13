import van from "vanjs-core";
import { type Instance, classify } from "../../instance";
import { Dialog, MODAL_DIALOG_AUTOFOCUS_CLASS_NAME } from ".";
import type { Theme } from "../../theme";
import { getTranslator } from "../../locale";

const { t } = getTranslator();

const { div, button, input } = van.tags;

export const FetchDialog = (
  addInstance: (instance: Instance, q?: number) => void,
  theme: Theme,
): void => {
  const fetcherIsLoading = van.state(false);
  const fetcherError = van.state<string | null>(null);
  const fetcherInfo = van.state<string | null>(null);
  const fetcherInput = van.state("");
  const onclick = async (domain: string, close: () => void): Promise<void> => {
    try {
      fetcherIsLoading.val = true;
      fetcherInfo.val = t("dialog/fetch/loading_instance_info");
      addInstance((await classify(domain)).instance);
      close();
    } catch (e) {
      fetcherError.val = String(
        e instanceof AggregateError ? e.errors.at(0) : e,
      );
    } finally {
      fetcherInfo.val = null;
      fetcherIsLoading.val = false;
    }
  };
  const disabled = van.derive(
    () => fetcherIsLoading.val || fetcherInput.val === "",
  );

  Dialog(
    t("dialog/fetch/title"),
    (close) => [
      () =>
        div(
          {
            style: `${fetcherError.val != null ? `color: red` : ``};`,
          },
          fetcherError.val ?? fetcherInfo.val ?? t("dialog/fetch/guide"),
        ),
      div(
        {
          style: `
            display: flex;
            gap: 0.5em;
            `,
        },
        input({
          value: fetcherInput,
          oninput: (e: { target: { value: string } }) => {
            fetcherInput.val = e.target.value;
            fetcherError.val = null;
          },
          onkeydown: (e: { key?: string }) => {
            if (!disabled.val && e.key === "Enter") {
              void onclick(fetcherInput.val, close);
            }
          },
          type: "text",
          disabled: fetcherIsLoading,
          class: MODAL_DIALOG_AUTOFOCUS_CLASS_NAME,
          style: `
            flex-grow: 1;
            color: ${theme.text};
            background: ${theme.componentBackground};
            `,
          placeholder: "fediverse.example.com",
        }),
        button(
          {
            onclick: () => {
              void onclick(fetcherInput.val, close);
            },
            disabled,
            style: `
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
          },
          "OK",
        ),
      ),
      t("dialog/fetch/non_fediverse_list/guide"),
      div(
        {
          style: `
            display: flex;
            flex-wrap: wrap;
            gap: 1em;
            `,
        },
        [
          { name: "X (formerly Twitter)", domain: "x.com" },
          { name: "Facebook", domain: "facebook.com" },
          { name: "LINE", domain: "line.me" },
          { name: "はてなブックマーク", domain: "b.hatena.ne.jp" },
          { name: "Wayback Machine", domain: "web.archive.org" },
        ].map((s) =>
          div(
            button(
              {
                onclick: () => {
                  void onclick(s.domain, close);
                  fetcherInput.val = s.domain;
                },
                style: `
                  color: ${theme.text};
                  background: ${theme.componentBackground};
                  `,
              },
              s.name,
            ),
          ),
        ),
      ),
    ],
    theme,
  );
};
