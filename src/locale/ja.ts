import { Catalog, msg } from "@hi18n/core";
import type { Vocabulary } from ".";

export default new Catalog<Vocabulary>("ja", {
  "alert/network_error": msg("このインスタンスにはアクセスできません。"),
  "alert/unknown_instance": msg("このインスタンスには対応していません。"),
  "dialog/config/title": msg("設定"),
  "dialog/config/enable_quick_share": msg("常にワンクリックでシェアする"),
  "dialog/config/show_instance_name": msg("インスタンスの名前があれば表示する"),
  "dialog/config/append_app_hashtag": msg(
    "ハッシュタグに '#'{appHashTag} を追加してシェアする",
  ),
  "dialog/config/update_instances_name":
    msg("インスタンスの名前を取得・再取得する"),
  "dialog/config/clear_instances": msg("インスタンス一覧をリセットする"),
  "dialog/config/add_bookmarklet": msg("ブックマークレットを追加する"),
  "dialog/fetch/title": msg("新しいインスタンスを追加する"),
  "dialog/fetch/guide": msg(
    "シェアしたいインスタンスのドメインを入力してください。",
  ),
  "dialog/fetch/loading_instance_info": msg(
    "インスタンス情報を取得しています...",
  ),
  "dialog/quick_share/guide": msg("{domain}で以下の内容をシェアします。"),
  "page/empty/bookmarklet/guide": msg(
    "または、ブックマークレットが必要ですか？",
  ),
  "page/empty/builder/guide": msg(
    "あなたのサイトに設置するシェア用のURLを作成しましょう。",
  ),
  "page/empty/builder/open_custom_link": msg("このパラメータで開く"),
  "page/empty/builder/enable_darkmode": msg("ダークモード"),
  "page/empty/builder/enable_open_direct": msg("常に直接開く"),
  "page/empty/instances/guide": msg(
    "このブラウザでは、以下のインスタンスを利用できます。",
  ),
  "page/share/no_instance": msg("利用できるインスタンスはありません。"),
  "page/share/add_new_instance": msg("新しいインスタンスを追加する"),
  "page/share/guide": msg("お好きなSNSで以下の内容をシェアできます。"),
  "general/share": msg("シェア"),
  "general/theme": msg("テーマ"),
});
