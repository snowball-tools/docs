import { HTML_OPEN_TAG_RE } from './html-block-plugin.mjs'

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
      const attrsRaw = match?.[2]

      if (!match || !tag || !customTags[tag]) {
        return defaultRender(tokens, idx, options, env, self)
      }

      if (new RegExp(`</${tag}>\n?`).test(token.content)) {
        // Closing tag present, thus full content is here
        const attrs = parseAttrs(attrsRaw)
        const content = token.content.slice(match[0].length, -`</${tag}>\n`.length)
        return customTags[tag](content, attrs)
      } else {
        console.warn('No closing tag found for', tag)
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  }
}

function parseAttrs(str) {
  const attrs = {}
  console.log('bruh', str.trim().split(/\s+/))
  for (let row of str.trim().split(/\s+/)) {
    console.log('ROW', row)
    if (/\=/.test(row)) {
      let [key, value] = row.split('=')
      if (
        (value.startsWith(`"`) && value.endsWith(`"`)) ||
        (value.startsWith(`'`) && value.endsWith(`'`))
      ) {
        value = value.slice(1, -1)
      }
      attrs[key] = /^\d+$/.test(value) ? parseInt(value) : value
    } else {
      attrs[row] = true
    }
  }
  return attrs
}
