export type Params = { content: string | null };

const buildParams = (params: {
  text: string | null;
  url: string | null;
  hashtags: string | null;
}): Params => {
  if ((params.url ?? "") == "") {
    return { content: null };
  }
  const content = [
    params.url,
    params.text,
    params.hashtags
      ?.split(",")
      .filter((h) => !h.match(/[ #]/))
      .map((h) => `#${h}`)
      ?.join(" "),
    "",
  ]
    .filter((item) => item != null)
    .join(" ");
  return {
    content: content.length !== 0 ? content : null,
  };
};

export const parseUrlParams = (urlParams: URLSearchParams): Params => {
  const text = urlParams.get("text");
  const url = urlParams.get("url");
  const hashtags = urlParams.get("hashtags");
  return buildParams({ text, url, hashtags });
};
