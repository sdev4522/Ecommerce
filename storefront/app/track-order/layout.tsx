import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Consignment | LUNE',
  description: 'Track the live fulfillment and courier milestone delivery of your LUNE order.',
  robots: { index: false, follow: false },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
