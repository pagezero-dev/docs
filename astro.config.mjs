// @ts-check

import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  integrations: [
    starlight({
      title: "PageZERO Docs",
      description: "A web app stack engineered for tiny, fast-moving teams",
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
      customCss: ["./src/styles/fonts.css", "./src/styles/custom.css"],
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Components",
          badge: {
            text: "PowerUP",
            variant: "note",
          },
          autogenerate: { directory: "components" },
        },
      ],
    }),
  ],
})
