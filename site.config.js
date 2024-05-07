import * as Docs from "./lib/docs";

export default {
  name: "Snowballtools Docs – A free, advanced course for Solidity Developers",
  origin: "https://docs.snowballtools.xyz",
  locales: ["en"],

  static: true,
  locals: {
    Docs,
  },
  templateTypes: {
    'docs-page'(content) {
      return `<div class="prose">${Docs.renderDocsContent(content)}</div>`
    },
  },
};
