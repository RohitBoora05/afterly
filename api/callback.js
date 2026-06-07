export default async function handler(req, res) {
  const { code } = req.query
  if (!code) {
    res.status(400).send('Missing code')
    return
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  const data = await tokenRes.json()

  if (data.error) {
    res.status(401).send(`OAuth error: ${data.error_description}`)
    return
  }

  const token = data.access_token
  const content = `<!doctype html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          e.origin
        );
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })()
  <\/script></body></html>`

  res.setHeader('Content-Type', 'text/html')
  res.send(content)
}
