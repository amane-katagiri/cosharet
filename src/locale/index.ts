import { Book, Message, getTranslator as _getTranslator } from "@hi18n/core";
import catalogJa from "./ja";

export type Vocabulary = {
  "alert/network_error": Message;
  "alert/unknown_instance": Message;
  "dialog/config/title": Message;
  "dialog/config/enable_quick_share": Message;
  "dialog/config/show_instance_name": Message;
  "dialog/config/append_app_hashtag": Message<{ appHashTag: string }>;
  "dialog/config/update_instances_name": Message;
  "dialog/config/clear_instances": Message;
  "dialog/config/add_bookmarklet": Message;
  "dialog/fetch/title": Message;
  "dialog/fetch/guide": Message;
  "dialog/fetch/loading_instance_info": Message;
  "dialog/quick_share/guide": Message<{ domain: string }>;
  "page/empty/bookmarklet/guide": Message;
  "page/empty/builder/guide": Message;
  "page/empty/builder/open_custom_link": Message;
  "page/share/no_instance": Message;
  "page/share/add_new_instance": Message;
  "page/share/guide": Message;
  "general/share": Message;
};

export const book = new Book<Vocabulary>({
  ja: catalogJa,
});

const lang = window.navigator.language;
export const getTranslator = () =>
  _getTranslator(
    book,
    Object.keys(book.catalogs).includes(lang)
      ? lang
      : import.meta.env.VITE_APP_LANG,
  );
