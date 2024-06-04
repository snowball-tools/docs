import markdownit from 'markdown-it'
import TocPlugin from 'markdown-it-toc-done-right'
import AnchorPlugin from 'markdown-it-anchor'

import { CustomTagsPlugin } from './markdown/custom-tags-plugin.mjs'
import { HtmlBlockPlugin } from './markdown/html-block-plugin.mjs'

export * from './docs-chapters.mjs'

const SEP = '@@SPLIT_CONTENT@@'

export function renderDocsContent(source, attrs) {
  const withToc = `[[toc]]\n${SEP}\n${source}`
  const [toc, body] = renderer.render(withToc, attrs).split(`<p>${SEP}</p>`)
  return `
    <div class="flex items-start">
      <div class="prose lg:grow min-w-0">
        ${body}

        {{var header = Docs.headerByHref[page.location.pathname]}}

        <div class="pt-8 flex flex-col-reverse sm:flex-row gap-4">
          <if cond="header.prev">
            <a href="{{header.prev.href}}" class="flex-1 flex p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex-col justify-start items-start gap-2 no-underline">
              <div class="w-6 h-6 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.2929 16.7071L12.7071 15.2929L10.4142 13L17 13V11L10.4142 11L12.7071 8.70711L11.2929 7.29289L6.58579 12L11.2929 16.7071Z" fill="#0F86F5"/>
                </svg>
              </div>
              <div class="self-stretch h-11 flex-col justify-start items-start gap-1 flex">
                <div class="self-stretch text-sky-500 text-sm font-medium font-['Inter'] antialiased leading-tight">Previous</div>
                <div class="self-stretch h-5 text-slate-600 text-sm font-normal font-['Inter'] antialiased leading-tight">
                  {{header.prev.meta.title}}
                </div>
              </div>
            </a>
          </if>
          <else>
            <div class="flex-1"></div>
          </else>

          <if cond="header.next">
            <a href="{{header.next.href}}" class="flex-1 flex p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex-col justify-start items-end gap-2 no-underline">
              <div class="w-6 h-6 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.7071 7.29289L11.2929 8.70711L13.5858 11L7 11V13L13.5858 13L11.2929 15.2929L12.7071 16.7071L17.4142 12L12.7071 7.29289Z" fill="#0F86F5"/>
                </svg>
              </div>
              <div class="self-stretch h-11 flex-col justify-start items-start gap-1 flex">
                <div class="self-stretch text-right text-sky-500 text-sm font-medium font-['Inter'] antialiased leading-tight">Next</div>
                <div class="self-stretch h-5 text-right text-slate-600 text-sm font-normal font-['Inter'] antialiased leading-tight">
                  {{header.next.meta.title}}
                </div>
              </div>
            </a>
          </if>
          <else>
            <div class="flex-1"></div>
          </else>
        </div>
      </div>
      <div class="hidden lg:block sticky top-0">
        <div class="prose">${toc}</div>
      </div>
    </div>
  `
}


//
// Define custom behavior here
//
const CUSTOM_TAGS = {
  aside(body, attrs) {
    return `
      <aside data-type="${attrs['type'] || 'info'}" class="my-5 p-3 rounded-xl border justify-start items-start gap-2 inline-flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" class="aside__Icon shrink-0">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.46786 2.5C6.02858 2.49999 5.64962 2.49997 5.33748 2.52548C5.00802 2.55239 4.68034 2.61182 4.36503 2.77249C3.89462 3.01217 3.51217 3.39462 3.27249 3.86503C3.11182 4.18034 3.05239 4.50802 3.02548 4.83748C2.99997 5.14962 2.99999 5.52857 3 5.96785V14.0321C2.99999 14.4714 2.99997 14.8504 3.02548 15.1625C3.05239 15.492 3.11182 15.8197 3.27249 16.135C3.51217 16.6054 3.89462 16.9878 4.36503 17.2275C4.68034 17.3882 5.00802 17.4476 5.33748 17.4745C5.64962 17.5 6.02858 17.5 6.46786 17.5H14.5321C14.9714 17.5 15.3504 17.5 15.6625 17.4745C15.992 17.4476 16.3197 17.3882 16.635 17.2275C17.1054 16.9878 17.4878 16.6054 17.7275 16.135C17.8882 15.8197 17.9476 15.492 17.9745 15.1625C18 14.8504 18 14.4714 18 14.0321V5.96786C18 5.52858 18 5.14962 17.9745 4.83748C17.9476 4.50802 17.8882 4.18034 17.7275 3.86503C17.4878 3.39462 17.1054 3.01217 16.635 2.77249C16.3197 2.61182 15.992 2.55239 15.6625 2.52548C15.3504 2.49997 14.9714 2.49999 14.5322 2.5H6.46786ZM8.83333 9.16667C8.83333 8.70643 9.20643 8.33333 9.66667 8.33333H10.5C10.9602 8.33333 11.3333 8.70643 11.3333 9.16667V13.3333C11.3333 13.7936 10.9602 14.1667 10.5 14.1667C10.0398 14.1667 9.66667 13.7936 9.66667 13.3333V10C9.20643 10 8.83333 9.6269 8.83333 9.16667ZM10.5 5.83333C10.0398 5.83333 9.66667 6.20643 9.66667 6.66667C9.66667 7.1269 10.0398 7.5 10.5 7.5C10.9602 7.5 11.3333 7.1269 11.3333 6.66667C11.3333 6.20643 10.9602 5.83333 10.5 5.83333Z" fill="currentColor" />
        </svg>
        <div class="flex-col justify-start items-start gap-2 inline-flex mt-[0.5px]">
          <div class="aside__Title text-sky-950 text-sm font-medium font-['Inter'] leading-tight antialiased">${attrs.title || ''}</div>
          <div class="aside__Body text-sky-950 text-sm font-normal font-['Inter'] leading-tight no-y-content-margin">
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
renderer.use(AnchorPlugin, { permalink: true, permalinkBefore: true, permalinkSymbol: '#' })
renderer.use(TocPlugin, { listType: 'ul' })

// Wrap code blocks in fancy ui
let blockId = 100
renderer.renderer.rules.fence = function(tokens, idx, options, env, self) {
  const token = tokens[idx]
  const langShort = token.info.trim()
  // const langClass = token.info ? ` class="language-${langShort}"` : ''
  const langLong = {
    js: 'javascript',
    ts: 'typescript',
  }[langShort] || langShort
  const content = token.content
  const copyId = blockId++

  return `
    <div class="FancyCodeBlock px-1 pb-1 bg-slate-100 rounded-xl flex-col justify-start items-center flex">
      <div class="self-stretch pl-3 pr-2 py-2 justify-start items-center gap-1.5 inline-flex antialiased">
        <div class="w-5 h-5 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M8.62516 16.875L12.3752 3.125M15.7085 6.45833L18.3968 9.31465C18.7592 9.6997 18.7592 10.3003 18.3968 10.6854L15.7085 13.5417M5.29183 13.5417L2.60355 10.6854C2.24115 10.3003 2.24114 9.6997 2.60354 9.31465L5.29183 6.45833" stroke="#0E2F4E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="grow shrink basis-0 text-sky-950 text-sm font-medium font-['Inter'] leading-tight">${langLong}</div>
        <div
          x-data="{ copied: false }"
          class="px-2.5 bg-white rounded-[800px] shadow-button border border-sky-950/opacity-10 justify-center items-center gap-1 flex"
        >
          <div class="relative">
            <svg x-show="!copied" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path d="M10.8337 5.66675V3.16675C10.8337 2.33832 10.1621 1.66675 9.33366 1.66675H3.66699C2.83857 1.66675 2.16699 2.33832 2.16699 3.16675V8.83341C2.16699 9.66184 2.83857 10.3334 3.66699 10.3334H6.16699M7.66699 5.66675H13.3337C14.1621 5.66675 14.8337 6.33832 14.8337 7.16675V12.8334C14.8337 13.6618 14.1621 14.3334 13.3337 14.3334H7.66699C6.83856 14.3334 6.16699 13.6618 6.16699 12.8334V7.16675C6.16699 6.33832 6.83856 5.66675 7.66699 5.66675Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div
            x-text="copied ? 'Copied!' : 'Copy'"
            onclick="copyToClipboard('${copyId}')"
            @click="copied = true; setTimeout(() => copied = false, 1400)"
            x-bind:class="copied ? 'text-green-700' : ''"
            class="py-2 text-slate-800 text-xs font-normal font-['Inter'] leading-none cursor-pointer"
          ></div>
        </div>
      </div>
      <div class="self-stretch p-4 bg-white rounded-lg shadow-m justify-start items-center gap-1.5 inline-flex overflow-x-auto">
        <pre class="not-prose text-sm"><code data-copy-id="${copyId}">${renderer.utils.escapeHtml(content)}</code></pre>
      </div>
    </div>
  `
}
