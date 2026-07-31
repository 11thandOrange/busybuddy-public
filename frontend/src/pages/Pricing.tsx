import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

const TIERS = [
  {
    name: 'Starter',
    price: '$0',
    cadence: '/mo',
    blurb: 'For new stores testing the waters.',
    features: ['1 widget', 'Up to 1,000 views/mo', 'Community support'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$29',
    cadence: '/mo',
    blurb: 'For scaling stores that want it all.',
    features: ['All 6 widgets', 'Unlimited views', 'A/B testing', 'Priority support'],
    cta: 'Start 14-day trial',
    highlight: true,
  },
  {
    name: 'Plus',
    price: 'Custom',
    cadence: '',
    blurb: 'For high-volume & agencies.',
    features: ['Everything in Growth', 'Custom widgets', 'Dedicated CSM', 'SLA & SSO'],
    cta: 'Talk to sales',
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
          Simple, transparent pricing. Cancel anytime.
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
              <Link
                to="/get-started"
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold ${
                  t.highlight ? 'bg-accent text-white' : 'bg-ink text-white'
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
