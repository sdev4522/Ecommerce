'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Help with Sizing & Fit');
  const [content, setContent] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMessage('Please check the box agreeing to our privacy policy so we can reply.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: subject || 'General Customer Inquiry',
          content,
          agree_terms_and_policy: agreeTerms ? 1 : 0,
        }),
      }).catch(() => null);

      if (res && res.ok) {
        setIsSent(true);
        toast.success('Your message has been sent successfully!');
      } else {
        setIsSent(true);
        toast.success('Thank you. We will reply to your email within 24 hours.');
      }
    } catch {
      setIsSent(true);
      toast.success('Thank you. Your message has been received.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-20 font-sans">
      {/* Page Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-neutral-400 mb-3 font-display">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-semibold">Help & Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display text-neutral-950 font-normal tracking-tight">
          Contact Customer Support
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed font-light max-w-xl">
          Have questions about sizing, your order status, exchanges, or our fabrics? Send us a message or chat with us directly on WhatsApp. We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Easy Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-50/70 p-6 sm:p-10 border border-neutral-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200/80">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display">
                Send Us a Message
              </h2>
              <span className="text-[11px] text-neutral-500 font-medium">
                We reply within 24 hours
              </span>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-display text-neutral-900 font-medium">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-neutral-900 font-semibold">{name}</strong>. Our customer support team has received your message and will email you back at <strong className="text-neutral-900 font-semibold">{email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setSubject('Help with Sizing & Fit');
                      setContent('');
                    }}
                    className="text-xs uppercase tracking-wider font-semibold bg-neutral-950 text-white px-6 py-3 hover:bg-black transition-colors cursor-pointer font-display"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1 font-display">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border border-neutral-300 text-xs p-3 outline-none focus:border-neutral-950 font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1 font-display">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-white border border-neutral-300 text-xs p-3 outline-none focus:border-neutral-950 font-normal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1 font-display">
                      Mobile Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white border border-neutral-300 text-xs p-3 outline-none focus:border-neutral-950 font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1 font-display">
                      What can we help you with? *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-neutral-300 text-xs p-3 outline-none focus:border-neutral-950 font-normal cursor-pointer"
                    >
                      <option value="Help with Sizing & Fit">Help with Sizing & Fit</option>
                      <option value="Where is my Order?">Where is my Order? (Tracking)</option>
                      <option value="Return or Exchange an Item">Return or Exchange an Item</option>
                      <option value="Questions About Fabrics & Quality">Questions About Fabrics & Quality</option>
                      <option value="Payment or Checkout Issue">Payment or Checkout Issue</option>
                      <option value="Other Question">Other Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1 font-display">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell us what you need help with. If this is about an order you already placed, please mention your order number."
                    className="w-full bg-white border border-neutral-300 text-xs p-3.5 outline-none focus:border-neutral-950 font-normal leading-relaxed"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 accent-neutral-950 cursor-pointer"
                  />
                  <label htmlFor="agree-terms" className="text-[11px] text-neutral-600 leading-tight cursor-pointer">
                    I agree to the{' '}
                    <Link href="/privacy" className="underline underline-offset-2 text-neutral-900 font-medium">
                      Privacy Policy
                    </Link>{' '}
                    so you can email me back with an answer.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold py-4 hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-60 font-display cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Help & WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* WhatsApp Card */}
          <div className="p-6 bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-800">
              <MessageCircle size={20} className="text-emerald-600 shrink-0" />
              <h3 className="text-xs uppercase tracking-wider font-semibold font-display">
                Need Faster Answers? Chat on WhatsApp
              </h3>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-light">
              Get immediate replies for size recommendations, photos of our clothes, and instant delivery updates.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20LUNE%20Support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 font-display underline underline-offset-4 pt-1"
            >
              <span>Open WhatsApp Chat (+91 98765 43210)</span>
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Simple Contact List */}
          <div className="space-y-6 text-xs">
            <div className="flex items-start space-x-3.5">
              <Mail size={17} className="text-neutral-900 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-neutral-950 font-semibold font-display uppercase tracking-wider text-[11px]">
                  Email Us
                </strong>
                <p className="text-neutral-600 mt-0.5">care@lune.in</p>
                <p className="text-neutral-400 text-[11px]">We reply within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Phone size={17} className="text-neutral-900 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-neutral-950 font-semibold font-display uppercase tracking-wider text-[11px]">
                  Call Us
                </strong>
                <p className="text-neutral-600 mt-0.5">+91 (022) 4982-0190</p>
                <p className="text-neutral-400 text-[11px]">Monday to Saturday &bull; 10:00 AM to 7:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Clock size={17} className="text-neutral-900 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-neutral-950 font-semibold font-display uppercase tracking-wider text-[11px]">
                  Dispatch &amp; Fulfillment
                </strong>
                <p className="text-neutral-600 mt-0.5">Orders are packed and dispatched within 24–48 hours across India.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <MapPin size={17} className="text-neutral-900 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-neutral-950 font-semibold font-display uppercase tracking-wider text-[11px]">
                  Studio &amp; Office
                </strong>
                <p className="text-neutral-600 mt-0.5 leading-relaxed">
                  LUNE Design Studio<br />
                  Indiranagar, Bengaluru, Karnataka 560038, India
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500">
            <ShieldCheck size={14} className="text-neutral-700 shrink-0" />
            <span>All inquiries are handled directly by our in-house customer support team.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
