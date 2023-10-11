import {
  Instance,
  classify,
  generate,
  getInstanceKey,
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
  const domainList = van.state(restoreState()?.domainList ?? []);
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
  const addDomain = (instance: Instance) => {
    domainList.val = [
      ...domainList.val.filter((v) => v.url !== fetcherInput.val),
      instance,
    ];
    updateState({ domainList: domainList.val });
  };
  const removeDomain = (url: string) => {
    domainList.val = domainList.val.filter((v) => v.url !== url);
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
              removeDomain(fetcherInput.val);
              resetFetcher();
            },
            disabled: () => fetcherIsLoading.val || fetcherInput.val === "",
          },
          "remove",
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
