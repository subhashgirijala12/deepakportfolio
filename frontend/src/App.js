import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import Home from './Home';
import Legal from './Legal';

function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  useEffect(() => {
    const navigationEntry = window.performance.getEntriesByType('navigation')[0];
    if (navigationType === 'POP' && navigationEntry?.type === 'reload' && hash) {
      navigate(`${pathname}${search}`, { replace: true });
      window.scrollTo(0, 0);
      return;
    }
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash, navigationType, navigate]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Legal type="terms" />} />
        <Route path="/privacy" element={<Legal type="privacy" />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
