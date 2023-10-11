import { Classifier } from ".";

const classifier: Classifier<"misskey"> = async (domain: string) => {
  const response = await (await fetch(`https://${domain}/api/meta`)).json();
  if (response.version) {
    return { status: true, instance: { type: "misskey", url: domain } };
  }
  throw new Error();
};

export default classifier;
