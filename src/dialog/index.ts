import van, { ChildDom } from "vanjs-core";
import { Modal } from "vanjs-ui";
import { Theme } from "../color";
import emoji_274c from "../emoji/274c.svg";

const { div, button, img } = van.tags;

const DialogComponent = (
  title: string,
  children: (close: () => void) => ChildDom[],
  theme: Theme,
) => {
  const closed = van.state(false);

  return Modal(
    {
      closed,
      modalStyleOverrides: { background: theme.background },
      blurBackground: true,
    },
    div(
      {
        style: `
          color: ${theme.text};
          `,
      },
      div(
        {
          style: `
            display: flex;
            justify-content: space-between;
            margin-bottom: 1em;
            `,
        },
        title,
        button(
          {
            class: "imageButton",
            onclick: () => (closed.val = true),
          },
          img({ style: "height: 1em;", src: emoji_274c }),
        ),
      ),
      div(
        {
          class: "modalDialog",
          style: `
            display: flex;
            flex-direction: column;
            gap: 1em;
            max-width: calc(100dvw - 2rem - 2rem);
            font-size: small;
            `,
        },
        children(() => (closed.val = true)),
      ),
    ),
  );
};

export const Dialog = (
  title: string,
  children: (close: () => void) => ChildDom[],
  theme: Theme,
) => {
  van.add(document.body, DialogComponent(title, children, theme));
};
