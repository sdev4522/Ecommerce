import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | LUNE',
  description: 'Complete your luxury fashion consignment acquisition with encrypted payment verification.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
