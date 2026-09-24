'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Calendar,
  CreditCard,
  Phone,
} from 'lucide-react';
import { toast } from 'sonner';

interface TrackingProduct {
  id?: number;
  product_name: string;
  product_image?: string;
  qty: number;
  price: number | string;
  price_formatted?: string;
}

interface TrackingHistory {
  id?: number;
  action?: string;
  description: string;
  created_at: string;
}

type EnumOrString = string | { value?: string; label?: string; name?: string; title?: string; [key: string]: any };

const getStatusString = (rawStatus: any): string => {
  if (!rawStatus) return '';
  if (typeof rawStatus === 'string') return rawStatus;
  if (typeof rawStatus === 'object') {
    return rawStatus.value || rawStatus.label || rawStatus.name || rawStatus.title || '';
  }
  return String(rawStatus);
};

const getStatusLabel = (rawStatus: any): string => {
  if (!rawStatus) return '';
  if (typeof rawStatus === 'string') {
    return rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);
  }
  if (typeof rawStatus === 'object') {
    return rawStatus.label || rawStatus.value || rawStatus.name || rawStatus.title || '';
  }
  return String(rawStatus);
};

const getDisplayString = (value: any, fallback = ''): string => {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    return value.label || value.name || value.title || value.text || value.value || fallback;
  }
  return String(value);
};

interface TrackingShipment {
  id?: number;
  status: EnumOrString;
  tracking_id?: string;
  tracking_link?: string;
  shipping_company_name?: string;
  estimate_date_shipped?: string;
}

interface TrackingOrder {
  id: number;
  code: string;
  status: EnumOrString;
  amount: number | string;
  shipping_amount?: number | string;
  sub_total?: number | string;
  created_at: string;
  address?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
  };
  products: TrackingProduct[];
  histories?: TrackingHistory[];
  shipment?: TrackingShipment | null;
  payment?: {
    status?: EnumOrString;
    payment_channel?: string;
    amount?: number | string;
  } | null;
}

// Sample order for immediate demonstration
const DEMO_ORDER: TrackingOrder = {
  id: 78291,
  code: 'ORD-78291',
  status: 'delivering',
  amount: 4900,
  shipping_amount: 0,
  sub_total: 4900,
  created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  address: {
    name: 'Julian Vance',
    email: 'julian.vance@example.com',
    phone: '+91 98765 43210',
    address: '42 Crescent Avenue, Penthouse B',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zip_code: '400050',
  },
  products: [
    {
      id: 1,
      product_name: 'Heavyweight Architectural T-Shirt — 290 GSM Noir Black',
      product_image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      qty: 1,
      price: 2400,
      price_formatted: '₹2,400',
    },
    {
      id: 2,
      product_name: 'Relaxed French Terry Hoodie — 460 GSM Chalk White',
      product_image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      qty: 1,
      price: 2500,
      price_formatted: '₹2,500',
    },
  ],
  shipment: {
    id: 1044,
    status: 'in_transit',
    tracking_id: 'BLUEDART-88392019',
    tracking_link: 'https://www.bluedart.com',
    shipping_company_name: 'BlueDart Express Air',
  },
  payment: {
    status: 'completed',
    payment_channel: 'Online UPI / Card',
    amount: 4900,
  },
  histories: [
    {
      description: 'Package handed to BlueDart courier facility. On vehicle for delivery.',
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      description: 'Items checked for quality and packed in our plastic-free gift box.',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      description: 'Order placed and confirmed successfully.',
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

export default function OrderTrackingPage() {
  const [orderCode, setOrderCode] = useState('');
  const [identifier, setIdentifier] = useState(''); // Email or phone number
  const [isLoading, setIsLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<TrackingOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const executeTracking = async (codeVal: string, idVal: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    const isPhone = /^[+0-9\s\-()]{7,}$/.test(idVal.trim()) && !idVal.includes('@');
    const cleanCode = codeVal.trim().replace(/^#/, '');
    try {
      const payload: Record<string, string> = { code: cleanCode };
      if (isPhone) payload.phone = idVal.trim();
      else payload.email = idVal.trim();

      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && !data.error && data.data?.order) {
        setTrackedOrder(data.data.order);
        toast.success(`Order #${cleanCode} found!`);
      } else {
        setErrorMessage(data.message || 'Order not found. Please check your order code and email/phone.');
      }
    } catch {
      setErrorMessage('Unable to reach tracking server right now.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-track if URL parameters exist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('code');
      const id = params.get('email') || params.get('phone');
      if (c) setOrderCode(c);
      if (id) setIdentifier(id);
      if (c && id) {
        // Auto-submit after short delay
        const timer = setTimeout(() => {
          executeTracking(c, id);
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleTrackSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderCode.trim()) {
      setErrorMessage('Please enter your Order Number (for example: ORD-78291).');
      return;
    }
    if (!identifier.trim()) {
      setErrorMessage('Please enter the Email Address or Mobile Number you used when ordering.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const isPhone = /^[+0-9\s\-()]{7,}$/.test(identifier.trim()) && !identifier.includes('@');
    const cleanCode = orderCode.trim().replace(/^#/, '');

    const botbleApiUrl = process.env.NEXT_PUBLIC_BOTBLE_API_URL || 'http://localhost:8000/api/v1';

    try {
      const payload: Record<string, string> = {
        code: cleanCode,
      };
      if (isPhone) {
        payload.phone = identifier.trim();
      } else {
        payload.email = identifier.trim();
      }

      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && !data.error && data.data?.order) {
        setTrackedOrder(data.data.order);
        toast.success(`Order #${cleanCode} found!`);
      } else {
        if (cleanCode.toUpperCase().includes('DEMO') || cleanCode.includes('78291')) {
          setTrackedOrder(DEMO_ORDER);
          toast.success('Displaying sample order preview.');
        } else {
          setErrorMessage(
            data.message ||
              'We could not find an order matching that number and email/phone. Please double-check your order confirmation message, or click the sample order button above.'
          );
        }
      }
    } catch {
      if (cleanCode.toUpperCase().includes('DEMO') || cleanCode.includes('78291')) {
        setTrackedOrder(DEMO_ORDER);
        toast.info('Viewing sample order preview.');
      } else {
        setErrorMessage(
          'Unable to reach tracking server right now. You can try our sample order "ORD-78291" or contact us directly on WhatsApp.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemo = () => {
    setOrderCode('ORD-78291');
    setIdentifier('julian.vance@example.com');
    setTrackedOrder(DEMO_ORDER);
    setErrorMessage(null);
    toast.success('Loaded sample order tracking preview.');
  };

  // Stepper progress index
  const getStepIndex = (status?: any, shipmentStatus?: any) => {
    const s = (getStatusString(shipmentStatus) || getStatusString(status)).toLowerCase();
    if (s.includes('delivered') || s.includes('completed')) return 3;
    if (s.includes('transit') || s.includes('delivering') || s.includes('shipping')) return 2;
    if (s.includes('process') || s.includes('pack') || s.includes('inspect')) return 1;
    return 0;
  };

  const currentStep = trackedOrder ? getStepIndex(trackedOrder.status, trackedOrder.shipment?.status) : 0;

  const steps = [
    { title: '1. Order Confirmed', desc: 'Received & payment verified' },
    { title: '2. Packed & Checked', desc: 'Quality checked & packed' },
    { title: '3. On the Way', desc: 'Shipped with express courier' },
    { title: '4. Delivered', desc: 'Safely arrived at your door' },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24 font-sans">
      {/* Header Banner */}
      <div className="border-b border-neutral-200/80 bg-neutral-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/60 text-[11px] uppercase tracking-wider font-semibold text-neutral-700 font-display">
            <Truck size={13} />
            <span>Shipping & Delivery Status</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display tracking-tight font-normal text-neutral-950">
            Track Your Order
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-light leading-relaxed">
            Enter your order number to see where your package is right now, how it is being handled, and its estimated arrival time.
          </p>

          {/* Quick Demo Button */}
          <div className="pt-2">
            <button
              onClick={loadDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-900 text-white hover:bg-black transition-all cursor-pointer shadow-xs"
            >
              <span>See How It Works:</span>
              <span className="underline font-semibold">Try sample order #ORD-78291</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        {/* Tracking Form */}
        <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs mb-10">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display mb-4">
            Enter Your Order Details
          </h2>

          <form onSubmit={handleTrackSubmit} className="space-y-4 sm:space-y-0 sm:flex sm:items-end sm:gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-500 font-display">
                Order Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ORD-78291"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-3 outline-none focus:border-neutral-950 font-medium tracking-wide"
              />
              <span className="text-[10.5px] text-neutral-400 block">
                Found in your confirmation email or SMS.
              </span>
            </div>

            <div className="flex-1 space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-500 font-display">
                Email or Mobile Number *
              </label>
              <input
                type="text"
                required
                placeholder="your.email@example.com or mobile number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-3 outline-none focus:border-neutral-950 font-normal"
              />
              <span className="text-[10.5px] text-neutral-400 block">
                The contact you used during checkout.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold px-8 py-3.5 hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer font-display disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Search size={14} />
                  <span>Track Package</span>
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-5 p-4 bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
              <div className="flex-1 leading-relaxed">
                <span>{errorMessage}</span>
                <span className="block mt-1 text-[11px] text-red-700">
                  Tip: If you're just testing the website, click the black "Try sample order" button above to view a live demonstration.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RESULTS SECTION */}
        {trackedOrder && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Order Summary Bar */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-display">
                    {getStatusString(trackedOrder.status).toUpperCase() === 'DELIVERING'
                      ? 'ON THE WAY'
                      : (getStatusLabel(trackedOrder.status) || 'CONFIRMED').toUpperCase()}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-neutral-600 bg-neutral-200/70 px-2 py-0.5 font-display">
                    Express Air Delivery
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-medium text-neutral-950 mt-1.5">
                  Order #{trackedOrder.code}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    Ordered on {new Date(trackedOrder.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <CreditCard size={13} />
                    Payment: {getDisplayString(trackedOrder.payment?.payment_channel, 'Prepaid')} ({getStatusLabel(trackedOrder.payment?.status) || 'Paid'})
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Help Button */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20LUNE%2C%20I'd%20like%20an%20update%20on%20my%20order%20%23${trackedOrder.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white text-xs font-semibold tracking-wider uppercase font-display hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Support</span>
                </a>
              </div>
            </div>

            {/* Visual 4-Step Progress Bar */}
            <div className="border border-neutral-200 p-6 sm:p-8 bg-white">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 font-display mb-6">
                Delivery Progress
              </h3>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden sm:block absolute top-4 left-6 right-6 h-[2px] bg-neutral-200 -z-0">
                  <div
                    className="h-full bg-neutral-950 transition-all duration-700"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx < currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div key={step.title} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition-all ${
                            isCompleted
                              ? 'bg-neutral-950 text-white'
                              : isCurrent
                              ? 'bg-neutral-950 text-white ring-4 ring-neutral-200'
                              : 'bg-white border-2 border-neutral-300 text-neutral-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>

                        <div>
                          <strong
                            className={`block text-xs uppercase tracking-wider font-display ${
                              isCurrent || isCompleted ? 'text-neutral-950 font-semibold' : 'text-neutral-400 font-medium'
                            }`}
                          >
                            {step.title}
                          </strong>
                          <p className="text-[11px] text-neutral-500 font-light mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier Tracking Box */}
              {trackedOrder.shipment?.tracking_id && (
                <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50 p-4">
                  <div className="flex items-center space-x-3">
                    <Truck size={20} className="text-neutral-800 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold font-display">
                        Courier Partner
                      </span>
                      <p className="text-xs font-mono font-medium text-neutral-900">
                        {trackedOrder.shipment.shipping_company_name || 'BlueDart Air'} &bull; Tracking ID: {trackedOrder.shipment.tracking_id}
                      </p>
                    </div>
                  </div>

                  {trackedOrder.shipment.tracking_link && (
                    <a
                      href={trackedOrder.shipment.tracking_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:underline font-display"
                    >
                      <span>Track on Courier Website</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Two Column Layout: Items + Address */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Ordered Items (7 cols) */}
              <div className="md:col-span-7 border border-neutral-200 p-6 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display">
                    Items in this Package ({trackedOrder.products.length})
                  </h4>
                  <span className="text-xs font-semibold text-neutral-950">
                    Total: ₹{Number(trackedOrder.amount).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {trackedOrder.products.map((item, idx) => (
                    <div key={idx} className="py-3.5 flex items-center space-x-3">
                      {item.product_image ? (
                        <div className="relative w-14 h-18 bg-neutral-100 overflow-hidden shrink-0">
                          <Image
                            src={item.product_image}
                            alt={item.product_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-18 bg-neutral-100 flex items-center justify-center shrink-0">
                          <Package size={18} className="text-neutral-400" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-neutral-900 truncate">
                          {item.product_name}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Quantity: {item.qty} &times; {item.price_formatted || `₹${Number(item.price).toLocaleString('en-IN')}`}
                        </p>
                      </div>

                      <div className="text-xs font-semibold text-neutral-950 shrink-0">
                        ₹{(Number(item.price) * item.qty).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Status Updates (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                {/* Shipping Address */}
                {trackedOrder.address && (
                  <div className="border border-neutral-200 p-6 bg-white space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 font-display">
                      <MapPin size={14} className="text-neutral-600" />
                      <span>Delivery Address</span>
                    </div>

                    <div className="text-xs text-neutral-600 leading-relaxed font-light">
                      <strong className="block text-neutral-950 font-medium">
                        {trackedOrder.address.name}
                      </strong>
                      <p>{trackedOrder.address.address}</p>
                      <p>
                        {trackedOrder.address.city}
                        {trackedOrder.address.state ? `, ${trackedOrder.address.state}` : ''}{' '}
                        {trackedOrder.address.zip_code}
                      </p>
                      {trackedOrder.address.phone && (
                        <p className="text-neutral-500 text-[11px] mt-1 flex items-center gap-1">
                          <Phone size={11} />
                          <span>{trackedOrder.address.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Updates */}
                {trackedOrder.histories && trackedOrder.histories.length > 0 && (
                  <div className="border border-neutral-200 p-6 bg-white space-y-3">
                    <h5 className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900 font-display">
                      Recent Updates
                    </h5>

                    <div className="space-y-3 border-l-2 border-neutral-200 pl-3 pt-1">
                      {trackedOrder.histories.map((hist, idx) => (
                        <div key={idx} className="relative">
                          <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-neutral-900" />
                          <p className="text-xs text-neutral-800 leading-snug font-normal">
                            {hist.description}
                          </p>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">
                            {new Date(hist.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Support Callout */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-neutral-700 shrink-0" />
            <span>Need help with your package? Our team responds within 24 hours.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-black underline underline-offset-4 font-medium">
              Contact Customer Support
            </Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-black underline underline-offset-4">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
