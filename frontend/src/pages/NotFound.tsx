import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="mx-auto max-w-xl text-center">
        <h1 className="huge !text-[clamp(80px,18vw,180px)]">404</h1>
        <p className="mt-4 text-lg text-muted">This page wandered off. Let's get you back.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Back home
        </Link>
      </div>
    </Layout>
  );
}
