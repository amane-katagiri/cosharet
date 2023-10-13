import { Theme, parseColorTheme } from "./color";
import { defaultTheme, namedThemes } from "./config/theme";

export type Params = { content: string | null; theme: Theme };

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
  const namedTheme = namedThemes[params.theme.key ?? "default"] ?? {};
  const baseTheme = {
    light: { ...defaultTheme.light, ...namedTheme?.light },
    dark: { ...defaultTheme.dark, ...namedTheme?.dark },
  };
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? parseColorTheme(params.theme.dark, baseTheme.dark)
    : parseColorTheme(params.theme.light, baseTheme.light);
  const content = [
    params.content.text,
    params.content.url,
    params.content.hashtags
      ?.split(",")
      .filter((h) => !h.match(/[ #]/))
      .map((h) => `#${h}`)
      ?.join(" "),
    "",
  ]
    .filter((item) => item != null)
    .join(" ");
  return {
    content: (content?.length ?? 0) !== 0 ? content : null,
    theme,
  };
};

export const parseUrlParams = (urlParams: URLSearchParams): Params => {
  return buildParams({
    content: {
      text: urlParams.get("text"),
      url: urlParams.get("url"),
      hashtags: urlParams.get("hashtags"),
    },
    theme: {
      key: urlParams.get("theme"),
      light: {
        text: urlParams.get("gflc") ?? undefined,
        background: urlParams.get("gblc") ?? undefined,
        componentBackground: urlParams.get("cblc") ?? undefined,
        selectedItemBackground: urlParams.get("sblc") ?? undefined,
        accentColor: urlParams.get("galc") ?? undefined,
      },
      dark: {
        text: urlParams.get("gfdc") ?? undefined,
        background: urlParams.get("gbdc") ?? undefined,
        componentBackground: urlParams.get("cbdc") ?? undefined,
        selectedItemBackground: urlParams.get("sbdc") ?? undefined,
        accentColor: urlParams.get("gadc") ?? undefined,
      },
    },
  });
};
