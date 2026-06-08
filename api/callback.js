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
      redirect_uri: `https://${req.headers['host']}/api/callback`,
    }),
  })

  const data = await tokenRes.json()

  if (data.error) {
    res.status(401).send(`OAuth error: ${data.error_description}`)
    return
  }

  const token = data.access_token

  res.setHeader('Content-Type', 'text/html')
  res.send(`<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body style="font-family:monospace;padding:20px;background:#111;color:#eee">
<p id="s1">Checking opener...</p>
<p id="s2">-</p>
<p id="s3">-</p>
<script>
(function() {
  var s1 = document.getElementById('s1');
  var s2 = document.getElementById('s2');
  var s3 = document.getElementById('s3');

  if (!window.opener) {
    s1.textContent = 'ERROR: window.opener is null — cannot communicate with CMS';
    return;
  }
  s1.textContent = 'opener: OK';

  window.addEventListener("message", function(e) {
    s2.textContent = 'CMS responded from: ' + e.origin + ' | data: ' + e.data;
    try {
      window.opener.postMessage(
        'authorization:github:success:{"token":"${token}","provider":"github"}',
        e.origin
      );
      s3.textContent = 'Token sent. Waiting for CMS to close this window...';
    } catch(err) {
      s3.textContent = 'ERROR sending token: ' + err.message;
    }
  }, false);

  window.opener.postMessage("authorizing:github", "*");
  s2.textContent = 'Sent "authorizing:github" — waiting for CMS response...';
})();
</script>
</body>
</html>`)
}
