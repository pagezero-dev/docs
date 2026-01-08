---
title: Permissions
---

A simple RBAC (Role-Based Access Control) system with a twist: roles live in the database, while permissions are defined in config.

**How it works**

```
User → Roles (DB) → Permissions (Config)
```

- **Users** are assigned **roles** (stored in `user_roles` database table)
- **Roles** map to **permissions** (defined in `packages/config/index.ts`)

This hybrid approach keeps role assignments flexible (database) while keeping permission definitions simple and version-controlled (config).

## Configuration

Define roles and their permissions in `packages/config/index.ts`:

```ts
const config = {
  permissions: {
    roleToPermissions: {
      premium: {
        viewPremiumContent: true,
      },
      elite: {
        viewPremiumContent: true,
        viewEliteContent: true,
      },
    },
  },
}
```

## API

All functions are exported from `@/permissions`.

| Function | Purpose |
|----------|---------|
| `requireUserPermissions(db, userId, permissions)` | Throws 403 if user lacks **any** of the specified permissions |
| `requireUserRole(db, userId, roleName)` | Throws 403 if user doesn't have the role |
| `hasUserRole(db, userId, roleName)` | Returns `boolean` — use when you need to check without throwing |
| `grantUserRole(db, userId, roleName)` | Assigns a role to user |
| `revokeUserRole(db, userId, roleName)` | Removes a role from user |

**Examples**

```ts
// Protecting a route
import { requireUserPermissions } from "@/permissions"

export async function loader({ context }: Route.LoaderArgs) {
  const userId = await requireAuth(context)
  await requireUserPermissions(context.db, userId, ["viewPremiumContent"])
}

// Conditional check
const isElite = await hasUserRole(db, userId, "elite")

// Granting access
await grantUserRole(db, userId, "premium")
```
