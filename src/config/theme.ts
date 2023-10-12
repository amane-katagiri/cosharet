import { Theme } from "../color";

export const defaultThemes: {
  [k: string]: { light: Theme; dark: Theme };
} = {
  default: {
    light: {
      text: "black",
      background: "white",
      componentBackground: "#eee",
      selectedItemBackground: "moccasin",
      accentColor: "darkorchid",
    },
    dark: {
      text: "#eee",
      background: "#222",
      componentBackground: "#555",
      selectedItemBackground: "blueviolet",
      accentColor: "gold",
    },
  },
} as const;
