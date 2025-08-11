---
title: Database Management
description: Learn how to work with Cloudflare D1 and Drizzle ORM in PageZero applications.
---

This guide covers database management in PageZero, including schema design, migrations, querying, and best practices for working with Cloudflare D1 and Drizzle ORM.

## Database Overview

PageZero uses **Cloudflare D1**, a serverless SQLite database that runs on Cloudflare's edge network, combined with **Drizzle ORM** for type-safe database operations.

### Key Benefits

- **Type Safety** - Full TypeScript integration
- **Edge Performance** - Global replication and low latency
- **Cost Effective** - Generous free tier
- **SQL Familiar** - Standard SQLite syntax
- **Zero Configuration** - No connection pooling or server management

## Schema Definition

### Basic Schema Structure

Define your database schema in `src/db/schema.ts`:

```typescript
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
})

// Posts table with foreign key
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  published: integer("published", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Export types for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
```

### Column Types and Options

```typescript
// Text columns
text("column_name") // TEXT
text("column_name", { length: 255 }) // TEXT with length constraint

// Integer columns
integer("column_name") // INTEGER
integer("column_name", { mode: "number" }) // JavaScript number
integer("column_name", { mode: "timestamp" }) // JavaScript Date
integer("column_name", { mode: "boolean" }) // JavaScript boolean

// Real columns
real("column_name") // REAL (floating point)

// JSON columns
text("metadata", { mode: "json" }) // JSON stored as TEXT
  // Constraints
  .primaryKey() // PRIMARY KEY
  .unique() // UNIQUE
  .notNull() // NOT NULL
  .default(value) // DEFAULT value
  .references(() => otherTable.column) // FOREIGN KEY
```

## Database Operations

### Database Client Setup

```typescript
// src/db/index.ts
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"

export function createDB(d1: D1Database) {
  return drizzle(d1, { schema })
}

// Type for your database instance
export type DB = ReturnType<typeof createDB>
```

### Basic CRUD Operations

#### Create (Insert)

```typescript
// Insert single record
const newUser = await db
  .insert(users)
  .values({
    id: crypto.randomUUID(),
    email: "user@example.com",
    name: "John Doe",
  })
  .returning()

// Insert multiple records
const newUsers = await db
  .insert(users)
  .values([
    { id: "1", email: "user1@example.com", name: "User One" },
    { id: "2", email: "user2@example.com", name: "User Two" },
  ])
  .returning()

// Insert with generated ID
const user = await db
  .insert(users)
  .values({
    id: crypto.randomUUID(),
    email: "new@example.com",
    name: "New User",
  })
  .returning()
  .get() // .get() returns single record
```

#### Read (Select)

```typescript
// Select all users
const allUsers = await db.select().from(users)

// Select with conditions
const activeUsers = await db.select().from(users).where(eq(users.active, true))

// Select specific columns
const userEmails = await db
  .select({
    id: users.id,
    email: users.email,
  })
  .from(users)

// Select with joins
const postsWithAuthors = await db
  .select({
    postId: posts.id,
    title: posts.title,
    authorName: users.name,
    authorEmail: users.email,
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))

// Pagination
const page = await db
  .select()
  .from(users)
  .limit(10)
  .offset(20)
  .orderBy(desc(users.createdAt))
```

#### Update

```typescript
// Update single record
await db.update(users).set({ name: "Updated Name" }).where(eq(users.id, userId))

// Update with returning
const updatedUser = await db
  .update(users)
  .set({ name: "New Name", updatedAt: new Date() })
  .where(eq(users.id, userId))
  .returning()
  .get()

// Conditional updates
await db
  .update(posts)
  .set({ published: true })
  .where(and(eq(posts.authorId, userId), eq(posts.published, false)))
```

#### Delete

```typescript
// Delete single record
await db.delete(users).where(eq(users.id, userId))

// Delete with conditions
await db
  .delete(posts)
  .where(
    and(
      eq(posts.authorId, userId),
      lt(posts.createdAt, new Date("2023-01-01")),
    ),
  )

// Delete with returning (to get deleted records)
const deletedPosts = await db
  .delete(posts)
  .where(eq(posts.published, false))
  .returning()
```

### Advanced Queries

#### Complex Filtering

```typescript
import {
  eq,
  ne,
  gt,
  lt,
  gte,
  lte,
  like,
  and,
  or,
  not,
  isNull,
  isNotNull,
} from "drizzle-orm"

// Multiple conditions
const recentActiveUsers = await db
  .select()
  .from(users)
  .where(
    and(
      eq(users.active, true),
      gte(users.createdAt, new Date("2024-01-01")),
      not(isNull(users.email)),
    ),
  )

// OR conditions
const importantPosts = await db
  .select()
  .from(posts)
  .where(or(eq(posts.featured, true), gt(posts.views, 1000)))

// Text search
const searchResults = await db
  .select()
  .from(posts)
  .where(like(posts.title, "%search term%"))
```

#### Aggregations and Grouping

```typescript
import { count, sum, avg, max, min } from "drizzle-orm"

// Count records
const userCount = await db.select({ count: count() }).from(users)

// Grouping with aggregation
const postsByAuthor = await db
  .select({
    authorId: posts.authorId,
    authorName: users.name,
    postCount: count(posts.id),
    avgViews: avg(posts.views),
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .groupBy(posts.authorId, users.name)
  .having(gt(count(posts.id), 5))
```

#### Subqueries

```typescript
// Subquery in WHERE clause
const prolificAuthors = await db
  .select()
  .from(users)
  .where(
    exists(
      db
        .select()
        .from(posts)
        .where(and(eq(posts.authorId, users.id), gt(posts.views, 1000))),
    ),
  )

// Subquery for aggregation
const usersWithPostCount = await db
  .select({
    id: users.id,
    name: users.name,
    postCount: db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.authorId, users.id)),
  })
  .from(users)
```

## Migrations

### Creating Migrations

```bash
# Generate migration after schema changes
npm run db:generate

# This creates a new migration file in migrations/
# Example: migrations/0001_initial_schema.sql
```

### Migration Files

Generated migration files contain SQL:

```sql
-- migrations/0001_create_users.sql
CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL
);

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
```

### Applying Migrations

```bash
# Apply migrations to local database
npm run db:migrate

# Migrations are automatically applied during deployment
# to both preview and production databases
```

### Migration Best Practices

1. **Always generate migrations** for schema changes
2. **Review generated SQL** before applying
3. **Test migrations locally** before deploying
4. **Avoid destructive changes** in production
5. **Use transactions** for complex migrations

## Database Utilities and Helpers

### Connection Management

```typescript
// src/db/connection.ts
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"

export function getDB(request: Request, env: Env) {
  return drizzle(env.DB, { schema })
}

// Usage in API routes
export async function onRequestPost({ request, env }) {
  const db = getDB(request, env)
  // ... use db
}
```

### Query Builders and Utilities

```typescript
// src/db/queries.ts
import { db } from "./index"
import { users, posts } from "./schema"
import { eq, and, desc } from "drizzle-orm"

export const userQueries = {
  async findById(id: string) {
    return db.select().from(users).where(eq(users.id, id)).get()
  },

  async findByEmail(email: string) {
    return db.select().from(users).where(eq(users.email, email)).get()
  },

  async create(userData: NewUser) {
    return db.insert(users).values(userData).returning().get()
  },

  async update(id: string, updates: Partial<User>) {
    return db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
      .get()
  },
}

export const postQueries = {
  async getPublishedPosts(limit = 10, offset = 0) {
    return db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset)
  },
}
```

### Error Handling

```typescript
import { LibSQLError } from "@libsql/client"

export async function safeDBOperation<T>(
  operation: () => Promise<T>,
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await operation()
    return { data }
  } catch (error) {
    if (error instanceof LibSQLError) {
      // Handle SQLite-specific errors
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return { error: "Record already exists" }
      }
      if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
        return { error: "Referenced record not found" }
      }
    }

    console.error("Database error:", error)
    return { error: "Database operation failed" }
  }
}

// Usage
const result = await safeDBOperation(() =>
  userQueries.create({ id: "123", email: "test@example.com", name: "Test" }),
)

if (result.error) {
  return Response.json({ error: result.error }, { status: 400 })
}
```

## Performance Optimization

### Indexing

```typescript
// Add indexes to your schema for better query performance
import { index } from "drizzle-orm/sqlite-core"

export const posts = sqliteTable(
  "posts",
  {
    // ... columns
  },
  (table) => ({
    // Index for faster author lookups
    authorIdx: index("author_idx").on(table.authorId),
    // Composite index for published posts by date
    publishedDateIdx: index("published_date_idx").on(
      table.published,
      table.createdAt,
    ),
    // Text search index (FTS would be better for real text search)
    titleIdx: index("title_idx").on(table.title),
  }),
)
```

### Query Optimization

```typescript
// Avoid N+1 queries with joins
// ❌ Bad: N+1 query problem
const posts = await db.select().from(posts)
for (const post of posts) {
  const author = await db
    .select()
    .from(users)
    .where(eq(users.id, post.authorId))
}

// ✅ Good: Single query with join
const postsWithAuthors = await db
  .select({
    post: posts,
    author: users,
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))

// Use prepared statements for repeated queries
const getUserById = db
  .select()
  .from(users)
  .where(eq(users.id, placeholder("id")))
  .prepare()

// Reuse prepared statement
const user1 = await getUserById.execute({ id: "user1" })
const user2 = await getUserById.execute({ id: "user2" })
```

### Caching Strategies

```typescript
// Simple in-memory cache for read-heavy data
const cache = new Map<string, { data: any; expires: number }>()

export async function getCachedUser(id: string) {
  const cacheKey = `user:${id}`
  const cached = cache.get(cacheKey)

  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  const user = await userQueries.findById(id)

  if (user) {
    cache.set(cacheKey, {
      data: user,
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    })
  }

  return user
}
```

## Testing Database Code

### Test Database Setup

```typescript
// tests/setup.ts
import { drizzle } from "drizzle-orm/d1"
import Database from "better-sqlite3"
import * as schema from "../src/db/schema"

export function createTestDB() {
  const sqlite = new Database(":memory:")
  return drizzle(sqlite, { schema })
}

export async function setupTestDB() {
  const db = createTestDB()

  // Run migrations
  await db.run(sql`
    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at INTEGER DEFAULT (unixepoch()) NOT NULL
    )
  `)

  return db
}
```

### Database Tests

```typescript
// tests/user.test.ts
import { describe, it, expect, beforeEach } from "vitest"
import { setupTestDB } from "./setup"
import { userQueries } from "../src/db/queries"

describe("User Queries", () => {
  let db: ReturnType<typeof setupTestDB>

  beforeEach(async () => {
    db = await setupTestDB()
  })

  it("should create a user", async () => {
    const userData = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    }

    const user = await userQueries.create(userData)

    expect(user).toMatchObject(userData)
    expect(user.createdAt).toBeInstanceOf(Date)
  })

  it("should find user by email", async () => {
    const userData = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    }

    await userQueries.create(userData)
    const user = await userQueries.findByEmail("test@example.com")

    expect(user).toMatchObject(userData)
  })
})
```

## Common Patterns and Best Practices

### Transaction Handling

```typescript
// Use transactions for related operations
export async function createUserWithProfile(
  userData: NewUser,
  profileData: any,
) {
  return await db.transaction(async (tx) => {
    const user = await tx.insert(users).values(userData).returning().get()

    const profile = await tx
      .insert(profiles)
      .values({
        ...profileData,
        userId: user.id,
      })
      .returning()
      .get()

    return { user, profile }
  })
}
```

### Soft Deletes

```typescript
// Add deletedAt column for soft deletes
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Query only non-deleted records
export const activeUsers = {
  async findAll() {
    return db.select().from(users).where(isNull(users.deletedAt))
  },

  async softDelete(id: string) {
    return db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.id, id))
  },
}
```

### Audit Logging

```typescript
export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  action: text("action").notNull(), // 'CREATE', 'UPDATE', 'DELETE'
  tableName: text("table_name").notNull(),
  recordId: text("record_id").notNull(),
  changes: text("changes", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export async function logAudit(
  userId: string,
  action: string,
  tableName: string,
  recordId: string,
  changes: any,
) {
  await db.insert(auditLog).values({
    id: crypto.randomUUID(),
    userId,
    action,
    tableName,
    recordId,
    changes,
  })
}
```

## Monitoring and Maintenance

### Database Health Checks

```typescript
export async function healthCheck() {
  try {
    // Simple query to verify database connectivity
    const result = await db.select({ count: count() }).from(users)
    return { status: "healthy", userCount: result[0].count }
  } catch (error) {
    return { status: "unhealthy", error: error.message }
  }
}
```

### Usage Monitoring

Monitor your D1 usage in the Cloudflare dashboard:

- **Read operations** per month
- **Write operations** per month
- **Storage used** in GB
- **Query performance** metrics

### Backup Strategies

```bash
# Export database for backup (manual process)
wrangler d1 export your-database-name --output backup-$(date +%Y%m%d).sql

# Consider automating backups through GitHub Actions
# or external backup services
```

Your database is now properly configured for scalable, type-safe operations! For more advanced topics, explore the [Performance Guide](/guides/performance/) and [API Reference](/reference/api/).
