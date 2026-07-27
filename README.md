# Deployment Guide for Cloudflare Pages

1. **Create the Database:**
   ```bash
   npx wrangler d1 create copa-haxel-db
   ```
   *Take note of the `database_id` provided in the terminal output.*

2. **Configure Wrangler:**
   Open `wrangler.toml` in your code editor and update the `database_id` field under the `[[d1_databases]]` section with the ID you received in Step 1.

3. **Initialize the Database Schema:**
   Run this command to create the necessary tables in your Cloudflare D1 database:
   ```bash
   npx wrangler d1 execute copa-haxel-db --file=./schema.sql --remote
   ```

4. **Deploy to Cloudflare Pages:**
   *Important:* If you haven't logged in, run `npx wrangler login` first.
   Then, deploy the application using the Pages direct deployment feature:
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=copa-haxel
   ```
   **Note**: With the newest `@astrojs/cloudflare` version and Astro 5+, you must deploy the `dist` directory when using `pages deploy`. Wrangler automatically bundles `_worker.js` found in `dist/server` into the final deployment.
