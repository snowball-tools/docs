import markdownit from 'markdown-it'
import { HtmlBlockPlugin } from './markdown/html-block-plugin.mjs'
import { CustomTagsPlugin } from './markdown/custom-tags-plugin.mjs'

export * from "./docs-chapters.mjs"

export function renderDocsContent(source) {
  return renderer.render(source)
}

//
// Define custom behavior here
//
const CUSTOM_TAGS = {
  aside(body, attrs) {
    return `
    <aside>
      <div class="AsideContent">
        <!-- Heroicon name: information-circle -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <div class="no-y-content-margin">
          ${renderer.render(body)}
        </div>
      </div>
    </aside>
    `
  },
}

const renderer = markdownit({ html: true })
renderer.use(HtmlBlockPlugin())
renderer.use(CustomTagsPlugin(CUSTOM_TAGS))
