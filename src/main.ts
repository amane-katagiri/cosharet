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

const { div, button, img, hr } = van.tags;

const addApp = (id: string): void => {
  const state = restoreState();
  const instances = van.state(state?.instances?.sort(sortInstance) ?? []);
  const isAppendHashtag = van.state(state?.appendHashtag ?? false);
  const isQuickShareMode = van.state(state?.quickShareMode ?? false);
  const isShownInstanceName = van.state(state?.showInstanceName ?? false);

  const selectedInstanceKey = van.state<string | null>(
    getInstanceKey(instances.val.at(0)),
  );

  const { content, theme } = parseUrlParams(
    new URLSearchParams(
      document.location.hash !== ""
        ? document.location.hash.slice(1)
        : document.location.search,
    ),
  );
  const body = buildShareText(content);

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

  if (isQuickShareMode.val && instances.val.length !== 0 && body != null) {
    QuickDialog(
      () => {
        share(instances.val[0]);
      },
      body,
      instances.val[0],
      theme,
    );
    autoFocus();
  }

  const target = document.querySelector(`#${id}`);
  if (target != null) {
    van.add(
      target,
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
            body != null
              ? ShareContent(body, null, theme)
              : div(
                  {
                    style: `
                      display: flex;
                      flex-direction: column;
                      gap: 1em;
                      `,
                  },
                  LinkBuilder(theme),
                  div(hr()),
                  BookmarkletList(theme),
                  div(hr()),
                  t("page/empty/instances/guide"),
                ),
            () =>
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
                  isContentEmpty: body == null,
                  isShownInstanceName: isShownInstanceName.val,
                  theme,
                  onClickItem: (instance: Instance) => {
                    selectedInstanceKey.val = getInstanceKey(instance);
                  },
                  onClickShare: share,
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
                  class: "imageButton",
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
                img({ src: emoji_2699, style: "height: 1em;" }),
              ),
            ),
          ),
        ),
      ),
    );
  }
};

addApp("app");
