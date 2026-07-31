import type { ReactNode } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';

/** Standard page chrome: nav on top, content, footer. Used by non-hero pages. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <Nav />
      </div>
      <main className="px-5 pb-16 pt-[130px] md:px-10">{children}</main>
      <Footer />
    </div>
  );
}
