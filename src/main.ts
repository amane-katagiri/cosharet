import {
  Instance,
  generate,
  getInstanceKey,
  sortInstance,
} from "./instance/index.js";
import "./css/main.css";
import { parseUrlParams } from "./params.js";
import { updateState, restoreState, clearState } from "./state.js";
import van from "vanjs-core";
import {
  INSTANCES_ADD_BUTTON_LABEL,
  NO_SHARE_CONTENT_ERROR_MESSAGE,
  OPEN_SAMPLE_LINK_MESSAGE,
} from "./messages.js";
import { FetchDialog } from "./dialog/fetch-dialog.js";
import { InstanceList } from "./instance-list.js";
import { defaultInstances } from "./config/instances.js";
import { ConfigDialog } from "./dialog/config-dialog.js";
import emoji_2699 from "./emoji/2699.svg";
import { QuickDialog } from "./dialog/quick-dialog.js";
import { ShareContent } from "./share-content.js";

const { div, button, img, a } = van.tags;

const addApp = (id: string) => {
  const state = restoreState();
  const instances = van.state(state?.instances?.sort(sortInstance) ?? []);
  const isAppendHashtag = van.state(state?.appendHashtag ?? false);
  const isQuickShareMode = van.state(state?.quickShareMode ?? false);
  const isShownInstanceName = van.state(state?.showInstanceName ?? false);

  const selectedInstanceKey = van.state<string | null>(
    instances.val.length !== 0 ? getInstanceKey(instances.val[0]) : null,
  );
  const isNavigating = van.state(false);

  const { content, theme } = parseUrlParams(
    new URLSearchParams(
      document.location.hash !== ""
        ? document.location.hash.slice(1)
        : document.location.search,
    ),
  );

  const addInstance = (instance: Instance, q?: number) => {
    instances.val = [
      {
        ...instance,
        q: q ?? Math.max(...[0], ...instances.val.map((d) => d.q ?? 0)),
      },
      ...instances.val.filter((v) => v.url !== instance.url),
    ].sort(sortInstance);
    updateState({ instances: instances.val });
  };
  const updateInstance = (instance: Instance, qIncrement: number = 1) => {
    const newInstance = { ...instance, q: (instance.q ?? 0) + qIncrement };
    const oldInstances = [...instances.val];
    oldInstances.forEach((instance, index, instances) => {
      if (instance.url === newInstance.url) {
        instances[index] = newInstance;
      }
    });
    instances.val = oldInstances.sort(sortInstance);
    updateState({ instances: instances.val });
  };
  const removeInstance = (instance: Instance) => {
    instances.val = instances.val.filter(
      (v) => v.url !== instance.url || v.type !== instance.type,
    );
    selectedInstanceKey.val = null;
    updateState({ instances: instances.val });
  };
  const clearInstance = () => {
    selectedInstanceKey.val = null;
    instances.val = [...defaultInstances];
    clearState(["instances"]);
  };
  const share = (instance: Instance) => {
    const href = generate(
      instance,
      content == null
        ? ""
        : `${content}${
            isAppendHashtag.val &&
            !content.includes(`#${import.meta.env.VITE_APP_HASHTAG}`)
              ? `#${import.meta.env.VITE_APP_HASHTAG} `
              : ""
          }`,
    );
    if (href == null) {
      return;
    }
    isNavigating.val = true;
    updateInstance(instance);
    location.href = href;
  };

  isQuickShareMode.val && instances.val.length !== 0 && content != null
    ? QuickDialog(
        () => share(instances.val[0]),
        content,
        instances.val[0],
        theme,
      )
    : "";

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
              padding: 1em 0.5em 0.5em 0.5em;
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
            content != null
              ? ShareContent(content, null, theme)
              : div(
                  NO_SHARE_CONTENT_ERROR_MESSAGE,
                  a(
                    {
                      href: "?#text=Share from cosharet 😎&url=https://github.com/amane-katagiri/cosharet&hashtags=cosharet,test",
                      style: `
                        color: ${theme.accentColor}
                        `,
                    },
                    OPEN_SAMPLE_LINK_MESSAGE,
                  ),
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
                  instances: isNavigating.val
                    ? instances.oldVal
                    : instances.val,
                  selectedInstanceKey: selectedInstanceKey.val,
                  isContentEmpty: content == null,
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
                  },
                },
                INSTANCES_ADD_BUTTON_LABEL,
              ),
              button(
                {
                  class: "imageButton",
                  onclick: () =>
                    ConfigDialog(
                      instances.val,
                      clearInstance,
                      (instance: Instance) => updateInstance(instance, 0),
                      {
                        isAppendHashtag,
                        setAppendHashtagFlag: (checked) => {
                          isAppendHashtag.val = checked;
                          updateState({ appendHashtag: checked });
                        },
                        isQuickShareMode,
                        setQuickShareModeFlag: (checked) => {
                          isQuickShareMode.val = checked;
                          updateState({ quickShareMode: checked });
                        },
                        isShownInstanceName,
                        setShowInstanceNameFlag: (checked) => {
                          isShownInstanceName.val = checked;
                          updateState({ showInstanceName: checked });
                        },
                      },
                      theme,
                    ),
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
