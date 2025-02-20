export default async function summarize(userText) {
  const options = {
    sharedContext: "This is a scientific article",
    type: "tl;dr",
    format: "plain-text",
    length: "medium",
  };

  const available = (await self.ai.summarizer.capabilities()).available;
  let summarizer;
  if (available === "no") {
    // The Summarizer API isn't usable.
    return;
  }
  if (available === "readily") {
    // The Summarizer API can be used immediately .
    summarizer = await self.ai.summarizer.create(options);
  } else {
    // The Summarizer API can be used after the model is downloaded.
    summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener("downloadprogress", (e) => {
      console.log(e.loaded, e.total);
    });
    await summarizer.ready;
  }

  return await summarizer.summarize(userText);
}
