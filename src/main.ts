import {
  type Instance,
  generate,
  getInstanceKey,
  sortInstance,
} from "./instance";
import "./css/main.css";
import { buildShareText, parseUrlParams } from "./params";
import { updateState, restoreState, clearState } from "./state";
import van from "vanjs-core";
import { FetchDialog } from "./component/dialog/fetch-dialog";
import { InstanceList } from "./component/instance-list";
import { defaultInstances } from "./config/instances";
import { ConfigDialog } from "./component/dialog/config-dialog";
import emoji_2699 from "./emoji/2699.svg";
import { QuickDialog } from "./component/dialog/quick-dialog";
import { ShareContent } from "./component/share-content";
import { autoFocus } from "./component/dialog";
import { BookmarkletList } from "./component/bookmarklet";
import { LinkBuilder } from "./component/link-builder";
import { getTranslator } from "./locale";

const { t } = getTranslator();

const { div, button, img } = van.tags;

const addApp = (id: string): void => {
  /** init params */
  const { content, theme } = parseUrlParams(
    new URLSearchParams(
      document.location.hash !== ""
        ? document.location.hash.slice(1)
        : document.location.search,
    ),
  );
  const shareContent = buildShareText(content);
  const state = restoreState();

  /** vanjs states */
  const instances = van.state(state?.instances?.sort(sortInstance) ?? []);
  const isAppendHashtag = van.state(state?.appendHashtag ?? false);
  const isQuickShareMode = van.state(state?.quickShareMode ?? false);
  const isShownInstanceName = van.state(state?.showInstanceName ?? false);
  const selectedInstanceKey = van.state<string | null>(
    getInstanceKey(instances.val.at(0)),
  );
  const mode = van.state<"share" | "builder" | "bookmarklet" | "customize">(
    shareContent != null ? "share" : "bookmarklet",
  );
  const quickInstance = van.derive(() => instances.val.at(0));

  /** actions */
  const addInstance = (instance: Instance, q?: number): void => {
    instances.val = [
      {
        ...instance,
        q: q ?? Math.max(0, ...instances.val.map((d) => d.q ?? 0)),
      },
      ...instances.val.filter((v) => v.url !== instance.url),
    ].sort(sortInstance);
    updateState({ instances: instances.val });
  };
  const updateInstance = (instance: Instance): void => {
    const newInstance = { ...instance };
    const oldInstances = [...instances.val];
    oldInstances.forEach((instance, index, instances) => {
      if (instance.url === newInstance.url) {
        instances[index] = newInstance;
      }
    });
    instances.val = oldInstances.sort(sortInstance);
    updateState({ instances: instances.val });
  };
  const removeInstance = (instance: Instance): void => {
    instances.val = instances.val.filter(
      (v) => v.url !== instance.url || v.type !== instance.type,
    );
    selectedInstanceKey.val = null;
    updateState({ instances: instances.val });
  };
  const clearInstance = (): void => {
    selectedInstanceKey.val = null;
    instances.val = [...defaultInstances];
    clearState(["instances"]);
  };
  const share = (instance: Instance): void => {
    const generated = generate(instance, {
      ...content,
      hashtags: `${content.hashtags ?? ""}${
        isAppendHashtag.val
          ? content.hashtags == null || content.hashtags.length === 0
            ? import.meta.env.VITE_APP_HASHTAG
            : !content.hashtags.includes(import.meta.env.VITE_APP_HASHTAG)
              ? `,${import.meta.env.VITE_APP_HASHTAG}`
              : ""
          : ""
      }`,
    });
    if (generated == null) {
      return;
    }
    updateInstance({ ...instance, q: (instance.q ?? 0) + 1 });
    if (typeof generated.href === "string") {
      location.href = generated.href;
      return;
    }
    generated.action();
  };

  /** render page */
  if (
    isQuickShareMode.val &&
    quickInstance.val != null &&
    mode.val === "share" &&
    shareContent != null
  ) {
    QuickDialog(share, shareContent, quickInstance.val, theme);
    autoFocus();
  }

  const builder = LinkBuilder(theme);
  const bookmarklet = BookmarkletList(theme);

  const target = document.querySelector(`#${id}`);
  if (target != null) {
    van.add(target, () =>
      div(
        {
          style: `
            color: ${theme.text};
            background: ${theme.background};
            `,
        },
        div(
          {
            style: `
              display: flex;
              flex-direction: column;
              max-width: 720px;
              min-height: 100dvh;
              margin: 0 auto;
              padding: 1em 0.5em;
              box-sizing: border-box;
              gap: 1em;
              text-align: center;
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
            mode.val === "share" && shareContent != null
              ? ShareContent(shareContent, t("page/share/guide"), theme)
              : div(
                  {
                    style: `
                      display: flex;
                      gap: 1em;
                      `,
                  },
                  button(
                    {
                      class: "tabButton",
                      style:
                        mode.val === "bookmarklet"
                          ? `
                            color: ${theme.accentText};
                            background: ${theme.accentColor};
                            `
                          : `
                            color: ${theme.text};
                            background: ${theme.componentBackground};
                            `,
                      onclick: () => (mode.val = "bookmarklet"),
                    },
                    t("page/empty/tabs/bookmarklet"),
                  ),
                  button(
                    {
                      class: "tabButton",
                      style:
                        mode.val === "builder"
                          ? `
                            color: ${theme.accentText};
                            background: ${theme.accentColor};
                            `
                          : `
                            color: ${theme.text};
                            background: ${theme.componentBackground};
                            `,
                      onclick: () => (mode.val = "builder"),
                    },
                    t("page/empty/tabs/builder"),
                  ),
                  button(
                    {
                      class: "imageButton",
                      onclick: () => (mode.val = "customize"),
                    },
                    img({ src: emoji_2699, style: "width: 1em; height: 1em;" }),
                  ),
                ),
            mode.val === "customize"
              ? t("page/empty/instances/guide")
              : mode.val === "builder"
                ? builder
                : mode.val === "bookmarklet"
                  ? bookmarklet
                  : null,
          ),
          div(
            {
              style: () => `
                display: ${mode.val === "share" || mode.val === "customize" ? "flex" : "none"};
                flex-direction: column;
                gap: 1em;
                `,
            },
            div(
              {
                style: `
                  background: ${theme.componentBackground};
                  border-radius: 0.5em;
                  `,
              },
              InstanceList({
                instances: instances.val,
                selectedInstanceKey: selectedInstanceKey.val,
                isShownInstanceName: isShownInstanceName.val,
                theme,
                onClickItem: (instance: Instance) => {
                  selectedInstanceKey.val = getInstanceKey(instance);
                },
                onClickShare: mode.val === "share" ? share : undefined,
                onClickRemove: removeInstance,
              }),
            ),
            div(
              {
                style: `
                  display: flex;
                  gap: 0.5em;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  `,
              },
              button(
                {
                  style: `
                    color: ${theme.text};
                    background: ${theme.componentBackground};
                    `,
                  onclick: () => {
                    FetchDialog(addInstance, theme);
                    autoFocus();
                  },
                },
                t("page/share/add_new_instance"),
              ),
              button(
                {
                  ...(mode.val === "share"
                    ? { class: "imageButton" }
                    : {
                        style: `
                          color: ${theme.text};
                          background: ${theme.componentBackground};
                          `,
                      }),
                  onclick: () => {
                    ConfigDialog(
                      instances.val,
                      {
                        clearInstance,
                        updateInstance,
                      },
                      {
                        isAppendHashtag: isAppendHashtag.val,
                        setAppendHashtagFlag: (checked) => {
                          isAppendHashtag.val = checked;
                          updateState({ appendHashtag: checked });
                        },
                        isQuickShareMode: isQuickShareMode.val,
                        setQuickShareModeFlag: (checked) => {
                          isQuickShareMode.val = checked;
                          updateState({ quickShareMode: checked });
                        },
                        isShownInstanceName: isShownInstanceName.val,
                        setShowInstanceNameFlag: (checked) => {
                          isShownInstanceName.val = checked;
                          updateState({ showInstanceName: checked });
                        },
                      },
                      theme,
                    );
                    autoFocus();
                  },
                },
                mode.val === "share"
                  ? img({ src: emoji_2699, style: "height: 1em;" })
                  : t("page/empty/instances/customize"),
              ),
            ),
          ),
        ),
      ),
    );
  }
};

addApp("app");
