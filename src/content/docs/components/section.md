---
title: Section
---

## Import

```js
import { Section } from '@/content/components/section'
```

## Usage

```js
<Section
  id="features"
  title="Our Features"
  description="Discover what makes our platform special"
  spacingSize="default"
  background="light"
>
  {/* Your section content here */}
</Section>
```

## Usage without title

```js
<Section spacingSize="lg" background="none">
  {/* Your custom section content here */}
</Section>
```

## Props

- `title` (string, optional) - Section heading
- `description` (string, optional) - Section description (only shown when title is provided)
- `id` (string, optional) - HTML id attribute for anchor links
- `spacingSize` ("default" | "sm" | "lg" | "none", optional) - Vertical padding size (default: "default")
- `background` ("none" | "light" | "dark", optional) - Background color variant (default: "none")
- `children` (ReactNode, optional) - Section content

