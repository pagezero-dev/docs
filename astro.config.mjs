// @ts-check

import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import rehypeMermaid from "rehype-mermaid"

// https://astro.build/config
export default defineConfig({
  site: "https://docs.pagezero.dev",
  server: {
    port: 3000,
  },
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    rehypePlugins: [rehypeMermaid],
  },
  integrations: [
    starlight({
      title: "PageZERO Docs",
      description:
        "Open source, Cloudflare-based web app foundation for the AI era.",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pagezero-dev/pagezero",
        },
        {
          icon: "x.com",
          label: "X",
          href: "https://x.com/pawelgalazka",
        },
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            sizes: "any",
          },
        },
        {
          tag: "script",
          content: `if (!localStorage.getItem('starlight-theme')) { localStorage.setItem('starlight-theme', 'dark'); }`,
        },
      ],
      customCss: ["./src/styles/fonts.css", "./src/styles/custom.css"],
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Features",
          autogenerate: { directory: "features" },
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
    }),
  ],
})
