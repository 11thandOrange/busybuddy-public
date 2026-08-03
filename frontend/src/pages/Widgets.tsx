import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { WIDGETS } from '@busybuddy/shared';
import { Layout } from '../components/Layout';
import { DevicePreview } from '../components/DevicePreview';
import { Icon } from '../components/Icon';

export default function Widgets() {
  const location = useLocation();
  const [active, setActive] = useState(0);

  // Deep-link support: /widgets#bundle selects & scrolls to that widget.
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash) return;
    const idx = WIDGETS.findIndex((w) => w.id === hash);
    if (idx >= 0) {
      setActive(idx);
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location.hash]);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">
        <h1 className="huge !text-[clamp(48px,9vw,110px)]">
          WIDGETS<span className="slash">/</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Six conversion widgets, each built to lift a specific metric. Hover a card to preview it
          live.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_minmax(0,520px)]">
          {/* List */}
          <div className="flex flex-col gap-3">
            {WIDGETS.map((w, i) => (
              <button
                key={w.id}
                id={w.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`flex items-start gap-4 rounded-2xl border bg-white/90 p-5 text-left transition-all ${
                  i === active ? 'border-ink shadow-card' : 'border-line'
                }`}
              >
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl [&_svg]:h-6 [&_svg]:w-6"
                  style={{ background: w.tint, color: w.color }}
                >
                  <Icon svg={w.icon} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-base font-bold">{w.name}</span>
                  <span className="text-sm text-muted">{w.blurbs[0].d}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Sticky preview */}
          <div className="lg:sticky lg:top-[130px] lg:self-start">
            <div className="rounded-3xl border border-line bg-white/70 p-6">
              <DevicePreview widget={WIDGETS[active]} />
              <div className="mt-6 grid gap-3">
                {WIDGETS[active].blurbs.map((b, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: WIDGETS[active].color }}
                      />
                      {b.t}
                    </div>
                    <p className="ml-4 text-sm text-muted">{b.d}</p>
                  </div>
                ))}
              </div>
              <Link
                to={`/get-started?widget=${WIDGETS[active].id}`}
                className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                Get {WIDGETS[active].name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
