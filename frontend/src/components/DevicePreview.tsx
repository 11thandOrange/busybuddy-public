import type { Widget } from '@busybuddy/shared';

interface ScreenProps {
  widget: Widget;
  isMobile: boolean;
}

/**
 * Widget-specific content shown below "Add to Cart", modeled on each app's
 * real editor preview in the BusyBuddy_v2 monorepo (not a screenshot - the
 * actual JSX each app renders to show merchants their live widget):
 *   - bundle:   web/frontend/apps/bundle-discounts/StandardBundleEditor.jsx
 *               renderBundlePreview() - stacked product rows joined by a "+"
 *   - bogo:     web/frontend/apps/buy-one-get-one/BuyXGetYEditor.jsx
 *               renderBXGYPreview() - a colored "YOU GET X% OFF ON" banner
 *   - volume:   web/frontend/apps/volume-discounts/VolumeDiscountEditor.jsx
 *               renderVolumePreview() - a radio list of quantity tiers
 *   - mixmatch: web/frontend/apps/mix-and-match-discounts/MixAndMatchEditor.jsx
 *               renderMixMatchPreview() - a row of pill tier-selector buttons
 * Announcement and inactive-tab don't get a slot here - see WidgetScreen
 * and DevicePreview below for why.
 */
function WidgetSlotContent({ widget }: { widget: Widget }) {
  switch (widget.id) {
    case 'bundle':
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="h-4 w-4 rounded bg-[#f2f4f6]" />
          <span
            className="flex h-3 w-3 items-center justify-center rounded-[3px] text-[8px] font-bold text-white"
            style={{ background: 'var(--wcolor)' }}
          >
            +
          </span>
          <span className="h-4 w-4 rounded bg-[#f2f4f6]" />
          <span className="ml-1 text-[7px] font-semibold" style={{ color: 'var(--wcolor)' }}>
            Save 15%
          </span>
        </div>
      );
    case 'bogo':
      return (
        <div
          className="rounded-[3px] py-1 text-center text-[8px] font-bold"
          style={{ background: 'var(--wtint)', color: 'var(--wcolor)' }}
        >
          YOU GET 1 FREE
        </div>
      );
    case 'volume':
      return (
        <div className="flex flex-col gap-[3px]">
          {[
            { label: 'Buy 1', off: '0%', active: false },
            { label: 'Buy 3', off: '20%', active: true },
          ].map((tier) => (
            <div
              key={tier.label}
              className="flex items-center gap-1.5 rounded-[3px] px-1.5 py-[3px] text-[7px] font-semibold"
              style={
                tier.active
                  ? { background: 'var(--wcolor)', color: 'white' }
                  : { background: '#f2f4f6', color: '#333' }
              }
            >
              <span
                className="h-[6px] w-[6px] rounded-full border"
                style={{ borderColor: tier.active ? 'white' : '#bbb' }}
              />
              <span className="flex-1">{tier.label}</span>
              <span>{tier.off} OFF</span>
            </div>
          ))}
        </div>
      );
    case 'mixmatch':
      return (
        <div className="flex items-center justify-center gap-1">
          {['1', '3', '5'].map((n) => (
            <span
              key={n}
              className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold"
              style={
                n === '3'
                  ? { background: 'var(--wcolor)', color: 'white' }
                  : { background: '#f2f4f6', color: '#333' }
              }
            >
              {n}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
}

/** The mini storefront widget preview shown inside a device frame - mirrors
 * web/frontend/components/Editor/ProductPagePreview.jsx's real layout
 * (image | title, rating, price, description, Add to Cart, then a dashed-
 * top-border widget slot below the button - not above it). */
function WidgetScreen({ widget, isMobile }: ScreenProps) {
  const style = {
    ['--wcolor' as string]: widget.color,
    ['--wtint' as string]: widget.tint,
  } as React.CSSProperties;

  const isAnnouncement = widget.id === 'announcement';
  const isInactive = widget.id === 'inactive';
  const hasSlot = !isAnnouncement && !isInactive;

  return (
    <div className="absolute inset-0 flex flex-col text-[10px]" style={style}>
      {/* Full-width bar above the page, matching the real announcement bar
          extension's own DOM (extensions/bogo-shopify-app/assets/
          announcement-bar-extension.js) - a centered message with an
          optional countdown, not something living inside the product card. */}
      {isAnnouncement && (
        <div
          className="flex h-[18px] shrink-0 items-center justify-center gap-1.5 text-[8px] font-semibold text-white"
          style={{ background: 'var(--wcolor)' }}
        >
          <span>{widget.slotLabel}</span>
          <span className="rounded-sm bg-black/20 px-1 py-[1px] font-mono tabular-nums">
            06:14:22
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1.5 p-3">
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
            <div className="text-[9px] font-semibold leading-tight text-[#111]">
              Premium Wireless Headphones
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-[#f5a623]">★★★★★</span>
              <span className="text-[6px] text-[#888]">4.8 (2,847)</span>
            </div>
            <div className="text-[11px] font-bold text-[#111]">
              $129 <s className="ml-1 text-[8px] font-normal text-[#999]">$159</s>
            </div>
            {!isMobile && (
              <div className="text-[7px] leading-tight text-[#666]">
                Experience premium sound quality with active noise cancellation and 40-hour battery
                life.
              </div>
            )}
            <div className="mt-auto rounded bg-ink py-[5px] text-center text-[8px] font-semibold text-white">
              Add to Cart
            </div>
          </div>
        </div>

        {/* Widget slot: below Add to Cart with a dashed top border and a
            small uppercase label, matching ProductPagePreview.jsx exactly -
            not a badge stacked above the button like the old mockup had. */}
        {hasSlot && (
          <div className="relative border-t border-dashed border-[#ddd] pt-2">
            <span className="absolute left-1/2 top-[-6px] -translate-x-1/2 bg-white px-1 text-[5px] uppercase tracking-wide text-[#999]">
              {widget.name}
            </span>
            <WidgetSlotContent widget={widget} />
          </div>
        )}
      </div>
    </div>
  );
}

export function DevicePreview({ widget }: { widget: Widget }) {
  const isInactive = widget.id === 'inactive';

  return (
    <div className="flex w-full items-end justify-center gap-5">
      {/* Desktop */}
      <div className="flex-1 rounded-[14px] bg-ink p-[10px_10px_12px] shadow-device">
        <div className="flex items-center gap-[5px] p-[4px_6px_8px]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#28c840]" />
          {/* Browser tab title - for the inactive-tab widget, this IS the
              feature (extensions/bogo-shopify-app/assets/inactiveTab.js
              swaps document.title/favicon when the tab loses focus; it has
              no on-page UI at all, so a badge inside the product card would
              have been showing something that doesn't exist). Showing the
              swapped tab title here is the accurate representation. */}
          <span
            className={`ml-1 truncate rounded-t-[4px] px-2 py-[3px] text-[7px] font-medium ${
              isInactive ? 'bg-white text-[#111]' : 'bg-white/10 text-white/50'
            }`}
          >
            {isInactive ? widget.slotLabel : 'yourstore.com'}
          </span>
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
