---
title: Authentication
---

Self-owned authentication using **OTP (One-Time Password)** via email. No third-party auth services required.

## How It Works

1. User enters email on `/login`
2. System sends a 6-digit code to their email
3. User enters the code
4. Session is created

## Login Page

The `/login` route handles the entire auth flow. It supports a `redirectTo` query parameter:

```
/login?redirectTo=/dashboard
```

After successful authentication, the user is redirected to the specified URL.

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

Use the `useUser` hook to get the current user on the client:

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

## Logout

Send a POST request to `/logout` to end the session:

```tsx
<Form method="post" action="/logout">
  <button type="submit">Sign out</button>
</Form>
```

## Session Details

- **Duration:** 7 days
- **OTP expiration:** 5 minutes
- **Cookie:** `httpOnly`, `secure`, `sameSite: strict`

## Captcha (Optional)

Enable [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) to protect against bots.

1. Create a Turnstile widget in your Cloudflare dashboard
2. Configure `CLOUDFLARE_TURNSTILE_PUBLIC_KEY` and `CLOUDFLARE_TURNSTILE_SECRET_KEY`

The captcha appears automatically on the login page when configured.

## Setup

Authentication requires `SESSION_COOKIE_SECRET` and `OTP_SECRET` environment variables. See [Deployment](/getting-started/deployment) for configuration details.
