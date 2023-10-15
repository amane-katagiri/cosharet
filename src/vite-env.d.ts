/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_LANG: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_SOURCE_LINK: string;
  readonly VITE_APP_HASHTAG: string;
  readonly VITE_THEME_LIGHT_TEXT_COLOR: string;
  readonly VITE_THEME_LIGHT_BACKGROUND_COLOR: string;
  readonly VITE_THEME_LIGHT_COMPONENT_BACKGROUND_COLOR: string;
  readonly VITE_THEME_LIGHT_SELECTED_ITEM_BACKGROUND_COLOR: string;
  readonly VITE_THEME_LIGHT_ACCENT_COLOR: string;
  readonly VITE_THEME_DARK_TEXT_COLOR: string;
  readonly VITE_THEME_DARK_BACKGROUND_COLOR: string;
  readonly VITE_THEME_DARK_COMPONENT_BACKGROUND_COLOR: string;
  readonly VITE_THEME_DARK_SELECTED_ITEM_BACKGROUND_COLOR: string;
  readonly VITE_THEME_DARK_ACCENT_COLOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
