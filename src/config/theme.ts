import type { Theme } from "../theme";

export const defaultTheme: { light: Theme<"default">; dark: Theme<"default"> } =
  {
    light: {
      name: "default",
      text: import.meta.env.VITE_THEME_LIGHT_TEXT_COLOR,
      linkText: import.meta.env.VITE_THEME_LIGHT_LINK_TEXT_COLOR,
      accentText: import.meta.env.VITE_THEME_LIGHT_ACCENT_TEXT_COLOR,
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
      linkText: import.meta.env.VITE_THEME_DARK_LINK_TEXT_COLOR,
      accentText: import.meta.env.VITE_THEME_DARK_ACCENT_TEXT_COLOR,
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
      linkText: "deepskyblue",
      selectedItemBackground: "lightgray",
      accentColor: "deepskyblue",
    },
    dark: {
      ...defaultTheme.dark,
      name: "bluebird",
      linkText: "deepskyblue",
      selectedItemBackground: "slategray",
      accentColor: "deepskyblue",
    },
  },
  greenballoon: {
    light: {
      ...defaultTheme.light,
      name: "greenballoon",
      linkText: "limegreen",
      selectedItemBackground: "lightgray",
      accentColor: "limegreen",
    },
    dark: {
      ...defaultTheme.dark,
      name: "greenballoon",
      linkText: "limegreen",
      selectedItemBackground: "darkslategray",
      accentColor: "limegreen",
    },
  },
  redtriangle: {
    light: {
      ...defaultTheme.light,
      name: "redtriangle",
      linkText: "crimson",
      selectedItemBackground: "lightgray",
      accentColor: "crimson",
    },
    dark: {
      ...defaultTheme.dark,
      name: "redtriangle",
      linkText: "crimson",
      selectedItemBackground: "maroon",
      accentColor: "crimson",
    },
  },
  rainbowflag: {
    light: {
      ...defaultTheme.light,
      name: "rainbowflag",
      linkText: "darkorchid",
      accentText: "#222",
      componentBackground:
        "linear-gradient(90deg, #ff40a0 0%, #ff4040 10%, #ffff40 30%, #40ff40 50%, #40ffff 70%, #ff40ff 90%, #ff40a0 100%) #eee",
      selectedItemBackground: "powderblue",
      accentColor:
        "linear-gradient(#ff0080 0%, #ff0000 10%, #ffff00 30%, #00ff00 50%, #00ffff 70%, #ff00ff 90%, #ff0080 100%) darkorchid",
    },
    dark: {
      ...defaultTheme.dark,
      name: "rainbowflag",
      linkText: "lightskyblue",
      accentText: "#222",
      componentBackground:
        "linear-gradient(90deg, #aa4075 0%, #aa4040 10%, #aaaa40 30%, #40aa40 50%, #40aaaa 70%, #aa40aa 90%, #aa4075 100%) #555",
      selectedItemBackground: "darkslateblue",
      accentColor:
        "linear-gradient(#ff0080 0%, #ff0000 10%, #ffff00 30%, #00ff00 50%, #00ffff 70%, #ff00ff 90%, #ff0080 100%) orchid",
    },
  },
} as const;
