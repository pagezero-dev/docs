---
title: Technology Stack
description: Learn about the technologies and tools that power PageZero and why they were chosen.
---

PageZero is built on a carefully selected stack of modern technologies that work together to provide an excellent developer experience while keeping costs low and performance high.

## Core Technologies

### 🌐 Frontend

#### React 18

**What**: A JavaScript library for building user interfaces
**Why**:

- Mature ecosystem with extensive community support
- Excellent performance with concurrent features
- Large talent pool and learning resources
- Perfect integration with React Router v7

#### React Router v7

**What**: Full-stack React framework for routing and data loading
**Why**:

- File-based routing with nested layouts
- Built-in data loading and error boundaries
- Type-safe route parameters and loaders
- Seamless client and server-side rendering

#### TypeScript

**What**: JavaScript with static type definitions
**Why**:

- Catch errors at compile time, not runtime
- Excellent IDE support with autocomplete and refactoring
- Better code documentation through types
- Easier refactoring and maintenance

#### TailwindCSS

**What**: A utility-first CSS framework
**Why**:

- Rapid UI development with utility classes
- Consistent design system out of the box
- Smaller bundle sizes with automatic purging
- Easy theming and customization

### ⚡ Build Tool

#### Vite

**What**: Next-generation frontend tooling
**Why**:

- Lightning-fast Hot Module Replacement (HMR)
- Optimized builds with Rollup
- Native ES modules in development
- Excellent TypeScript support

### ☁️ Backend & Infrastructure

#### Cloudflare Pages

**What**: JAMstack platform for frontend deployment
**Why**:

- Global edge distribution for fast loading
- Generous free tier (100,000 requests/month)
- Automatic HTTPS and custom domains
- Git-based deployments with preview branches

#### Cloudflare D1

**What**: Serverless SQLite database
**Why**:

- SQLite compatibility with global replication
- No connection limits or cold starts
- SQL-based with ACID transactions
- Very generous free tier (5GB storage, 25M reads/month)

#### Cloudflare Workers

**What**: Serverless compute platform
**Why**:

- Run code at the edge for low latency
- V8 isolates for fast cold starts
- No infrastructure management
- Scales automatically to zero

### 🗄️ Database & ORM

#### Drizzle ORM

**What**: TypeScript ORM for SQL databases
**Why**:

- Type-safe database operations
- SQL-like syntax that's easy to learn
- Excellent TypeScript inference
- Great performance with prepared statements
- Perfect D1 integration

### 🧪 Testing

#### Vitest

**What**: Fast unit test framework
**Why**:

- Native TypeScript support
- Vite-powered for fast execution
- Jest-compatible API
- Excellent IDE integration

#### Playwright

**What**: End-to-end testing framework
**Why**:

- Cross-browser testing (Chrome, Firefox, Safari)
- Auto-wait for elements and actions
- Network interception and mocking
- Parallel test execution

### 🛠️ Development Tools

#### ESLint

**What**: JavaScript/TypeScript linter
**Why**:

- Catch potential bugs and issues
- Enforce consistent code style
- Extensible with custom rules
- IDE integration for real-time feedback

#### Prettier

**What**: Code formatter
**Why**:

- Consistent code formatting across the team
- Automatic formatting on save
- Support for multiple file types
- Zero configuration needed

#### Storybook

**What**: Tool for developing and testing UI components
**Why**:

- Isolated component development
- Interactive component documentation
- Visual testing and debugging
- Design system development

### 🚀 CI/CD

#### GitHub Actions

**What**: Continuous integration and deployment
**Why**:

- Integrated with GitHub repositories
- Free for public repositories
- Extensive marketplace of actions
- Easy to configure and maintain

## Architecture Decisions

### Why Cloudflare?

1. **Cost Efficiency**: Generous free tiers across all services
2. **Performance**: Global edge network for low latency
3. **Simplicity**: Integrated ecosystem reduces complexity
4. **Scalability**: Automatically scales from zero to millions of users
5. **Developer Experience**: Excellent tooling and documentation

### Why SQLite/D1?

1. **Simplicity**: Single file database, no server management
2. **Performance**: Fast reads and writes for most applications
3. **Reliability**: ACID compliance and data integrity
4. **Cost**: Extremely generous free tier
5. **Familiarity**: Standard SQL syntax

### Why React Router v7?

1. **Type Safety**: Full TypeScript integration
2. **Performance**: Automatic code splitting and prefetching
3. **DX**: File-based routing with nested layouts
4. **Future-Proof**: Backed by Remix team's expertise
5. **Flexibility**: Works for both SPAs and server-rendered apps

## Alternative Considerations

### What We Didn't Choose (And Why)

#### Next.js

- More complex deployment and hosting requirements
- Vendor lock-in with Vercel for optimal experience
- Higher operational costs at scale

#### Prisma

- Heavier runtime overhead
- More complex migration system
- Less optimal for edge/serverless environments

#### PostgreSQL/MySQL

- Requires server management or expensive hosting
- Connection pooling complexity in serverless
- Higher operational costs

#### Webpack

- Slower development builds
- More complex configuration
- Less modern module handling

## Getting Started

Ready to work with this stack? Here's how to get familiar:

### Essential Learning Resources

1. **React**: [Official React Documentation](https://react.dev/)
2. **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
3. **TailwindCSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
4. **Drizzle**: [Drizzle Documentation](https://orm.drizzle.team/)
5. **Cloudflare**: [Cloudflare Docs](https://developers.cloudflare.com/)

### Development Workflow

1. **Start Local**: Use `npm run dev` for hot-reloading development
2. **Test Early**: Write tests as you build features
3. **Component First**: Develop UI components in Storybook
4. **Type Safe**: Let TypeScript guide your development
5. **Deploy Often**: Use preview deployments for every PR

The PageZero stack is designed to grow with your project - from rapid prototyping to production-scale applications. Each technology choice supports the core principles of being easy to learn, fast to build with, pleasurable to develop, and cheap to maintain.

Ready to dive deeper? Check out our [Development Guide](/guides/development/) to see how these technologies work together in practice.
