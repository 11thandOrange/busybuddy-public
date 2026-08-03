import type { Widget } from '@busybuddy/shared';

interface ScreenProps {
  widget: Widget;
  isMobile: boolean;
}

/** The mini storefront widget preview shown inside a device frame. */
function WidgetScreen({ widget, isMobile }: ScreenProps) {
  const style = {
    ['--wcolor' as string]: widget.color,
    ['--wtint' as string]: widget.tint,
  } as React.CSSProperties;

  const isAnnouncement = widget.id === 'announcement';

  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-3 text-[10px]" style={style}>
      <div
        className="flex h-[18px] items-center justify-center gap-1.5 rounded text-[8px] font-semibold text-white"
        style={{ background: 'var(--wcolor)' }}
      >
        <span>{isAnnouncement ? widget.slotLabel : 'YOUR STORE'}</span>
        {/* Compact countdown, matching the real announcement bar extension's
            "Classic" timer theme (extensions/bogo-shopify-app/assets/
            announcement-bar-extension.js renderTimerBody) - the real widget
            supports countdown urgency banners, this mockup previously
            didn't show one at all. */}
        {isAnnouncement && (
          <span className="rounded-sm bg-black/20 px-1 py-[1px] font-mono tabular-nums">
            06:14:22
          </span>
        )}
      </div>

      <div className={`flex flex-1 gap-2 ${isMobile ? 'flex-col' : ''}`}>
        <div
          className={`flex flex-1 items-center justify-center overflow-hidden rounded-md bg-[#f2f4f6] ${
            isMobile ? 'min-h-[60px]' : ''
          }`}
        >
          {/* Real product photo (Unsplash, same source already used by
              scripts/seed-demo-store/images.json's sony-walkman entry in
              this monorepo's sibling BusyBuddy_v2 repo) instead of a bare
              placeholder icon. */}
          <img
            src="https://images.unsplash.com/photo-1611001716885-b3402558a62b?auto=format&fit=crop&w=200&h=200&q=70"
            alt="Product preview"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-[1.2] flex-col gap-1">
          <div className="h-2 w-[90%] rounded-sm bg-[#222]" />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-[8px] text-[#f5a623]">
                ★
              </span>
            ))}
          </div>
          <div className="text-[11px] font-bold text-[#111]">
            $129 <s className="ml-1 text-[8px] font-normal text-[#999]">$159</s>
          </div>
          <div className="text-[7px] leading-tight text-[#666]">
            {isMobile
              ? 'Premium sound. 40h battery.'
              : 'Experience premium sound quality with active noise cancellation and 40-hour battery life.'}
          </div>
          {!isAnnouncement && (
            <div
              className="flex items-center justify-center rounded-md border border-dashed p-1.5 text-center text-[8px] font-bold"
              style={{
                background: 'var(--wtint)',
                borderColor: 'var(--wcolor)',
                color: 'var(--wcolor)',
              }}
            >
              {widget.slotLabel}
            </div>
          )}
          <div className="rounded bg-ink py-[5px] text-center text-[8px] font-semibold text-white">
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}

export function DevicePreview({ widget }: { widget: Widget }) {
  return (
    <div className="flex w-full items-end justify-center gap-5">
      {/* Desktop */}
      <div className="flex-1 rounded-[14px] bg-ink p-[10px_10px_12px] shadow-device">
        <div className="flex gap-[5px] p-[4px_6px_8px]">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white">
          <WidgetScreen widget={widget} isMobile={false} />
        </div>
      </div>

      {/* Mobile */}
      <div className="w-[130px] rounded-[22px] bg-ink p-2 shadow-device">
        <div className="relative aspect-[9/19] overflow-hidden rounded-2xl bg-white">
          <WidgetScreen widget={widget} isMobile={true} />
        </div>
      </div>
    </div>
  );
}
