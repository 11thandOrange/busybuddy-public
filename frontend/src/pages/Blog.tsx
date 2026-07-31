import { Layout } from '../components/Layout';

const POSTS = [
  {
    tag: 'Conversion',
    title: 'How announcement bars lift promo click-through by 3×',
    date: 'Jul 2026',
    excerpt: 'A breakdown of what makes sticky top-bar promos convert — and the mistakes to avoid.',
  },
  {
    tag: 'AOV',
    title: 'Bundle discounts: the fastest path to a bigger basket',
    date: 'Jun 2026',
    excerpt:
      'Why "frequently bought together" beats blanket discounts for margin and lifetime value.',
  },
  {
    tag: 'Retention',
    title: 'Winning back tab-switchers with dynamic titles',
    date: 'Jun 2026',
    excerpt: 'The psychology behind inactive-tab nudges and how to keep them playful, not spammy.',
  },
];

export default function Blog() {
  return (
    <Layout>
      <div className="mx-auto max-w-5xl">
        <h1 className="huge !text-[clamp(48px,9vw,110px)]">
          BLOG<span className="slash">/</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Tactics, teardowns, and data from high-converting stores.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-2xl border border-line bg-white/90 p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <span className="w-fit rounded-full bg-[#fff3ec] px-3 py-1 text-xs font-semibold text-accent">
                {p.tag}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
              <span className="mt-4 text-xs text-muted">{p.date}</span>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
