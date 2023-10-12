import { Theme } from "../color";

export const defaultThemes: {
  [k: string]: { light: Theme; dark: Theme };
} = {
  default: {
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
  },
} as const;
