import collapse from '@alpinejs/collapse'
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.plugin(collapse)
Alpine.start()

window.copyToClipboard = function (id) {
  const el = document.querySelector(`[data-copy-id="${id}"]`)
  if (!el) return
  navigator.clipboard.writeText(el.textContent.trim())
}
