import { Theme } from "./color";
import { defaultDarkTheme, defaultLightTheme } from "./config/theme";

export type Params = { content: string | null; theme: Theme };

const buildParams = (params: {
  text: string | null;
  url: string | null;
  hashtags: string | null;
}): Params => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? defaultDarkTheme
    : defaultLightTheme;
  const content =
    (params.url ?? "") == ""
      ? null
      : [
          params.url,
          params.text,
          params.hashtags
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
  const text = urlParams.get("text");
  const url = urlParams.get("url");
  const hashtags = urlParams.get("hashtags");
  return buildParams({ text, url, hashtags });
};
