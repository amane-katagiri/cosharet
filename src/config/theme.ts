import { Theme } from "../theme";

export const defaultTheme: { light: Theme<"default">; dark: Theme<"default"> } =
  {
    light: {
      name: "default",
      text: import.meta.env.VITE_THEME_LIGHT_TEXT_COLOR,
      background: import.meta.env.VITE_THEME_LIGHT_BACKGROUND_COLOR,
      componentBackground: import.meta.env
        .VITE_THEME_LIGHT_COMPONENT_BACKGROUND_COLOR,
      selectedItemBackground: import.meta.env
        .VITE_THEME_LIGHT_SELECTED_ITEM_BACKGROUND_COLOR,
      accentColor: import.meta.env.VITE_THEME_LIGHT_ACCENT_COLOR,
    },
    dark: {
      name: "default",
      text: import.meta.env.VITE_THEME_DARK_TEXT_COLOR,
      background: import.meta.env.VITE_THEME_DARK_BACKGROUND_COLOR,
      componentBackground: import.meta.env
        .VITE_THEME_DARK_COMPONENT_BACKGROUND_COLOR,
      selectedItemBackground: import.meta.env
        .VITE_THEME_DARK_SELECTED_ITEM_BACKGROUND_COLOR,
      accentColor: import.meta.env.VITE_THEME_DARK_ACCENT_COLOR,
    },
  };

export const namedThemeKeys = [
  "default",
  "bluebird",
  "greenballoon",
  "redtriangle",
] as const;
export type ThemeKey = (typeof namedThemeKeys)[number];
export const namedThemes: {
  [k in ThemeKey[number]]: {
    light: Theme;
    dark: Theme;
  };
} = {
  default: defaultTheme,
  bluebird: {
    light: {
      ...defaultTheme.light,
      name: "bluebird",
      selectedItemBackground: "lightgray",
      accentColor: "deepskyblue",
    },
    dark: {
      ...defaultTheme.dark,
      name: "bluebird",
      selectedItemBackground: "slategray",
      accentColor: "deepskyblue",
    },
  },
  greenballoon: {
    light: {
      ...defaultTheme.light,
      name: "greenballoon",
      selectedItemBackground: "lightgray",
      accentColor: "limegreen",
    },
    dark: {
      ...defaultTheme.dark,
      name: "greenballoon",
      selectedItemBackground: "darkslategray",
      accentColor: "limegreen",
    },
  },
  redtriangle: {
    light: {
      ...defaultTheme.light,
      name: "redtriangle",
      selectedItemBackground: "lightgray",
      accentColor: "crimson",
    },
    dark: {
      ...defaultTheme.dark,
      name: "redtriangle",
      selectedItemBackground: "maroon",
      accentColor: "crimson",
    },
  },
} as const;
