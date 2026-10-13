require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});

app.use(express.json({ limit: '12kb' }));

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  if (clean(req.body?.website, 200)) return res.status(200).json({ ok: true });

  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 254);
  const phone = clean(req.body?.phone, 40);
  const message = clean(req.body?.message, 5000);

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (phone && !/^[+\d().\s-]{5,40}$/.test(phone)) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(503).json({ error: 'Email delivery is not configured yet. Please email me directly.' });
  }

  const rows = [
    ['Name', name || 'Not provided'],
    ['Email', email || 'Not provided'],
    ['Phone', phone || 'Not provided'],
  ];
  const htmlRows = rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('');
  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const safeMessage = escapeHtml(message || 'No message provided.').replace(/\r?\n/g, '<br>');

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to: process.env.SMTP_TO || 'deepakgirijala96@gmail.com',
      replyTo: email || undefined,
      subject: `Portfolio inquiry${name ? ` from ${name}` : ''}`,
      html: `<h2>New portfolio inquiry</h2>${htmlRows}<p><strong>Message:</strong></p><p>${safeMessage}</p>`,
      text: `New portfolio inquiry\n\n${textRows}\nMessage: ${message || 'No message provided.'}`,
    });
    return res.status(200).json({ ok: true });
  } catch (sendError) {
    console.error('SMTP contact email failed:', sendError.message);
    return res.status(502).json({ error: 'The email service could not send your message. Please try again.' });
  }
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Please submit a valid message.' });
  }
  return next(error);
});

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
const configuredPort = Number(process.env.PORT) || Number(new URL(backendUrl).port) || 3001;

if (require.main === module) {
  app.listen(configuredPort, () => {
    console.log(`Contact API listening at ${backendUrl}`);
  });
}

module.exports = app;
