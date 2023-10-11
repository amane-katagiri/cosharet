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
import van from "./van/van-1.2.1.js";

const { div, input, button, label } = van.tags;

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
      div([
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
                addInstance((await classify(fetcherInput.val)).instance);
                resetFetcher();
              } catch (e) {
                fetcherError.val = String(
                  e instanceof AggregateError ? e.errors[0] : e,
                );
              } finally {
                fetcherIsLoading.val = false;
              }
            },
            disabled: () => fetcherIsLoading.val || fetcherInput.val === "",
          },
          "fetch",
        ),
        button(
          {
            onclick: () => {
              clearInstance();
              resetFetcher();
            },
            disabled: () => fetcherIsLoading.val || instances.val.length === 0,
          },
          "clear",
        ),
        div(fetcherError),
      ]),
      () =>
        div(
          instances.val.map((d) =>
            div([
              input({
                id: getInstanceKey(d),
                type: "radio",
                checked: () => selectedInstance.val === getInstanceKey(d),
                onclick: () => (selectedInstance.val = getInstanceKey(d)),
              }),
              label({ for: getInstanceKey(d) }, `${d.url} (${d.type})`),
              button(
                {
                  onclick: () => {
                    removeInstance(d);
                    resetError();
                  },
                  disabled: () => fetcherIsLoading.val,
                },
                "x",
              ),
            ]),
          ),
        ),
      button(
        {
          onclick: () => {
            const instance = instances.val.find(
              (d) => getInstanceKey(d) === selectedInstance.val,
            );
            if (params.content == null || instance == null) {
              return;
            }
            const href = generate(instance, params.content);
            if (href == null) {
              return;
            }
            updateInstance(instance);
            location.href = href;
          },
          disabled: () =>
            fetcherIsLoading.val ||
            params.content == null ||
            !instances.val.some(
              (d) => getInstanceKey(d) === selectedInstance.val,
            ),
        },
        "share",
      ),
    );
  }
};

addApp("app");
