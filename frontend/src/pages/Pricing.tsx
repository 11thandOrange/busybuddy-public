import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SHOPIFY_APP_STORE_URL } from '../lib/constants';

// Mirrors the real plans in BusyBuddy_v2's subscriptionConfig.js exactly
// (maxApps/allowedApps/price/features) - Free only allows Announcement Bar
// and Inactive Tab Message; Starter and Advanced can both use all 6 widgets,
// the difference is how many can be enabled at once (3 vs 6). Plan
// selection happens inside the app after install (see Plan.jsx), not on
// this marketing site, so every tier's CTA leads to the App Store listing.
const TIERS = [
  {
    name: 'Free',
    price: '$0',
    cadence: '/mo',
    blurb: 'Try one widget before you commit to more.',
    features: [
      '1 widget enabled',
      'Announcement Bar or Inactive Tab Message',
      'Basic messaging features',
    ],
    cta: 'Install Free',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$30',
    cadence: '/mo',
    blurb: 'For stores ready to run more than one widget.',
    features: [
      '3 widgets enabled at once',
      'All 6 widgets available to choose from',
      'Priority support',
    ],
    cta: 'Get Starter',
    highlight: true,
  },
  {
    name: 'Advanced',
    price: '$60',
    cadence: '/mo',
    blurb: 'Every widget, running at the same time.',
    features: ['All 6 widgets enabled at once', 'Complete feature set', '24/7 support'],
    cta: 'Get Advanced',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl">
        <h1 className="huge !text-[clamp(48px,9vw,110px)]">
          PRICING<span className="slash">/</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Simple, transparent pricing. Cancel anytime from inside the app.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-3xl border p-8 ${
                t.highlight ? 'border-ink bg-ink text-white shadow-card' : 'border-line bg-white/90'
              }`}
            >
              <div className="text-sm font-semibold uppercase tracking-wide opacity-70">
                {t.name}
              </div>
              <div className="mt-3 font-display text-5xl">
                {t.price}
                <span className="text-lg opacity-60">{t.cadence}</span>
              </div>
              <p className={`mt-2 text-sm ${t.highlight ? 'text-white/70' : 'text-muted'}`}>
                {t.blurb}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={SHOPIFY_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold ${
                  t.highlight ? 'bg-accent text-white' : 'bg-ink text-white'
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Have questions before you install?{' '}
          <Link to="/contact" className="font-semibold text-ink underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
}
