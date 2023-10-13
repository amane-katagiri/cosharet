import van from "vanjs-core";
import { Theme } from "./color";

const { a } = van.tags;

export const Bookmarklet = (theme: Theme) =>
  a(
    {
      href: `javascript:(function(){window.open('${location.protocol}//${location.host}/#url='+encodeURI(location.href)+'&text='+encodeURI(document.title))})();`,
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
    "cosharet",
  );
