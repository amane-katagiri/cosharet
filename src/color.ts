export type Theme = {
  text: string;
  background: string;
  componentBackground: string;
  selectedItemBackground: string;
  accentColor: string;
};

const isColor = (colorLike: unknown) =>
  typeof colorLike === "string" &&
  colorLike.match(
    /#[0-9a-f]{3}|#[0-9a-f]{4}|#[0-9a-f]{6}|#[0-9a-f]{8}|[a-zA-Z]+/,
  );

export const parseColorTheme = (
  themeLike: Record<string, string>,
  fallback: Theme,
): Theme => {
  return {
    ...fallback,
    ...(isColor(themeLike["text"]) ? { text: themeLike["text"] } : {}),
    ...(isColor(themeLike["background"])
      ? { text: themeLike["background"] }
      : {}),
    ...(isColor(themeLike["componentBackground"])
      ? { text: themeLike["componentBackground"] }
      : {}),
    ...(isColor(themeLike["selectedItemBackground"])
      ? { text: themeLike["selectedItemBackground"] }
      : {}),
    ...(isColor(themeLike["accentColor"])
      ? { text: themeLike["accentColor"] }
      : {}),
  };
};
