import { Classifier } from ".";

const classifier: Classifier<"mastodon"> = async (domain: string) => {
  const response = await (
    await fetch(`https://${domain}/api/v1/instance`)
  ).json();
  if (response.version) {
    return { status: true, instance: { type: "mastodon", url: domain } };
  }
  throw new Error();
};

export default classifier;
