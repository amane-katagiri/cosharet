import van from "vanjs-core";
import { Dialog } from ".";
import { ShareContent } from "../share-content";
import type { Theme } from "../../theme";
import type { Instance } from "../../instance";
import { getTranslator } from "../../locale";

const { t } = getTranslator();

const { button } = van.tags;

export const QuickDialog = (
  onClickShare: () => void,
  content: string,
  instance: Instance,
  theme: Theme,
): void => {
  Dialog(
    import.meta.env.VITE_APP_TITLE,
    () => {
      return [
        ShareContent(content, instance, theme),
        button(
          {
            style: `
              color: ${theme.accentText};
              background: ${theme.accentColor};
              height: 5em;
              `,
            onclick: onClickShare,
          },
          t("general/share"),
        ),
      ];
    },
    theme,
  );
};
