---
title: Features
---

## Import

```js
import { Features } from '@/content/components/features'
```

## Usage

```js
import { Zap, Shield, Rocket } from 'lucide-react'
import { Link } from '@/ui/link'

<Features>
  <Features.Item
    title="Fast Performance"
    icon={<Zap />}
    cta={
      <Link href="/learn-more" size="sm" underline="hover">
        Learn more →
      </Link>
    }
  >
    Built with performance in mind. Lightning-fast page loads and optimized
    rendering ensure the best user experience.
  </Features.Item>
  <Features.Item
    title="Secure by Default"
    icon={<Shield />}
  >
    Security best practices are built in from the ground up, protecting your
    application and users.
  </Features.Item>
  <Features.Item
    title="Quick to Deploy"
    icon={<Rocket />}
  >
    Deploy to multiple platforms with ease. Get your application online in
    minutes, not hours.
  </Features.Item>
</Features>
```

