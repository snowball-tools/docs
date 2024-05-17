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

const InlineNotification = {
  notification(body, attrs) {
    return `
    <aside class="${attrs.class}">
      <div class="AsideContent">
        <!-- Information Square Icon -->
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M6.46786 2.5C6.02858 2.49999 5.64962 2.49997 5.33748 2.52548C5.00802 2.55239 4.68034 2.61182 4.36503 2.77249C3.89462 3.01217 3.51217 3.39462 3.27249 3.86503C3.11182 4.18034 3.05239 4.50802 3.02548 4.83748C2.99997 5.14962 2.99999 5.52857 3 5.96785V14.0321C2.99999 14.4714 2.99997 14.8504 3.02548 15.1625C3.05239 15.492 3.11182 15.8197 3.27249 16.135C3.51217 16.6054 3.89462 16.9878 4.36503 17.2275C4.68034 17.3882 5.00802 17.4476 5.33748 17.4745C5.64962 17.5 6.02858 17.5 6.46786 17.5H14.5321C14.9714 17.5 15.3504 17.5 15.6625 17.4745C15.992 17.4476 16.3197 17.3882 16.635 17.2275C17.1054 16.9878 17.4878 16.6054 17.7275 16.135C17.8882 15.8197 17.9476 15.492 17.9745 15.1625C18 14.8504 18 14.4714 18 14.0321V5.96786C18 5.52858 18 5.14962 17.9745 4.83748C17.9476 4.50802 17.8882 4.18034 17.7275 3.86503C17.4878 3.39462 17.1054 3.01217 16.635 2.77249C16.3197 2.61182 15.992 2.55239 15.6625 2.52548C15.3504 2.49997 14.9714 2.49999 14.5322 2.5H6.46786ZM8.83333 9.16667C8.83333 8.70643 9.20643 8.33333 9.66667 8.33333H10.5C10.9602 8.33333 11.3333 8.70643 11.3333 9.16667V13.3333C11.3333 13.7936 10.9602 14.1667 10.5 14.1667C10.0398 14.1667 9.66667 13.7936 9.66667 13.3333V10C9.20643 10 8.83333 9.6269 8.83333 9.16667ZM10.5 5.83333C10.0398 5.83333 9.66667 6.20643 9.66667 6.66667C9.66667 7.1269 10.0398 7.5 10.5 7.5C10.9602 7.5 11.3333 7.1269 11.3333 6.66667C11.3333 6.20643 10.9602 5.83333 10.5 5.83333Z" 
            fill="currentColor"
          />
        </svg>
        <div class="no-y-content-margin">
          ${renderer.render(body)}
        </div>
      </div>
    </aside>
    `
  }
}

const renderer = markdownit({ html: true })
renderer.use(HtmlBlockPlugin())
renderer.use(CustomTagsPlugin(CUSTOM_TAGS))
renderer.use(CustomTagsPlugin(InlineNotification))
