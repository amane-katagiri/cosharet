import van from "vanjs-core";
import { Theme } from "../theme";
import { namedThemeKeys, namedThemes } from "../config/theme";
import { getTranslator } from "../locale";

const { t } = getTranslator();

const { a, div } = van.tags;

export const Bookmarklet = (theme: Theme) =>
  a(
    {
      href: `javascript:(function(){window.open('${location.protocol}//${
        location.host
      }/#theme=${encodeURIComponent(
        theme.name ?? "default",
      )}&url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title))})();`,
      onclick: () => false,
      style: `
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        cursor: default;
        display: inline-block;
        text-decoration: none;
        color: ${theme.accentColor};
        background: ${theme.componentBackground};
        `,
    },
    import.meta.env.VITE_APP_TITLE,
  );

export const BookmarkletList = () =>
  div(
    {
      style: `
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        `,
    },
    t("page/empty/bookmarklet/guide"),
    div(
      {
        style: `
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.5em;
          `,
      },
      namedThemeKeys.map((theme) =>
        Bookmarklet(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? namedThemes[theme].dark
            : namedThemes[theme].light,
        ),
      ),
    ),
  );
