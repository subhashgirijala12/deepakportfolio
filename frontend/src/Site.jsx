import React from 'react';
import { Link } from 'react-router-dom';
import './Site.css';

export const NAV = ['about', 'experience', 'skills', 'education', 'contact'];
export const EMAIL = 'deepakgirijala96@gmail.com';

export const Header = ({ portfolio = false }) => (
  <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className={`nav${portfolio ? ' nav-portfolio' : ''}`}>
      {portfolio ? <div className="availability"><span />Software Engineer / Triosys Technosol</div> : (
        <Link to="/" className="brand" aria-label="Deepak Girijala, home">
          <span className="brand-mark" aria-hidden="true">D</span>
          <span className="brand-name">Deepak Girijala<span>SOFTWARE ENGINEER</span></span>
        </Link>
      )}
      <nav aria-label="Main navigation">
        {portfolio && <Link className="nav-home" to="/">Home</Link>}
        {NAV.filter((n) => ['about', 'skills', 'experience', 'contact'].includes(n)).map((n) => {
          const label = { about: 'About', skills: 'Tools', experience: 'Experience', contact: 'Contact' }[n];
          return <Link key={n} to={`/#${n}`}>{label}</Link>;
        })}
      </nav>
      {portfolio && <Link className="nav-cta" to="/#contact">Let’s talk <span aria-hidden="true">↗</span></Link>}
    </header>
  </>
);

export const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Girijala Deepak Naga Subhash</p>
    <div>
      <Link to="/terms">Terms and Conditions</Link>
      <Link to="/privacy">Privacy Policy</Link>
      <a href={`mailto:${EMAIL}`}>Email</a>
    </div>
  </footer>
);

export const Backdrop = () => (
  <div className="backdrop" aria-hidden="true">
    <span className="backdrop-orb orb-green" />
    <span className="backdrop-orb orb-sand" />
    <span className="backdrop-orb orb-mint" />
    <span className="backdrop-grid" />
  </div>
);
