import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { fetchHealth } from '../lib/api';
import type { HealthResponse } from '@busybuddy/shared';

const STEPS = [
  {
    title: '1. Install',
    body: 'Add BusyBuddy from the app store in one click. No theme code changes required.',
  },
  {
    title: '2. Configure',
    body: 'Pick a widget, match your brand colors and copy, and choose placement in the editor.',
  },
  {
    title: '3. Publish',
    body: 'Hit publish. Widgets go live instantly and start lifting conversion from day one.',
  },
];

export default function Docs() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchHealth().then((h) => {
      if (!cancelled) setHealth(h);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const recheck = async () => {
    setChecking(true);
    const h = await fetchHealth();
    setHealth(h);
    setChecking(false);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <h1 className="huge !text-[clamp(48px,9vw,110px)]">
          DOCS<span className="slash">/</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">Get up and running in three steps.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-line bg-white/90 p-6">
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Live backend status — demonstrates the health endpoint is wired. */}
        <div className="mt-10 rounded-2xl border border-line bg-white/90 p-6">
          <h3 className="text-lg font-bold">API status</h3>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium ${
                health ? 'bg-[#e7f8ee] text-[#1fbf6a]' : 'bg-[#fde8ef] text-[#ef2f6a]'
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: health ? '#1fbf6a' : '#ef2f6a' }}
              />
              {health ? 'Online' : 'Offline'}
            </span>
            {health && (
              <span className="text-muted">
                uptime {health.uptimeSeconds}s · {new Date(health.timestamp).toLocaleTimeString()}
              </span>
            )}
            <button
              type="button"
              onClick={recheck}
              disabled={checking}
              className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
            >
              {checking ? 'Checking…' : 'Re-check'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
