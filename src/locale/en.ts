import { Catalog, msg } from "@hi18n/core";
import type { Vocabulary } from ".";

export default new Catalog<Vocabulary>("en", {
  "alert/network_error": msg("This instance is not accessible."),
  "alert/unknown_instance": msg("This instance is not supported."),
  "dialog/config/title": msg("Config"),
  "dialog/config/enable_quick_share": msg("Always share with one click"),
  "dialog/config/show_instance_name": msg(
    "Display the name of the instance if available",
  ),
  "dialog/config/append_app_hashtag": msg(
    "Share content with hashtag '#'{appHashTag}",
  ),
  "dialog/config/update_instances_name": msg(
    "(Re-)retrieve the name of the instance",
  ),
  "dialog/config/clear_instances": msg("Reset the instance list"),
  "dialog/config/add_bookmarklet": msg("Add a bookmarklet"),
  "dialog/fetch/title": msg("Add a new instance"),
  "dialog/fetch/guide": msg(
    "Enter the domain of the instance you want to share.",
  ),
  "dialog/fetch/loading_instance_info": msg("Loading Instance information..."),
  "dialog/quick_share/guide": msg("Share this content with {domain}."),
  "page/empty/bookmarklet/guide": msg("Or need a bookmarklet?"),
  "page/empty/bookmarklet/alert/guide": msg(
    "Drag and drop this link to your bookmark bar.",
  ),
  "page/empty/builder/guide": msg("Create a share URL for your site."),
  "page/empty/builder/open_custom_link": msg("Open with this parameter"),
  "page/empty/builder/enable_darkmode": msg("Enable darkmode"),
  "page/empty/builder/enable_open_direct": msg("Open directly"),
  "page/empty/builder/text/label": msg("description"),
  "page/empty/instances/guide": msg(
    "These are available instances in this browser.",
  ),
  "page/share/no_instance": msg("There is no available instance."),
  "page/share/add_new_instance": msg("Add a new instance"),
  "page/share/guide": msg("Share this content on your favorite SNS."),
  "general/share": msg("share"),
  "general/url": msg("URL"),
  "general/hashtags": msg("hashtags"),
  "general/theme": msg("theme"),
});
