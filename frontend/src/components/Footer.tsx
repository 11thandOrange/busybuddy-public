import { Link } from 'react-router-dom';
import { SHOPIFY_APP_STORE_URL } from '../lib/constants';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Widgets', to: '/widgets' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
      { label: 'Get Started', to: SHOPIFY_APP_STORE_URL, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-2">
          <div className="font-display text-[20px] tracking-[1px]">
            BUSY<span className="text-accent">BUDDY</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Six lightweight widgets that turn your storefront into a conversion machine — no code
            required.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-bold">{col.title}</h4>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  {'external' in l && l.external ? (
                    <a
                      href={l.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="text-sm text-muted transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line px-6 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} BusyBuddy. All rights reserved.
      </div>
    </footer>
  );
}
