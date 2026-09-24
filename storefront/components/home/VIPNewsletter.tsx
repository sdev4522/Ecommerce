'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export default function VIPNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      }).catch(() => null);

      setSubscribed(true);
      toast.success('Welcome! Use code WELCOME10 for 10% off your first order.');
    } catch {
      setSubscribed(true);
      toast.success('Welcome! Code WELCOME10 has been unlocked for you.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-white text-black py-20 sm:py-24 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-3">
          <Badge variant="outline" className="border-neutral-300 bg-neutral-100 text-neutral-800 gap-1.5 py-1 px-3">
            <Sparkles size={12} />
            <span>Welcome Offer</span>
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
            Get 10% Off Your First Order
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal">
            Join the LUNE community and enjoy <span className="text-black font-semibold">10% off your first purchase</span> with coupon code{' '}
            <strong className="text-black font-mono px-2 py-0.5 border border-neutral-300 bg-neutral-50">WELCOME10</strong>, plus early access to new arrivals and exclusive edits.
          </p>
        </div>


        {/* Subscription Form */}
        <div className="max-w-md mx-auto pt-2">
          {subscribed ? (
            <Card className="bg-neutral-900 p-5 rounded-lg text-center space-y-2 text-white">
              <div className="flex items-center justify-center gap-2 text-white">
                <CheckCircle2 size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider font-display">
                  Welcome to LUNE
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Your 10% coupon code is <strong className="text-white font-mono">WELCOME10</strong>. Apply it at checkout.
              </p>
            </Card>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <Input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border text-black border-black placeholder:text-neutral-500 pl-10 focus:border-black h-11"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="default"
                disabled={isSubmitting}
                className="shrink-0"
              >
                <span>{isSubmitting ? 'Joining...' : 'Unlock 10% Off'}</span>
                <ArrowRight size={13} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
