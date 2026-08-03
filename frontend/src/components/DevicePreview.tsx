import type { Widget } from '@busybuddy/shared';
import productImage from '../assets/product-image.webp';

interface ScreenProps {
  widget: Widget;
  isMobile: boolean;
}

/** A tiny product row: thumbnail + name + price, matching the row markup
 * every real editor preview uses for X/Y/bundle products (see e.g.
 * StandardBundleEditor.jsx renderBundlePreview()'s product row). */
function ProductRow({
  name,
  price,
  strike,
  priceColor,
}: {
  name: string;
  price: string;
  strike?: string;
  priceColor?: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-[3px] bg-white px-1 py-[3px] shadow-sm">
      <img src={productImage} alt="" className="h-4 w-4 rounded-[2px] object-cover" />
      <span className="flex-1 truncate font-semibold text-[#222]">{name}</span>
      <span className="font-bold" style={{ color: priceColor }}>
        {price}
      </span>
      {strike && <s className="text-[6px] font-normal text-[#999]">{strike}</s>}
    </div>
  );
}

/** The actual widget content - grounded in each app's real editor preview
 * (render*Preview() in StandardBundleEditor/BuyXGetYEditor/
 * VolumeDiscountEditor/MixAndMatchEditor in the BusyBuddy_v2 monorepo),
 * not a one-line label. */
function WidgetContent({ widget }: { widget: Widget }) {
  switch (widget.id) {
    case 'bundle':
      return (
        <div
          className="flex flex-col gap-[3px] rounded-md p-1.5"
          style={{ background: 'var(--wtint)' }}
        >
          <ProductRow name="Headphones" price="$129" />
          <div className="flex justify-center">
            <span
              className="flex h-3 w-3 items-center justify-center rounded-[2px] text-[8px] font-bold text-white"
              style={{ background: 'var(--wcolor)' }}
            >
              +
            </span>
          </div>
          <ProductRow name="Carry Case" price="$29" />
          <div className="mt-[2px] flex items-center justify-between rounded-[3px] bg-white px-1.5 py-1">
            <span className="font-semibold text-[#222]">Total</span>
            <span>
              <span className="font-bold" style={{ color: 'var(--wcolor)' }}>
                $134
              </span>{' '}
              <s className="text-[6px] text-[#999]">$158</s>
            </span>
          </div>
        </div>
      );
    case 'bogo':
      return (
        <div
          className="flex flex-col gap-[3px] rounded-md p-1.5"
          style={{ background: 'var(--wtint)' }}
        >
          <ProductRow name="Headphones" price="$129" />
          <div
            className="rounded-[3px] py-1 text-center text-[7px] font-bold text-white"
            style={{ background: 'var(--wcolor)' }}
          >
            YOU GET 50% OFF ON
          </div>
          <ProductRow name="Headphones" price="$64" strike="$129" priceColor="var(--wcolor)" />
        </div>
      );
    case 'volume':
      return (
        <div className="flex flex-col gap-[3px]">
          {[
            { label: 'Buy 1', off: '0% OFF', active: false },
            { label: 'Buy 3', off: '20% OFF', active: true },
            { label: 'Buy 5', off: '30% OFF', active: false },
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
                className="h-[7px] w-[7px] shrink-0 rounded-full border"
                style={{
                  borderColor: tier.active ? 'white' : '#bbb',
                  background: tier.active ? 'white' : 'transparent',
                }}
              />
              <span className="flex-1">{tier.label}</span>
              <span
                className="rounded-full px-1 py-[1px]"
                style={
                  tier.active
                    ? { background: 'rgba(255,255,255,0.25)' }
                    : { background: '#e8f5e9', color: '#4CAF50' }
                }
              >
                {tier.off}
              </span>
            </div>
          ))}
        </div>
      );
    case 'mixmatch':
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-center gap-1">
            {['Pick 1', 'Pick 3', 'Pick 5'].map((t, i) => (
              <span
                key={t}
                className="rounded-full px-2 py-[3px] text-[7px] font-semibold"
                style={
                  i === 1
                    ? { background: 'var(--wcolor)', color: 'white' }
                    : { background: '#f2f4f6', color: '#333' }
                }
              >
                {t}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src={productImage}
                alt=""
                className="aspect-square rounded-[3px] object-cover"
                style={
                  i === 1
                    ? { outline: '2px solid var(--wcolor)', outlineOffset: '-2px' }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

/** The mini storefront widget preview shown inside a device frame. */
function WidgetScreen({ widget, isMobile }: ScreenProps) {
  const style = {
    ['--wcolor' as string]: widget.color,
    ['--wtint' as string]: widget.tint,
  } as React.CSSProperties;

  const isAnnouncement = widget.id === 'announcement';
  const isInactive = widget.id === 'inactive';
  const hasWidgetContent = !isAnnouncement && !isInactive;

  return (
    <div className="absolute inset-0 flex flex-col text-[10px]" style={style}>
      {/* Full-width bar above the page, matching the real announcement bar
          extension's own DOM - a standalone bar, not something living
          inside the product card. */}
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
      {isInactive && (
        <div className="flex h-[18px] shrink-0 items-center justify-center rounded-sm bg-[#f2f4f6] text-[8px] font-semibold text-[#333]">
          {/* Real extension has no on-page UI at all - it swaps the browser
              tab's title/favicon on blur. This is the browser-tab strip in
              DevicePreview's chrome, not a fake in-page badge. */}
          Tab title (when inactive): {widget.slotLabel}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <div className={`flex gap-2 ${isMobile ? 'flex-col' : ''}`}>
          <div
            className={`overflow-hidden rounded-md bg-[#f2f4f6] ${isMobile ? 'h-[50px]' : 'h-[70px] w-[70px] shrink-0'}`}
          >
            <img
              src={productImage}
              alt="Product preview"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-[#f5a623]">★★★★★</span>
            </div>
            <div className="text-[11px] font-bold text-[#111]">
              $129 <s className="ml-1 text-[8px] font-normal text-[#999]">$159</s>
            </div>
            {!hasWidgetContent && (
              <div className="text-[7px] leading-tight text-[#666]">
                Experience premium sound quality with active noise cancellation and 40-hour battery
                life.
              </div>
            )}
          </div>
        </div>

        {/* The actual widget - full width, real structure (product rows,
            "+" connectors, Total rows, radio tiers, pill selectors), not a
            one-line badge. */}
        {hasWidgetContent && (
          <div className="min-h-0 flex-1 overflow-hidden">
            <WidgetContent widget={widget} />
          </div>
        )}

        <div className="mt-auto rounded bg-ink py-[5px] text-center text-[8px] font-semibold text-white">
          Add to Cart
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
