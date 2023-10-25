import { ThemeKey } from "./config/theme";

export type Theme<T extends ThemeKey = ThemeKey> = {
  name?: T;
  text: string;
  background: string;
  componentBackground: string;
  selectedItemBackground: string;
  accentColor: string;
};

const isColor = (colorLike: unknown) =>
  typeof colorLike === "string" &&
  colorLike.match(
    /^(#[0-9a-f]{3}|#[0-9a-f]{4}|#[0-9a-f]{6}|#[0-9a-f]{8}|[a-zA-Z]+|(rgba?|hsla?|(repeat-)?(linear|conic|radial)-gradient)\(.+\))$/,
  );

export const parseColorTheme = (
  themeLike: Record<string, string>,
  fallback: Theme,
): Theme => {
  return {
    ...fallback,
    ...(isColor(themeLike["text"]) ? { text: themeLike["text"] } : {}),
    ...(isColor(themeLike["background"])
      ? { background: themeLike["background"] }
      : {}),
    ...(isColor(themeLike["componentBackground"])
      ? { componentBackground: themeLike["componentBackground"] }
      : {}),
    ...(isColor(themeLike["selectedItemBackground"])
      ? { selectedItemBackground: themeLike["selectedItemBackground"] }
      : {}),
    ...(isColor(themeLike["accentColor"])
      ? { accentColor: themeLike["accentColor"] }
      : {}),
  };
};
