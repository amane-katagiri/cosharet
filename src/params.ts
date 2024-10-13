import { type Theme, parseColorTheme } from "./theme";
import { type ThemeKey, namedThemeKeys, namedThemes } from "./config/theme";

export interface Params {
  content: {
    text: string | null;
    url: string | null;
    hashtags: string | null;
  };
  theme: Theme;
}

export const buildShareText = (content: Params["content"]): string | null => {
  const body = [
    ...[
      content.text,
      content.url,
      content.hashtags
        ?.split(",")
        .filter((h) => h !== "" && h.match(/[ #]/) == null)
        .map((h) => `#${h}`)
        .join(" "),
    ].filter((item) => item != null && item !== ""),
    "",
  ].join(" ");
  return body !== "" ? body : null;
};

const buildParams = (params: {
  content: {
    text: string | null;
    url: string | null;
    hashtags: string | null;
  };
  theme: {
    key: string | null;
    light: Partial<Theme>;
    dark: Partial<Theme>;
  };
}): Params => {
  const namedTheme =
    namedThemes[
      namedThemeKeys.includes(params.theme.key as ThemeKey)
        ? ((params.theme.key ?? "default") as ThemeKey)
        : "default"
    ];
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? parseColorTheme(params.theme.dark, namedTheme.dark)
    : parseColorTheme(params.theme.light, namedTheme.light);
  return {
    content: {
      text: params.content.text,
      url: params.content.url,
      hashtags: params.content.hashtags,
    },
    theme,
  };
};

export const parseUrlParams = (urlParams: URLSearchParams): Params => {
  const text = urlParams.get("text");
  const url = urlParams.get("url");
  const hashtags = urlParams.get("hashtags");
  const theme = urlParams.get("theme");
  return buildParams({
    content: {
      text: text !== "" ? text : null,
      url: url !== "" ? url : null,
      hashtags: hashtags !== "" ? hashtags : null,
    },
    theme: {
      key: theme !== "" ? theme : null,
      light: {
        text: urlParams.get("gflc") ?? undefined,
        linkText: urlParams.get("lflc") ?? undefined,
        accentText: urlParams.get("aflc") ?? undefined,
        background: urlParams.get("gblc") ?? undefined,
        componentBackground: urlParams.get("cblc") ?? undefined,
        selectedItemBackground: urlParams.get("sblc") ?? undefined,
        accentColor: urlParams.get("ablc") ?? undefined,
      },
      dark: {
        text: urlParams.get("gfdc") ?? undefined,
        linkText: urlParams.get("lfdc") ?? undefined,
        accentText: urlParams.get("afdc") ?? undefined,
        background: urlParams.get("gbdc") ?? undefined,
        componentBackground: urlParams.get("cbdc") ?? undefined,
        selectedItemBackground: urlParams.get("sbdc") ?? undefined,
        accentColor: urlParams.get("abdc") ?? undefined,
      },
    },
  });
};
