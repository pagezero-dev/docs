---
title: Header
---

## Import

```js
import { Header } from '@/content/components/header'
```

## Usage

```js
import { Button } from '@/ui/button'
import { Logo } from '@/content/components/logo'

<Header
  logo={
    <a href="/" className="font-bold text-lg">
      <Logo />
    </a>
  }
  position="sticky"
>
  <Button variant="ghost" asChild>
    <a href="/pricing">Pricing</a>
  </Button>
  <Button variant="ghost" asChild>
    <a href="/about">About us</a>
  </Button>
  <Button variant="ghost" asChild>
    <a href="/blog">Blog</a>
  </Button>
  <Button variant="default" asChild>
    <a href="/login">Log in</a>
  </Button>
</Header>
```

