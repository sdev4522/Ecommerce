import { CustomerAddress, CustomerOrder } from './types';

function getAuthHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function getCustomerOrders(token: string): Promise<CustomerOrder[]> {
  try {
    const res = await fetch('/api/customer/orders', {
      headers: getAuthHeaders(token),
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

export async function getCustomerOrderDetails(orderId: number | string, token: string): Promise<CustomerOrder | null> {
  try {
    const res = await fetch(`/api/customer/orders/${orderId}`, {
      headers: getAuthHeaders(token),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function getCustomerAddresses(token: string): Promise<CustomerAddress[]> {
  try {
    const res = await fetch('/api/customer/addresses', {
      headers: getAuthHeaders(token),
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

export async function createCustomerAddress(
  data: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country?: string;
    is_default?: boolean;
  },
  token: string
): Promise<{ success: boolean; message?: string; data?: CustomerAddress }> {
  try {
    const res = await fetch('/api/customer/addresses', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && !json.error) {
      return { success: true, message: 'Address saved successfully', data: json.data };
    }
    return { success: false, message: json.message || 'Failed to save address' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, message };
  }
}

export async function deleteCustomerAddress(addressId: number, token: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`/api/customer/addresses/${addressId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    const json = await res.json();
    if (res.ok && !json.error) {
      return { success: true, message: 'Address deleted' };
    }
    return { success: false, message: json.message || 'Failed to delete address' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, message };
  }
}

export async function updateCustomerProfile(
  data: {
    name?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    dob?: string;
  },
  token: string
): Promise<{ success: boolean; message?: string; data?: unknown }> {
  try {
    const res = await fetch('/api/customer/profile', {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && !json.error) {
      return { success: true, message: 'Profile updated successfully', data: json.data };
    }
    return { success: false, message: json.message || 'Failed to update profile' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, message };
  }
}

export async function updateCustomerPassword(
  data: {
    old_password?: string;
    password: string;
    password_confirmation: string;
  },
  token: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/customer/password', {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && !json.error) {
      return { success: true, message: 'Password changed successfully' };
    }
    return { success: false, message: json.message || 'Failed to change password' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, message };
  }
}

export async function submitCustomerReview(
  data: {
    product_id: number;
    star: number;
    comment: string;
  },
  token: string
): Promise<{ success: boolean; message?: string; data?: unknown }> {
  try {
    const res = await fetch('/api/customer/reviews', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && !json.error) {
      return { success: true, message: json.message || 'Review submitted successfully', data: json.data };
    }
    const msg = json.message || json.errors?.product_id?.[0] || 'Failed to submit review';
    return { success: false, message: msg };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, message };
  }
}
