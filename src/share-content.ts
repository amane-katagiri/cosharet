import van from "vanjs-core";
import emoji_1f4cb from "./emoji/1f4cb.svg";
import { QUICK_SHARE_DESCRIPTION, SHARE_CONTENT_DESCRIPTION } from "./messages";
import { Theme } from "./color";
import { Instance } from "./instance";
const { div, img, span } = van.tags;

export const ShareContent = (
  content: string,
  instance: Instance | null,
  theme: Theme,
) =>
  div(
    {
      style: `
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        `,
    },
    div(
      instance != null
        ? QUICK_SHARE_DESCRIPTION(instance)
        : SHARE_CONTENT_DESCRIPTION,
    ),
    div(
      {
        style: `
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: ${theme.text};
          background: ${theme.componentBackground};
          border-radius: 0.5em;
          padding: 1em;
          `,
      },
      img({
        src: emoji_1f4cb,
        width: "16",
        style: `
          height: 1em;
          margin-right: 0.5em
          `,
      }),
      span(
        {
          style: `
            -moz-user-select: all;
            -webkit-user-select: text;
            -webkit-user-select: all;
            -ms-user-select: all;
            user-select: all;
            `,
        },
        content,
      ),
    ),
  );
