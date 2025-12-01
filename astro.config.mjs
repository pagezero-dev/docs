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
      customCss: ["./src/styles/fonts.css", "./src/styles/custom.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "introduction" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
            { label: "Technology Stack", slug: "getting-started/tech-stack" },
            {
              label: "Project Structure",
              slug: "getting-started/project-structure",
            },
            {
              label: "Development Workflow",
              slug: "getting-started/development",
            },
            { label: "Deployment Setup", slug: "getting-started/deployment" },
          ],
        },
        {
          label: "Modules",
          items: [
            {
              label: "Content",
              slug: "introduction",
            },
            {
              label: "Core",
              slug: "introduction",
            },

            {
              label: "Db",
              slug: "introduction",
            },
            {
              label: "Generate",
              slug: "introduction",
            },
            {
              label: "Types",
              slug: "introduction",
            },
            {
              label: "Content",
              slug: "introduction",
              badge: "🚀",
            },
            { label: "Blog", slug: "modules/blog", badge: "🚀" },
            { label: "Payments", slug: "introduction", badge: "🚀" },
            { label: "User", slug: "introduction", badge: "🚀" },
            { label: "UI", slug: "introduction", badge: "🚀" },
            { label: "Crypto", slug: "introduction", badge: "🚀" },
            { label: "Email", slug: "introduction", badge: "🚀" },
            { label: "UI Lite", slug: "introduction", badge: "🚀" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "Button", slug: "introduction" },
            { label: "Input", slug: "introduction" },
            { label: "Label", slug: "introduction" },
            { label: "RadioGroup", slug: "introduction" },
            { label: "Checkbox", slug: "introduction" },
            { label: "Badge", slug: "introduction" },
            { label: "Card", slug: "introduction" },
            { label: "Tabs", slug: "introduction" },
            { label: "Dialog", slug: "introduction" },
            { label: "DropdownMenu", slug: "introduction" },
            { label: "Typography", slug: "introduction", badge: "🚀" },
            { label: "Dialog (Lite)", slug: "introduction", badge: "🚀" },
            { label: "Dropdown (Lite)", slug: "introduction", badge: "🚀" },
            { label: "SignIn", slug: "introduction", badge: "🚀" },
            { label: "VerifyHuman", slug: "introduction", badge: "🚀" },
            { label: "PostSummary", slug: "introduction", badge: "🚀" },
            { label: "FAQ", slug: "introduction", badge: "🚀" },
            { label: "Features", slug: "introduction", badge: "🚀" },
            { label: "Footer", slug: "introduction", badge: "🚀" },
            { label: "Header", slug: "introduction", badge: "🚀" },
            { label: "Hero", slug: "introduction", badge: "🚀" },
            { label: "Social", slug: "introduction", badge: "🚀" },
            { label: "Testimonials", slug: "introduction", badge: "🚀" },
            { label: "CheckoutForm", slug: "introduction", badge: "🚀" },
            { label: "Pricing", slug: "introduction", badge: "🚀" },
          ],
        },
      ],
    }),
  ],
})
