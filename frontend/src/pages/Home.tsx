import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WIDGETS } from '@busybuddy/shared';
import { Nav } from '../components/Nav';
import { DevicePreview } from '../components/DevicePreview';
import { WidgetCard } from '../components/WidgetCard';
import { ArrowUpRight } from '../components/Icon';

export default function Home() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const widget = WIDGETS[active];

  const openWidget = (i: number) => navigate(`/widgets#${WIDGETS[i].id}`);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <Nav />
      </div>

      {/* Stage: absolute art-directed layout on xl, flowing stack below. */}
      <section className="relative px-5 pb-10 pt-[120px] md:px-10 xl:min-h-screen xl:pt-[130px]">
        {/* Huge hero type */}
        <div className="huge relative z-[1]">
          <div>
            POWER<span className="slash">/</span>UP
          </div>
          <div className="mt-[-10px] flex items-baseline justify-between">
            <div>
              YOUR<span className="slash">/</span>STORE
            </div>
            <span className="hidden text-[60px] tracking-[4px] text-[#b8bcbe] xl:inline">▚▚</span>
            <div className="hidden max-w-[380px] overflow-hidden whitespace-nowrap xl:block">
              POW
            </div>
          </div>
        </div>

        {/* Stat — top right on xl */}
        <div className="mt-8 text-right xl:absolute xl:right-10 xl:top-[130px] xl:z-[5] xl:mt-0">
          <div className="font-display text-[34px] leading-none">6+</div>
          <div className="mt-1.5 whitespace-nowrap text-[13px] text-muted">Conversion Widgets</div>
        </div>

        {/* Center device preview */}
        <div className="mx-auto my-8 w-full max-w-[720px] xl:absolute xl:left-1/2 xl:top-[320px] xl:z-[2] xl:my-0 xl:max-w-[min(55vw,780px)] xl:-translate-x-1/2">
          <DevicePreview widget={widget} />
        </div>

        {/* Blurbs — floating right on xl, inline below */}
        <div className="mx-auto grid max-w-[720px] gap-3 xl:contents">
          {widget.blurbs.map((b, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-line bg-white/85 p-[12px_14px] text-[12px] leading-snug shadow-blurb backdrop-blur xl:absolute xl:z-[5] xl:max-w-[220px] ${
                i === 0
                  ? 'xl:right-[60px] xl:top-[190px]'
                  : i === 1
                    ? 'xl:right-[30px] xl:top-[340px]'
                    : 'xl:right-[80px] xl:top-[500px]'
              }`}
            >
              <div className="mb-1 flex items-center gap-1.5 text-[13px] font-bold">
                <span className="h-2 w-2 rounded-full" style={{ background: widget.color }} />
                {b.t}
              </div>
              <p className="text-[#555]">{b.d}</p>
            </div>
          ))}
        </div>

        {/* Left copy + CTA */}
        <div className="mx-auto max-w-[720px] xl:absolute xl:left-10 xl:top-[470px] xl:z-[5] xl:max-w-[260px]">
          <p className="mb-[22px] text-[15px] leading-relaxed text-[#333]">
            Six lightweight widgets that turn your storefront into a conversion machine — no code
            required.
          </p>
          <Link
            to="/widgets"
            className="inline-flex items-center gap-[10px] rounded-full bg-ink px-[22px] py-[14px] text-[15px] font-semibold text-white"
          >
            Explore Widgets
            <span className="cta-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>

        {/* Widget selector cards */}
        <div className="mx-auto mt-10 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:absolute xl:bottom-[30px] xl:left-0 xl:right-0 xl:z-10 xl:mt-0 xl:max-w-none xl:grid-cols-6 xl:px-10">
          {WIDGETS.map((w, i) => (
            <WidgetCard
              key={w.id}
              widget={w}
              active={i === active}
              onActivate={() => setActive(i)}
              onOpen={() => openWidget(i)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
