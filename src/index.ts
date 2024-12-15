import { join } from 'path';
import express from 'express';
import { readFileSync } from 'fs';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';

import shopify from './shopify.js';

import test from './controllers/test.ts';
dotenv.config();

const backendPort = process.env.BACKEND_PORT as string;
const envPort = process.env.PORT as string;
const PORT = parseInt(backendPort || envPort, 10);

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: {} })
);

app.use(express.json());

// All endpoints after this point will require an active session
app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(serveStatic(`${process.cwd()}/frontend/`, { index: false }));

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res) => {
  console.log('here1');
  
  const htmlContent = readFileSync(
    join(`${process.cwd()}/frontend/`, 'index.html'),
    'utf-8'
  );
  console.log('here2');
  const transformedHtml = htmlContent.replace(
    /%SHOPIFY_API_KEY%/g,
    process.env.SHOPIFY_API_KEY || ''
  );

  res.status(200).set('Content-Type', 'text/html').send(transformedHtml);
});

app.use('/cart-data', test);


app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
