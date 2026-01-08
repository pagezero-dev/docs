---
title: Permissions
---

A simple RBAC (Role-Based Access Control) system with a twist: **roles live in the database**, while **permissions are defined in config**.

## How It Works

```
User → Roles (DB) → Permissions (Config)
```

- **Users** are assigned **roles** (stored in `user_roles` table)
- **Roles** map to **permissions** (defined in `config.permissions.roleToPermissions`)

This hybrid approach keeps role assignments flexible (database) while keeping permission definitions simple and version-controlled (config).

## Configuration

Define roles and their permissions in `packages/config/index.ts`:

```ts
export const userRoles = ["premium", "elite"] as const

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

## API Reference

All functions are exported from `@/permissions`.

### Check & Enforce

| Function | Purpose |
|----------|---------|
| `requireUserPermissions(db, userId, permissions)` | Throws 403 if user lacks **any** of the specified permissions |
| `requireUserRole(db, userId, roleName)` | Throws 403 if user doesn't have the role |
| `hasUserRole(db, userId, roleName)` | Returns `boolean` — use when you need to check without throwing |

### Manage Roles

| Function | Purpose |
|----------|---------|
| `grantUserRole(db, userId, roleName)` | Assigns a role to user |
| `revokeUserRole(db, userId, roleName)` | Removes a role from user |

## Usage Examples

### Protecting a Route

```ts
import { requireUserPermissions } from "@/permissions"

export async function loader({ context }: Route.LoaderArgs) {
  const userId = await requireAuth(context)
  await requireUserPermissions(context.db, userId, ["viewPremiumContent"])
  
  // User has access — continue
}
```

### Conditional UI

```ts
import { hasUserRole } from "@/permissions"

const isElite = await hasUserRole(db, userId, "elite")
```

### Granting Access After Purchase

```ts
import { grantUserRole } from "@/permissions"

await grantUserRole(db, userId, "premium")
```

## Database Schema

The `user_roles` table links users to roles:

| Column | Type | Description |
|--------|------|-------------|
| `user_id` | integer | References `users.id` |
| `role_name` | text | One of the defined roles |

Primary key: `(user_id, role_name)` — a user can have multiple roles.

## Type Safety

The system provides full type inference:

- `Role` — union of all role names from config
- `Permission` — union of all permission keys across all roles
