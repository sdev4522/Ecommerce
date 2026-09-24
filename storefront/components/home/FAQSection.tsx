'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Truck,
  RotateCcw,
  CreditCard,
  Package,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface FAQItem {
  id: string;
  category: 'shipping' | 'returns' | 'payment' | 'orders';
  badge?: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'shipping',
    badge: 'Express Shipping',
    question: 'Do you offer Free Delivery and what are the thresholds?',
    answer:
      'Yes! We offer 100% complimentary Express Shipping across India on all orders over ₹1,999. For orders below ₹1,999, a nominal standard shipping fee of ₹99 is applied at checkout. Orders are dispatched within 24 hours from our warehouse.',
  },
  {
    id: 'faq-2',
    category: 'payment',
    badge: 'COD & Online',
    question: 'Can I pay via Cash on Delivery (COD) or UPI?',
    answer:
      'Absolutely. We accept Cash on Delivery (COD) nationwide with no hidden convenience surcharges. We also support all major instant UPI apps (Google Pay, PhonePe, Paytm), Debit/Credit Cards (Visa, Mastercard, RuPay, Amex), and Net Banking.',
  },
  {
    id: 'faq-3',
    category: 'returns',
    badge: 'Doorstep Pickup',
    question: 'What is your return & exchange policy?',
    answer:
      'We offer a 7-day doorstep return and exchange guarantee. If your item does not fit or you wish to exchange it, initiate a return from your Account or contact our team. Our courier will pick up the item directly from your doorstep.',
  },
  {
    id: 'faq-4',
    category: 'orders',
    badge: 'Live Updates',
    question: 'How do I track the status of my order?',
    answer:
      'As soon as your order is confirmed, you will receive an SMS and WhatsApp notification with your unique Tracking ID. You can also visit our Track Order page at any time to see live shipment milestones.',
  },
  {
    id: 'faq-5',
    category: 'payment',
    badge: 'Discount Code',
    question: 'How can I apply discount coupon codes like WELCOME10?',
    answer:
      'During checkout, simply type WELCOME10 into the Promo or Gift Code field and click Apply. A 10% discount will immediately be subtracted from your subtotal. Exclusive subscriber-only promotional codes are also sent out through our newsletter.',
  },
  {
    id: 'faq-6',
    category: 'shipping',
    badge: 'Delivery Timeline',
    question: 'How long will it take for my order to arrive?',
    answer:
      'Metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) typically receive delivery within 2 to 3 business days. All other locations across India receive delivery within 3 to 5 business days. You will receive live SMS and tracking updates at every stage.',
  },
  {
    id: 'faq-7',
    category: 'orders',
    badge: 'Size & Fit',
    question: 'How do I choose the right size?',
    answer:
      'Each product page features a detailed Size Guide with body measurements in inches and centimeters. If you are between sizes or need personalized styling advice, chat with us directly on WhatsApp and our team will be delighted to assist.',
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'shipping' | 'returns' | 'payment' | 'orders'
  >('all');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading & Category Navigation */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block mb-1 font-display">
              Common Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-display text-neutral-900 font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Find clear answers about shipping times, payment methods, Cash on Delivery, order tracking, and our 7-day return guarantee.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap lg:flex-col gap-1.5 pt-2">
            {[
              { id: 'all', label: 'All Inquiries', icon: HelpCircle },
              { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
              { id: 'returns', label: 'Returns & Exchange', icon: RotateCcw },
              { id: 'payment', label: 'Payment & COD', icon: CreditCard },
              { id: 'orders', label: 'Orders & Tracking', icon: Package },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`text-xs uppercase tracking-wider px-4 py-3 text-left font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer font-display ${isActive
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} className={isActive ? 'text-white' : 'text-neutral-400'} />
                    {tab.label}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>

          {/* Concierge Support Card using shadcn Card */}
          <Card className="border-neutral-200 bg-neutral-50/70 p-5 space-y-3">
            <div className="flex items-center gap-2 text-neutral-900">
              <MessageCircle size={18} className="text-neutral-950" />
              <h4 className="text-xs uppercase tracking-wider font-bold font-display">
                Still have a question?
              </h4>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our customer support team is ready to help you Monday to Saturday.
            </p>
            <div className="pt-1">
              <Button asChild className="w-full" size="sm">
                <Link href="/contact" className="flex items-center justify-center gap-1.5">
                  <span>Contact Support</span>
                  <ArrowRight size={13} />
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: shadcn Accordion */}
        <div className="lg:col-span-8">
          <Accordion type="multiple" defaultValue={['faq-1']} className="space-y-3">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-neutral-200 bg-white px-5 sm:px-6 shadow-xs hover:border-neutral-300 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex flex-col items-start gap-1.5 text-left pr-4">
                    {faq.badge && (
                      <Badge variant="secondary" className="text-[9px]">
                        {faq.badge}
                      </Badge>
                    )}
                    <span className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1 pb-5 border-t border-neutral-100">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
