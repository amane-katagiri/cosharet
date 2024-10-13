import van from "vanjs-core";
import { Dialog } from ".";
import { ShareContent } from "../share-content";
import type { Theme } from "../../theme";
import type { Instance } from "../../instance";
import { getTranslator } from "../../locale";

const { t } = getTranslator();

const { button } = van.tags;

export const QuickDialog = (
  onClickShare: (instance: Instance) => void,
  content: string,
  instance: Instance,
  theme: Theme,
): void => {
  Dialog(
    import.meta.env.VITE_APP_TITLE,
    () => {
      return [
        ShareContent(
          content,
          t("dialog/quick_share/guide", { domain: instance.url }),
          theme,
        ),
        button(
          {
            style: `
              color: ${theme.accentText};
              background: ${theme.accentColor};
              height: 5em;
              `,
            onclick: () => {
              onClickShare(instance);
            },
          },
          t("general/share"),
        ),
      ];
    },
    theme,
  );
};
