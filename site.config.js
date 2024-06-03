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
    'nav-item'(templateBodyHtml, attrs) {
      n `<a href="${attrs.href  || '/' + attrs.text.toLowerCase()}">
        <div class="flex py-1.5 px-3 w-full gap-3 items-center sidebar-main-nav-item">      
          <img src="${attrs.iconHref || '/library/' + attrs.text + '.svg'}" alt="${attrs.iconAlt || attrs.text}" />
          <p>${attrs.text}</p>
        </div>
      </a>`
    },
  },
};
