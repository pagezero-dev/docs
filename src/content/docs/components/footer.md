---
title: Footer
---

## Import

```js
import { Footer } from '@/content/components/footer'
```

## Usage

```js
<Footer
  navigation={[
    {
      heading: 'Product',
      children: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/docs' }
      ]
    },
    {
      heading: 'Company',
      children: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' }
      ]
    },
    {
      heading: 'Resources',
      children: [
        { label: 'Community', href: '/community' },
        { label: 'Support', href: '/support' },
        { label: 'Status', href: '/status' }
      ]
    },
    {
      heading: 'Legal',
      children: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Security', href: '/security' }
      ]
    }
  ]}
  socialMediaUrls={{
    facebookUrl: 'https://facebook.com/yourcompany',
    twitterUrl: 'https://twitter.com/yourcompany',
    githubUrl: 'https://github.com/yourcompany',
    instagramUrl: 'https://instagram.com/yourcompany',
    youtubeUrl: 'https://youtube.com/@yourcompany'
  }}
/>
```

## Props

- `navigation` (array, required) - Array of navigation sections
  - `heading` (string, required) - Section heading
  - `children` (array, required) - Array of navigation links
    - `label` (string, required) - Link text
    - `href` (string, required) - Link URL
- `socialMediaUrls` (object, optional) - Social media URLs
  - `facebookUrl` (string, optional) - Facebook profile URL
  - `instagramUrl` (string, optional) - Instagram profile URL
  - `twitterUrl` (string, optional) - Twitter/X profile URL
  - `githubUrl` (string, optional) - GitHub profile URL
  - `youtubeUrl` (string, optional) - YouTube channel URL

