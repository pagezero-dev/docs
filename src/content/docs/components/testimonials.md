---
title: Testimonials
---

## Import

```js
import { Testimonials } from '@/content/components/testimonials'
```

## Usage

```js
<Testimonials
  items={[
    {
      quote: 'PageZERO has completely transformed how we build web applications. The developer experience is outstanding!',
      url: 'https://twitter.com/user/status/123',
      author: {
        name: 'Sarah Johnson',
        imageSrc: '/images/sarah.jpg',
        id: 'sarahjdev'
      }
    },
    {
      quote: 'The best framework I\'ve used in years. Clean, fast, and incredibly well-documented.',
      author: {
        name: 'Michael Chen'
      }
    },
    {
      quote: 'We migrated our entire platform to PageZERO and couldn\'t be happier with the results.',
      url: 'https://example.com/case-study',
      author: {
        name: 'Emily Rodriguez',
        imageSrc: '/images/emily.jpg',
        id: 'emilydev'
      }
    }
  ]}
/>
```

## Props

- `items` (array, required) - Array of testimonial objects

### Testimonial Item Object

- `quote` (string, required) - The testimonial text
- `url` (string, optional) - Link to the original testimonial source
- `author` (object, required) - Author information
  - `name` (string, required) - Author's name
  - `imageSrc` (string, optional) - URL to author's profile image
  - `id` (string, optional) - Author's social media handle or identifier

