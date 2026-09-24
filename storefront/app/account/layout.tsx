import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal | LUNE',
  description: 'Manage your client profile, order archives, and shipping addresses.',
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
