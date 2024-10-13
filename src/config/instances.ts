import type { Instance } from "../instance/index.js";

export const defaultInstances: Instance[] =
  import.meta.env.VITE_DEFAULT_INSTANCES.split(",")
    .map((instance) => {
      const [type, ...url] = instance.split(":");
      return { type, url: url.join("") };
    })
    .filter((instance) => instance.type !== "" && instance.url !== "");
