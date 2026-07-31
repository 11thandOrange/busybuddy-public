/**
 * Widget catalog — the single source of truth ported directly from the
 * original HTML mockup (`docs/mockup.html`). The six conversion widgets, their
 * brand colors, icons, marketing blurbs, and preview slot labels all live here
 * so the frontend can render the interactive selector and the backend can
 * validate references to a known widget id.
 */

export interface WidgetBlurb {
  /** Blurb title. */
  t: string;
  /** Blurb description. */
  d: string;
}

export interface Widget {
  id: string;
  name: string;
  /** Short one-line description shown on the selector card. */
  short: string;
  /** Primary accent color (hex). */
  color: string;
  /** Tint background color (hex). */
  tint: string;
  /** Raw inline SVG markup for the card icon. */
  icon: string;
  /** Three marketing blurbs displayed around the device preview. */
  blurbs: [WidgetBlurb, WidgetBlurb, WidgetBlurb];
  /** Label shown inside the device preview slot. */
  slotLabel: string;
}

export const WIDGETS: Widget[] = [
  {
    id: 'announcement',
    name: 'Announcement Bar',
    short: 'Promo top bar',
    color: '#ff6a1a',
    tint: '#fff3ec',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></svg>',
    blurbs: [
      {
        t: 'Announce anything',
        d: 'Drive urgency with sticky top-bar promos, countdowns, and free-shipping banners.',
      },
      {
        t: 'Rotate messages',
        d: 'Cycle multiple offers with animated transitions and geo-targeting.',
      },
      {
        t: 'Lift click-through',
        d: 'Merchants report 3× higher promo engagement vs. static banners.',
      },
    ],
    slotLabel: '📢 Free shipping over $75 — ends tonight',
  },
  {
    id: 'inactive',
    name: 'Inactive Tab Message',
    short: 'Win-back tab title',
    color: '#6d5cff',
    tint: '#efedff',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    blurbs: [
      {
        t: 'Recover lost visitors',
        d: 'Change your tab title when shoppers switch away to pull them back.',
      },
      { t: 'Playful nudges', d: 'Emojis and dynamic copy make it feel human, not spammy.' },
      { t: 'Boost return visits', d: 'Recover up to 18% of tab-switched sessions.' },
    ],
    slotLabel: '👀 Come back! Your cart misses you',
  },
  {
    id: 'bundle',
    name: 'Bundle Discounts',
    short: 'Auto product bundles',
    color: '#2f6bff',
    tint: '#eaf0ff',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
    blurbs: [
      {
        t: 'Frequently bought together',
        d: 'Curated bundles with auto-applied discounts on your product pages.',
      },
      { t: 'Smart pairing', d: 'Recommend complementary items based on real order history.' },
      { t: 'AOV lift', d: 'Merchants see up to 32% larger baskets on day one.' },
    ],
    slotLabel: '📦 Bundle & save 15%',
  },
  {
    id: 'bogo',
    name: 'Buy One Get One',
    short: 'BOGO deals & gifts',
    color: '#1fbf6a',
    tint: '#e7f8ee',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>',
    blurbs: [
      {
        t: 'BOGO, made easy',
        d: 'Set buy-X-get-Y, free-gift-with-purchase, or tiered gift rules.',
      },
      {
        t: 'Cart-aware',
        d: 'Rules apply automatically at checkout — no coupon codes needed.',
      },
      { t: 'Convert browsers', d: 'Free-gift banners lift add-to-cart rate up to 24%.' },
    ],
    slotLabel: '🎁 Buy 2, get 1 free',
  },
  {
    id: 'volume',
    name: 'Volume Discounts',
    short: 'Qty-based pricing',
    color: '#ef2f6a',
    tint: '#fde8ef',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    blurbs: [
      {
        t: 'Quantity breaks',
        d: 'Reward bulk buyers with tiered pricing right on the product page.',
      },
      { t: 'Wholesale-ready', d: 'Perfect for B2B storefronts, subscriptions, and consumables.' },
      { t: 'Move more units', d: 'Average order size climbs 40% for high-consumption SKUs.' },
    ],
    slotLabel: '🧱 Buy 3+ → 20% off',
  },
  {
    id: 'mixmatch',
    name: 'Mix & Match',
    short: 'Custom bundles',
    color: '#9b3cff',
    tint: '#f2e8ff',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    blurbs: [
      {
        t: 'Build-your-own bundles',
        d: 'Let shoppers pick any N items from a curated pool at a fixed price.',
      },
      {
        t: 'Interactive UI',
        d: 'Live totals, image swaps, and progress bars keep buyers engaged.',
      },
      {
        t: 'Perfect for gifting',
        d: 'Great for cosmetics, snack boxes, apparel sets, and starter kits.',
      },
    ],
    slotLabel: '🔀 Pick any 3 for $49',
  },
];

/** All valid widget ids, useful for backend validation. */
export const WIDGET_IDS: readonly string[] = WIDGETS.map((w) => w.id);
