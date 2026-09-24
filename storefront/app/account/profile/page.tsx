'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountProfilePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account?tab=profile');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full" />
      <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Loading Profile...</p>
    </div>
  );
}
