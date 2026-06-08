# Sveltia CMS + GitHub OAuth Setup — afterly.com

## Context

- **Site**: useafterly.com (Vercel deployment)
- **Repo**: krish10007/afterly-landing (GitHub)
- **CMS**: Sveltia CMS v0.164.1 at useafterly.com/admin
- **Framework**: React + Vite, deployed on Vercel
- **Goal**: Fix the OAuth popup flow so the CMS login button works via browser popup (not just PAT)

---

## Current State (what already exists)

### `/public/admin/index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>afterly CMS</title>
  </head>
  <body>
    <script type="module" src="https://unpkg.com/@sveltia/cms@0.164.1/dist/sveltia-cms.mjs"></script>
  </body>
</html>
```

### `/public/admin/config.yml`
```yaml
backend:
  name: github
  repo: krish10007/afterly-landing
  branch: main
  base_url: https://www.useafterly.com
  auth_endpoint: /api/auth

media_folder: public/images
public_folder: /images

collections:
  - name: posts
    label: Blog Posts
    ...
```

### `/api/auth.js` — OAuth Step 1: redirects browser to GitHub
```js
export default function handler(req, res) {
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['host']
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    scope: 'repo,user',
    redirect_uri: `${proto}://${host}/api/callback`,
  })
  res.redirect(`https://github.com/login/oauth/authorize?${params}`)
}
```

### `/api/callback.js` — OAuth Step 2: exchanges code for token, postMessages to parent
```js
export default async function handler(req, res) {
  const { code } = req.query
  if (!code) { res.status(400).send('Missing code'); return }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `https://${req.headers['host']}/api/callback`,
    }),
  })

  const data = await tokenRes.json()
  if (data.error) { res.status(401).send(`OAuth error: ${data.error_description}`); return }

  const token = data.access_token

  res.setHeader('Content-Type', 'text/html')
  res.send(`<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify({token: "${token}", provider: "github"}),
      e.origin
    );
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`)
}
```

### `vercel.json` (relevant rewrites)
```json
{
  "rewrites": [
    { "source": "/admin", "destination": "/admin/index.html" },
    { "source": "/admin/:path*", "destination": "/admin/:path*" },
    { "source": "/:path*", "destination": "/" }
  ]
}
```

### Vercel Environment Variables (already set)
- `GITHUB_CLIENT_ID` — from the GitHub OAuth App
- `GITHUB_CLIENT_SECRET` — from the GitHub OAuth App

---

## The Problem

When clicking "Login with GitHub" in the CMS, a popup opens and goes through GitHub OAuth, but on return it shows **"Authentication aborted"** inside the popup and the parent CMS window never receives the token.

### Root cause hypothesis
Sveltia CMS v0.164.1 uses a specific postMessage handshake format. The current `callback.js` implementation:
1. Sends `"authorizing:github"` to `window.opener`
2. Then **waits** for a message back from the opener before sending the success payload

This matches the Netlify CMS / Decap CMS protocol. **Sveltia CMS may expect a different message format or sequence.**

---

## What to investigate and fix

### Step 1 — Read Sveltia CMS source to find exact expected postMessage protocol

Fetch the Sveltia CMS source to understand what messages the parent window sends and expects:

```
https://unpkg.com/@sveltia/cms@0.164.1/dist/sveltia-cms.mjs
```

Search for: `postMessage`, `authorizing`, `authorization`, `receiveMessage`, `opener`

What to look for:
- What message does the CMS send TO the popup window first?
- What exact string/format does it expect BACK from the popup?
- Does it expect `authorization:github:success:{...}` or a different format?
- Is the token expected as a JSON string or an object?

### Step 2 — Rewrite `callback.js` to match Sveltia's expected protocol

Based on what you find, update `callback.js`. The likely fix is one of:

**Option A** — Sveltia sends no initial message; callback should postMessage immediately on load:
```js
res.send(`...
<script>
window.opener.postMessage(
  'authorization:github:success:{"token":"${token}","provider":"github"}',
  window.opener.location.origin  // or '*'
);
window.close();
</script>
...`)
```

**Option B** — Sveltia expects a slightly different message format:
```js
// Try with object instead of serialized JSON in string
window.opener.postMessage({
  type: 'authorization:github:success',
  token: '${token}',
  provider: 'github'
}, '*')
```

**Option C** — Sveltia uses a relay: the popup should postMessage to `window.opener` AND call `window.close()` immediately without waiting:
```js
(function() {
  const msg = 'authorization:github:success:{"token":"${token}","provider":"github"}';
  window.opener.postMessage(msg, '*');
  setTimeout(() => window.close(), 500);
})();
```

### Step 3 — Verify GitHub OAuth App settings

In GitHub → Settings → Developer settings → OAuth Apps → afterly:
- **Homepage URL**: `https://www.useafterly.com`
- **Authorization callback URL**: `https://www.useafterly.com/api/callback`

Both must match exactly (www vs non-www matters).

Also verify the same base_url in `config.yml` matches what Vercel deploys as the canonical domain.

### Step 4 — Test

1. Push changes to GitHub → Vercel auto-deploys
2. Go to useafterly.com/admin
3. Click "Login with GitHub"
4. In the popup: approve in GitHub
5. Popup should close automatically; CMS should show the post list

If still failing, open browser DevTools → Console on the `/admin` page while the popup runs. Look for:
- What messages are being received/sent
- Any `postMessage` errors or cross-origin issues

---

## Fallback (already working)

PAT login works. User can log in via the "Sign in with personal access token" option using a GitHub PAT with `repo` scope. This is the current working workaround.

---

## Files to edit

| File | Change needed |
|---|---|
| `/api/callback.js` | Rewrite postMessage logic to match Sveltia v0.164.1 protocol |
| `/public/admin/config.yml` | Verify `base_url` matches canonical domain |
| GitHub OAuth App settings | Verify callback URL |

**Do NOT change:**
- `vercel.json` (rewrites are correct)
- `public/admin/index.html` (loads correct Sveltia v0.164.1 .mjs)
- `api/auth.js` (OAuth redirect is correct)
- Any `src/` files (unrelated to CMS)

---

## Tech stack reminder

- Vercel serverless functions live in `/api/*.js` (CommonJS or ESM with `export default`)
- Current callback.js uses `export default` (ESM) — keep it that way
- No build step needed for `/api` functions; Vercel runs them directly
- Environment variables are set in Vercel dashboard (not in any .env file in repo)
