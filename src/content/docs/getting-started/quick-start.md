---
title: Quick Start
description: Get up and running with PageZero in minutes.
---

Get PageZero up and running in just a few minutes. This guide will walk you through setting up a new PageZero project and running it locally.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git**

## Installation

### Method 1: Clone the Repository (Recommended)

Clone the PageZero repository and set up your project:

```bash
# Clone the repository
git clone --depth 1 https://github.com/pagezero-dev/pagezero.git my-project-name

# Navigate to your project
cd my-project-name

# Run the setup script
npm run setup

# Start the development server
npm run dev
```

### Method 2: Using GitHub CLI (Alternative)

If you have the GitHub CLI installed, you can create a new repository based on PageZero:

```bash
# Create a new repository from the PageZero template
gh repo create my-project-name -c --template pagezero-dev/pagezero

# Navigate to your project
cd my-project-name

# Install dependencies and setup
npm run setup

# Start the development server
npm run dev
```

## What the Setup Script Does

The `npm run setup` command performs several important initialization tasks:

1. **Installs dependencies** - Downloads all required npm packages
2. **Sets up environment variables** - Creates basic `.env` files
3. **Initializes the database** - Sets up your local SQLite database
4. **Installs Playwright browsers** - Downloads browser drivers for E2E testing

## Verify Your Installation

After running the setup, you should be able to:

1. **Access your app** at [http://localhost:3000](http://localhost:3000)
2. **See the development page** with PageZero branding
3. **Hot reload** - Try editing a file and see changes instantly

## Next Steps

Now that you have PageZero running locally, here's what to explore next:

### 🏗️ Understanding the Stack

Learn about the [technologies and tools](/getting-started/tech-stack/) that power PageZero.

### 🛠️ Development Workflow

Understand the [development process](/guides/development/) and available commands.

### 🚀 Deployment Setup

When you're ready to deploy, follow the [deployment guide](/guides/deployment/) to set up Cloudflare hosting.

### 🧪 Testing

Learn how to run and write [tests](/guides/testing/) for your application.

## Troubleshooting

### Common Issues

**Port 3000 is already in use**

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill

# Or run on a different port
npm run dev -- --port 3001
```

**Node.js version issues**

```bash
# Check your Node.js version
node --version

# If you need to upgrade, visit https://nodejs.org
# Or use a Node version manager like nvm
```

**Permission errors during setup**

```bash
# On macOS/Linux, you might need to use sudo for global packages
sudo npm run setup

# Or fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors
```

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/pagezero-dev/pagezero/issues) for similar problems
2. Search the documentation for specific topics
3. Create a new issue with details about your problem

## Project Structure Overview

Your new PageZero project includes:

```
my-project-name/
├── apps/                 # Application code
├── packages/             # Shared packages
├── functions/            # Cloudflare Workers functions
├── public/               # Static assets
├── e2e/                  # End-to-end tests
├── .github/              # GitHub Actions workflows
└── package.json          # Project configuration
```

You're now ready to start building with PageZero! 🎉
