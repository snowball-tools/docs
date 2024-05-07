import markdownit from 'markdown-it'

export * from "./docs-chapters.mjs";

const renderer = markdownit()
renderer.use(md => {
  const defaultRender = md.renderer.rules.html_block || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.html_block = function(tokens, idx, options, env, self) {
      const token = tokens[idx];
      if (token.content.startsWith('<chapter>') && token.content.endsWith('</chapter>')) {
          const title = token.content.slice(9, -10).trim();
          return `<h1 class="chapter">${title}</h1>`; // Custom transformation
      }
      return defaultRender(tokens, idx, options, env, self);
  };
})

export function renderDocsContent(source) {
  return renderer.render(source)
}
