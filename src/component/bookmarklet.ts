import van from "vanjs-core";
import type { Theme } from "../theme";
import { type ThemeKey, namedThemeKeys, namedThemes } from "../config/theme";
import { getTranslator } from "../locale";

const { t } = getTranslator();

const { a, div, select, option, label, input } = van.tags;

const encode = (text: string): string =>
  encodeURIComponent(text).replace("'", "\\'");

export const Bookmarklet = (
  theme: Theme,
  putShareButton = false,
): HTMLAnchorElement => {
  const idSuffix = Math.floor(Math.random() * 2147483647);
  return a(
    {
      href: !putShareButton
        ? `javascript:(function(){window.open('${location.protocol}//${
            location.host
          }/#theme=${encode(
            theme.name ?? "default",
          )}&url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title))})();`
        : `javascript:(function(){var a=document.getElementById('share-with-cosharet-${idSuffix}');if(a){a.remove()}else{a=document.body.insertBefore(document.createElement('a'),document.body.firstChild);a.id='share-with-cosharet-${idSuffix}';a.innerHTML='share with ${encode(
            import.meta.env.VITE_APP_TITLE,
          )}';a.target='_blank';a.style='position:fixed;top:1em;left:1em;z-index:2147483647;padding:0.5em 1em;border-radius:0.25em;text-decoration:none;font-size:16px;font-family:sans-serif;color:${encodeURIComponent(
            encode(theme.linkText),
          )};background:${encode(theme.componentBackground)};';a.href='${
            location.protocol
          }//${location.host}/#theme=${encode(
            theme.name ?? "default",
          )}&url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title);a.onclick=function(e){e.target.remove()}}})();`,
      onclick: () => {
        alert(t("page/empty/bookmarklet/alert/guide"));
      },
      style: `
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        cursor: default;
        display: inline-block;
        text-decoration: none;
        color: ${theme.linkText};
        background: ${theme.componentBackground};
        `,
    },
    import.meta.env.VITE_APP_TITLE,
  );
};

export const BookmarkletList = (theme: Theme): HTMLDivElement => {
  const isDarkMode = van.state(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const putShareButton = van.state(false);
  const themeKey = van.state<ThemeKey>(theme.name ?? "default");

  return div(
    {
      style: `
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        `,
    },
    t("page/empty/bookmarklet/guide"),
    div(
      {
        style: `
          margin: 1em 0;
          font-size: 1.5em;
          `,
      },
      () =>
        Bookmarklet(
          isDarkMode.val
            ? namedThemes[themeKey.val].dark
            : namedThemes[themeKey.val].light,
          putShareButton.val,
        ),
    ),
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
          onchange: (e: { target: { value: string } }) =>
            (themeKey.val = namedThemeKeys.includes(e.target.value as ThemeKey)
              ? (e.target.value as ThemeKey)
              : "default"),
        },
        namedThemeKeys.map((value) =>
          option({ selected: value === themeKey.val, value }, value),
        ),
      ),
    ),
    div(
      {
        style: `
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1em;
          `,
      },
      label(
        input({
          type: "checkbox",
          onchange: (e: { target: { checked: boolean } }) => {
            putShareButton.val = e.target.checked;
            if (e.target.checked) {
              isDarkMode.val = window.matchMedia(
                "(prefers-color-scheme: dark)",
              ).matches;
            }
          },
          checked: putShareButton,
        }),
        t("page/empty/builder/enable_put_share_button"),
      ),
      label(
        input({
          type: "checkbox",
          onchange: (e: { target: { checked: boolean } }) =>
            (isDarkMode.val = e.target.checked),
          checked: isDarkMode,
          disabled: () => !putShareButton.val,
        }),
        t("page/empty/builder/enable_darkmode"),
      ),
    ),
  );
};
