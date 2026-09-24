'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Banknote,
  QrCode,
  Tag,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/utils';
import { AppliedCoupon } from '../../lib/commerce';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface BackendCheckoutTotals {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  shippingMethodName: string;
  isFreeShipping: boolean;
  grandTotal: number;
  currency: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    note: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  // Backend authoritative totals state — NEVER calculated client-side
  const [backendTotals, setBackendTotals] = useState<BackendCheckoutTotals | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  // Authoritative presentation values derived strictly from backend response
  const subtotal = backendTotals?.subtotal ?? items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const discountAmount = backendTotals?.discountAmount ?? 0;
  const shippingFee = backendTotals !== null ? backendTotals.shippingFee : null;
  const isFreeShipping = backendTotals?.isFreeShipping ?? false;
  const shippingMethodName = backendTotals?.shippingMethodName ?? 'Standard Delivery';
  const grandTotal = backendTotals !== null ? backendTotals.grandTotal : null;

  // Single Authoritative Backend Pricing Effect: Recalculates dynamically on item, coupon, or address changes
  useEffect(() => {
    if (items.length === 0) {
      setBackendTotals(null);
      setShippingError(null);
      setIsCalculatingShipping(false);
      return;
    }

    let isMounted = true;
    setIsCalculatingShipping(true);
    setShippingError(null);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/shipping/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({
              product_id: i.product_id,
              qty: i.qty,
            })),
            coupon_code: appliedCoupon ? appliedCoupon.code : undefined,
            address: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip_code: formData.zipCode,
              country: formData.country || 'India',
            },
          }),
        });

        const data = await res.json();
        if (!isMounted) return;

        if (res.ok && data.success && data.data) {
          setBackendTotals({
            subtotal: Number(data.data.subtotal) || 0,
            discountAmount: Number(data.data.discountAmount) || 0,
            shippingFee: Number(data.data.shippingFee) || 0,
            shippingMethodName: data.data.shippingMethodName || 'Standard Delivery',
            isFreeShipping: Boolean(data.data.isFreeShipping),
            grandTotal: Number(data.data.grandTotal) || 0,
            currency: data.data.currency || 'INR',
          });
          setShippingError(null);
        } else {
          setBackendTotals(null);
          setShippingError(data.message || 'Shipping is currently unavailable for this address.');
        }
      } catch (err: any) {
        if (!isMounted) return;
        setBackendTotals(null);
        setShippingError('Unable to connect to shipping service. Please check your connection.');
      } finally {
        if (isMounted) {
          setIsCalculatingShipping(false);
        }
      }
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [
    items,
    appliedCoupon,
    formData.zipCode,
    formData.city,
    formData.state,
    formData.address,
    formData.country,
  ]);

  // Load saved customer information, pincode, and available coupons
  useEffect(() => {
    try {
      const savedInfo = localStorage.getItem('maison_checkout_customer');
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
      const savedPincode = localStorage.getItem('maison_delivery_pincode');
      if (savedPincode) {
        setFormData((prev) => ({
          ...prev,
          zipCode: prev.zipCode || savedPincode,
        }));
      }
    } catch {
      // ignore
    }

    fetch('/api/coupon/apply')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.coupons)) {
          setAvailableCoupons(data.coupons);
        }
      })
      .catch(() => { });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async (codeToApply?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) {
      toast.error('Please enter a coupon code.');
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await fetch('/api/coupon/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coupon_code: code,
          subtotal,
          cart_items: items,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        setCouponCode(data.coupon.code);
        toast.success(data.message || `Coupon "${data.coupon.code}" applied!`);
      } else {
        toast.error(data.message || 'Invalid or expired coupon code.');
      }
    } catch {
      toast.error('Unable to validate coupon. Please try again.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed.');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      toast.error('Please enter a valid phone number.');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your delivery street address.');
      return;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city.');
      return;
    }
    if (!formData.zipCode.trim()) {
      toast.error('Please enter your PIN / Postal code.');
      return;
    }

    if (items.length === 0) {
      toast.error('Your shopping bag is empty.');
      return;
    }

    if (isCalculatingShipping) {
      toast.info('Please wait while your shipping fee is calculated.');
      return;
    }

    if (shippingError) {
      toast.error(shippingError);
      return;
    }

    if (grandTotal === null || backendTotals === null) {
      toast.error('Unable to verify authoritative order total. Please verify your delivery address.');
      return;
    }

    setIsSubmitting(true);

    // Save customer info for future checkouts
    try {
      localStorage.setItem(
        'maison_checkout_customer',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        })
      );
    } catch {
      // ignore
    }

    // 1. CASH ON DELIVERY FLOW (COD)
    if (paymentMethod === 'cod') {
      try {
        const payload = {
          address: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state || formData.city,
            zip_code: formData.zipCode,
            country: formData.country || 'India',
          },
          items: items.map((item) => ({
            product_id: item.product_id,
            product_name: item.name,
            qty: item.qty,
            price: item.price,
            image: item.image,
            options: {
              size: item.size,
              color: item.color,
            },
          })),
          payment_method: 'cod',
          coupon_code: appliedCoupon ? appliedCoupon.code : undefined,
          note: formData.note,
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (res.ok && !json.error && json.data?.order) {
          const order = json.data.order;
          setPlacedOrder({
            ...order,
            customer_name: formData.name,
            address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
            items: [...items],
            final_amount: order.amount || grandTotal,
            payment_channel: 'cod',
          });

          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });

          toast.success(`Order ${order.code} placed successfully!`);
          clearCart();
        } else {
          toast.error(json.message || 'Failed to place order. Please try again.');
        }
      } catch (err: any) {
        console.error('Order checkout error:', err);
        toast.error('Network error while placing order. Please check your connection.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // 2. ONLINE PAYMENT FLOW (UPI / Card via Razorpay)
    try {
      // Step A: Request Razorpay Order Intent from backend
      const prepareRes = await fetch('/api/orders/razorpay/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
          coupon: appliedCoupon,
          address: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state || formData.city,
            zip_code: formData.zipCode,
            country: formData.country || 'India',
          },
        }),
      });

      const prepareData = await prepareRes.json();

      if (!prepareRes.ok || !prepareData.success || !prepareData.razorpay_order_id) {
        setIsSubmitting(false);
        toast.error(prepareData.message || 'Unable to initialize online payment gateway.');
        return;
      }

      // Step B: Ensure Razorpay SDK is loaded
      if (typeof (window as any).Razorpay === 'undefined') {
        setIsSubmitting(false);
        toast.error('Razorpay SDK is still loading. Please try again in a moment.');
        return;
      }

      // Step C: Trigger Razorpay Checkout Modal
      const options = {
        key: prepareData.key_id,
        amount: prepareData.amount,
        currency: prepareData.currency || 'INR',
        name: 'LUNE',
        description: `Order Checkout (${items.length} items)`,
        order_id: prepareData.razorpay_order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#0a0a0a',
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            toast.info('Payment window was closed. You can retry placing the order whenever you are ready.');
          },
        },
        handler: async (response: any) => {
          try {
            setIsSubmitting(true);
            toast.loading('Verifying payment and confirming your order...', { id: 'rzp-verify' });

            const verifyRes = await fetch('/api/orders/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                address: {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  address: formData.address,
                  city: formData.city,
                  state: formData.state || formData.city,
                  zip_code: formData.zipCode,
                  country: formData.country || 'India',
                },
                items: items.map((item) => ({
                  product_id: item.product_id,
                  product_name: item.name,
                  qty: item.qty,
                  price: item.price,
                  image: item.image,
                  options: {
                    size: item.size,
                    color: item.color,
                  },
                })),
                coupon_code: appliedCoupon ? appliedCoupon.code : undefined,
                note: formData.note,
              }),
            });

            const verifyJson = await verifyRes.json();
            toast.dismiss('rzp-verify');

            if (verifyRes.ok && verifyJson.success && verifyJson.data?.order) {
              const order = verifyJson.data.order;
              setPlacedOrder({
                ...order,
                customer_name: formData.name,
                address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
                items: [...items],
                final_amount: order.amount,
                payment_channel: 'Razorpay (Online Payment)',
              });

              confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 },
              });

              toast.success(`Payment verified! Order ${order.code} placed successfully.`);
              clearCart();
            } else {
              toast.error(verifyJson.message || 'Payment verification failed. Please contact support.');
            }
          } catch (err: any) {
            toast.dismiss('rzp-verify');
            console.error('Razorpay verification network error:', err);
            toast.error('Network error during payment verification. Please check your connection.');
          } finally {
            setIsSubmitting(false);
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on('payment.failed', (resp: any) => {
        setIsSubmitting(false);
        toast.error(resp.error?.description || 'Payment was declined. Please try another card or UPI.');
      });
      rzpInstance.open();
    } catch (err: any) {
      console.error('Online checkout error:', err);
      setIsSubmitting(false);
      toast.error('Failed to initiate online checkout. Please try again.');
    }
  };

  // SUCCESS STATE: ORDER CONFIRMED
  if (placedOrder) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-neutral-200/80 shadow-xl overflow-hidden"
          >
            {/* Top Confirmation Header */}
            <div className="bg-neutral-950 text-white p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-1">
                Order Confirmed
              </p>
              <h1 className="text-2xl sm:text-3xl font-light tracking-tight">
                Thank You for Your Order
              </h1>
              <p className="text-neutral-400 text-sm mt-2">
                A confirmation has been sent to{' '}
                <span className="text-white font-medium">{placedOrder.customer_email}</span>
              </p>
            </div>

            {/* Order Highlight Box */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-neutral-50 border border-neutral-200/80 p-5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                    Order Number
                  </span>
                  <span className="text-xl font-bold font-mono text-neutral-900">
                    {placedOrder.code}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                    Payment Mode
                  </span>
                  <span className="text-sm font-medium text-neutral-800 uppercase">
                    {placedOrder.payment_channel === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : placedOrder.payment_channel}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                    Total Amount
                  </span>
                  <span className="text-xl font-bold text-neutral-900">
                    {formatPrice(placedOrder.amount || placedOrder.final_amount)}
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="border-t border-neutral-100 pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-500" />
                  Delivery Address
                </h3>
                <p className="text-sm text-neutral-700 font-medium">{placedOrder.customer_name}</p>
                <p className="text-sm text-neutral-600 mt-1">{placedOrder.address}</p>
                <p className="text-sm text-neutral-600 mt-1">Phone: {placedOrder.customer_phone}</p>
              </div>

              {/* Ordered Items Preview */}
              <div className="border-t border-neutral-100 pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
                  <ShoppingBag size={16} className="text-neutral-500" />
                  Items in Order ({placedOrder.items?.length || 1})
                </h3>
                <div className="divide-y divide-neutral-100">
                  {placedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 relative bg-neutral-100 flex-shrink-0 overflow-hidden border border-neutral-200">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              <ShoppingBag size={16} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {item.size} • {item.color} • Qty: {item.qty}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-neutral-900 flex-shrink-0">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/track-order?code=${encodeURIComponent(
                    placedOrder.code
                  )}&email=${encodeURIComponent(placedOrder.customer_email || '')}`}
                  className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white text-center py-3.5 px-6 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Truck size={16} />
                  Track Order
                </Link>
                <Link
                  href="/shop"
                  className="flex-1 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 text-center py-3.5 px-6 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // EMPTY CART STATE
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-neutral-200 p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <ShoppingBag size={28} />
          </div>
          <h2 className="text-2xl font-light text-neutral-900 mb-2">Your Shopping Bag is Empty</h2>
          <p className="text-neutral-500 text-sm mb-6">
            Looks like you haven&apos;t added any pieces to your bag yet. Explore our collection
            to find your everyday essentials.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center w-full py-3.5 px-6 bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-medium transition-colors gap-2"
          >
            Shop Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Brand Bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-[0.2em] text-neutral-950">
            LUNE
          </Link>
          <div className="flex items-center space-x-2 text-xs text-neutral-500 uppercase tracking-wider">
            <Lock size={14} className="text-emerald-600" />
            <span className="hidden sm:inline">Secure 256-Bit Encrypted Checkout</span>
            <span className="sm:hidden">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Area */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors gap-1.5"
          >
            <ArrowLeft size={14} />
            Back to Shopping
          </Link>
          <span className="text-xs text-neutral-400 uppercase tracking-wider">Step 1 of 1</span>
        </div>

        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 lg:gap-y-8 items-start"
        >
          {/* Section 1: Contact Information */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
              <h2 className="text-base font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <User size={18} className="text-neutral-600" />
                1. Contact Information
              </h2>
              <span className="text-xs text-neutral-400">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Order confirmation & tax invoice will be sent here
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Delivery tracking updates via SMS / WhatsApp
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
              <h2 className="text-base font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <MapPin size={18} className="text-neutral-600" />
                2. Delivery Address
              </h2>
              <span className="text-xs text-neutral-400">All-India Delivery</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                  Street Address / Flat / Building *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. Flat 402, Crescent Towers, Indiranagar"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="e.g. Karnataka"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    placeholder="560038"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-700 mb-1.5">
                  Delivery Note (Optional)
                </label>
                <input
                  type="text"
                  name="note"
                  placeholder="e.g. Ring bell, leave with security guard"
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3 (Mobile) / Right Rail (Desktop): Order Summary */}
          <aside
            aria-label="Order Summary"
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-4 lg:sticky lg:top-24 space-y-6"
          >
            <div className="bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-semibold uppercase tracking-wider text-neutral-900 mb-4 pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-neutral-600" />
                  Order Summary
                </span>
                <span className="text-xs font-normal text-neutral-500">
                  {items.reduce((s, i) => s + i.qty, 0)} Items
                </span>
              </h2>

              {/* Items List */}
              <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center gap-3">
                    <div className="w-14 h-16 relative bg-neutral-100 flex-shrink-0 overflow-hidden border border-neutral-200">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                          <ShoppingBag size={18} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">{item.name}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Size: <span className="font-medium text-neutral-700">{item.size}</span>
                        {item.color && (
                          <>
                            {' '}
                            • Color:{' '}
                            <span className="font-medium text-neutral-700">{item.color}</span>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-neutral-900 flex-shrink-0">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="border-t border-neutral-100 pt-5 mt-4">
                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag size={15} className="text-emerald-700" />
                      <div>
                        <span className="text-xs font-semibold text-emerald-900 block font-mono">
                          {appliedCoupon.code} {appliedCoupon.isFreeShipping ? '(FREE SHIPPING)' : `(-${formatPrice(appliedCoupon.discountAmount)})`}
                        </span>
                        {appliedCoupon.title && appliedCoupon.title !== appliedCoupon.code && (
                          <span className="text-[10px] text-emerald-700 block">{appliedCoupon.title}</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo or Gift Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyCoupon();
                          }
                        }}
                        className="flex-1 px-3 py-2 text-xs uppercase tracking-wider bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:bg-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        disabled={isApplyingCoupon}
                        className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs font-semibold uppercase px-4 py-2 transition-colors cursor-pointer"
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </button>
                    </div>
                    {availableCoupons.length > 0 ? (
                      <div className="pt-1 space-y-1">
                        <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                          <Sparkles size={12} className="text-neutral-900" />
                          Active store coupons:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {availableCoupons.slice(0, 4).map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => handleApplyCoupon(c.code)}
                              className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-[10px] font-semibold rounded border border-neutral-200 transition-colors cursor-pointer"
                              title={c.title || c.code}
                            >
                              {c.code}
                              {c.type_option === 'percentage'
                                ? ` (${c.value}% off)`
                                : c.type_option === 'shipping'
                                  ? ' (Free Shipping)'
                                  : ` (₹${c.value} off)`}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon('WELCOME10')}
                        className="text-[11px] text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Sparkles size={12} className="text-neutral-950" />
                        Click here to apply <strong className="underline font-mono">WELCOME10</strong> (10% off)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Calculation Summary */}
              <div className="border-t border-neutral-100 pt-5 mt-5 space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <span>Shipping</span>
                    {isCalculatingShipping ? (
                      <span className="text-[10px] text-neutral-400 font-sans animate-pulse">Calculating...</span>
                    ) : isFreeShipping ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        {shippingMethodName || 'Free Express'}
                      </span>
                    ) : null}
                  </div>
                  <span className="font-medium text-neutral-900">
                    {isCalculatingShipping ? (
                      <span className="text-neutral-400 text-xs italic">Calculating...</span>
                    ) : shippingError ? (
                      <span className="text-amber-700 text-xs font-normal">{shippingError}</span>
                    ) : shippingFee !== null ? (
                      shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)
                    ) : (
                      <span className="text-neutral-400 text-xs">—</span>
                    )}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-base font-bold text-neutral-950">
                  <span>Total</span>
                  <span>
                    {isCalculatingShipping ? (
                      <span className="text-neutral-400 text-sm font-normal animate-pulse">Calculating...</span>
                    ) : grandTotal !== null ? (
                      formatPrice(grandTotal)
                    ) : (
                      <span className="text-neutral-400 text-sm font-normal">—</span>
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 text-right">All prices inclusive of taxes</p>
              </div>
            </div>

            {/* Trust Badges Card: Shown in right rail on desktop */}
            <div className="hidden lg:block bg-white border border-neutral-200/90 p-5 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-neutral-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Express Dispatch Across India
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Dispatches within 24–48 hours. Live tracking link shared on dispatch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-neutral-100">
                <ShieldCheck size={18} className="text-neutral-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    7-Day Doorstep Returns & Exchanges
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Easy returns and size exchanges with free doorstep pickup.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Section 4: Payment Method */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-3 bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
              <h2 className="text-base font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <CreditCard size={18} className="text-neutral-600" />
                3. Payment Method
              </h2>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                100% Safe & Verified
              </span>
            </div>

            <div className="space-y-3">
              {/* Option: COD */}
              <label
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${paymentMethod === 'cod'
                    ? 'border-neutral-950 bg-neutral-50/70 ring-1 ring-neutral-950'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-neutral-950 focus:ring-neutral-950"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <Banknote size={18} className="text-neutral-900" />
                      <span className="text-sm font-semibold text-neutral-900">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-neutral-950 text-white px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Pay in cash or scan UPI code directly to the courier executive upon
                      doorstep delivery. Zero extra fee.
                    </p>
                  </div>
                </div>
              </label>

              {/* Option: UPI / QR */}
              <label
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${paymentMethod === 'upi'
                    ? 'border-neutral-950 bg-neutral-50/70 ring-1 ring-neutral-950'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 text-neutral-950 focus:ring-neutral-950"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <QrCode size={18} className="text-neutral-900" />
                      <span className="text-sm font-semibold text-neutral-900">
                        Instant UPI / QR Code
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Google Pay, PhonePe, Paytm, BHIM, or any UPI banking app.
                    </p>
                  </div>
                </div>
              </label>

              {/* Option: Credit/Debit Card */}
              <label
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${paymentMethod === 'card'
                    ? 'border-neutral-950 bg-neutral-50/70 ring-1 ring-neutral-950'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-neutral-950 focus:ring-neutral-950"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <CreditCard size={18} className="text-neutral-900" />
                      <span className="text-sm font-semibold text-neutral-900">
                        Credit / Debit Cards
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Visa, Mastercard, RuPay, American Express via secure bank gateway.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 5: Place Order CTA, Terms & Mobile Trust Badges */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-4 space-y-6">
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isCalculatingShipping || Boolean(shippingError) || grandTotal === null}
                className="w-full bg-neutral-950 hover:bg-neutral-900 text-white font-medium py-4 px-6 text-base tracking-wide uppercase transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group cursor-pointer font-display"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>
                      {paymentMethod === 'cod'
                        ? 'Confirming COD Order...'
                        : 'Connecting to Secure Gateway...'}
                    </span>
                  </>
                ) : isCalculatingShipping ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Calculating Shipping...</span>
                  </>
                ) : shippingError ? (
                  <>
                    <AlertCircle size={16} className="text-amber-400" />
                    <span>Shipping Unavailable — Check Address</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>
                      {paymentMethod === 'cod' ? 'Place Order (COD)' : 'Pay Now'} • {formatPrice(grandTotal ?? 0)}
                    </span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-neutral-500 mt-3 flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                By placing this order, you agree to our Terms of Sale and Privacy Policy.
              </p>
            </div>

            {/* Trust Badges Card: Shown below Place Order on mobile */}
            <div className="lg:hidden bg-white border border-neutral-200/90 p-5 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-neutral-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Express Dispatch Across India
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Dispatches within 24–48 hours. Live tracking link shared on dispatch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-neutral-100">
                <ShieldCheck size={18} className="text-neutral-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    7-Day Doorstep Returns & Exchanges
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Easy returns and size exchanges with free doorstep pickup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </div>
  );
}
