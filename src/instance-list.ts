import { Instance, getInstanceKey } from "./instance";
import van from "vanjs-core";
import {
  INSTANCES_SHARE_BUTTON_LABEL,
  NO_INSTANCE_ERROR_MESSAGE,
} from "./messages";
import { Theme } from "./color";
import emoji_274c from "./emoji/274c.svg";

const { div, button, img, span } = van.tags;

const itemStyle = `
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: space-between;
  align-items: center;
  min-height: 2em;
  padding: 1em;
  border-radius: 0.5em;
`;

export const InstanceList = (params: {
  instances: Instance[];
  selectedInstanceKey: string | null;
  isContentEmpty: boolean;
  isShownInstanceName: boolean;
  onClickItem: (instance: Instance) => void;
  onClickShare: (instance: Instance) => void;
  onClickRemove: (instance: Instance) => void;
  theme: Theme;
}) => {
  const {
    instances,
    selectedInstanceKey,
    isContentEmpty,
    isShownInstanceName,
    onClickItem,
    onClickShare,
    onClickRemove,
    theme,
  } = params;
  return instances.length !== 0
    ? instances.map((instance) => {
        const selected = selectedInstanceKey === getInstanceKey(instance);
        return div(
          {
            style: () => `
              ${itemStyle}
              user-select: none;
              ${selected ? `background: ${theme.selectedItemBackground}` : ""};
              `,
            onclick: () => onClickItem(instance),
          },
          [
            () =>
              div(
                {
                  style: `
                    display: flex;
                    gap: 0.5em;
                    align-items: center;
                    min-width: 0;
                    `,
                },
                selected
                  ? button(
                      {
                        onclick: () => {
                          onClickRemove(instance);
                        },
                        class: "imageButton",
                      },
                      img({
                        width: "16",
                        style: "height: 1em;",
                        src: emoji_274c,
                      }),
                    )
                  : "",
                div(
                  {
                    style: `
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      `,
                  },
                  isShownInstanceName
                    ? instance.name ??
                        span({ style: "font-style: italic" }, instance.url)
                    : instance.url,
                ),
              ),
            () =>
              selected && !isContentEmpty
                ? button(
                    {
                      onclick: () => onClickShare(instance),
                      style: `
                        color: ${theme.background};
                        background: ${theme.accentColor};
                        width: 20%;
                        min-width: 64px;
                        `,
                    },
                    INSTANCES_SHARE_BUTTON_LABEL,
                  )
                : "",
          ],
        );
      })
    : div(
        {
          style: itemStyle,
        },
        NO_INSTANCE_ERROR_MESSAGE,
      );
};
