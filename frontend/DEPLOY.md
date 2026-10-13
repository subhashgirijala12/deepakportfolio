# Deploy notes

## Custom domain

The application has a custom favicon, page metadata, and SPA rewrites for `/terms` and `/privacy`. The canonical URL should be set after the final domain is selected; no placeholder domain is published in the HTML.

1. Add your registered domain in the hosting provider's custom domain settings.
2. Add the exact DNS records supplied by that host at your domain registrar.
3. Wait for domain verification, then enable HTTPS in the host settings.
4. Set the canonical URL and social preview URL in `public/index.html` to the live HTTPS origin.

The current resume lists the default `onrender.com` portfolio URL. To finish this setup, use the final domain and confirm whether Render or another platform is hosting the deployment.

## Local development

Install dependencies in both folders with `npm install --prefix frontend` and `npm install --prefix backend`. In the repository root, run `npm run dev` for React and `npm run dev:api` in a second terminal for Express. Copy `frontend/.env.example` to `frontend/.env` and `backend/.env.example` to `backend/.env`; put SMTP credentials only in `backend/.env`. For this LAN, the examples use `http://192.168.0.144:3000` for React and `http://192.168.0.144:3001` for the API. Restart both processes after changing these URLs.

The frontend reads `REACT_APP_BACKEND_URL` when it builds. The backend reads `FRONTEND_URL` for CORS and `BACKEND_URL`/`PORT` for its local address.

## Contact form email

The contact form sends its optional name, email, phone number, and message to the separate Express service in `../backend/server.js`. SMTP credentials stay in the backend environment and are never included in the React build.

### Gmail SMTP setup

Use a Gmail account as the sending account; you do not need to buy a domain. Turn on 2-Step Verification for that Google account, create an App Password, and set `SMTP_USER` to that Gmail address and `SMTP_PASS` to the generated App Password. Keep `SMTP_FROM` the same as `SMTP_USER`, and set `SMTP_TO` to the inbox that should receive inquiries. Never use your normal Google password or commit these values.

### Vercel

Deploy the frontend and backend as separate Vercel projects. Set the frontend project's **Root Directory** to `frontend`; set the backend project's **Root Directory** to `backend`.

1. Deploy the backend project and set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER`, `SMTP_PASS` (Google App Password), `SMTP_FROM` (same Gmail address), `SMTP_TO` (recipient inbox), `FRONTEND_URL` (the deployed frontend origin), and `BACKEND_URL` (the deployed backend origin) in its Environment Variables.
2. In the frontend project's Environment Variables, set `REACT_APP_BACKEND_URL` to the deployed backend origin, for example `https://your-backend.vercel.app` (no `/api/contact` suffix). This is public configuration, not a secret. Do not use `localhost` or the LAN IP in a deployed frontend.
3. Redeploy both projects after saving the variables. Changes to `REACT_APP_BACKEND_URL` require a new frontend build because Create React App embeds it into the static JavaScript bundle.
4. Open `https://your-backend.vercel.app/api/health` and confirm it returns `{"ok":true}`. Then submit the contact form from the deployed frontend. Set `FRONTEND_URL` to the exact frontend origin (scheme and host, no path); for multiple frontend domains, separate origins with commas.

Do not put SMTP credentials in a `REACT_APP_` variable or commit either `.env` file. The frontend `.env.example` contains only the public backend URL. Gmail SMTP has account sending limits and is intended here for low-volume personal contact inquiries.
