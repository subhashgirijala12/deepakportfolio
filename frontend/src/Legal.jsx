import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Backdrop, EMAIL } from './Site';
import './Home.css';

const UPDATED = 'September 28, 2026';

const docs = {
  terms: { title: 'Terms and Conditions', intro: 'A few straightforward terms for using this personal portfolio.', sections: [
    ['About this site', 'This site presents the work, experience, and contact details of Girijala Deepak Naga Subhash. By using it, you agree to these terms.'],
    ['Content and ownership', 'The text, design, and code on this site are mine unless stated otherwise. Company names belong to their respective owners. Please ask before reproducing or republishing my content.'],
    ['Resume', 'The downloadable resume is provided for recruitment and professional networking. Please do not redistribute it or use it for unsolicited marketing.'],
    ['External links', 'Links to services such as LinkedIn and GitHub lead to sites I do not control. Their own terms and privacy practices apply when you visit them.'],
    ['Accuracy and availability', 'I work to keep the information current, but it is provided as is and may change. I cannot guarantee that the site will always be available or error-free.'],
    ['Liability', 'To the extent permitted by law, I am not liable for losses arising from use of this site or reliance on its content.'],
    ['Governing law', 'These terms are governed by the laws of India. Disputes fall under the jurisdiction of the courts of Hyderabad, Telangana.'],
    ['Changes', 'These terms may be revised. The date at the top of this page shows the latest update.'],
  ]},
  privacy: { title: 'Privacy Policy', intro: 'This site is a simple portfolio. Here is what happens to information when you visit or contact me.', sections: [
    ['Information collected by this site', 'This site has no analytics, advertising trackers, or contact form. It does not ask you to create an account or submit personal information.'],
    ['When you contact me', `If you email or call me, I receive the contact details and information you choose to share. I use it to respond and do not sell it. Email and phone services may process that information under their own privacy practices.`],
    ['Hosting logs', 'The hosting provider may process standard technical information, such as IP address and browser type, for security and reliability. Its retention and use of server logs are governed by the provider’s policies.'],
    ['Cookies and browser storage', 'This site does not set cookies or store information in your browser.'],
    ['External links', 'If you choose to open LinkedIn or GitHub, those services may collect information under their own policies.'],
    ['Your choices', `You can ask me about correspondence you have sent by emailing ${EMAIL}.`],
    ['Children', 'This portfolio is intended for professional audiences and is not directed at children.'],
    ['Changes', 'If this policy changes, I will update the date at the top of this page.'],
  ]},
};

export default function Legal({ type }) {
  const d = docs[type];
  return (
    <div className="page">
      <Backdrop />
      <Header />
      <main id="main-content" className="legal-main">
        <article className="legal-document">
          <Link className="legal-back" to="/">Back to portfolio</Link>
          <p className="section-kicker">Site information</p>
          <h1>{d.title}</h1>
          <p className="legal-intro">{d.intro}</p>
          <p className="legal-date">Last updated: {UPDATED}</p>
          <div className="legal-sections">
            {d.sections.map(([h, t]) => (
              <section key={h}><h2>{h}</h2><p>{t}</p></section>
            ))}
            <section><h2>Contact</h2><p>For questions about this page, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p></section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
