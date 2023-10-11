import classify, { Instance } from "./classifier/index.js";
import "./css/main.css";
import van from "./van/van-1.2.1.js";

const { div, input, button } = van.tags;

const addApp = (id: string) => {
  const target = document.querySelector(`#${id}`);
  const domainInput = van.state("");
  const domainList = van.state([] as Instance[]);

  if (target != null) {
    van.add(
      target,
      div([
        input({
          value: domainInput,
          oninput: (e) => (domainInput.val = e.target.value),
        }),
        button(
          {
            onclick: async () => {
              try {
                const result = await classify(domainInput.val);
                domainList.val = [
                  ...domainList.val.filter((v) => v.url !== domainInput.val),
                  result.instance,
                ];
                domainInput.val = "";
              } catch (e) {
                console.error(e);
              }
            },
          },
          "fetch"
        ),
      ]),
      () => div(domainList.val.map((d) => div(`${d.url} (${d.type})`)))
    );
  }
};

addApp("app");
