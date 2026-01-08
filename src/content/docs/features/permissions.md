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

## Protecting Pages

Use `requireUserPermissions` in your loader to restrict access by permission:

```tsx
import { requireUserId } from "@/auth"
import { requireUserPermissions } from "@/permissions"

export async function loader({ request, context: { db, session } }: Route.LoaderArgs) {
  const userId = await requireUserId(request, session)
  await requireUserPermissions(db, userId, ["viewPremiumContent"])
  // User has permission, continue...
}
```

Or check for a specific role:

```tsx
import { hasUserRole } from "@/permissions"

const isElite = await hasUserRole(db, userId, "elite")
```

## Granting & Revoking Access

Assign or remove roles from users:

```tsx
import { grantUserRole, revokeUserRole } from "@/permissions"

// After a purchase
await grantUserRole(db, userId, "premium")

// When subscription ends
await revokeUserRole(db, userId, "premium")
```
