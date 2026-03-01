# CaffeHagen

## Local development

1. Install dependencies:
   ```sh
   npm ci
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```
3. Build production assets:
   ```sh
   npm run build
   ```

## GitHub Pages deployment

This repository is configured to build and publish automatically with **GitHub Actions**.

- Workflow file: `.github/workflows/deploy.yml`
- Trigger: push to `main` (or manual run from the Actions tab)
- Build output: `dist/`
- Deployment target: **GitHub Pages**

### One-time GitHub setup

1. Open **Settings → Pages** in your GitHub repository.
2. Under **Build and deployment**, choose **Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually).
4. After a successful run, your site will be available at:
   `https://<your-username>.github.io/CaffeHagen/`

> `vite.config.ts` already uses `base: "/CaffeHagen/"` so asset paths resolve correctly on GitHub Pages.
