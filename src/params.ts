import { Theme, parseColorTheme } from "./theme";
import { ThemeKey, defaultTheme, namedThemes } from "./config/theme";

export type Params = {
  content: {
    text: string | null;
    url: string | null;
    hashtags: string | null;
  };
  theme: Theme;
};

export const buildShareText = (content: Params["content"]): string | null => {
  const body = [
    ...[
      content.text,
      content.url,
      content.hashtags
        ?.split(",")
        .filter((h) => h !== "" && !h.match(/[ #]/))
        .map((h) => `#${h}`)
        ?.join(" "),
    ].filter((item) => item != null && item !== ""),
    "",
  ].join(" ");
  return (body?.length ?? 0) !== 0 ? body : null;
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
    namedThemes[(params.theme.key as ThemeKey) ?? "default"] ?? defaultTheme;
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
        accentText: urlParams.get("falc") ?? undefined,
        background: urlParams.get("gblc") ?? undefined,
        componentBackground: urlParams.get("cblc") ?? undefined,
        selectedItemBackground: urlParams.get("sblc") ?? undefined,
        accentColor: urlParams.get("balc") ?? undefined,
      },
      dark: {
        text: urlParams.get("gfdc") ?? undefined,
        linkText: urlParams.get("lfdc") ?? undefined,
        accentText: urlParams.get("fadc") ?? undefined,
        background: urlParams.get("gbdc") ?? undefined,
        componentBackground: urlParams.get("cbdc") ?? undefined,
        selectedItemBackground: urlParams.get("sbdc") ?? undefined,
        accentColor: urlParams.get("badc") ?? undefined,
      },
    },
  });
};
