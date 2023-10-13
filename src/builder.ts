import van from "vanjs-core";
import { LINK_BUILDER_DESCRIPTION, OPEN_CUSTOM_LINK_MESSAGE } from "./messages";
import { namedThemeKeys } from "./config/theme";
import { Theme } from "./color";

const { div, button, form, input, label, select, option } = van.tags;

export const LinkBuilder = (theme: Theme) =>
  div(
    {
      style: `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        `,
    },
    LINK_BUILDER_DESCRIPTION,
    form(
      {
        style: `
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          width: 75%;
          `,
        target: "_blank",
      },
      [
        {
          name: "url",
          example: import.meta.env.VITE_APP_SOURCE_LINK,
          required: true,
        },
        {
          name: "text",
          example: import.meta.env.VITE_APP_DESCRIPTION,
          required: true,
        },
        {
          name: "hashtags",
          example: `${import.meta.env.VITE_APP_HASHTAG},fediverse`,
          required: false,
        },
        { name: "theme", example: namedThemeKeys, required: true },
      ].map((param) =>
        label(
          {
            style: `
               display: flex;
               gap: 0.5em;
               justify-content: space-between;
               flex-wrap: wrap;
               `,
          },
          div(
            {
              style: `
                 width: 25%;
                 min-width: 96px;
                 text-align: initial;
                 `,
            },
            param.name,
          ),
          typeof param.example === "string"
            ? input({
                name: param.name,
                placeholder: param.example,
                style: `
                  flex-grow: 1;
                  `,
                required: param.required,
              })
            : select(
                {
                  name: param.name,
                  style: `
                    flex-grow: 1;
                    `,
                  required: param.required,
                },
                param.example.map((value) => option({ value }, value)),
              ),
        ),
      ),
      div(
        button(
          {
            style: `
               color: ${theme.background};
               background: ${theme.accentColor};
               `,
          },
          OPEN_CUSTOM_LINK_MESSAGE,
        ),
      ),
    ),
  );
