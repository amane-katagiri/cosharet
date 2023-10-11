import {
  Instance,
  classify,
  generate,
  getInstanceKey,
  sortInstance,
} from "./instance/index.js";
import "./css/main.css";
import { parseUrlParams } from "./params.js";
import { updateState, restoreState, clearState } from "./state.js";
import van from "vanjs-core";
import {
  INSTANCES_CLEAR_BUTTON_LABEL,
  INSTANCES_REMOVE_BUTTON_LABEL,
  INSTANCES_SHARE_BUTTON_LABEL,
  NO_SHARE_CONTENT_ERROR_MESSAGE,
  SHARE_CONTENT_DESCRIPTION,
} from "./messages.js";

const { div, input, button, textarea } = van.tags;

const addApp = (id: string) => {
  const fetcherIsLoading = van.state(false);
  const fetcherError = van.state<string>("");
  const fetcherInput = van.state("");
  const instances = van.state(
    restoreState()?.instances?.sort(sortInstance) ?? [],
  );
  const selectedInstance = van.state<string | null>(
    instances.val.length !== 0 ? getInstanceKey(instances.val[0]) : null,
  );
  const isNavigating = van.state(false);

  const params = parseUrlParams(
    new URLSearchParams(
      document.location.hash !== ""
        ? document.location.hash.slice(1)
        : document.location.search,
    ),
  );

  const resetError = () => (fetcherError.val = "");
  const resetFetcher = () => {
    fetcherInput.val = "";
    fetcherError.val = "";
    fetcherIsLoading.val = false;
  };
  const addInstance = (instance: Instance, q?: number) => {
    instances.val = [
      { ...instance, q: q ?? Math.max(...instances.val.map((d) => d.q ?? 0)) },
      ...instances.val.filter((v) => v.url !== instance.url),
    ].sort(sortInstance);
    updateState({ instances: instances.val });
  };
  const updateInstance = (instance: Instance, q: number = 1) => {
    instances.val = [
      { ...instance, q: (instance.q ?? 0) + q },
      ...instances.val.filter((v) => v.url !== instance.url),
    ].sort(sortInstance);
    updateState({ instances: instances.val });
  };
  const removeInstance = (instance: Instance) => {
    instances.val = instances.val.filter(
      (v) => v.url !== instance.url || v.type !== instance.type,
    );
    updateState({ instances: instances.val });
  };
  const clearInstance = () => {
    instances.val = [];
    clearState(["instances"]);
  };

  const target = document.querySelector(`#${id}`);
  if (target != null) {
    van.add(
      target,
      () =>
        params.content != null
          ? div(
              div(SHARE_CONTENT_DESCRIPTION),
              textarea(
                {
                  style: `
            width: 100%;
            max-width: 480px;
            box-sizing: border-box;
            `,
                  readonly: true,
                  rows: 3,
                },
                params.content,
              ),
            )
          : div(NO_SHARE_CONTENT_ERROR_MESSAGE),
      () =>
        div(
          {
            style: `
              margin: 1em 0;
              max-width: 480px;
              min-height: 480px;
              background: ghostwhite;
              ${
                isNavigating.val
                  ? `
                display: flex;
                justify-content: center;
                align-items: center;
                `
                  : ``
              }
              `,
          },
          isNavigating.val
            ? "..."
            : instances.val.map((instance) => {
                const selected =
                  selectedInstance.val === getInstanceKey(instance);
                return div(
                  {
                    style: () => `
                  display: flex;
                  justify-content: space-between;
                  height: 1.5em;
                  padding: 1em;
                  background: ${selected ? `lemonchiffon` : `aliceblue`};
                  `,

                    onclick: () => {
                      selectedInstance.val = getInstanceKey(instance);
                    },
                  },
                  [
                    div(`${instance.url} (${instance.type})`),
                    () =>
                      selected
                        ? div(
                            {
                              style: `
                                display: flex;
                                gap: 0.5em;
                                `,
                            },
                            () =>
                              params.content != null
                                ? button(
                                    {
                                      onclick: () => {
                                        if (params.content == null) {
                                          return;
                                        }
                                        const href = generate(
                                          instance,
                                          params.content,
                                        );
                                        if (href == null) {
                                          return;
                                        }
                                        isNavigating.val = true;
                                        updateInstance(instance);
                                        location.href = href;
                                      },
                                    },
                                    INSTANCES_SHARE_BUTTON_LABEL,
                                  )
                                : "",
                            button(
                              {
                                onclick: () => {
                                  removeInstance(instance);
                                  resetError();
                                },
                                disabled: () => fetcherIsLoading.val,
                              },
                              INSTANCES_REMOVE_BUTTON_LABEL,
                            ),
                          )
                        : "",
                  ],
                );
              }),
        ),
      div(
        {
          style: `
            margin: 0 1em;
            `,
        },
        div(
          {
            style: `
              display: flex;
              flex-direction: column;
              gap: 1em;
              `,
          },
          [
            div(
              {
                style: `
                  display: flex;
                  gap: 0.5em;
                  `,
              },
              [
                input({
                  value: fetcherInput,
                  oninput: (e) => {
                    fetcherInput.val = e.target.value;
                    resetError();
                  },
                  disabled: fetcherIsLoading,
                }),
                button(
                  {
                    onclick: async () => {
                      try {
                        fetcherIsLoading.val = true;
                        addInstance(
                          (await classify(fetcherInput.val)).instance,
                        );
                        resetFetcher();
                      } catch (e) {
                        fetcherError.val = String(
                          e instanceof AggregateError ? e.errors[0] : e,
                        );
                      } finally {
                        fetcherIsLoading.val = false;
                      }
                    },
                    disabled: () =>
                      fetcherIsLoading.val || fetcherInput.val === "",
                  },
                  "追加",
                ),
              ],
            ),
            div(
              button(
                {
                  onclick: () => {
                    clearInstance();
                    resetFetcher();
                  },
                  disabled: () =>
                    fetcherIsLoading.val || instances.val.length === 0,
                },
                INSTANCES_CLEAR_BUTTON_LABEL,
              ),
              div(fetcherError),
            ),
          ],
        ),
      ),
    );
  }
};

addApp("app");
