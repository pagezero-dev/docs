---
title: Authentication
---

Built-in authentication using **OTP (One-Time Password)** via email. No third-party auth services required. No passwords to store or reset. Users don't need to remember credentials. Simple to implement, secure by design, and works for most applications.


**How it works**

1. User clicks on "Login" button
1. User enters email on `/login`
1. System sends a 6-digit code to their email
1. User enters the code
1. Session is created

## Setup

Authentication requires `SESSION_COOKIE_SECRET` and `OTP_SECRET` environment variables. For local development, these are already configured in the `.env` file. For production, see [Cloudflare setup](/getting-started/deployment#cloudflare-setup).

**Captcha (optional):** Enable [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) to protect against bots. 
The captcha appears automatically on the login page when configured. For local development it's already configured and Turnstile always passes. For production, create a Turnstile widget in your Cloudflare dashboard, then configure `CLOUDFLARE_TURNSTILE_PUBLIC_KEY` in `wrangler.json` (under `vars`) and `CLOUDFLARE_TURNSTILE_SECRET_KEY` as a secret as stated in [Cloudflare setup](/getting-started/deployment#cloudflare-setup)

## Login & Logout

Login and logout buttons are already included in the header (`apps/content/routes/layout.tsx`).

The `/login` route handles the entire auth flow. It supports a `redirectTo` query parameter:

```
/login?redirectTo=/dashboard
```

After successful authentication, the user is redirected to the specified URL.

To sign out, send a POST request to `/logout`:

```tsx
<Form method="post" action="/logout">
  <button type="submit">Sign out</button>
</Form>
```

## Protecting Pages

Use `requireUserId` in your loader to restrict access:

```tsx
import { requireUserId } from "@/auth"

export async function loader({ request, context: { session } }: Route.LoaderArgs) {
  const userId = await requireUserId(request, session)
  // User is authenticated, continue...
}
```

If not authenticated, the user is redirected to `/login` with a `redirectTo` parameter pointing back to the current page.

## Accessing User Data

**On the client**, use the `useUser` hook:

```tsx
import { useUser } from "@/user"

function MyComponent() {
  const { data } = useUser()
  
  if (data?.user) {
    return <p>Hello, {data.user.email}</p>
  }
  
  return <p>Not signed in</p>
}
```

**On the server**, use `requireUserId` and `getUserById`:

```tsx
import { requireUserId } from "@/auth"
import { getUserById } from "@/user"

export async function loader({ request, context: { db, session } }: Route.LoaderArgs) {
  const userId = await requireUserId(request, session)
  const user = await getUserById(db, userId)
  // ...
}
```

## Session Details

- **Duration:** 7 days
- **OTP expiration:** 5 minutes
- **Cookie:** `httpOnly`, `secure`, `sameSite: strict`
