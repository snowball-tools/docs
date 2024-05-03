import * as LearnEVM from "./lib/learnevm";
import * as Docs from "./lib/docs";

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
      return `<div class="prose">${Docs.renderChapterContent(content)}</div>`;
    },
  },
};
