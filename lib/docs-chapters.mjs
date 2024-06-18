export const outline = [
  {
    title: 'Core',
    headers: [
      // // Example of header with subpages
      // {
      //   title: 'Installation',
      //   headers: [
      //     {
      //       id: 'getting-started/installation/subpage',
      //       href: '/docs/getting-started/installation/subpage',
      //       title: 'Subpage',
      //       // TODO: Generate these programatically
      //       breadcrumbs: ['Installation', 'Subpage'],
      //       meta: { title: 'Subpage number one.' },
      //     },
      //     {
      //       id: 'getting-started/installation/another-subpage',
      //       href: '/docs/getting-started/installation/another-subpage',
      //       title: 'Another Subpage',
      //       breadcrumbs: ['Installation', 'Another Subpage'],
      //       meta: { title: 'This is another subpage logic.' },
      //     },
      //   ],
      // },
      {
        id: 'core/installation',
        href: '/docs/core/installation',
        title: 'Installation',
        breadcrumbs: ['Installation'],
        meta: { title: 'Snowball JS SDK Installation' },
      },
      {
        id: 'core/usage',
        href: '/docs/core/usage',
        title: 'General Usage',
        breadcrumbs: ['General Usage'],
        meta: { title: 'Using the Snowball JS SDK' },
      },
      {
        id: 'core/auth-state',
        href: '/docs/core/auth-state',
        title: 'General Auth State',
        breadcrumbs: ['General Auth State'],
        meta: { title: 'General Auth State in the Snowball JS SDK' },
      },
      {
        id: 'core/react',
        href: '/docs/core/react',
        title: 'Using with React',
        breadcrumbs: ['Using with React'],
        meta: { title: 'Using the Snowball JS SDK with React JS' },
      },
    ],
  },
  {
    title: 'Embedded Wallets',
    headers: [
      {
        id: 'embedded-wallets/introduction',
        href: '/docs/embedded-wallets/introduction',
        title: 'Introduction',
        breadcrumbs: ['Introduction'],
        meta: { title: 'Introduction to Snowball Embedded Wallets' },
      },
      {
        id: 'embedded-wallets/concepts',
        href: '/docs/embedded-wallets/concepts',
        title: 'Concepts',
        breadcrumbs: ['Concepts'],
        meta: { title: 'Snowball Embedded Wallets: Concepts' },
      },
      {
        id: 'embedded-wallets/getting-started',
        href: '/docs/embedded-wallets/getting-started',
        title: 'Getting Started',
        breadcrumbs: ['Getting Started'],
        meta: { title: 'Getting Started with Snowball\'s Embedded Wallets' },
      },
    ]
  },
  {
    title: 'Lit Wallet Auth',
    headers: [
      // // Example of header with subpages
      // {
      //   title: 'Installation',
      //   headers: [
      //     {
      //       id: 'getting-started/installation/subpage',
      //       href: '/docs/getting-started/installation/subpage',
      //       title: 'Subpage',
      //       // TODO: Generate these programatically
      //       breadcrumbs: ['Installation', 'Subpage'],
      //       meta: { title: 'Subpage number one.' },
      //     },
      //     {
      //       id: 'getting-started/installation/another-subpage',
      //       href: '/docs/getting-started/installation/another-subpage',
      //       title: 'Another Subpage',
      //       breadcrumbs: ['Installation', 'Another Subpage'],
      //       meta: { title: 'This is another subpage logic.' },
      //     },
      //   ],
      // },
      {
        id: 'auth-lit/getting-started',
        href: '/docs/auth-lit/getting-started',
        title: 'Getting Started',
        breadcrumbs: ['Getting Started'],
        meta: { title: 'Getting Started with Snowball and Lit Wallet Auth' },
      },
      {
        id: 'auth-lit/google',
        href: '/docs/auth-lit/google',
        title: 'Google Auth',
        breadcrumbs: ['Google Auth'],
        meta: { title: 'Using Google with Snowball\'s Lit Wallet Auth' },
      },
      {
        id: 'auth-lit/passkeys',
        href: '/docs/auth-lit/passkeys',
        title: 'Passkey Auth',
        breadcrumbs: ['Passkey Auth'],
        meta: { title: 'Using Passkeys with Snowball\'s Lit Wallet Auth' },
      },
    ],
  },
  {
    title: 'Account Abstraction',
    headers: [
      {
        id: 'aa/introduction',
        href: '/docs/account-abstraction/introduction',
        title: 'Introduction',
        breadcrumbs: ['Introduction'],
        meta: { title: 'Introduction to Alchemy Account Abstraction' },
      },
      {
        id: 'aa/lit-alchemy',
        href: '/docs/account-abstraction/lit-alchemy',
        title: 'Lit <> Alchemy AA',
        breadcrumbs: ['Lit <> Alchemy AA'],
        meta: { title: 'Using Snowball with Alchemy Account Abstraction' },
      },
    ]
  },
  {
    title: 'Security Design',
    headers: [
      {
        id: 'security/wallet-generation',
        href: '/docs/security/wallet-generation',
        title: 'Security: Wallet Generation',
        breadcrumbs: ['Security: Wallet Generation'],
        meta: { title: 'Snowball Security: Embedded Wallets' },
      },
    ]
  },
]

export const headers = outline.flatMap((topic) => topic.headers)
export const lastHeader = headers[headers.length - 1]

{
  let prev = null
  for (let header of headers) {
    if (!header.href) continue

    if (prev) {
      header.prev = prev
      prev.next = header
    }
    prev = header
  }
}

export function headerHref(id) {
  return headerById[id].href
}

//
// Populate and export
//
export const topicById = {}
export const headerById = {}
export const topicByHref = {}
export const headerByHref = {}

for (let topic of outline) {
  if (!topic.headers) continue
  for (let header of topic.headers) {
    // If the header has subpages
    if (header.headers && header.headers.length > 0) {
      for (let headerSubpage of header.headers) {
        topicById[headerSubpage.id] = topic
        headerById[headerSubpage.id] = headerSubpage

        if (!headerSubpage.href) continue

        topicByHref[headerSubpage.href] = topic
        headerByHref[headerSubpage.href] = headerSubpage
      }
    } else {
      topicById[header.id] = topic
      headerById[header.id] = header

      if (!header.href) continue

      topicByHref[header.href] = topic
      headerByHref[header.href] = header
    }
  }
}

// Manually set root header
headerByHref['/'] = {
  id: 'root',
  title: 'Introduction',
  href: '/',
  meta: { title: 'Introduction to Snowball' },
  next: outline[0].headers[0],
}
