import van from "vanjs-core";
import { Instance, classify } from "../instance";
import {
  INSTANCES_ADD_BUTTON_LABEL,
  INSTANCES_ADD_DESCRIPTION,
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
  const fetcherInput = van.state("");
  const closed = van.state(false);

  Dialog(
    INSTANCES_ADD_BUTTON_LABEL,
    [
      () =>
        div(
          {
            style: `${fetcherError.val != null ? `color: red` : ``};`,
          },
          fetcherError.val ?? INSTANCES_ADD_DESCRIPTION,
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
            onclick: async () => {
              try {
                fetcherIsLoading.val = true;
                addInstance((await classify(fetcherInput.val)).instance);
                closed.val = true;
              } catch (e) {
                fetcherError.val = String(
                  e instanceof AggregateError ? e.errors[0] : e,
                );
              } finally {
                fetcherIsLoading.val = false;
              }
            },
            disabled: () => fetcherIsLoading.val || fetcherInput.val === "",
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
