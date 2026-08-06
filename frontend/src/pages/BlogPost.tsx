import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { getBlogPost } from '../data/blogPosts';
import { SHOPIFY_APP_STORE_URL } from '../lib/constants';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="huge !text-[clamp(48px,9vw,90px)]">404</h1>
          <p className="mt-4 text-lg text-muted">That post doesn't exist (or moved).</p>
          <Link
            to="/blog"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="mx-auto max-w-2xl">
        <Link to="/blog" className="text-sm font-semibold text-muted hover:text-ink">
          ← Blog
        </Link>

        <span className="mt-6 block w-fit rounded-full bg-[#fff3ec] px-3 py-1 text-xs font-semibold text-accent">
          {post.tag}
        </span>
        <h1 className="mt-4 text-[clamp(28px,5vw,44px)] font-bold leading-tight">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">{post.date}</p>

        <div className="mt-10 flex flex-col gap-8">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && <h2 className="mb-3 text-xl font-bold">{section.heading}</h2>}
              <div className="flex flex-col gap-4">
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-[#333]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-white/90 p-6 text-center">
          <p className="text-sm text-muted">Ready to put this into practice?</p>
          <a
            href={SHOPIFY_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Get Started with BusyBuddy
          </a>
        </div>
      </article>
    </Layout>
  );
}
