import "./css/main.css";
import van from "./van/van-1.2.1.js";

const { div } = van.tags;

const addApp = (id: string) => {
  const target = document.querySelector(`#${id}`);
  if (target != null) {
    van.add(target, div("cosharet"));
  }
};

addApp("app");
