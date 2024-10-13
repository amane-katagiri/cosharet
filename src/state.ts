import { z } from "zod";
import { type Instance, InstanceSchema } from "./instance";
import { defaultInstances } from "./config/instances";

const INSTAKCES_KEY = "instances";
const APPEND_HASHTAG = "appendHashtag";
const QUICK_SHARE_MODE = "quickShareMode";
const SHOW_INSTANCE_NAME = "showInstanceName";

type StateKey =
  | typeof INSTAKCES_KEY
  | typeof APPEND_HASHTAG
  | typeof QUICK_SHARE_MODE
  | typeof SHOW_INSTANCE_NAME;
interface State {
  [INSTAKCES_KEY]?: Instance[] | null;
  [APPEND_HASHTAG]?: boolean | null;
  [QUICK_SHARE_MODE]?: boolean | null;
  [SHOW_INSTANCE_NAME]?: boolean | null;
}

export const updateState = (state: State): void => {
  if (state.instances != null) {
    localStorage.setItem(INSTAKCES_KEY, JSON.stringify(state.instances));
  }
  if (state.appendHashtag != null) {
    localStorage.setItem(APPEND_HASHTAG, JSON.stringify(state.appendHashtag));
  }
  if (state.quickShareMode != null) {
    localStorage.setItem(
      QUICK_SHARE_MODE,
      JSON.stringify(state.quickShareMode),
    );
  }
  if (state.showInstanceName != null) {
    localStorage.setItem(
      SHOW_INSTANCE_NAME,
      JSON.stringify(state.showInstanceName),
    );
  }
};

const jsonSafeParse = <T>(text: string, fallback: T): T => {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
};

export const restoreState = (): State | null => {
  const instancesJson = localStorage.getItem(INSTAKCES_KEY);
  const instances =
    instancesJson != null
      ? jsonSafeParse(instancesJson, defaultInstances)
      : defaultInstances;
  const parsed = z.array(InstanceSchema).safeParse(instances);
  return {
    instances: parsed.success ? parsed.data : defaultInstances,
    appendHashtag: Boolean(
      jsonSafeParse(localStorage.getItem(APPEND_HASHTAG) ?? "false", false),
    ),
    quickShareMode: Boolean(
      jsonSafeParse(localStorage.getItem(QUICK_SHARE_MODE) ?? "false", false),
    ),
    showInstanceName: Boolean(
      jsonSafeParse(localStorage.getItem(SHOW_INSTANCE_NAME) ?? "false", false),
    ),
  };
};

export const clearState = (keys: StateKey[]): void => {
  if (keys.includes("instances")) {
    localStorage.setItem(INSTAKCES_KEY, JSON.stringify(defaultInstances));
  }
  if (keys.includes("appendHashtag")) {
    localStorage.setItem(APPEND_HASHTAG, JSON.stringify(false));
  }
  if (keys.includes("quickShareMode")) {
    localStorage.setItem(QUICK_SHARE_MODE, JSON.stringify(false));
  }
  if (keys.includes("showInstanceName")) {
    localStorage.setItem(SHOW_INSTANCE_NAME, JSON.stringify(false));
  }
};
