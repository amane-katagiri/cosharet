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
  const domainList = van.state(
    restoreState()?.domainList?.sort(sortInstance) ?? [],
  );
  const selectedDomain = van.state<string | null>(
    domainList.val.length !== 0 ? getInstanceKey(domainList.val[0]) : null,
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
  const addDomain = (instance: Instance, q?: number) => {
    domainList.val = [
      { ...instance, q: q ?? Math.max(...domainList.val.map((d) => d.q ?? 0)) },
      ...domainList.val.filter((v) => v.url !== instance.url),
    ].sort(sortInstance);
    updateState({ domainList: domainList.val });
  };
  const updateDomain = (instance: Instance, q: number = 1) => {
    domainList.val = [
      { ...instance, q: (instance.q ?? 0) + q },
      ...domainList.val.filter((v) => v.url !== instance.url),
    ].sort(sortInstance);
    updateState({ domainList: domainList.val });
  };
  const removeDomain = (instance: Instance) => {
    domainList.val = domainList.val.filter(
      (v) => v.url !== instance.url || v.type !== instance.type,
    );
    updateState({ domainList: domainList.val });
  };
  const clearDomain = () => {
    domainList.val = [];
    clearState(["domainList"]);
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
                addDomain((await classify(fetcherInput.val)).instance);
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
              clearDomain();
              resetFetcher();
            },
            disabled: () => fetcherIsLoading.val || domainList.val.length === 0,
          },
          "clear",
        ),
        div(fetcherError),
      ]),
      () =>
        div(
          domainList.val.map((d) =>
            div([
              input({
                id: getInstanceKey(d),
                type: "radio",
                checked: () => selectedDomain.val === getInstanceKey(d),
                onclick: () => (selectedDomain.val = getInstanceKey(d)),
              }),
              label({ for: getInstanceKey(d) }, `${d.url} (${d.type})`),
              button(
                {
                  onclick: () => {
                    removeDomain(d);
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
            const instance = domainList.val.find(
              (d) => getInstanceKey(d) === selectedDomain.val,
            );
            if (params.content == null || instance == null) {
              return;
            }
            const href = generate(instance, params.content);
            if (href == null) {
              return;
            }
            updateDomain(instance);
            location.href = href;
          },
          disabled: () =>
            fetcherIsLoading.val ||
            params.content == null ||
            !domainList.val.some(
              (d) => getInstanceKey(d) === selectedDomain.val,
            ),
        },
        "share",
      ),
    );
  }
};

addApp("app");
