import { z } from "zod";
import { Instance, InstanceSchema } from "./instance";
import { defaultInstances } from "./config/instances";

const INSTAKCES_KEY = "instances";

type StateKey = typeof INSTAKCES_KEY;
type State = { [INSTAKCES_KEY]?: Instance[] | null };

export const updateState = (state: State) => {
  if (state.instances != null) {
    localStorage.setItem(INSTAKCES_KEY, JSON.stringify(state.instances));
  }
};

export const restoreState = (): State | null => {
  const instancesJson = localStorage.getItem(INSTAKCES_KEY);
  const instances =
    instancesJson != null ? JSON.parse(instancesJson) : defaultInstances;
  const parsed = z.array(InstanceSchema).safeParse(instances);
  return {
    instances: parsed.success ? parsed.data : null,
  };
};

export const clearState = (keys: StateKey[]) => {
  if (keys.includes("instances")) {
    localStorage.setItem(INSTAKCES_KEY, JSON.stringify(defaultInstances));
  }
};
