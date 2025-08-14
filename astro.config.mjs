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
            {
              label: "Project Structure",
              slug: "getting-started/project-structure",
            },
          ],
        },
        {
          label: "Modules",
          items: [
            { label: "Content", slug: "introduction" },
            { label: "Core", slug: "introduction" },
            { label: "Blog", slug: "introduction" },
            { label: "Payments", slug: "introduction" },
            { label: "User", slug: "introduction" },
            { label: "Db", slug: "introduction" },
            { label: "Generate", slug: "introduction" },
            { label: "Types", slug: "introduction" },
            { label: "UI", slug: "introduction" },
            { label: "Crypto", slug: "introduction" },
            { label: "Email", slug: "introduction" },
            { label: "UI Lite", slug: "introduction" },
          ],
        },
        {
          label: "Components",
          collapsed: true,
          items: [
            {
              label: "UI",
              items: [
                { label: "Button", slug: "introduction" },
                { label: "Badge", slug: "introduction" },
                { label: "Card", slug: "introduction" },
                { label: "Checkbox", slug: "introduction" },
                { label: "Dialog", slug: "introduction" },
                { label: "DropdownMenu", slug: "introduction" },
                { label: "Label", slug: "introduction" },
                { label: "RadioGroup", slug: "introduction" },
                { label: "Tabs", slug: "introduction" },
                { label: "Typography", slug: "introduction" },
              ],
            },
            {
              label: "UI Lite",
              items: [
                { label: "Dialog", slug: "introduction" },
                { label: "Dropdown", slug: "introduction" },
              ],
            },
            {
              label: "User",
              items: [
                { label: "Sign-In", slug: "introduction" },
                { label: "VerifyHuman", slug: "introduction" },
              ],
            },
            {
              label: "Blog",
              items: [{ label: "PostSummary", slug: "introduction" }],
            },
            {
              label: "Content",
              items: [
                { label: "FAQ", slug: "introduction" },
                { label: "Features", slug: "introduction" },
                { label: "Footer", slug: "introduction" },
                { label: "Header", slug: "introduction" },
                { label: "Hero", slug: "introduction" },
                { label: "Social", slug: "introduction" },
                { label: "Testimonials", slug: "introduction" },
              ],
            },
            {
              label: "Payments",
              items: [
                { label: "CheckoutForm", slug: "introduction" },
                { label: "Pricing", slug: "introduction" },
              ],
            },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Development Workflow", slug: "guides/development" },
            { label: "Deployment Setup", slug: "guides/deployment" },
            { label: "Testing", slug: "guides/testing" },
          ],
        },
      ],
    }),
  ],
})
