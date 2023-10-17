import van from "vanjs-core";
import { Instance, classify } from "../../instance";
import { Dialog, MODAL_DIALOG_AUTOFOCUS_CLASS_NAME } from ".";
import { Theme } from "../../theme";
import { getTranslator } from "../../locale";

const { t } = getTranslator();

const { div, button, input, ul, li, code } = van.tags;

export const FetchDialog = (
  addInstance: (instance: Instance, q?: number) => void,
  theme: Theme,
) => {
  const fetcherIsLoading = van.state(false);
  const fetcherError = van.state<string | null>(null);
  const fetcherInfo = van.state<string | null>(null);
  const fetcherInput = van.state("");
  const onclick = async (close: () => void) => {
    try {
      fetcherIsLoading.val = true;
      fetcherInfo.val = t("dialog/fetch/loading_instance_info");
      addInstance((await classify(fetcherInput.val)).instance);
      close();
    } catch (e) {
      fetcherError.val = String(e instanceof AggregateError ? e.errors[0] : e);
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
          oninput: (e) => {
            fetcherInput.val = e.target.value;
            fetcherError.val = null;
          },
          onkeydown: (e) => {
            if (!disabled.val && e?.key === "Enter") {
              onclick(close);
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
            onclick: () => onclick(close),
            disabled,
            style: `
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
          },
          "OK",
        ),
      ),
      div(
        {
          style: `
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            `,
        },
        t("dialog/fetch/non_fediverse_list/guide"),
        ul(
          {
            style: `
              padding: 0 1em;
              margin: 0;
              `,
          },
          [
            { name: "X (formerly Twitter)", domain: "twitter.com" },
            { name: "Facebook", domain: "facebook.com" },
            { name: "LINE", domain: "line.me" },
            { name: "はてなブックマーク", domain: "b.hatena.ne.jp" },
          ].map((s) => li(code(s.domain), ` → ${s.name}`)),
        ),
      ),
    ],
    theme,
  );
};
