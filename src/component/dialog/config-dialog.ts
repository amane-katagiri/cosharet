import van from "vanjs-core";
import { Dialog } from ".";
import type { Theme } from "../../theme";
import { type Instance, type InstanceType, classify } from "../../instance";
import { Bookmarklet } from "../bookmarklet";
import { getTranslator } from "../../locale";

const { t } = getTranslator();

const { a, div, button, input, label } = van.tags;

const ConfigFlagItem = (
  description: string,
  value: boolean,
  onchange?: (checked: boolean) => void,
): HTMLDivElement =>
  div(
    label(
      { class: onchange == null ? "disabled" : "" },
      input({
        type: "checkbox",
        onchange: (e: { target: { checked: boolean } }) =>
          onchange?.(e.target.checked),
        checked: value,
        disabled: onchange == null,
      }),
      description,
    ),
  );

export const ConfigDialog = (
  instances: Instance[],
  action: {
    clearInstance: () => void;
    updateInstance: (instance: Instance) => void;
  },
  state: {
    isAppendHashtag: boolean;
    setAppendHashtagFlag: (checked: boolean) => void;
    isShownInstanceName: boolean;
    setShowInstanceNameFlag: (checked: boolean) => void;
    isQuickShareMode: boolean;
    setQuickShareModeFlag: (checked: boolean) => void;
  },
  theme: Theme,
): void => {
  const fetcherIsLoading = van.state(false);

  Dialog(
    t("dialog/config/title"),
    (close) => [
      ConfigFlagItem(
        t("dialog/config/enable_quick_share"),
        state.isQuickShareMode,
        state.setQuickShareModeFlag,
      ),
      ConfigFlagItem(
        t("dialog/config/show_instance_name"),
        state.isShownInstanceName,
        state.setShowInstanceNameFlag,
      ),
      ConfigFlagItem(
        t("dialog/config/append_app_hashtag", {
          appHashTag: import.meta.env.VITE_APP_HASHTAG,
        }),
        state.isAppendHashtag,
        state.setAppendHashtagFlag,
      ),
      div(
        button(
          {
            disabled: fetcherIsLoading,
            onclick: () => {
              fetcherIsLoading.val = true;
              Promise.all(
                instances.map(async (instance) => {
                  try {
                    const newInstance = (await classify(instance.url)).instance;
                    if (newInstance.name != null) {
                      return newInstance;
                    }
                  } catch (e) {
                    console.error(e);
                  }
                  return null;
                }),
              )
                .then((result) =>
                  result
                    .filter(
                      (instance): instance is Instance<InstanceType> =>
                        instance != null,
                    )
                    .map(action.updateInstance),
                )
                .catch((e) => {
                  console.error(e);
                })
                .finally(() => {
                  fetcherIsLoading.val = false;
                  close();
                });
            },
            style: `
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
          },
          t("dialog/config/update_instances_name"),
        ),
      ),
      div(
        button(
          {
            onclick: () => {
              action.clearInstance();
              close();
            },
            style: `
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
          },
          t("dialog/config/clear_instances"),
        ),
      ),
      div(
        {
          style: `
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5em;
            `,
        },
        t("dialog/config/add_bookmarklet"),
        Bookmarklet(theme),
      ),
      div(
        a(
          {
            href: import.meta.env.VITE_APP_SOURCE_LINK,
            target: "_blank",
            rel: "noopener noreferrer",
            style: `
              color: ${theme.linkText}
              `,
          },
          import.meta.env.VITE_APP_TITLE,
        ),
        ` ${
          import.meta.env.VITE_APP_VERSION
        } is a tiny hub for sharing posts in the Fediverse.`,
      ),
      div(
        "Emoji graphics are licensed under a ",
        a(
          {
            href: "https://creativecommons.org/licenses/by/4.0/",
            target: "_blank",
            rel: "noopener noreferrer",
            style: `
              color: ${theme.linkText}
              `,
          },
          "CC BY 4.0",
        ),
        " by ",
        a(
          {
            href: "https://twemoji.twitter.com/",
            target: "_blank",
            rel: "noopener noreferrer",
            style: `
              color: ${theme.linkText}
              `,
          },
          "Twitter, Inc and other contributors",
        ),
        ".",
      ),
    ],
    theme,
  );
};
