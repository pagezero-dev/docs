// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  integrations: [
    starlight({
      title: "PageZero Docs",
      description:
        "Documentation for PageZero - TypeScript starter for full-stack web development on Cloudflare",
      logo: {
        src: "./src/assets/logo.png",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pagezero-dev/pagezero",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "introduction" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
            { label: "Technology Stack", slug: "getting-started/tech-stack" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Development Workflow", slug: "guides/development" },
            { label: "Deployment Setup", slug: "guides/deployment" },
            { label: "Database Management", slug: "guides/database" },
            { label: "Testing", slug: "guides/testing" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Project Structure", slug: "reference/project-structure" },
            { label: "NPM Scripts", slug: "reference/npm-scripts" },
            {
              label: "Environment Variables",
              slug: "reference/environment-variables",
            },
            { label: "Configuration Files", slug: "reference/configuration" },
          ],
        },
      ],
    }),
  ],
})
