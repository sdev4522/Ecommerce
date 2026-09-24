'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  Shield,
  LogOut,
  ShoppingBag,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  Eye,
  Lock,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { formatPrice } from '../../lib/utils';
import { CustomerAddress, CustomerOrder } from '../../lib/types';
import {
  getCustomerOrders,
  getCustomerAddresses,
  createCustomerAddress,
  deleteCustomerAddress,
  updateCustomerProfile,
  updateCustomerPassword,
} from '../../lib/customer-api';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';

function AccountPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  const { customer, token, isAuthenticated, logout, openAuthModal, fetchProfile } = useAuthStore();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // Selected Order for detail modal
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  // Add Address Modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'India',
    is_default: true,
  });
  const [savingAddress, setSavingAddress] = useState(false);

  // Profile Form state
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Form state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Sync tab with URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['orders', 'profile', 'addresses', 'security'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Sync profile inputs with customer state
  useEffect(() => {
    if (customer) {
      setProfileName(customer.name || '');
      setProfilePhone(customer.phone || '');
    }
  }, [customer]);

  const loadData = useCallback(async () => {
    if (!token) return;

    setLoadingOrders(true);
    setLoadingAddresses(true);

    try {
      // 1. Fetch Orders from Backend
      const backendOrders = await getCustomerOrders(token);

      // 2. Fetch locally placed orders from checkout (for instant preview)
      let localOrders: CustomerOrder[] = [];
      try {
        const saved = localStorage.getItem('maison_placed_orders');
        if (saved) {
          localOrders = JSON.parse(saved);
        }
      } catch {
        // ignore
      }

      // Combine unique orders
      const combined = [...localOrders];
      backendOrders.forEach((bo) => {
        if (!combined.some((co) => co.id === bo.id || co.code === bo.code)) {
          combined.push(bo);
        }
      });

      setOrders(combined);
    } catch {
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }

    try {
      const addr = await getCustomerAddresses(token);
      setAddresses(addr);
    } catch {
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadData();
      fetchProfile();
    }
  }, [isAuthenticated, token, loadData, fetchProfile]);

  // Handle Profile Update
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSavingProfile(true);
    const names = profileName.trim().split(' ');
    const res = await updateCustomerProfile(
      {
        name: profileName.trim(),
        first_name: names[0] || profileName.trim(),
        last_name: names.slice(1).join(' ') || '',
        phone: profilePhone.trim(),
      },
      token
    );
    setSavingProfile(false);

    if (res.success) {
      toast.success('Profile details updated successfully.');
      fetchProfile();
    } else {
      toast.error(res.message || 'Failed to update profile.');
    }
  };

  // Handle Password Update
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setSavingPassword(true);
    const res = await updateCustomerPassword(
      {
        old_password: oldPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      },
      token
    );
    setSavingPassword(false);

    if (res.success) {
      toast.success('Your password has been changed.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error(res.message || 'Failed to update password.');
    }
  };

  // Handle Add Address
  const handleAddAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSavingAddress(true);
    const res = await createCustomerAddress(newAddress, token);
    setSavingAddress(false);

    if (res.success) {
      toast.success('Delivery address saved.');
      setIsAddAddressOpen(false);
      setNewAddress({
        name: customer?.name || '',
        phone: customer?.phone || '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'India',
        is_default: false,
      });
      loadData();
    } else {
      toast.error(res.message || 'Failed to save address.');
    }
  };

  // Handle Delete Address
  const handleDeleteAddress = async (id: number) => {
    if (!token) return;
    const res = await deleteCustomerAddress(id, token);
    if (res.success) {
      toast.success('Address removed.');
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } else {
      toast.error(res.message || 'Could not delete address.');
    }
  };

  const getDisplayString = (value: any, fallback = ''): string => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') {
      return value.label || value.text || value.name || value.title || value.value || fallback;
    }
    return String(value);
  };

  const parseStatusString = (rawStatus: any): string => {
    if (!rawStatus) return 'pending';
    if (typeof rawStatus === 'string') return rawStatus;
    if (typeof rawStatus === 'object') {
      return rawStatus.value || rawStatus.label || rawStatus.text || rawStatus.title || 'pending';
    }
    return String(rawStatus);
  };

  const getStatusBadge = (status: any) => {
    const s = parseStatusString(status).toLowerCase();
    if (s.includes('complete') || s.includes('delivered') || s.includes('success')) {
      return <Badge variant="default" className="bg-emerald-700 text-white gap-1"><CheckCircle2 size={11} /> Completed</Badge>;
    }
    if (s.includes('process') || s.includes('shipping') || s.includes('shipped') || s.includes('transit')) {
      return <Badge variant="dark" className="gap-1"><Truck size={11} /> In Transit</Badge>;
    }
    if (s.includes('cancel') || s.includes('void')) {
      return <Badge variant="outline" className="border-neutral-400 text-neutral-500">Canceled</Badge>;
    }
    return <Badge variant="secondary" className="gap-1"><Clock size={11} /> Processing</Badge>;
  };

  // If user is not authenticated, render login prompt
  if (!isAuthenticated || !customer) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 sm:py-28 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-800">
          <User size={30} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
            Customer Portal
          </h1>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
            Please sign in to access your order history, delivery addresses, and saved preferences.
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <Button onClick={() => openAuthModal('login')} size="lg">
            <span>Sign In to Account</span>
            <ArrowRight size={14} />
          </Button>
          <Button onClick={() => openAuthModal('register')} variant="outline" size="lg">
            Create Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-neutral-200 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-display font-bold text-xl shadow-sm shrink-0">
            {customer.name?.charAt(0).toUpperCase() || 'C'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
                {customer.name}
              </h1>
              <Badge variant="secondary" className="text-[9px]">Verified Member</Badge>
            </div>
            <p className="text-xs text-neutral-500 font-sans mt-0.5">{customer.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              toast.info('Signed out successfully.');
              router.push('/');
            }}
            className="text-neutral-700 hover:text-black gap-1.5"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 flex items-center space-x-4 border-neutral-200">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
            <Package size={18} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold font-display">
              Total Orders
            </span>
            <p className="text-xl font-bold text-neutral-950 font-sans">{orders.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center space-x-4 border-neutral-200">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold font-display">
              Saved Addresses
            </span>
            <p className="text-xl font-bold text-neutral-950 font-sans">{addresses.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center space-x-4 border-neutral-200">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
            <Shield size={18} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold font-display">
              Security
            </span>
            <p className="text-xs font-semibold text-emerald-700 mt-1">Active Sanctum Token</p>
          </div>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(val) => {
        setActiveTab(val);
        router.push(`/account?tab=${val}`, { scroll: false });
      }}>
        <TabsList className="w-full sm:w-auto h-12 bg-neutral-100 p-1 mb-8 flex overflow-x-auto justify-start">
          <TabsTrigger value="orders" className="gap-2 text-xs">
            <Package size={14} />
            <span>My Orders ({orders.length})</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2 text-xs">
            <User size={14} />
            <span>Profile Details</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="gap-2 text-xs">
            <MapPin size={14} />
            <span>Addresses ({addresses.length})</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 text-xs">
            <Lock size={14} />
            <span>Security &amp; Password</span>
          </TabsTrigger>
        </TabsList>

        {/* ===================================================================
            TAB 1: ORDERS
            =================================================================== */}
        <TabsContent value="orders">
          <Card className="border-neutral-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <CardTitle className="text-lg">Order History</CardTitle>
                <CardDescription>View, track, and download invoices for all your past purchases.</CardDescription>
              </div>
              <Link href="/track-order" className="text-xs font-semibold text-neutral-700 hover:text-black underline flex items-center gap-1 font-display">
                <span>Live Tracker</span>
                <ExternalLink size={12} />
              </Link>
            </CardHeader>

            <CardContent className="p-6">
              {loadingOrders ? (
                <div className="py-16 text-center text-xs text-neutral-400">Loading order records...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                    <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 font-display">No orders placed yet</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                    When you place orders, their real-time fulfillment status and tracking milestones will appear here.
                  </p>
                  <Button asChild size="sm">
                    <Link href="/collections/all">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-neutral-200">
                  {orders.map((order) => (
                    <div key={order.id} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-sm text-neutral-950">
                            #{order.code}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-neutral-500">
                          Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })} &bull; {order.products?.length || 1} Item(s)
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xs text-neutral-400 block">Total Amount</span>
                          <span className="text-sm font-bold text-neutral-950 font-sans">
                            {getDisplayString(order.formatted_amount) || formatPrice(order.amount)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="text-xs gap-1.5"
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </Button>

                          <Button asChild variant="default" size="sm" className="text-xs gap-1.5">
                            <Link href={`/track-order?code=${order.code}`}>
                              <Truck size={13} />
                              <span>Track</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================================================================
            TAB 2: PROFILE DETAILS
            =================================================================== */}
        <TabsContent value="profile">
          <Card className="border-neutral-200 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your contact information and display preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-display">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="e.g. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-display">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    disabled
                    value={customer.email}
                    className="bg-neutral-100 text-neutral-500 cursor-not-allowed"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">
                    Account email address is verified and permanently linked.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-display">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">
                    Used for SMS delivery dispatch updates and OTP tracking.
                  </span>
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={savingProfile}>
                    {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================================================================
            TAB 3: SAVED ADDRESSES
            =================================================================== */}
        <TabsContent value="addresses">
          <Card className="border-neutral-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <CardTitle className="text-lg">Delivery Addresses</CardTitle>
                <CardDescription>Manage your default shipping addresses for 1-click checkout.</CardDescription>
              </div>
              <Button onClick={() => setIsAddAddressOpen(true)} size="sm" className="gap-1.5">
                <Plus size={14} />
                <span>Add Address</span>
              </Button>
            </CardHeader>

            <CardContent className="p-6">
              {loadingAddresses ? (
                <div className="py-12 text-center text-xs text-neutral-400">Loading addresses...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <MapPin size={24} className="mx-auto text-neutral-400" />
                  <p className="text-xs text-neutral-500">No saved addresses found.</p>
                  <Button onClick={() => setIsAddAddressOpen(true)} variant="outline" size="sm">
                    Add Your First Address
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <Card key={addr.id} className="p-5 border-neutral-200 relative flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-neutral-900 font-display">{getDisplayString(addr.name)}</h4>
                          {addr.is_default && <Badge variant="default" className="text-[9px]">Default</Badge>}
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {[
                            getDisplayString(addr.address),
                            getDisplayString(addr.city),
                            getDisplayString(addr.state),
                            getDisplayString(addr.zip_code)
                          ].filter(Boolean).join(', ')}
                        </p>
                        <p className="text-xs text-neutral-500 font-sans">Phone: {getDisplayString(addr.phone)}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-neutral-100 flex justify-end">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================================================================
            TAB 4: SECURITY & PASSWORD
            =================================================================== */}
        <TabsContent value="security">
          <Card className="border-neutral-200 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Security &amp; Password</CardTitle>
              <CardDescription>Update your password to keep your account safe.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-display">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-display">
                    New Password
                  </label>
                  <Input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-display">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={savingPassword}>
                    {savingPassword ? 'Updating Password...' : 'Update Password'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ===================================================================
          DIALOG 1: ORDER DETAILS MODAL
          =================================================================== */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-white border-neutral-200">
          {selectedOrder && (
            <div>
              <DialogHeader className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-base font-mono">
                      Order #{selectedOrder.code}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-neutral-500 mt-1">
                      Placed on {new Date(selectedOrder.created_at).toLocaleDateString()} &bull; {getDisplayString(selectedOrder.payment_method, 'Online Payment')}
                    </DialogDescription>
                  </div>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </DialogHeader>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Items List */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display mb-3">
                    Purchased Items
                  </h4>
                  <div className="divide-y divide-neutral-100 border border-neutral-200">
                    {selectedOrder.products && selectedOrder.products.length > 0 ? (
                      selectedOrder.products.map((item, idx) => (
                        <div key={idx} className="p-3 flex items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-14 bg-neutral-100 relative shrink-0 border border-neutral-200 overflow-hidden">
                              {item.product_image ? (
                                <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                  <Package size={16} />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-neutral-900 line-clamp-1">{getDisplayString(item.product_name)}</p>
                              <span className="text-[11px] text-neutral-400 font-sans">Qty: {item.qty} &bull; {getDisplayString(item.formatted_price) || formatPrice(item.price)}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-neutral-950 font-sans">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-xs text-neutral-500">Standard Product Order</div>
                    )}
                  </div>
                </div>

                {/* Shipping Details */}
                {selectedOrder.shipping_address && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display mb-2">
                      Delivery Destination
                    </h4>
                    <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                      <p className="font-semibold text-neutral-900">{getDisplayString(selectedOrder.shipping_address.name)}</p>
                      <p>{getDisplayString(selectedOrder.shipping_address.address)}</p>
                      <p>
                        {[
                          getDisplayString(selectedOrder.shipping_address.city),
                          getDisplayString(selectedOrder.shipping_address.state),
                          getDisplayString(selectedOrder.shipping_address.zip_code)
                        ].filter(Boolean).join(', ')}
                      </p>
                      {selectedOrder.shipping_address.phone && (
                        <p className="font-sans">Phone: {getDisplayString(selectedOrder.shipping_address.phone)}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-sans">{formatPrice(selectedOrder.sub_total || selectedOrder.amount)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping Courier</span>
                    <span className="text-emerald-700 font-semibold font-sans">{selectedOrder.shipping_amount ? formatPrice(selectedOrder.shipping_amount) : 'FREE'}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-sm font-bold text-neutral-950">
                    <span>Total Paid</span>
                    <span className="font-sans">{getDisplayString(selectedOrder.formatted_amount) || formatPrice(selectedOrder.amount)}</span>
                  </div>
                </div>

                {/* Tracking Action */}
                <div className="pt-2 flex gap-2">
                  <Button asChild className="w-full" size="sm">
                    <Link href={`/track-order?code=${selectedOrder.code}`}>
                      <Truck size={14} />
                      <span>Live Order Tracking</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===================================================================
          DIALOG 2: ADD ADDRESS MODAL
          =================================================================== */}
      <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
        <DialogContent className="max-w-md p-6 bg-white border-neutral-200">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-display font-bold">Add Delivery Address</DialogTitle>
            <DialogDescription className="text-xs text-neutral-500">
              Save a new shipping location for rapid checkout.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAddressSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                Recipient Name
              </label>
              <Input
                required
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                Contact Phone
              </label>
              <Input
                required
                type="tel"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                Street Address / Building
              </label>
              <Input
                required
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                placeholder="Flat / House No., Landmark"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                  City
                </label>
                <Input
                  required
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="e.g. Mumbai"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                  State
                </label>
                <Input
                  required
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  placeholder="e.g. Maharashtra"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                  PIN Code
                </label>
                <Input
                  required
                  value={newAddress.zip_code}
                  onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
                  placeholder="400001"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 font-display">
                  Country
                </label>
                <Input
                  disabled
                  value="India"
                  className="bg-neutral-100 text-neutral-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <Button type="submit" disabled={savingAddress} className="w-full">
                {savingAddress ? 'Saving Address...' : 'Save Delivery Address'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default function AccountPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full" />
        </div>
      }
    >
      <AccountPortalContent />
    </React.Suspense>
  );
}
