'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('./CartDrawer'), {
  ssr: false,
});

const AuthModal = dynamic(() => import('../auth/AuthModal'), {
  ssr: false,
});

export default function ClientOverlays() {
  return (
    <>
      <CartDrawer />
      <AuthModal />
    </>
  );
}
