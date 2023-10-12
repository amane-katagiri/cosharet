import van from "vanjs-core";
import { Instance, classify } from "../instance";
import {
  INSTANCES_ADD_BUTTON_LABEL,
  INSTANCES_ADD_DESCRIPTION,
  LOADING_INSTANCE_MESSAGE,
} from "../messages";
import { Dialog } from ".";
import { Theme } from "../color";

const { div, button, input } = van.tags;

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
      fetcherInfo.val = LOADING_INSTANCE_MESSAGE;
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
    INSTANCES_ADD_BUTTON_LABEL,
    (close) => [
      () =>
        div(
          {
            style: `${fetcherError.val != null ? `color: red` : ``};`,
          },
          fetcherError.val ?? fetcherInfo.val ?? INSTANCES_ADD_DESCRIPTION,
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
    ],
    theme,
  );
};
