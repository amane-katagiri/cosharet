/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_SOURCE_LINK: string;
  readonly VITE_APP_HASHTAG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
