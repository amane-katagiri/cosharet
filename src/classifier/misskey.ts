import { Classifier } from ".";
import { NETWORK_ERROR_MESSAGE, UNKNOWN_INSTANCE_MESSAGE } from "../messages";

const classifier: Classifier<"misskey"> = async (domain: string) => {
  try {
    const response = await (await fetch(`https://${domain}/api/meta`)).json();
    if (response.version) {
      return { status: true, instance: { type: "misskey", url: domain } };
    }
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
  throw new Error(UNKNOWN_INSTANCE_MESSAGE);
};

export default classifier;
