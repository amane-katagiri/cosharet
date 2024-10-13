import type { ThemeKey } from "./config/theme";

export interface Theme<T extends ThemeKey = ThemeKey> {
  name?: T;
  text: string;
  linkText: string;
  accentText: string;
  background: string;
  componentBackground: string;
  selectedItemBackground: string;
  accentColor: string;
}

const isColor = (colorLike: unknown): boolean =>
  typeof colorLike === "string" &&
  colorLike.match(
    /^(#[0-9a-f]{3}|#[0-9a-f]{4}|#[0-9a-f]{6}|#[0-9a-f]{8}|[a-zA-Z]+|((rgba?|hsla?)\(.+\)))$/,
  ) != null;
const isImage = (colorLike: unknown): boolean =>
  typeof colorLike === "string" &&
  colorLike.match(
    /^(((repeat-)?(linear|conic|radial)-gradient)\(.+\)) +(#[0-9a-f]{3}|#[0-9a-f]{4}|#[0-9a-f]{6}|#[0-9a-f]{8}|[a-zA-Z]+|((rgba?|hsla?)\(.+\)))$/,
  ) != null;

export const parseColorTheme = (
  themeLike: Record<string, string>,
  fallback: Theme,
): Theme => {
  return {
    ...fallback,
    ...(isColor(themeLike.text) ? { text: themeLike.text } : {}),
    ...(isColor(themeLike.linkText) ? { linkText: themeLike.linkText } : {}),
    ...(isColor(themeLike.accentText)
      ? { accentText: themeLike.accentText }
      : {}),
    ...(isColor(themeLike.background) || isImage(themeLike.background)
      ? { background: themeLike.background }
      : {}),
    ...(isColor(themeLike.componentBackground) ||
    isImage(themeLike.componentBackground)
      ? { componentBackground: themeLike.componentBackground }
      : {}),
    ...(isColor(themeLike.selectedItemBackground) ||
    isImage(themeLike.selectedItemBackground)
      ? { selectedItemBackground: themeLike.selectedItemBackground }
      : {}),
    ...(isColor(themeLike.accentColor) || isImage(themeLike.accentColor)
      ? { accentColor: themeLike.accentColor }
      : {}),
  };
};
