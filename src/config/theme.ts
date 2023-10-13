import { Theme } from "../color";

export const defaultTheme: { light: Theme; dark: Theme } = {
  light: {
    text: import.meta.env.VITE_THEME_LIGHT_TEXT_COLOR,
    background: import.meta.env.VITE_THEME_LIGHT_BACKGROUND_COLOR,
    componentBackground: import.meta.env
      .VITE_THEME_LIGHT_COMPONENT_BACKGROUND_COLOR,
    selectedItemBackground: import.meta.env
      .VITE_THEME_LIGHT_SELECTED_ITEM_BACKGROUND_COLOR,
    accentColor: import.meta.env.VITE_THEME_LIGHT_ACCENT_COLOR,
  },
  dark: {
    text: import.meta.env.VITE_THEME_DARK_TEXT_COLOR,
    background: import.meta.env.VITE_THEME_DARK_BACKGROUND_COLOR,
    componentBackground: import.meta.env
      .VITE_THEME_DARK_COMPONENT_BACKGROUND_COLOR,
    selectedItemBackground: import.meta.env
      .VITE_THEME_DARK_SELECTED_ITEM_BACKGROUND_COLOR,
    accentColor: import.meta.env.VITE_THEME_DARK_ACCENT_COLOR,
  },
};

export const namedThemes: {
  [k: string]: {
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
  };
} = {
  bluebird: {
    light: {
      selectedItemBackground: "lightgray",
      accentColor: "deepskyblue",
    },
    dark: {
      selectedItemBackground: "slategray",
      accentColor: "deepskyblue",
    },
  },
  greenballoon: {
    light: {
      selectedItemBackground: "lightgray",
      accentColor: "limegreen",
    },
    dark: {
      selectedItemBackground: "darkslategray",
      accentColor: "limegreen",
    },
  },
  redtriangle: {
    light: {
      selectedItemBackground: "lightgray",
      accentColor: "crimson",
    },
    dark: {
      selectedItemBackground: "maroon",
      accentColor: "crimson",
    },
  },
} as const;
