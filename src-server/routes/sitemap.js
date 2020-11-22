const express = require('express');

const router = express.Router();

const routes = [
  'https://www.vaize.studio',
  'https://www.vaize.studio/projects/uppy-dogs',
  'https://www.vaize.studio/projects/rd',
  'https://www.vaize.studio/projects/rain',
  'https://www.vaize.studio/projects/hope-for-love',
  'https://www.vaize.studio/projects/oldies',
  'https://www.vaize.studio/projects/slots',
  'https://www.vaize.studio/projects/led',
  'https://www.vaize.studio/projects/wwwevent',
  'https://www.vaize.studio/projects/bomber-match',
  'https://www.vaize.studio/projects/design-pledge',
]
  .map(route => `<url><loc>${route}</loc></url>`)
  .join('\r\n');

router.get('/', async (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes}
</urlset>`,
  );
});

module.exports = router;
