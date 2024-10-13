import van from "vanjs-core";
import emoji_1f4cb from "../emoji/1f4cb.svg";
import type { Theme } from "../theme";
const { div, img, span } = van.tags;

export const ShareContent = (
  content: string,
  description: string,
  theme: Theme,
): HTMLDivElement =>
  div(
    {
      style: `
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        `,
    },
    div(description),
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
