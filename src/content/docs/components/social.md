---
title: Social
---

## Import

```js
import { Social } from '@/content/components/social'
```

## Usage

```js
<Social
  facebookUrl="https://facebook.com/yourcompany"
  twitterUrl="https://twitter.com/yourcompany"
  githubUrl="https://github.com/yourcompany"
  instagramUrl="https://instagram.com/yourcompany"
  youtubeUrl="https://youtube.com/@yourcompany"
  size="default"
/>
```

## Props

- `facebookUrl` (string, optional) - Facebook profile URL
- `instagramUrl` (string, optional) - Instagram profile URL
- `twitterUrl` (string, optional) - Twitter/X profile URL
- `githubUrl` (string, optional) - GitHub profile URL
- `youtubeUrl` (string, optional) - YouTube channel URL
- `size` ("default" | "small" | "large", optional) - Icon size (default: "default")

## Available Icons

The Social component includes built-in icons for:
- Facebook (FacebookIcon)
- Instagram (InstagramIcon)
- Twitter/X (TwitterIcon)
- GitHub (GithubIcon)
- YouTube (YoutubeIcon)

Each icon can also be imported and used individually if needed.

