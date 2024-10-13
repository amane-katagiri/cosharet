import van from "vanjs-core";
import { namedThemeKeys } from "../config/theme";
import type { Theme } from "../theme";
import { getTranslator } from "../locale";

const { t } = getTranslator();

const { div, button, form, input, label, select, option } = van.tags;

export const LinkBuilder = (theme: Theme): HTMLDivElement =>
  div(
    {
      style: `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        `,
    },
    t("page/empty/builder/guide"),
    form(
      {
        style: `
          display: flex;
          flex-direction: column;
          gap: 1em;
          width: 100%;
          `,
        target: "_blank",
      },
      [
        {
          name: "url",
          label: t("general/url"),
          example: import.meta.env.VITE_APP_SOURCE_LINK,
          required: true,
        },
        {
          name: "text",
          label: t("page/empty/builder/text/label"),
          example: import.meta.env.VITE_APP_DESCRIPTION,
          required: true,
        },
        {
          name: "hashtags",
          label: t("general/hashtags"),
          example: `${import.meta.env.VITE_APP_HASHTAG},fediverse`,
          required: false,
        },
        {
          name: "theme",
          label: t("general/theme"),
          example: namedThemeKeys,
          required: true,
        },
      ].map((param) =>
        label(
          {
            style: `
               display: flex;
               gap: 0.5em;
               justify-content: space-between;
               align-items: center;
               flex-wrap: wrap;
               `,
          },
          div(
            {
              style: `
                 width: 96px;
                 text-align: initial;
                 `,
            },
            param.label,
          ),
          typeof param.example === "string"
            ? input({
                name: param.name,
                placeholder: param.example,
                style: `
                  flex-grow: 1;
                  color: ${theme.text};
                  background: ${theme.componentBackground};
                  `,
                type: "text",
                required: param.required,
              })
            : select(
                {
                  name: param.name,
                  style: `
                    flex-grow: 1;
                    color: ${theme.text};
                    background: ${theme.componentBackground};
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
               color: ${theme.accentText};
               background: ${theme.accentColor};
               `,
          },
          t("page/empty/builder/open_custom_link"),
        ),
      ),
    ),
  );
