---
title: Introduction
description: Learn about PageZero, its philosophy, and guiding principles.
---

PageZero is an open-source TypeScript starter for full-stack web development on Cloudflare. It's designed to help developers build modern, scalable web applications with excellent developer experience while keeping operational costs low.

## Philosophy

PageZero is built around four core principles:

### 🎓 Easy to Learn

- **Familiar technologies** - Uses popular, well-documented tools like React, TypeScript, and Vite
- **Clear conventions** - Opinionated structure that reduces decision fatigue
- **Comprehensive documentation** - Everything you need to know in one place
- **Example code** - Real-world patterns and best practices included

### ⚡ Fast to Build With

- **Hot Module Replacement** - Instant feedback during development
- **Type safety** - Catch errors at compile time, not runtime
- **Auto-generated APIs** - Less boilerplate, more productivity
- **Pre-configured tooling** - ESLint, Prettier, testing setup out of the box

### 😍 Pleasure to Develop

- **Modern DX** - Latest tooling and development practices
- **Component-driven** - Storybook integration for isolated component development
- **Testing-first** - Unit and E2E testing configured and ready
- **CI/CD included** - Automated testing and deployment workflows

### 💰 Cheap to Maintain

- **Cloudflare-native** - Leverage generous free tiers
- **Edge computing** - Global performance without the cost
- **Serverless** - Pay only for what you use
- **Minimal dependencies** - Fewer security vulnerabilities and maintenance overhead

## What Makes PageZero Different?

### 🏗️ Cloudflare-First Architecture

Unlike other starters that treat deployment as an afterthought, PageZero is designed specifically for Cloudflare's ecosystem:

- **Cloudflare Pages** for hosting
- **Cloudflare D1** for database
- **Cloudflare Workers** for serverless functions
- **Cloudflare R2** for file storage (easily configurable)

### 🔄 Full-Stack TypeScript

End-to-end type safety from your database schema to your React components:

- **Drizzle ORM** for type-safe database operations
- **Shared types** between frontend and backend
- **API route validation** with proper TypeScript inference

### 🛠️ Production-Ready Tooling

Not just a basic starter - includes everything you need for professional development:

- **Automated testing** with Vitest and Playwright
- **Code quality** with ESLint and Prettier
- **CI/CD pipeline** with GitHub Actions
- **Component library** with Storybook
- **Database migrations** and development workflows

## When to Use PageZero

PageZero is perfect for:

- **New web applications** that need modern architecture
- **MVPs and prototypes** that might scale
- **Side projects** where cost is a concern
- **Teams** that want consistent development practices
- **Developers** learning full-stack development

### Not Ideal For

PageZero might not be the best choice if you:

- **Already have** a well-established tech stack
- **Need specific databases** other than SQLite/D1
- **Require complex microservices** architecture
- **Can't use Cloudflare** due to compliance/regulatory requirements

## Community and Support

PageZero is open source and welcomes contributions:

- **GitHub Repository**: [pagezero-dev/pagezero](https://github.com/pagezero-dev/pagezero)
- **Issues and Discussions**: Report bugs and request features
- **MIT License**: Free to use for personal and commercial projects

## What's Next?

Ready to get started? Here's your path forward:

1. **[Quick Start](/getting-started/quick-start/)** - Get PageZero running locally
2. **[Technology Stack](/getting-started/tech-stack/)** - Understand the tools and why they were chosen
3. **[Development Guide](/guides/development/)** - Learn the development workflow
4. **[Deployment Setup](/guides/deployment/)** - Deploy to production

Let's build something amazing together! 🚀
