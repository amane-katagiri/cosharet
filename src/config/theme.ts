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
  "rainbowflag",
] as const;
export type ThemeKey = (typeof namedThemeKeys)[number];
export const namedThemes: {
  [k in ThemeKey]: {
    light: Theme<k>;
    dark: Theme<k>;
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
  rainbowflag: {
    light: {
      ...defaultTheme.light,
      name: "rainbowflag",
      componentBackground:
        "linear-gradient(90deg, #ff60b0 0%, #ff6060 10%, #ffff60 30%, #60ff60 50%, #60ffff 70%, #ff60ff 90%, #ff60b0 100%)",
      selectedItemBackground:
        "linear-gradient(#ff0080 0%, #ff0000 10%, #ffff00 30%, #00ff00 50%, #00ffff 70%, #ff00ff 90%, #ff0080 100%)",
      accentColor: "navy",
    },
    dark: {
      ...defaultTheme.dark,
      name: "rainbowflag",
      componentBackground:
        "linear-gradient(90deg, #aa4075 0%, #aa4040 10%, #aaaa40 30%, #40aa40 50%, #40aaaa 70%, #aa40aa 90%, #aa4075 100%)",
      selectedItemBackground:
        "linear-gradient(#aa0055 0%, #aa0000 10%, #aaaa00 30%, #00aa00 50%, #00aaaa 70%, #aa00aa 90%, #aa0055 100%)",
      accentColor: "powderblue",
    },
  },
} as const;
