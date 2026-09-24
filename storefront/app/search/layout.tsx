import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Collection | LUNE',
  description: 'Search contemporary luxury garments and seasonal wardrobe collections.',
  robots: { index: false, follow: false },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
