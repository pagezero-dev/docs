---
title: Storybook
---

Develop and document UI components in isolation with **[Storybook](https://storybook.js.org/)**. Pre-configured for React with TailwindCSS, dark mode, and automatic documentation.

**Key features**

- Isolated component development
- Interactive controls for props
- Automatic documentation generation
- Dark/light mode toggle
- Hot reloading

## Running Storybook

```bash
bun run storybook
```

Opens Storybook at [localhost:6006](http://localhost:6006) where you can browse all components.

![Storybook](../../../assets/features/storybook.png)

## Writing Stories

Stories define the different states and variations of a component. They're co-located with their components:

```
component-name/
├── component-name.tsx         # Component implementation
├── component-name.stories.tsx # Storybook stories
├── component-name.test.tsx    # Tests
└── index.ts                   # Public exports
```

**Basic story structure:**

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"

const meta = {
  title: "Packages/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
}
```

**Story organization:**

| Location | Title Prefix | Example |
|----------|--------------|---------|
| `packages/ui/` | `Packages/UI/` | `Packages/UI/Button` |
| `packages/ui-lite/` | `Packages/UI-Lite/` | `Packages/UI-Lite/Dialog` |
| `apps/*/components/` | `Apps/ModuleName/` | `Apps/Content/Hero` |

## Generating Components

Use the generator to scaffold new components with stories:

```bash
bun run generate component MyComponent ./packages/ui
```

This creates:

- `packages/ui/my-component/my-component.tsx` — Component
- `packages/ui/my-component/my-component.stories.tsx` — Stories
- `packages/ui/my-component/my-component.test.tsx` — Tests
- `packages/ui/my-component/index.ts` — Exports

## Testing with Mock Data

Use [Faker.js](https://fakerjs.dev/) (pre-installed) to generate realistic mock data in stories:

```tsx
import { faker } from "@faker-js/faker"

export const Default: Story = {
  args: {
    title: faker.lorem.sentence({ min: 4, max: 6 }),
    description: faker.lorem.paragraph(3),
    email: faker.internet.email(),
  },
}
```
