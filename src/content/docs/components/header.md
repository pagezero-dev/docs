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

<Header
  logo={
    <a href="/" className="font-bold text-lg">
      Logo
    </a>
  }
>
  <Button variant="ghost" asChild>
    <a href="/">Lorem</a>
  </Button>
  <Button variant="ghost" asChild>
    <a href="/">Ipsum</a>
  </Button>
  <Button variant="ghost" asChild>
    <a href="/">Dolor</a>
  </Button>
  <Button variant="ghost" asChild>
    <a href="/">Sit</a>
  </Button>
  <Button variant="default" asChild>
    <a href="/">Amet</a>
  </Button>
</Header>
```

