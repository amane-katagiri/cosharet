import van, { State } from "vanjs-core";
import {
  CONFIG_APPEND_COSHARET_HASHTAG_DESCRIPTION,
  CONFIG_DIALOG_TITLE,
  CONFIG_OPEN_QUICK_SHARE_DESCRIPTION,
  INSTANCES_CLEAR_DESCRIPTION,
} from "../messages";
import { Dialog } from ".";
import { Theme } from "../color";

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
  clearInstance: () => void,
  isAppendHashtag: State<boolean> | boolean,
  setAppendHashtagFlag: (checked: boolean) => void,
  theme: Theme,
) => {
  Dialog(
    CONFIG_DIALOG_TITLE,
    (close) => [
      ConfigFlagItem(CONFIG_OPEN_QUICK_SHARE_DESCRIPTION, false),
      ConfigFlagItem(
        CONFIG_APPEND_COSHARET_HASHTAG_DESCRIPTION,
        van.val(isAppendHashtag),
        setAppendHashtagFlag,
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
        " is a tiny hub for sharing posts in the Fediverse. ",
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
