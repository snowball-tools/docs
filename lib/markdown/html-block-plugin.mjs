// Taken & modified from markdown-it source
const attr_name = '[a-zA-Z_:][a-zA-Z0-9:._-]*'

const unquoted = '[^"\'=<>`\\x00-\\x20]+'
const single_quoted = "'[^']*'"
const double_quoted = '"[^"]*"'

const attr_value = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')'

const attribute = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)'

const open_tag = '<([A-Za-z][A-Za-z0-9\\-]*)(' + attribute + '*)\\s*>'

export const HTML_OPEN_TAG_RE = new RegExp('^' + open_tag)

/**
 * Plugin for markdown-it to support HTML tags that span over multiple lines
 */
export function HtmlBlockPlugin() {
  return (md) => {
    md.core.ruler.push('html_block_plugin', function (state) {
      const tokens = []
      // console.log("TOKENS", state.tokens.map((t, i) => [i, t.type, t.content]))
      for (let i = 0; i < state.tokens.length; i++) {
        if (state.tokens[i].type !== 'html_block') {
          tokens.push(state.tokens[i])
          continue
        }
        // const tag = state.tokens[i].content.match(/^<([a-z-]+)>\n?(.*)/mi)?.[1]
        const match = state.tokens[i].content.match(HTML_OPEN_TAG_RE)

        if (!match) {
          tokens.push(state.tokens[i])
          continue
        }
        const [, tag, attrs] = match
        console.log('MATCH', tag, attrs)

        const endTag = `</${tag}>\n`

        let endIdx = i + 1
        while (endIdx < state.tokens.length && state.tokens[endIdx].content !== endTag) {
          endIdx++
        }
        if (endIdx < state.tokens.length && state.tokens[endIdx].content === endTag) {
          const body = collectContent(state, i, endIdx)
          // console.log("->>", JSON.stringify(body))
          const token = new state.Token('html_block', '', 0)
          token.block = true
          token.level = state.level
          token.content = `<${tag}${attrs}>${body}</${tag}>`
          tokens.push(token)
          i = endIdx
          continue
        } else {
          console.warn(`No closing tag found for <${tag}>`)
        }
      }
      // console.log("TOKENS", tokens.map((t, i) => [i, t.type, t.content]))
      state.tokens = tokens
    })
  }
}

function collectContent(state, start, end) {
  let content = []
  for (let i = start + 1; i < end; i++) {
    const token = state.tokens[i]
    if (token.type === 'inline') {
      content.push(token.content)
    } else if (token.type === 'html_block') {
      content.push(token.content)
    }
  }
  return content.join('\n\n').trim()
}
