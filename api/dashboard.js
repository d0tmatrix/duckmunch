const db = require('./utils/db');

module.exports = async (req, res) => {
  console.log('hit dashboard.js: ' + req.headers.authorization)
  let auth = new Buffer.from((req.headers.authorization || '').split(' ')[1] || '', 'base64').toString();
  if (auth !== process.env.AUTH_CREDS) {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Duckmunch Dashboard"' });
    res.end('HTTP Error 401 Unauthorized: Access is denied');
    return;
  }
  let data = await db.feeds.find()
  res.json(data);
}
