import { HTML_OPEN_TAG_RE } from './html-block-plugin.mjs'
import { Parser } from '@lancer/ihtml-parser'

export function CustomTagsPlugin(customTags) {
  return (md) => {
    const defaultRender =
      md.renderer.rules.html_block ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }

    md.renderer.rules.html_block = function (tokens, idx, options, env, self) {
      const token = tokens[idx]
      const match = token.content.match(HTML_OPEN_TAG_RE)
      const tag = match?.[1]

      if (!match || !tag || !customTags[tag]) {
        return defaultRender(tokens, idx, options, env, self)
      }

      if (new RegExp(`</${tag}>\n?`).test(token.content)) {
        // Closing tag present, thus full content is here
        const attrs = parseAttrs(tag, token.content)
        const content = token.content.slice(match[0].length, -`</${tag}>`.length)
        return customTags[tag](content, attrs)
      } else {
        console.warn('No closing tag found for', tag)
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  }
}

function parseAttrs(targetTag, str) {
  let attrs = null
  const parser = new Parser({
    onopentag(name, attributes) {
      if (name !== targetTag || attrs) return
      attrs = attributes
    }
  })
  parser.write(str)
  parser.end()
  return attrs || {}
}
