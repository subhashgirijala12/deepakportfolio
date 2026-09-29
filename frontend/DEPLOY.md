# Deploy notes

## Custom domain

The application has a custom favicon, page metadata, and SPA rewrites for `/terms` and `/privacy`. The canonical URL should be set after the final domain is selected; no placeholder domain is published in the HTML.

1. Add your registered domain in the hosting provider's custom domain settings.
2. Add the exact DNS records supplied by that host at your domain registrar.
3. Wait for domain verification, then enable HTTPS in the host settings.
4. Set the canonical URL and social preview URL in `public/index.html` to the live HTTPS origin.

The current resume lists the default `onrender.com` portfolio URL. To finish this setup, use the final domain and confirm whether Render or another platform is hosting the deployment.

## Commands
npm install && npm start   (development)
npm run build              (production build in /build)
