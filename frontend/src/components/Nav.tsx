import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SHOPIFY_APP_STORE_URL } from '../lib/constants';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/widgets', label: 'Widgets' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="absolute left-0 right-0 top-[22px] z-20 flex items-center px-5 md:px-10">
      <Link to="/" className="font-display text-[20px] tracking-[1px]">
        BUSY<span className="text-accent">BUDDY</span>
      </Link>

      {/* Desktop pill nav */}
      <nav className="mx-auto hidden rounded-full bg-white p-[10px_12px] shadow-nav md:flex md:gap-1">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <a
        href={SHOPIFY_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto hidden rounded-full bg-ink px-[22px] py-3 text-[14px] font-semibold text-white md:inline-block"
      >
        Get Started
      </a>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ml-auto rounded-full bg-white p-3 shadow-nav md:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute left-4 right-4 top-[70px] z-30 rounded-2xl bg-white p-3 shadow-card md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `nav-link text-center ${isActive || location.pathname === l.to ? 'active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={SHOPIFY_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-ink px-[22px] py-3 text-center text-[14px] font-semibold text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
