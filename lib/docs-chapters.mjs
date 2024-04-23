export const outline = [
  {
    emoji: "🔥",
    title: "Getting Started",
    headers: [
      {
        title: "Installation",
        headers: [
          {
            id: "getting-started/installation/subpage",
            href: "/docs/getting-started/installation/subpage",
            title: "Subpage",
            subtitle: "Subpage number one.",
          },
          {
            id: "getting-started/installation/another-subpage",
            href: "/docs/getting-started/installation/another-subpage",
            title: "Another Subpage",
            subtitle: "This is another subpage logic.",
          },
        ],
      },
      {
        id: "getting-started/release-note",
        href: "/docs/getting-started/release-note",
        title: "Release Note",
        subtitle: "What should I write inside the release notes?",
      },
      {
        id: "getting-started/starting-guide",
        href: "/docs/getting-started/starting-guide",
        title: "Starting Guide",
        subtitle: "How do I teach other people?",
      },
      {
        id: "getting-started/support",
        href: "/docs/getting-started/support",
        title: "Support",
        subtitle: "Need help? Call me up!",
      },
    ],
  },
  {
    emoji: "🔥",
    title: "Core Concepts",
    headers: [
      {
        id: "core-concepts/installation",
        href: "/docs/core-concepts/installation",
        title: "Installation",
        subtitle: "How do I install this?",
      },
      {
        id: "core-concepts/release-note",
        href: "/docs/core-concepts/release-note",
        title: "Release Note",
        subtitle: "What should I write inside the release notes?",
      },
      {
        id: "core-concepts/starting-guide",
        href: "/docs/core-concepts/starting-guide",
        title: "Starting Guide",
        subtitle: "How do I teach other people?",
      },
      {
        id: "core-concepts/support",
        href: "/docs/core-concepts/support",
        title: "Support",
        subtitle: "Need help? Call me up!",
      },
    ],
  },
];

export const headers = outline.flatMap((topic) => topic.headers);
export const lastHeader = headers[headers.length - 1];

{
  let prev = null;
  for (let header of headers) {
    if (!header.href) continue;

    if (prev) {
      header.prev = prev;
      prev.next = header;
    }
    prev = header;
  }
}

//
// Populate and export
//
export const topicById = {};
export const headerById = {};
export const topicByHref = {};
export const headerByHref = {};

for (let topic of outline) {
  for (let header of topic.headers) {
    topicById[header.id] = topic;
    headerById[header.id] = header;

    if (!header.href) continue;

    topicByHref[header.href] = topic;
    headerByHref[header.href] = header;
  }
}
