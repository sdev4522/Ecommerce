'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Banknote,
  CreditCard,
  QrCode,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/utils';
import { toast } from 'sonner';

interface InstantCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedSize: string;
  selectedColorName?: string;
  selectedColorHex?: string;
  activeImage: string;
  quantity: number;
}

export default function InstantCheckoutModal({
  isOpen,
  onClose,
  product,
  selectedSize,
  selectedColorName,
  selectedColorHex,
  activeImage,
  quantity,
}: InstantCheckoutModalProps) {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Load remembered customer/pincode info if available
  useEffect(() => {
    const savedPin = localStorage.getItem('maison_delivery_pincode');
    if (savedPin) setPincode(savedPin);
  }, []);

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  interface BackendInstantTotals {
    subtotal: number;
    shippingFee: number;
    shippingMethodName: string;
    isFreeShipping: boolean;
    grandTotal: number;
  }

  const [backendTotals, setBackendTotals] = useState<BackendInstantTotals | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  // Authoritative calculation directly from backend shipping engine
  useEffect(() => {
    if (!isOpen || !product) return;

    let isMounted = true;
    setIsCalculatingShipping(true);
    setShippingError(null);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/shipping/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ product_id: product.id, qty: quantity }],
            address: {
              name: fullName,
              phone: phone,
              address: address,
              zip_code: pincode,
              city: 'Mumbai',
              country: 'India',
            },
          }),
        });

        const data = await res.json();
        if (!isMounted) return;

        if (res.ok && data.success && data.data) {
          setBackendTotals({
            subtotal: Number(data.data.subtotal) || product.price * quantity,
            shippingFee: Number(data.data.shippingFee) || 0,
            shippingMethodName: data.data.shippingMethodName || 'Standard Delivery',
            isFreeShipping: Boolean(data.data.isFreeShipping),
            grandTotal: Number(data.data.grandTotal) || product.price * quantity,
          });
          setShippingError(null);
        } else {
          setBackendTotals(null);
          setShippingError(data.message || 'Shipping unavailable');
        }
      } catch {
        if (!isMounted) return;
        setBackendTotals(null);
        setShippingError('Unable to calculate shipping');
      } finally {
        if (isMounted) {
          setIsCalculatingShipping(false);
        }
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, product.id, quantity, pincode]);

  if (!isOpen) return null;

  const itemTotal = backendTotals?.subtotal ?? product.price * quantity;
  const shippingFee = backendTotals !== null ? backendTotals.shippingFee : null;
  const finalTotal = backendTotals !== null ? backendTotals.grandTotal : product.price * quantity;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      toast.error('Please complete all delivery details.');
      return;
    }

    setIsProcessing(true);

    try {
      const cleanPhone = phone.trim();
      const customerEmail = email.trim() || `customer_${cleanPhone.replace(/\D/g, '') || 'guest'}@guest.com`;

      const payload = {
        address: {
          name: fullName.trim(),
          email: customerEmail,
          phone: cleanPhone,
          address: address.trim(),
          city: 'Mumbai',
          state: 'Maharashtra',
          zip_code: pincode.trim(),
          country: 'India',
        },
        items: [
          {
            product_id: product.id,
            product_name: product.name,
            qty: quantity,
            price: product.price,
            image: activeImage,
            options: {
              size: selectedSize,
              color: selectedColorName || 'Standard',
            },
          },
        ],
        payment_method: paymentMethod,
        shipping_amount: shippingFee,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && !json.error && json.data?.order) {
        const order = json.data.order;
        setOrderId(order.code);
        setOrderPlaced(true);

        toast.success('Order Placed Successfully!', {
          description: `Order ${order.code} confirmed in Botble Commerce.`,
        });
      } else {
        toast.error(json.message || 'Failed to place order with Botble backend.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error placing order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white shadow-2xl border border-neutral-200/90 z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Banner */}
          <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <Zap size={13} className="text-white fill-white" />
              </span>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Lightning 1-Click Checkout
                </h3>
                <p className="text-[10px] text-neutral-400 font-light">
                  Powered by Botble Headless Commerce Engine
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {orderPlaced ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                    Order Confirmed
                  </span>
                  <h4 className="text-2xl font-display text-neutral-900 font-medium">
                    Thank You for Your Order
                  </h4>
                  <p className="text-xs text-neutral-500 font-mono font-bold">
                    Order ID: {orderId}
                  </p>
                </div>

                <div className="bg-neutral-50 p-4 border border-neutral-200/70 text-left max-w-md mx-auto text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Item:</span>
                    <span className="font-semibold text-neutral-900">{product.name} (Size: {selectedSize})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Recipient:</span>
                    <span className="font-semibold text-neutral-900">{fullName} ({phone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Destination:</span>
                    <span className="font-semibold text-neutral-900">{address}, PIN: {pincode}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold text-neutral-950">
                    <span>Total Amount:</span>
                    <span>{formatPrice(finalTotal)} ({paymentMethod.toUpperCase()})</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 max-w-sm mx-auto">
                  We&apos;ve sent your order confirmation and tracking details to {phone}.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Link
                    href={`/track-order?code=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`}
                    onClick={onClose}
                    className="w-full sm:w-auto bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-black transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Truck size={14} />
                    Track Order
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto border border-neutral-300 bg-white text-neutral-800 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-neutral-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                {/* 1. Item Summary Preview */}
                <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 border border-neutral-200/80">
                  <div className="relative w-14 h-18 bg-neutral-200 shrink-0 overflow-hidden border border-neutral-300">
                    <Image src={activeImage} alt={product.name} fill className="object-cover object-top" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      {product.category?.name || 'Collection'}
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-600">
                      <span className="bg-white px-1.5 py-0.5 border border-neutral-200 font-medium">
                        Size: {selectedSize}
                      </span>
                      {selectedColorName && <span>&bull; {selectedColorName}</span>}
                      <span>&bull; Qty: {quantity}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-semibold text-neutral-950 font-display">
                      {formatPrice(itemTotal)}
                    </span>
                    {isCalculatingShipping ? (
                      <span className="block text-[10px] text-neutral-400 animate-pulse">Calculating shipping...</span>
                    ) : shippingError ? (
                      <span className="block text-[10px] text-amber-600">{shippingError}</span>
                    ) : shippingFee === 0 ? (
                      <span className="block text-[10px] text-emerald-600 font-medium">Free Shipping</span>
                    ) : shippingFee !== null ? (
                      <span className="block text-[10px] text-neutral-500">+{formatPrice(shippingFee)} Shipping</span>
                    ) : (
                      <span className="block text-[10px] text-neutral-400">Shipping at checkout</span>
                    )}
                  </div>
                </div>

                {/* 2. Express Delivery Information */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-900 block font-display">
                    Delivery Address
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-500 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Recipient Name"
                        className="w-full bg-white border border-neutral-300 text-xs px-3 py-2 outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-500 font-medium mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-neutral-300 text-xs px-3 py-2 outline-none focus:border-neutral-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-500 font-medium mb-1">
                        Street Address & House / Flat No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 402, Altius Towers, Bandra West"
                        className="w-full bg-white border border-neutral-300 text-xs px-3 py-2 outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-500 font-medium mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="400050"
                        className="w-full bg-white border border-neutral-300 text-xs px-3 py-2 outline-none focus:border-neutral-950 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. 1-Click Payment Method Selection */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-900 block font-display">
                    Select Payment Method
                  </span>

                  <div className="grid grid-cols-3 gap-2.5">
                    {/* UPI */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950 shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <QrCode size={16} className={paymentMethod === 'upi' ? 'text-neutral-950' : 'text-neutral-500'} />
                      <div className="mt-2">
                        <strong className="block text-[11px] font-semibold text-neutral-900">Instant UPI</strong>
                        <span className="text-[9px] text-neutral-400">GPay / PhonePe</span>
                      </div>
                    </button>

                    {/* COD */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950 shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <Banknote size={16} className={paymentMethod === 'cod' ? 'text-emerald-600' : 'text-neutral-500'} />
                      <div className="mt-2">
                        <strong className="block text-[11px] font-semibold text-neutral-900">Cash on Delivery</strong>
                        <span className="text-[9px] text-emerald-600 font-medium">Pay at door</span>
                      </div>
                    </button>

                    {/* Cards */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950 shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <CreditCard size={16} className={paymentMethod === 'card' ? 'text-neutral-950' : 'text-neutral-500'} />
                      <div className="mt-2">
                        <strong className="block text-[11px] font-semibold text-neutral-900">Card / Netbanking</strong>
                        <span className="text-[9px] text-neutral-400">All major cards</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. Total & Submit Button */}
                <div className="pt-3 border-t border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500 font-medium">Final Amount Payable:</span>
                    <span className="text-lg font-display font-bold text-neutral-950">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || isCalculatingShipping || Boolean(shippingError) || backendTotals === null}
                    className="w-full bg-neutral-950 hover:bg-black text-white text-xs uppercase tracking-[0.22em] font-semibold py-4 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                  >
                    <Zap size={14} className="text-white fill-white" />
                    <span>
                      {isProcessing
                        ? 'Placing Your Order...'
                        : isCalculatingShipping
                        ? 'Calculating Shipping...'
                        : shippingError
                        ? 'Shipping Unavailable'
                        : `Place Order Now — ${formatPrice(finalTotal)}`}
                    </span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-neutral-600" /> Secure Checkout
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Truck size={12} className="text-neutral-600" /> 7-Day Doorstep Returns
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
