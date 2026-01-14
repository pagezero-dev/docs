---
title: CLI
---

Command-line tool for scaffolding and upgrading PageZERO projects. Initialize new projects with a single command or upgrade existing ones to the latest version.

**Key features**

- Interactive project initialization
- Automatic dependency installation
- Git repository setup
- Upgrade existing projects
- Support for both open-source and PowerUP editions

## Installation

The CLI is designed to be used via `bunx` without global installation:

```bash
bunx pagezero@latest <command>
```

## Commands

### init

Initialize a new PageZERO project:

```bash
bunx pagezero@latest init
```

For the PowerUP edition:

```bash
bunx pagezero@latest init --powerup
```

**What it does:**

1. Prompts for your project name
2. Clones the PageZERO repository
3. Installs dependencies (`bun install`)
4. Runs the setup script (`bun run setup`)
5. Updates `wrangler.json` with your project name
6. Initializes a fresh git repository with an initial commit

After completion, you'll have a ready-to-run project:

```bash
cd <your-project-name>
bun dev
```

### upgrade

Upgrade an existing PageZERO project to the latest version:

```bash
bunx pagezero@latest upgrade
```

For the PowerUP edition:

```bash
bunx pagezero@latest upgrade --powerup
```

**Requirements:**

- Must be run from within a PageZERO project directory (requires `wrangler.json`)
- Requires `rsync` to be installed on your system

**How it works:**

1. Downloads the latest PageZERO stack
2. Copies new files to your project (excluding `.git`)
3. Cleans up temporary files

**Important:** The upgrade command overwrites existing files. After upgrading, review the changes using `git diff` to ensure your customizations are preserved.

## Options

| Option | Description |
|--------|-------------|
| `-p, --powerup` | Use PowerUP edition instead of open-source |
| `-h, --help` | Display help information |

## Requirements

- **Bun**: Version 1.3 or higher
- **rsync**: Required for the upgrade command (pre-installed on macOS and most Linux distributions)
