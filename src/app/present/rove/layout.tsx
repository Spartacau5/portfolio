import type { Metadata } from 'next';

// shared by link with Rove; keep it out of search results
export const metadata: Metadata = {
  title: 'Arpit Ahluwalia · for Rove',
  robots: { index: false, follow: false },
};

export default function RoveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
