import van, { State } from "vanjs-core";
import {
  CONFIG_APPEND_COSHARET_HASHTAG_DESCRIPTION,
  CONFIG_BOOKMARKLET_DESCRIPTION,
  CONFIG_DIALOG_TITLE,
  CONFIG_OPEN_QUICK_SHARE_DESCRIPTION,
  CONFIG_SHOW_INSTANCE_NAME_DESCRIPTION,
  INSTANCES_CLEAR_DESCRIPTION,
  INSTANCES_NAME_UPDATE_DESCRIPTION,
} from "../messages";
import { Dialog } from ".";
import { Theme } from "../color";
import { Instance, InstanceType, classify } from "../instance";
import { Bookmarklet } from "../bookmarklet";

const { a, div, button, input, label } = van.tags;

const ConfigFlagItem = (
  description: string,
  value: boolean,
  onchange?: (checked: boolean) => void,
) =>
  div(
    label(
      { class: onchange == null ? "disabled" : "" },
      input({
        type: "checkbox",
        onchange: (e) => onchange?.(e.target.checked),
        checked: value,
        disabled: onchange == null,
      }),
      description,
    ),
  );

export const ConfigDialog = (
  instances: Instance[],
  clearInstance: () => void,
  updateInstance: (instance: Instance) => void,
  state: {
    isAppendHashtag: State<boolean> | boolean;
    setAppendHashtagFlag: (checked: boolean) => void;
    isShownInstanceName: State<boolean> | boolean;
    setShowInstanceNameFlag: (checked: boolean) => void;
    isQuickShareMode: State<boolean> | boolean;
    setQuickShareModeFlag: (checked: boolean) => void;
  },
  theme: Theme,
) => {
  const fetcherIsLoading = van.state(false);

  Dialog(
    CONFIG_DIALOG_TITLE,
    (close) => [
      ConfigFlagItem(
        CONFIG_OPEN_QUICK_SHARE_DESCRIPTION,
        van.val(state.isQuickShareMode),
        state.setQuickShareModeFlag,
      ),
      ConfigFlagItem(
        CONFIG_SHOW_INSTANCE_NAME_DESCRIPTION,
        van.val(state.isShownInstanceName),
        state.setShowInstanceNameFlag,
      ),
      ConfigFlagItem(
        CONFIG_APPEND_COSHARET_HASHTAG_DESCRIPTION,
        van.val(state.isAppendHashtag),
        state.setAppendHashtagFlag,
      ),
      div(
        button(
          {
            disabled: fetcherIsLoading,
            onclick: async () => {
              try {
                fetcherIsLoading.val = true;
                (
                  await Promise.all(
                    instances.map(async (instance) => {
                      try {
                        const newInstance = (await classify(instance.url))
                          .instance;
                        if (newInstance.name != null) {
                          return newInstance;
                        }
                      } catch (e) {
                        console.error(e);
                      }
                      return null;
                    }),
                  )
                )
                  .filter(
                    (instance): instance is Instance<InstanceType> =>
                      instance != null,
                  )
                  .map((instance) => updateInstance(instance));
              } catch (e) {
                console.error(e);
              } finally {
                fetcherIsLoading.val = false;
                close();
              }
            },
            style: `
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
          },
          INSTANCES_NAME_UPDATE_DESCRIPTION,
        ),
      ),
      div(
        button(
          {
            onclick: () => {
              clearInstance();
              close();
            },
            style: `
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
          },
          INSTANCES_CLEAR_DESCRIPTION,
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
        CONFIG_BOOKMARKLET_DESCRIPTION,
        Bookmarklet(theme),
      ),
      div(
        a(
          {
            href: import.meta.env.VITE_APP_SOURCE_LINK,
            target: "_blank",
            rel: "noopener noreferrer",
            style: `
              color: ${theme.accentColor}
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
              color: ${theme.accentColor}
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
              color: ${theme.accentColor}
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
