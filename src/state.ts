import { z } from "zod";
import { Instance, InstanceSchema } from "./classifier";

const DOMAINLIST_KEY = "domainList";

type StateKey = typeof DOMAINLIST_KEY;
type State = { [DOMAINLIST_KEY]?: Instance[] | null };

export const updateState = (state: State) => {
  if (state.domainList != null) {
    localStorage.setItem(DOMAINLIST_KEY, JSON.stringify(state.domainList));
  }
};

export const restoreState = (): State | null => {
  const domainList = JSON.parse(localStorage.getItem(DOMAINLIST_KEY) ?? "[]");
  const parsed = z.array(InstanceSchema).safeParse(domainList);
  return { domainList: parsed.success ? parsed.data : null };
};

export const clearState = (keys: StateKey[]) => {
  keys.map((key) => localStorage.removeItem(key));
};
