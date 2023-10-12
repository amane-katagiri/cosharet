import van from "vanjs-core";
import { INSTANCES_SHARE_BUTTON_LABEL, QUICK_DIALOG_TITLE } from "../messages";
import { Dialog } from ".";
import { Theme } from "../color";
import { ShareContent } from "../share-content";
import { Instance } from "../instance";

const { button } = van.tags;

export const QuickDialog = (
  onClickShare: () => void,
  content: string,
  instance: Instance,
  theme: Theme,
) =>
  Dialog(
    QUICK_DIALOG_TITLE,
    () => {
      return [
        ShareContent(content, instance, theme),
        button(
          {
            style: `
              color: ${theme.background};
              background: ${theme.accentColor};
              height: 5em;
              `,
            onclick: onClickShare,
          },
          INSTANCES_SHARE_BUTTON_LABEL,
        ),
      ];
    },
    theme,
  );
