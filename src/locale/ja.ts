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
  "dialog/fetch/non_fediverse_list/guide": msg(
    "または、以下の非Fediverseサービスを追加できます。",
  ),
  "dialog/quick_share/guide": msg("{domain}で以下の内容をシェアします。"),
  "page/empty/bookmarklet/guide": msg(
    "リンクをシェアできるブックマークレットを追加しましょう。",
  ),
  "page/empty/bookmarklet/alert/guide": msg(
    "このリンクをブックマークバーにドラッグ・アンド・ドロップしてください。",
  ),
  "page/empty/builder/guide": msg(
    "あなたのサイトに設置するシェア用のURLを作成しましょう。",
  ),
  "page/empty/builder/open_custom_link": msg("このパラメータで開く"),
  "page/empty/builder/enable_darkmode": msg("ボタンをダークモードで表示する"),
  "page/empty/builder/enable_put_share_button":
    msg("ページにシェアボタンを追加する"),
  "page/empty/builder/text/label": msg("紹介テキスト"),
  "page/empty/instances/guide": msg(
    "このブラウザでは、以下のインスタンスを利用できます。",
  ),
  "page/empty/instances/customize": msg("その他の設定"),
  "page/empty/tabs/bookmarklet": msg("つかう"),
  "page/empty/tabs/builder": msg("つくる"),
  "page/share/no_instance": msg("利用できるインスタンスはありません。"),
  "page/share/add_new_instance": msg("新しいインスタンスを追加する"),
  "page/share/guide": msg("お好きなSNSで以下の内容をシェアできます。"),
  "general/share": msg("シェア"),
  "general/url": msg("URL"),
  "general/hashtags": msg("ハッシュタグ"),
  "general/theme": msg("表示テーマ"),
});
