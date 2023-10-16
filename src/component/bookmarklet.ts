import van from "vanjs-core";
import { Theme } from "../theme";
import { ThemeKey, namedThemeKeys, namedThemes } from "../config/theme";
import { getTranslator } from "../locale";

const { t } = getTranslator();

const { a, div, select, option, label, input } = van.tags;

export const Bookmarklet = (theme: Theme, openDirect: boolean = true) => {
  const idSuffix = Math.floor(Math.random() * 2147483647);
  return a(
    {
      href: openDirect
        ? `javascript:(function(){window.open('${location.protocol}//${
            location.host
          }/#theme=${encodeURIComponent(
            theme.name ?? "default",
          )}&url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title))})();`
        : `javascript:(function(){var a=document.getElementById('share-with-cosharet-${idSuffix}');if(a){a.remove()}else{a=document.body.insertBefore(document.createElement('a'),document.body.firstChild);a.id='share-with-cosharet-${idSuffix}';a.innerHTML='share with cosharet';a.target="_blank";a.style="position:fixed;top:1em;left:1em;z-index:2147483647;color:${
            theme.accentColor
          };border:solid 1px ${theme.accentColor};background-color:${
            theme.componentBackground
          };padding:1em;";a.href='${location.protocol}//${
            location.host
          }/#theme=${encodeURIComponent(
            theme.name ?? "default",
          )}&url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title);a.onclick=function(e){e.target.remove()}}})();`,
      onclick: () => {
        alert(t("page/empty/bookmarklet/alert/guide"));
        return false;
      },
      style: `
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        cursor: default;
        display: inline-block;
        text-decoration: none;
        color: ${theme.accentColor};
        border: solid 1px ${theme.accentColor};
        background: ${theme.componentBackground};
        `,
    },
    import.meta.env.VITE_APP_TITLE,
  );
};

export const BookmarkletList = (theme: Theme) => {
  const isDarkMode = van.state(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const openDirect = van.state(true);
  const themeKey = van.state<ThemeKey>(theme.name ?? "default");

  return div(
    {
      style: `
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1em;
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
      () =>
        Bookmarklet(
          isDarkMode.val
            ? namedThemes[themeKey.val].dark
            : namedThemes[themeKey.val].light,
          openDirect.val,
        ),
    ),
    div(
      {
        style: `
          display: flex;
          flex-wrap: wrap;
          gap: 1em;
          align-items: center;
          justify-content: center;
          `,
      },
      label(
        {
          style: `
            display: flex;
            gap: 0.5em;
            align-items: center;
            `,
        },
        t("general/theme"),
        select(
          {
            style: `
              flex-grow: 1;
              color: ${theme.text};
              background: ${theme.componentBackground};
              `,
            onchange: (e) => (themeKey.val = e.target.value),
          },
          namedThemeKeys.map((value) =>
            option({ selected: value === themeKey.val, value }, value),
          ),
        ),
      ),
      label(
        input({
          type: "checkbox",
          onchange: (e) => (isDarkMode.val = e.target.checked),
          checked: isDarkMode.val,
        }),
        t("page/empty/builder/enable_darkmode"),
      ),
      label(
        input({
          type: "checkbox",
          onchange: (e) => (openDirect.val = e.target.checked),
          checked: openDirect.val,
        }),
        t("page/empty/builder/enable_open_direct"),
      ),
    ),
  );
};
