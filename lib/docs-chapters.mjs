export const outline = [
  {
    emoji: "🔥",
    title: "My Sample Page",
    headers: [
      {
        id: "intro/overview",
        href: "/docs/intro/overview",
        title: "What am I?",
        subtitle: "Why am I spending so much time trying to learn AlpineJs.",
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
