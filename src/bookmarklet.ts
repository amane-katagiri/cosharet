import van from "vanjs-core";
import { Theme } from "./color";
import {
  BOOKMARKLET_TITLE,
  EMPTY_PAGE_BOOKMARKLET_DESCRIPTION,
} from "./messages";
import { namedThemeKeys, namedThemes } from "./config/theme";

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
    BOOKMARKLET_TITLE,
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
    EMPTY_PAGE_BOOKMARKLET_DESCRIPTION,
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
