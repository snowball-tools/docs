import fs from "fs";
import path from "path";

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
            // TODO: Generate these programatically
            breadcrumbs: ["Installation", "Subpage"],
            subtitle: "Subpage number one.",
          },
          {
            id: "getting-started/installation/another-subpage",
            href: "/docs/getting-started/installation/another-subpage",
            title: "Another Subpage",
            breadcrumbs: ["Installation", "Another Subpage"],
            subtitle: "This is another subpage logic.",
          },
        ],
      },
      {
        id: "getting-started/release-note",
        href: "/docs/getting-started/release-note",
        title: "Release Note",
        breadcrumbs: ["Release Note"],
        subtitle: "What should I write inside the release notes?",
      },
      {
        id: "getting-started/starting-guide",
        href: "/docs/getting-started/starting-guide",
        title: "Starting Guide",
        breadcrumbs: ["Starting Guide"],
        subtitle: "How do I teach other people?",
      },
      {
        id: "getting-started/support",
        href: "/docs/getting-started/support",
        title: "Support",
        breadcrumbs: ["Support"],
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
        breadcrumbs: ["Installation"],
        subtitle: "How do I install this?",
      },
      {
        id: "core-concepts/release-note",
        href: "/docs/core-concepts/release-note",
        title: "Release Note",
        breadcrumbs: ["Release Note"],
        subtitle: "What should I write inside the release notes?",
      },
      {
        id: "core-concepts/starting-guide",
        href: "/docs/core-concepts/starting-guide",
        title: "Starting Guide",
        breadcrumbs: ["Starting Guide"],
        subtitle: "How do I teach other people?",
      },
      {
        id: "core-concepts/support",
        href: "/docs/core-concepts/support",
        title: "Support",
        breadcrumbs: ["Support"],
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
    // If the header has subpages
    if (header.headers && header.headers.length > 0) {
      for (let headerSubpage of header.headers) {
        topicById[headerSubpage.id] = topic;
        headerById[headerSubpage.id] = headerSubpage;

        if (!headerSubpage.href) continue;

        topicByHref[headerSubpage.href] = topic;
        headerByHref[headerSubpage.href] = headerSubpage;
      }
    } else {
      topicById[header.id] = topic;
      headerById[header.id] = header;

      if (!header.href) continue;

      topicByHref[header.href] = topic;
      headerByHref[header.href] = header;
    }
  }
}

function generateTableOfContents(header) {
  if (!header.href) {
    return;
  }

  const filePath = path.join(__dirname, "../../client", `${header.href}.html`);
  console.log(`Attempting to read file: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  for (let line of lines) {
    if (line.trim().startsWith("#")) {
      const level = (line.trim().match(/^#+/) ?? [""])[0].length;

      line = line.trim().replace(/^#+\s*/, "");
      if (!header.tableOfContents) {
        header.tableOfContents = [];
      }
      console.log(`Adding to table of contents: ${line}`);
      header.tableOfContents.push({
        level: level,
        title: line,
        href: `#${line.toLowerCase().replace(/\s+/g, "-")}`,
      });
    }
  }
}

function processHeaders(headers) {
  for (let header of headers) {
    if (header.href) {
      generateTableOfContents(header);
    }
    if (header.headers && header.headers.length > 0) {
      processHeaders(header.headers);
    }
  }
}

processHeaders(outline);