/** Full blog post content. Referenced by slug from both /blog (list) and
 * /blog/:slug (detail) so the two stay in sync automatically. */

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'announcement-bars-lift-click-through',
    tag: 'Conversion',
    title: 'How announcement bars lift promo click-through by 3×',
    date: 'Jul 2026',
    excerpt: 'A breakdown of what makes sticky top-bar promos convert — and the mistakes to avoid.',
    sections: [
      {
        paragraphs: [
          "Most merchants treat the top of their storefront as free real estate for whatever promo is running that week. That's a mistake. The announcement bar is the single most-viewed element on your site — every visitor sees it, on every page, before they've made up their mind about anything. Get it right and it becomes your highest-leverage conversion surface. Get it wrong and it's just visual noise shoppers learn to ignore.",
          'We looked at engagement data across stores running BusyBuddy\'s Announcement Bar widget and found a consistent pattern: bars built around three specific principles outperform generic "Sale! Shop Now!" banners by roughly 3× on click-through. None of it is complicated — it\'s mostly about specificity and urgency, applied correctly.',
        ],
      },
      {
        heading: '1. Deadlines beat discounts',
        paragraphs: [
          'A bar that says "20% off" gets glanced at. A bar that says "20% off — ends tonight" gets clicked. The discount is the same; the psychology is completely different. A visible countdown timer does the actual work here, because it converts a vague, ignorable offer into a decision with a deadline. BusyBuddy\'s countdown themes exist specifically for this — pick one that matches your brand and let the ticking clock do the persuading.',
        ],
      },
      {
        heading: "2. Rotate, don't repeat",
        paragraphs: [
          "The bar that worked in week one starts losing effectiveness in week two, simply because returning visitors have already filtered it out. Rotating between a few messages — free shipping threshold, a flash sale, a new arrival — keeps the bar feeling current instead of stale. It doesn't need to be complicated: even alternating two messages on a schedule noticeably outperforms one static banner running for a month straight.",
        ],
      },
      {
        heading: '3. Make the CTA a real button, not just text',
        paragraphs: [
          'A surprising number of announcement bars are just a sentence with no way to act on it. Adding a "Shop Now" button — a real, clickable element with its own visual weight — gives visitors an obvious next step instead of making them find their own way to the sale. It sounds obvious, but it consistently separates the bars that convert from the ones that just get read and forgotten.',
        ],
      },
      {
        heading: 'The mistake to avoid',
        paragraphs: [
          "The single biggest killer of announcement-bar performance is showing the same message to everyone forever. A bar that's been live and unchanged for two months isn't a promo anymore — it's wallpaper. Schedule start and end dates on every message, even evergreen ones, so you're forced to revisit and refresh the copy on a cadence instead of letting it fossilize.",
          'Put together — a deadline, a rotation, and a real button — an announcement bar stops being decoration and starts being one of the cheapest, highest-visibility conversion tools on your storefront.',
        ],
      },
    ],
  },
  {
    slug: 'bundle-discounts-bigger-basket',
    tag: 'AOV',
    title: 'Bundle discounts: the fastest path to a bigger basket',
    date: 'Jun 2026',
    excerpt:
      'Why "frequently bought together" beats blanket discounts for margin and lifetime value.',
    sections: [
      {
        paragraphs: [
          "Site-wide discounts feel generous, but they're expensive in a way that's easy to miss: you're cutting margin on every single order, including the ones that would have happened at full price anyway. Bundle discounts solve the same \"shoppers want a deal\" problem without that leak, because the discount only applies when someone buys more than they originally intended to.",
          "That's the entire mechanism behind why bundles outperform blanket sales on average order value: they don't discount the sale, they discount the upsell.",
        ],
      },
      {
        heading: 'Pair by function, not by guess',
        paragraphs: [
          'The bundles that actually move baskets are the ones where the second product is an obvious companion to the first — a case for the camera someone\'s already looking at, a cleaning kit next to the espresso machine. This is a merchandising decision more than a technical one: look at what customers already buy together in your order history and turn the strongest of those pairings into a bundle, rather than guessing at what "feels" complementary.',
          'Merchants who build bundles this way — grounded in real order history instead of intuition — consistently see baskets grow by around 30%, because the second item genuinely completes the purchase instead of feeling like a bolted-on upsell.',
        ],
      },
      {
        heading: 'Show the math, not just the offer',
        paragraphs: [
          'A bundle widget that just says "buy together and save" is leaving conversion on the table. Showing the struck-through original total next to the discounted total makes the savings concrete and immediate — shoppers don\'t have to do arithmetic to know the deal is real. BusyBuddy\'s Bundle Discount widget does this automatically: every bundle shows the line-item prices, the connector between them, and a Total row with the discount already applied, right on the product page where the decision is actually being made.',
        ],
      },
      {
        heading: 'Volume and Mix & Match extend the same idea',
        paragraphs: [
          'A two-item bundle is the simplest version of this, but the same margin-protecting logic scales. Volume discounts ("buy 3, save 15%") reward customers for buying more of one thing rather than switching to a bundle-of-two, which is the better fit for consumables and anything sold in multiples. Mix & Match takes it further — letting shoppers build their own bundle from a curated pool of products at a fixed discount — which works especially well for gift sets, cosmetics, and anything where the customer wants to choose, not just accept a fixed pairing.',
          'All three are the same core idea wearing different clothes: reward the additional purchase, not the existing one.',
        ],
      },
      {
        heading: 'Priority matters once you have more than one',
        paragraphs: [
          'Once a store is running Bundle, BOGO, and Volume discounts on overlapping products, only one can win on any given product page — and getting the priority order right (usually the most profitable offer, not just the first one created) matters more than people expect. Setting priority explicitly, rather than leaving it to whatever was configured last, keeps the highest-margin offer in front of the shopper instead of a discount that happened to be created more recently.',
        ],
      },
    ],
  },
  {
    slug: 'winning-back-tab-switchers',
    tag: 'Retention',
    title: 'Winning back tab-switchers with dynamic titles',
    date: 'Jun 2026',
    excerpt: 'The psychology behind inactive-tab nudges and how to keep them playful, not spammy.',
    sections: [
      {
        paragraphs: [
          'Somewhere between 20 and 30 open tabs is a normal browser session for most shoppers today, which means your store is competing for attention long after someone has technically "left" it. They didn\'t close the tab. They didn\'t bounce. They just got distracted by something else, and your product is sitting there, one click-back away from being forgotten entirely.',
          "The inactive-tab message exists for exactly that moment. When a shopper switches away, the browser tab's title (and optionally its favicon) swaps to something that pulls their eye back — no popup, no notification permission needed, just a change to something they're already glancing at every time they scan their open tabs.",
        ],
      },
      {
        heading: "Why this works when other win-back tactics don't",
        paragraphs: [
          'Exit-intent popups and cart-abandonment emails both require the shopper to still be paying attention (for a popup) or to check their inbox later (for email). A tab title swap is different: it works passively, the moment they glance across their open tabs for any reason, which happens far more often than either of those other triggers. Stores running this feature typically recover somewhere in the range of 15-18% of tab-switched sessions — visitors who otherwise would have simply never come back to that tab at all.',
        ],
      },
      {
        heading: 'Playful beats desperate',
        paragraphs: [
          '"👀 Come back! Your cart misses you" works. "WAIT DON\'T LEAVE!!!" does not — it reads as needy rather than charming, and shoppers who feel pressured are more likely to just close the tab outright rather than return to it. The best-performing messages use a light, first-person voice and an emoji that adds personality without adding pressure. Treat it like a text from a friend, not a retargeting ad.',
          "The other lever worth using is scheduling. A message doesn't need to run every day forever — tying it to an active promotion window (so it only fires during a real sale, say) keeps it feeling relevant and timed, instead of like a permanent fixture shoppers eventually tune out entirely.",
        ],
      },
      {
        heading: "It's the whole toolkit, not a replacement for it",
        paragraphs: [
          "This isn't a substitute for cart-abandonment email or an exit-intent offer — it's a layer that catches the moment before either of those would even have a chance to fire, since the visitor hasn't abandoned anything yet, they've just looked away. Pair it with the rest of your retention stack rather than picking one; the tab title nudge is cheap, invisible until it matters, and does its job in the fifteen seconds before a shopper would otherwise forget you existed.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
