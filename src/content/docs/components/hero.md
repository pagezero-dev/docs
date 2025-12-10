---
title: Hero
---

## Import

```js
import { Hero } from '@/content/components/hero'
```

## Usage

```js
import { Button } from '@/ui/button'

<Hero
  title="Welcome to PageZERO"
  description="Build modern web applications with ease. PageZERO provides everything you need to get started quickly with best practices built in."
  cta={
    <>
      <Button asChild>
        <a href="/get-started">Get started</a>
      </Button>
      <Button asChild variant="ghost">
        <a href="/learn-more">Learn more →</a>
      </Button>
    </>
  }
/>
```

