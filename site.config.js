import * as LearnEVM from "./lib/learnevm";
export * as Docs from "./lib/docs";

export default {
  name: "Snowballtools Docs – A free, advanced course for Solidity Developers",
  origin: "https://learnevm.com",
  locales: ["en"],

  static: true,
  locals: {
    LearnEVM,
    Docs,
  },
  templateTypes: {
    markdown(content) {
      return Docs.renderChapterContent(content);
    },
  },
};
