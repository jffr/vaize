const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const secure = require('express-force-https');
const contact = require('./src-server/routes/contact');
const sitemap = require('./src-server/routes/sitemap');

require('dotenv').config();

// Create HTTP server
const app = express();
const port = process.env.PORT || 5000;
app.listen(port);

// Middleware
app.use(secure);
app.use(cors({
  origin: process.env.APP_HOST,
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.json());
app.use(history());

// Defining routes
app.use('/contact', contact);
app.use('/sitemap.xml', sitemap);

// Setting up static server
app.use(express.static(`${__dirname}/dist`));

// eslint-disable-next-line no-console
console.log(`Server started ${port}`);
