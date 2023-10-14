import { Instance } from "./instance";

export const NETWORK_ERROR_MESSAGE = "このインスタンスにはアクセスできません。";
export const UNKNOWN_INSTANCE_MESSAGE =
  "このインスタンスには対応していません。";
export const LOADING_INSTANCE_MESSAGE = "インスタンス情報を取得しています...";
export const NO_INSTANCE_ERROR_MESSAGE = "利用できるインスタンスはありません。";
export const LINK_BUILDER_DESCRIPTION =
  "あなたのサイトに設置するシェア用のURLを作成しましょう。";
export const OPEN_CUSTOM_LINK_MESSAGE = "このパラメータで開く";
export const INSTANCES_ADD_DESCRIPTION =
  "シェアしたいインスタンスのドメインを入力してください。";
export const SHARE_CONTENT_DESCRIPTION =
  "お好きなSNSで以下の内容をシェアできます。";
export const QUICK_SHARE_DESCRIPTION = (instance: Instance) =>
  `${instance.url}で以下の内容をシェアします。`;
export const CONFIG_DIALOG_TITLE = "設定";
export const QUICK_DIALOG_TITLE = import.meta.env.VITE_APP_TITLE;
export const INSTANCES_CLEAR_DESCRIPTION = "インスタンス一覧をリセットする";
export const INSTANCES_NAME_UPDATE_DESCRIPTION =
  "インスタンスの名前を取得・再取得する";
export const CONFIG_APPEND_COSHARET_HASHTAG_DESCRIPTION = `ハッシュタグに #${
  import.meta.env.VITE_APP_HASHTAG
} を追加してシェアする`;
export const CONFIG_OPEN_QUICK_SHARE_DESCRIPTION =
  "常にワンクリックでシェアする";
export const CONFIG_SHOW_INSTANCE_NAME_DESCRIPTION =
  "インスタンスの名前があれば表示する";
export const CONFIG_BOOKMARKLET_DESCRIPTION = "ブックマークレットを追加する";
export const BOOKMARKLET_TITLE = import.meta.env.VITE_APP_TITLE;
export const EMPTY_PAGE_BOOKMARKLET_DESCRIPTION =
  "または、ブックマークレットが必要ですか？";
export const INSTANCES_ADD_BUTTON_LABEL = "新しいインスタンスを追加する";
export const INSTANCES_SHARE_BUTTON_LABEL = "シェア";
