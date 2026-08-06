import type { Widget } from '@busybuddy/shared';

interface ScreenProps {
  widget: Widget;
  isMobile: boolean;
}

/** Real catalog products (see BusyBuddy_v2's scripts/seed-demo-store/products.json
 * and images.json) - the same demo store data used throughout that app's own
 * E2E suites, so every widget preview here shows a real product, not a
 * generic placeholder. Image URLs are hotlinked from the same Unsplash
 * sources the seed script itself uses (not re-hosted). */
const PRODUCTS = {
  polaroid: {
    title: 'Polaroid Instant Camera',
    price: 79,
    description:
      'Point, shoot, and watch the picture develop right in your hand. This classic instant camera brings back the magic of physical photos with that unmistakable whirr-and-eject sound.',
    image:
      'https://images.unsplash.com/photo-1563459171618-9f684daece51?ixlib=rb-4.1.0&fit=crop&crop=entropy&w=400&h=400&q=80',
  },
  minidv: {
    title: 'MiniDV Camcorder',
    price: 129,
    description:
      "The camcorder that recorded a generation's home movies onto tiny tapes. Features a flip-out LCD viewfinder and that satisfying mechanical tape-loading whirr.",
    image:
      'https://images.unsplash.com/photo-1591416221988-609f63445c88?ixlib=rb-4.1.0&fit=crop&crop=entropy&w=400&h=400&q=80&ixid=minidv',
  },
  flip: {
    title: 'Flip Video Camera',
    price: 59,
    description:
      'Point, shoot, upload — the Flip made viral videos possible before every phone had a camera. Pocket-sized with a flip-out USB arm.',
    image:
      'https://images.unsplash.com/photo-1591416221988-609f63445c88?ixlib=rb-4.1.0&fit=crop&crop=entropy&w=400&h=400&q=80&ixid=flip',
  },
  crt: {
    title: 'CRT Television',
    price: 179,
    description:
      'Heavy, boxy, and full of warm scanline charm. Brings the true look of retro gaming and VHS movie nights back to life.',
    image:
      'https://images.unsplash.com/photo-1574974409771-cebec54deb00?ixlib=rb-4.1.0&fit=crop&crop=entropy&w=400&h=400&q=80',
  },
} as const;

type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];

/** The plain storefront product-page chrome every widget renders on top of -
 * matches ProductPagePreview.jsx's real layout (image, title, price,
 * description, Add to Cart), scaled down for the device frame. */
function ProductPageHeader({ product, isMobile }: { product: Product; isMobile: boolean }) {
  return (
    <div className={`flex gap-2 p-2 ${isMobile ? 'flex-col' : ''}`}>
      <div
        className={`shrink-0 overflow-hidden rounded-md bg-[#f2f4f6] ${isMobile ? 'h-[70px] w-full' : 'h-[85px] w-[85px]'}`}
      >
        <img src={product.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col gap-[3px]">
        <div className="text-[10px] font-bold text-[#111]">{product.title}</div>
        <div className="text-[10px] font-bold text-[#111]">${product.price.toFixed(2)}</div>
        <p className="line-clamp-2 text-[6.5px] leading-tight text-[#666]">{product.description}</p>
        <div className="mt-1 rounded bg-ink py-[5px] text-center text-[7px] font-semibold text-white">
          Add to Cart
        </div>
      </div>
    </div>
  );
}

/** A product row inside a widget - matches every real editor's row markup
 * (StandardBundleEditor/BuyXGetYEditor/VolumeDiscountEditor/
 * MixAndMatchEditor's own renderXPreview() functions). */
function ProductRow({
  product,
  price,
  strike,
  priceColor,
}: {
  product: Product;
  price: string;
  strike?: string;
  priceColor?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-[6px] bg-white px-1.5 py-1 shadow-sm">
      <img src={product.image} alt="" className="h-6 w-6 shrink-0 rounded-[4px] object-cover" />
      <span className="flex-1 truncate font-semibold text-[#222]">{product.title}</span>
      <span className="font-bold" style={{ color: priceColor }}>
        {price}
      </span>
      {strike && <s className="ml-[2px] text-[6px] font-normal text-[#999]">{strike}</s>}
    </div>
  );
}

function TotalRow({ total, original, color }: { total: string; original?: string; color: string }) {
  return (
    <div className="mt-1 flex items-center justify-between rounded-[6px] bg-white px-1.5 py-1.5">
      <span className="font-semibold text-[#222]">Total</span>
      <span>
        <span className="font-bold" style={{ color }}>
          {total}
        </span>{' '}
        {original && <s className="text-[6px] text-[#999]">{original}</s>}
      </span>
    </div>
  );
}

/** The real widget content, grounded directly in each app's own editor
 * preview (render*Preview() in StandardBundleEditor/BuyXGetYEditor/
 * VolumeDiscountEditor/MixAndMatchEditor/AnnouncementBarEditor in the
 * BusyBuddy_v2 monorepo) - same product cards, "+" connectors, Total rows,
 * tier pills, and banners those real components render, using the demo
 * store's real catalog instead of the editor's own internal placeholders. */
function WidgetContent({ widget }: { widget: Widget }) {
  switch (widget.id) {
    case 'bundle': {
      // Real defaults: primaryMessage 'Buy Together & Save More!', selectedEmoji '🔥'.
      // No discount configured -> Total is just the sum, matching the live
      // storefront capture this preview is based on ($79 + $129 = $208).
      const total = PRODUCTS.polaroid.price + PRODUCTS.minidv.price;
      return (
        <div className="flex flex-col gap-1.5 rounded-md p-2" style={{ background: widget.tint }}>
          <h3 className="text-center text-[9px] font-bold text-[#222]">
            Buy Together & Save More!🔥
          </h3>
          <p className="text-center text-[6.5px] text-[#555]">
            Get this bundle and save on your purchase
          </p>
          <ProductRow
            product={PRODUCTS.polaroid}
            price={`$${PRODUCTS.polaroid.price.toFixed(2)}`}
          />
          <div className="flex justify-center">
            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] text-[9px] font-bold text-white"
              style={{ background: widget.color }}
            >
              +
            </span>
          </div>
          <ProductRow product={PRODUCTS.minidv} price={`$${PRODUCTS.minidv.price.toFixed(2)}`} />
          <TotalRow total={`$${total.toFixed(2)}`} color={widget.color} />
          <div className="mt-1 rounded bg-ink py-[5px] text-center text-[7px] font-semibold text-white">
            Add to Cart
          </div>
        </div>
      );
    }
    case 'bogo': {
      // Real defaults: title 'Buy X Get Y - Save More!' + 🎁; discountType
      // 'Percentage' renders "YOU GET {value}% OFF ON" as a colored banner.
      const discountPct = 50;
      const yPrice = PRODUCTS.flip.price * (1 - discountPct / 100);
      return (
        <div className="flex flex-col gap-1.5 rounded-md p-2" style={{ background: widget.tint }}>
          <h3 className="text-center text-[9px] font-bold text-[#222]">
            Buy X Get Y - Save More!🎁
          </h3>
          <ProductRow product={PRODUCTS.minidv} price={`$${PRODUCTS.minidv.price.toFixed(2)}`} />
          <div
            className="rounded-[4px] py-1 text-center text-[7px] font-bold text-white"
            style={{ background: widget.color }}
          >
            YOU GET {discountPct}% OFF ON
          </div>
          <ProductRow
            product={PRODUCTS.flip}
            price={`$${yPrice.toFixed(2)}`}
            strike={`$${PRODUCTS.flip.price.toFixed(2)}`}
            priceColor={widget.color}
          />
          <TotalRow
            total={`$${(PRODUCTS.minidv.price + yPrice).toFixed(2)}`}
            original={`$${(PRODUCTS.minidv.price + PRODUCTS.flip.price).toFixed(2)}`}
            color={widget.color}
          />
          <div className="mt-1 rounded bg-ink py-[5px] text-center text-[7px] font-semibold text-white">
            Add Bundle to Cart
          </div>
        </div>
      );
    }
    case 'volume': {
      // Real defaults: quantityBreaks Buy2/10%, Buy3/15%, Buy4/20%, Buy2 is default.
      const tiers = [
        { label: 'Buy 2', off: 10, active: true },
        { label: 'Buy 3', off: 15, active: false },
        { label: 'Buy 4', off: 20, active: false },
      ];
      const active = tiers.find((t) => t.active)!;
      const qty = 2;
      const perUnit = PRODUCTS.crt.price * (1 - active.off / 100);
      return (
        <div className="flex flex-col gap-1.5 rounded-md p-2" style={{ background: widget.tint }}>
          <h3 className="text-[9px] font-bold text-[#222]">Buy More & Save More!🔥</h3>
          <div className="flex flex-col gap-[3px]">
            {tiers.map((tier) => (
              <div
                key={tier.label}
                className="flex items-center gap-1.5 rounded-[5px] px-1.5 py-1 text-[7px] font-semibold"
                style={
                  tier.active
                    ? { background: widget.color, color: 'white' }
                    : { background: '#fff', color: '#333' }
                }
              >
                <span
                  className="h-[9px] w-[9px] shrink-0 rounded-full border-2"
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
                  {tier.off}% OFF
                </span>
              </div>
            ))}
          </div>
          <ProductRow
            product={PRODUCTS.crt}
            price={`$${perUnit.toFixed(2)}`}
            strike={`$${PRODUCTS.crt.price.toFixed(2)}`}
            priceColor="#4CAF50"
          />
          <TotalRow
            total={`$${(perUnit * qty).toFixed(2)}`}
            original={`$${(PRODUCTS.crt.price * qty).toFixed(2)}`}
            color={widget.color}
          />
          <div className="mt-1 rounded bg-ink py-[5px] text-center text-[7px] font-semibold text-white">
            Add to Cart
          </div>
        </div>
      );
    }
    case 'mixmatch': {
      // Real defaults: tiers Buy2/10%, Buy3/15%, Buy4/20%; selectedTier here = Buy 3.
      const pool = [PRODUCTS.flip, PRODUCTS.polaroid, PRODUCTS.minidv, PRODUCTS.crt];
      const discountPct = 15;
      const total = pool.reduce((sum, p) => sum + p.price * (1 - discountPct / 100), 0);
      const originalTotal = pool.reduce((sum, p) => sum + p.price, 0);
      return (
        <div className="flex flex-col gap-1.5 rounded-md p-2" style={{ background: widget.tint }}>
          <h3 className="text-center text-[9px] font-bold text-[#222]">
            Mix & Match - Save More!🔥
          </h3>
          <div className="flex justify-center gap-1">
            {['Buy 2', 'Buy 3', 'Buy 4'].map((t, i) => (
              <span
                key={t}
                className="rounded-full px-1.5 py-[3px] text-[6.5px] font-semibold"
                style={
                  i === 1
                    ? { background: widget.color, color: 'white' }
                    : { background: '#fff', color: '#333' }
                }
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-center text-[6px] text-[#555]">
            {pool.length} products selected · {discountPct}% off
          </p>
          <div className="flex flex-col gap-1">
            {pool.map((p) => (
              <ProductRow
                key={p.title}
                product={p}
                price={`$${(p.price * (1 - discountPct / 100)).toFixed(2)}`}
              />
            ))}
          </div>
          <TotalRow
            total={`$${total.toFixed(2)}`}
            original={`$${originalTotal.toFixed(2)}`}
            color={widget.color}
          />
          <div className="mt-1 rounded bg-ink py-[5px] text-center text-[7px] font-semibold text-white">
            Add Bundle to Cart
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

/** Announcement Bar and Inactive Tab Message don't embed inside a product
 * page's widget slot the way the 4 bundle-type apps do - Announcement Bar
 * is a store-wide top bar (AnnouncementBarEditor.jsx's real preview shows a
 * store header + product grid, not a single product's page), and Inactive
 * Tab Message has no on-page UI at all (it only swaps the browser tab's
 * title/favicon on blur - confirmed via extensions/bogo-shopify-app/assets/
 * inactiveTab.js). Both get their own top-level treatment below instead of
 * going through WidgetContent/ProductPageHeader. */
function WidgetScreen({ widget, isMobile }: ScreenProps) {
  if (widget.id === 'announcement') {
    const gridProducts = [PRODUCTS.polaroid, PRODUCTS.minidv, PRODUCTS.flip];
    return (
      <div className="absolute inset-0 overflow-y-auto text-[10px]">
        <div
          className="flex h-[22px] shrink-0 items-center justify-center gap-2 text-[8px] font-semibold text-white"
          style={{ background: widget.color }}
        >
          <span>{widget.slotLabel}</span>
          <span className="rounded-sm bg-black/20 px-1 py-[1px] font-mono tabular-nums">
            06:14:22
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-[#eee] px-2 py-1.5">
          <span className="text-[8px] font-bold tracking-wide">STORE</span>
          <div className="flex gap-1.5 text-[6px] text-[#555]">
            <span>Home</span>
            <span>Shop</span>
            <span>About</span>
          </div>
        </div>
        <div className={`grid gap-1.5 p-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {gridProducts.map((p) => (
            <div key={p.title} className="rounded-md border border-[#eee] p-1">
              <div className="aspect-square overflow-hidden rounded-[4px] bg-[#f2f4f6]">
                <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-1 truncate text-[6.5px] font-semibold text-[#222]">{p.title}</div>
              <div className="text-[6.5px] text-[#666]">${p.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (widget.id === 'inactive') {
    return (
      <div className="absolute inset-0 overflow-y-auto text-[10px]">
        <div className="flex h-[22px] shrink-0 items-center justify-center rounded-sm bg-[#f2f4f6] text-[7px] font-semibold text-[#333]">
          Browser tab title (when inactive): {widget.slotLabel}
        </div>
        <ProductPageHeader product={PRODUCTS.polaroid} isMobile={isMobile} />
      </div>
    );
  }

  const hostProduct =
    widget.id === 'bundle'
      ? PRODUCTS.polaroid
      : widget.id === 'bogo'
        ? PRODUCTS.minidv
        : widget.id === 'volume'
          ? PRODUCTS.crt
          : PRODUCTS.flip;

  return (
    <div className="absolute inset-0 overflow-y-auto text-[10px]">
      <ProductPageHeader product={hostProduct} isMobile={isMobile} />
      <div className="relative mx-2 mt-1 border-t border-dashed border-[#ddd] pt-2">
        <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 bg-white px-1 text-[5px] uppercase tracking-wide text-[#999]">
          Bundle Offer
        </span>
        <WidgetContent widget={widget} />
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
