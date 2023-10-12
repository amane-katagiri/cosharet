import { z } from "zod";
import { Instance, InstanceSchema } from "./instance";
import { defaultInstances } from "./config/instances";

const INSTAKCES_KEY = "instances";
const APPEND_HASHTAG = "appendHashtag";

type StateKey = typeof INSTAKCES_KEY | typeof APPEND_HASHTAG;
type State = {
  [INSTAKCES_KEY]?: Instance[] | null;
  [APPEND_HASHTAG]?: boolean | null;
};

export const updateState = (state: State) => {
  if (state.instances != null) {
    localStorage.setItem(INSTAKCES_KEY, JSON.stringify(state.instances));
  }
  if (state.appendHashtag != null) {
    localStorage.setItem(APPEND_HASHTAG, JSON.stringify(state.appendHashtag));
  }
};

export const restoreState = (): State | null => {
  const instancesJson = localStorage.getItem(INSTAKCES_KEY);
  const instances =
    instancesJson != null ? JSON.parse(instancesJson) : defaultInstances;
  const parsed = z.array(InstanceSchema).safeParse(instances);
  return {
    instances: parsed.success ? parsed.data : null,
    appendHashtag: Boolean(
      JSON.parse(localStorage.getItem(APPEND_HASHTAG) ?? "false"),
    ),
  };
};

export const clearState = (keys: StateKey[]) => {
  if (keys.includes("instances")) {
    localStorage.setItem(INSTAKCES_KEY, JSON.stringify(defaultInstances));
  }
  if (keys.includes("appendHashtag")) {
    localStorage.setItem(APPEND_HASHTAG, JSON.stringify(false));
  }
};
