<?php

namespace Botble\Ecommerce\Http\Controllers\API;

use Botble\Api\Http\Controllers\BaseApiController;
use Botble\Ecommerce\Enums\OrderStatusEnum;
use Botble\Ecommerce\Enums\ShippingCodStatusEnum;
use Botble\Ecommerce\Enums\ShippingStatusEnum;
use Botble\Ecommerce\Models\Customer;
use Botble\Ecommerce\Models\Discount;
use Botble\Ecommerce\Models\Order;
use Botble\Ecommerce\Models\OrderAddress;
use Botble\Ecommerce\Models\OrderHistory;
use Botble\Ecommerce\Models\OrderProduct;
use Botble\Ecommerce\Models\Product;
use Botble\Ecommerce\Models\Shipment;
use Botble\Ecommerce\Services\HandleShippingFeeService;
use Botble\Payment\Enums\PaymentStatusEnum;
use Botble\Payment\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderPlacementController extends BaseApiController
{
    /**
     * Calculate authoritative checkout totals (Subtotal, Discount, Shipping, Grand Total)
     */
    public function calculateCheckout(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.qty' => 'required|integer|min:1',
            'address' => 'nullable|array',
            'coupon_code' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return $this->httpResponse()
                ->setError()
                ->setCode(422)
                ->setMessage($validator->errors()->first())
                ->setData($validator->errors()->toArray())
                ->toApiResponse();
        }

        try {
            $itemsData = $request->input('items', []);
            $couponCode = $request->input('coupon_code');
            $addressData = $request->input('address', []);

            $calculation = $this->calculateOrderPricing($itemsData, $couponCode, $addressData);

            return $this->httpResponse()
                ->setData([
                    'subtotal' => $calculation['subtotal'],
                    'discount' => $calculation['discount_amount'],
                    'discount_amount' => $calculation['discount_amount'],
                    'shipping' => $calculation['shipping_amount'],
                    'shipping_fee' => $calculation['shipping_amount'],
                    'shipping_method_name' => $calculation['shipping_method_name'],
                    'is_free_shipping' => $calculation['is_free_shipping'],
                    'tax' => $calculation['tax_amount'],
                    'tax_amount' => $calculation['tax_amount'],
                    'total' => $calculation['grand_total'],
                    'grand_total' => $calculation['grand_total'],
                    'currency' => $calculation['currency'],
                ])
                ->setMessage(__('Checkout totals calculated successfully.'))
                ->toApiResponse();
        } catch (\Throwable $e) {
            return $this->httpResponse()
                ->setError()
                ->setCode(400)
                ->setMessage($e->getMessage())
                ->toApiResponse();
        }
    }

    /**
     * Headless order placement API
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'address.name' => 'required|string|max:191',
            'address.email' => 'required|email|max:191',
            'address.phone' => 'required|string|max:50',
            'address.address' => 'required|string|max:255',
            'address.city' => 'required|string|max:100',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return $this->httpResponse()
                ->setError()
                ->setCode(422)
                ->setMessage($validator->errors()->first())
                ->setData($validator->errors()->toArray())
                ->toApiResponse();
        }

        try {
            return DB::transaction(function () use ($request) {
                $addressData = $request->input('address', []);
                $itemsData = $request->input('items', []);
                $paymentMethod = $request->input('payment_method', 'cod');
                $couponCode = $request->input('coupon_code');
                $note = $request->input('note', '');

                // Find or resolve customer
                $userId = 0;
                if (auth('sanctum')->check()) {
                    $userId = auth('sanctum')->id();
                } else {
                    $customer = Customer::query()->where('email', Arr::get($addressData, 'email'))->first();
                    if ($customer) {
                        $userId = $customer->id;
                    }
                }

                // Idempotency: if charge_id is provided, check if order already exists
                $incomingChargeId = $request->input('charge_id');
                if (!empty($incomingChargeId)) {
                    $existingPayment = Payment::query()
                        ->where('charge_id', $incomingChargeId)
                        ->whereNotNull('order_id')
                        ->first();
                    if ($existingPayment && $existingPayment->order) {
                        $existingOrder = $existingPayment->order;
                        return $this->httpResponse()
                            ->setData([
                                'order' => [
                                    'id' => $existingOrder->id,
                                    'code' => $existingOrder->code,
                                    'amount' => $existingOrder->amount,
                                    'sub_total' => $existingOrder->sub_total,
                                    'discount_amount' => $existingOrder->discount_amount,
                                    'shipping_amount' => $existingOrder->shipping_amount,
                                    'status' => (string) $existingOrder->status,
                                    'payment_channel' => $existingPayment->payment_channel,
                                    'customer_email' => Arr::get($addressData, 'email'),
                                    'customer_phone' => Arr::get($addressData, 'phone'),
                                    'token' => $existingOrder->token,
                                    'created_at' => $existingOrder->created_at->toIso8601String(),
                                ],
                            ])
                            ->setMessage(__('Order retrieved successfully.'))
                            ->toApiResponse();
                    }
                }

                // Authoritative calculation via unified pricing engine
                $calculation = $this->calculateOrderPricing($itemsData, $couponCode, $addressData);

                $subTotal = $calculation['subtotal'];
                $discountAmount = $calculation['discount_amount'];
                $shippingAmount = $calculation['shipping_amount'];
                $taxAmount = $calculation['tax_amount'];
                $finalAmount = $calculation['grand_total'];
                $resolvedProducts = $calculation['resolved_products'];
                $shippingMethodName = $calculation['shipping_method_name'];

                // Increment coupon usage if valid discount model was applied
                if ($calculation['applied_coupon_model']) {
                    $calculation['applied_coupon_model']->increment('total_used');
                }

                $isOnlinePaid = ($request->input('payment_status') === 'completed') || ($paymentMethod === 'razorpay' && !empty($incomingChargeId));
                $orderStatus = $isOnlinePaid ? OrderStatusEnum::PROCESSING : OrderStatusEnum::PENDING;
                $paymentStatus = $isOnlinePaid ? PaymentStatusEnum::COMPLETED : PaymentStatusEnum::PENDING;
                $chargeId = !empty($incomingChargeId) ? $incomingChargeId : ('CHG_' . strtoupper(Str::random(12)));

                $token = md5(Str::random(40));

                // Create Order
                $order = Order::query()->create([
                    'user_id' => $userId,
                    'shipping_option' => 'standard',
                    'shipping_method' => 'default',
                    'shipping_amount' => $shippingAmount,
                    'amount' => $finalAmount,
                    'sub_total' => $subTotal,
                    'tax_amount' => $taxAmount,
                    'discount_amount' => $discountAmount,
                    'coupon_code' => $couponCode,
                    'description' => $note,
                    'status' => $orderStatus,
                    'is_confirmed' => 1,
                    'is_finished' => 1,
                    'token' => $token,
                ]);

                // Create Order Address
                OrderAddress::query()->create([
                    'order_id' => $order->id,
                    'name' => Arr::get($addressData, 'name'),
                    'email' => Arr::get($addressData, 'email'),
                    'phone' => Arr::get($addressData, 'phone'),
                    'country' => Arr::get($addressData, 'country', 'IN'),
                    'state' => Arr::get($addressData, 'state', Arr::get($addressData, 'city', '')),
                    'city' => Arr::get($addressData, 'city', ''),
                    'address' => Arr::get($addressData, 'address', ''),
                    'zip_code' => Arr::get($addressData, 'zip_code', Arr::get($addressData, 'postal_code', '')),
                ]);

                // Create Order Products & decrease stock
                foreach ($resolvedProducts as $p) {
                    OrderProduct::query()->create([
                        'order_id' => $order->id,
                        'product_id' => $p['product_id'],
                        'product_name' => $p['product_name'],
                        'product_image' => $p['product_image'],
                        'qty' => $p['qty'],
                        'price' => $p['price'],
                        'tax_amount' => 0,
                        'options' => $p['options'],
                    ]);

                    if ($p['product'] && $p['product']->with_storehouse_management) {
                        $p['product']->quantity = max(0, $p['product']->quantity - $p['qty']);
                        $p['product']->save();
                    }
                }

                // Create Payment
                $payment = Payment::query()->create([
                    'order_id' => $order->id,
                    'currency' => strtoupper(get_application_currency()->title ?? 'INR'),
                    'user_id' => $userId,
                    'charge_id' => $chargeId,
                    'payment_channel' => $paymentMethod,
                    'description' => 'Payment for order ' . $order->code,
                    'amount' => $finalAmount,
                    'status' => $paymentStatus,
                ]);

                $order->payment_id = $payment->id;
                $order->save();

                // Create Shipment
                Shipment::query()->create([
                    'order_id' => $order->id,
                    'user_id' => $userId,
                    'weight' => 0,
                    'cod_amount' => ($paymentMethod === 'cod') ? $finalAmount : 0,
                    'cod_status' => ShippingCodStatusEnum::PENDING,
                    'type' => 'default',
                    'status' => ShippingStatusEnum::PENDING,
                    'price' => $shippingAmount,
                    'rate_id' => '',
                    'shipment_id' => 'SHIP-' . strtoupper(Str::random(8)),
                    'shipping_company_name' => $shippingMethodName ?: 'Standard Express',
                ]);

                // Create Order History
                OrderHistory::query()->create([
                    'action' => 'create_order',
                    'description' => __('Order was placed successfully via Online Storefront'),
                    'order_id' => $order->id,
                    'user_id' => $userId,
                ]);

                return $this->httpResponse()
                    ->setData([
                        'order' => [
                            'id' => $order->id,
                            'code' => $order->code,
                            'amount' => $order->amount,
                            'sub_total' => $order->sub_total,
                            'discount_amount' => $order->discount_amount,
                            'shipping_amount' => $order->shipping_amount,
                            'status' => (string) $order->status,
                            'payment_channel' => $paymentMethod,
                            'customer_email' => Arr::get($addressData, 'email'),
                            'customer_phone' => Arr::get($addressData, 'phone'),
                            'token' => $order->token,
                            'created_at' => $order->created_at->toIso8601String(),
                        ],
                    ])
                    ->setMessage(__('Order placed successfully!'))
                    ->toApiResponse();
            });
        } catch (\Throwable $e) {
            return $this->httpResponse()
                ->setError()
                ->setCode(500)
                ->setMessage('Failed to place order: ' . $e->getMessage())
                ->toApiResponse();
        }
    }

    /**
     * Authoritative calculation logic shared by calculateCheckout and store
     */
    protected function calculateOrderPricing(array $itemsData, ?string $couponCode = null, array $addressData = []): array
    {
        $subTotal = 0;
        $totalWeight = 0;
        $resolvedProducts = [];

        foreach ($itemsData as $item) {
            $productId = Arr::get($item, 'product_id');
            $qty = max(1, (int) Arr::get($item, 'qty', 1));
            $product = Product::query()->find($productId);

            if (!$product) {
                throw new \Exception("Product #{$productId} was not found.");
            }

            // Stock validation
            if ($product->with_storehouse_management && $product->quantity < $qty) {
                throw new \Exception("Product '{$product->name}' is out of stock or does not have sufficient quantity (Available: {$product->quantity}, Requested: {$qty}).");
            }

            // Authoritative price from database
            $authoritativePrice = (float) ($product->front_sale_price ?? ($product->sale_price !== null && $product->sale_price > 0 ? $product->sale_price : $product->price));
            $productName = $product->name;
            $productImage = Arr::get($item, 'image', Arr::get($item, 'product_image', $product->image ?: ''));
            $options = Arr::get($item, 'options', []);

            $lineTotal = round($authoritativePrice * $qty, 2);
            $subTotal += $lineTotal;
            $totalWeight += ((float) ($product->weight ?: 0)) * $qty;

            $resolvedProducts[] = [
                'product_id' => $productId,
                'product' => $product,
                'product_name' => $productName,
                'product_image' => $productImage,
                'qty' => $qty,
                'price' => $authoritativePrice,
                'options' => $options,
                'line_total' => $lineTotal,
            ];
        }

        // Authoritative Discount Calculation
        $discountAmount = 0;
        $isFreeShippingCoupon = false;
        $appliedCouponModel = null;

        if (!empty($couponCode)) {
            $discountModel = Discount::query()
                ->where('code', $couponCode)
                ->where('type', 'coupon')
                ->first();

            if ($discountModel) {
                if ($discountModel->min_order_price && $subTotal < (float) $discountModel->min_order_price) {
                    throw new \Exception("Minimum order of ₹{$discountModel->min_order_price} required for coupon '{$couponCode}'.");
                }

                if ($discountModel->type_option === 'percentage') {
                    $discountAmount = round($subTotal * ($discountModel->value / 100), 2);
                } elseif ($discountModel->type_option === 'shipping') {
                    $isFreeShippingCoupon = true;
                    $discountAmount = 0;
                } else {
                    $discountAmount = min($subTotal, (float) $discountModel->value);
                }

                $appliedCouponModel = $discountModel;
            } elseif (strtoupper($couponCode) === 'WELCOME10') {
                $discountAmount = round($subTotal * 0.10, 2);
            } else {
                throw new \Exception("Coupon code '{$couponCode}' is invalid or expired.");
            }
        }

        // Authoritative Shipping Calculation via HandleShippingFeeService
        $netSubtotal = max(0, $subTotal - $discountAmount);

        if ($isFreeShippingCoupon) {
            $shippingAmount = 0.0;
            $shippingMethodName = 'Free Shipping Coupon';
        } else {
            $shippingService = app(HandleShippingFeeService::class);
            $shippingService->clearCache();

            $country = Arr::get($addressData, 'country', 'IN');
            if (strcasecmp($country, 'India') === 0) {
                $country = 'IN';
            }

            $state = Arr::get($addressData, 'state', Arr::get($addressData, 'city', ''));
            $city = Arr::get($addressData, 'city', '');
            $zipCode = Arr::get($addressData, 'zip_code', Arr::get($addressData, 'postal_code', ''));
            $address = Arr::get($addressData, 'address', '');

            $shippingData = [
                'country' => $country,
                'state' => $state,
                'city' => $city,
                'address' => $address,
                'zip_code' => $zipCode,
                'address_to' => [
                    'country' => $country,
                    'state' => $state,
                    'city' => $city,
                    'address' => $address,
                    'zip_code' => $zipCode,
                ],
                'order_total' => $netSubtotal,
                'weight' => (float) $totalWeight,
            ];

            $shippingRates = $shippingService->execute($shippingData);

            $availableRates = [];
            foreach ($shippingRates as $methodKey => $rates) {
                if (is_array($rates)) {
                    foreach ($rates as $ruleId => $rate) {
                        if (is_array($rate) && isset($rate['price'])) {
                            $availableRates[] = [
                                'id' => $ruleId,
                                'method' => $methodKey,
                                'name' => Arr::get($rate, 'name', 'Standard Delivery'),
                                'price' => (float) Arr::get($rate, 'price', 0),
                            ];
                        }
                    }
                }
            }

            if (empty($availableRates)) {
                // If country is not in ec_shipping, it is an unsupported destination
                $hasCountry = DB::table('ec_shipping')->where('country', $country)->exists();
                if (!$hasCountry) {
                    throw new \Exception("Delivery is not supported for country: {$country}");
                }
                throw new \Exception("Shipping is not available for this delivery address.");
            }

            // Sort rates ascending by price to automatically choose the best available rate
            usort($availableRates, fn($a, $b) => $a['price'] <=> $b['price']);
            $selectedRate = $availableRates[0];

            $shippingAmount = (float) $selectedRate['price'];
            $shippingMethodName = $selectedRate['name'];
        }

        $taxAmount = 0.0;
        $finalAmount = max(0, round($subTotal - $discountAmount + $shippingAmount + $taxAmount, 2));

        return [
            'subtotal' => $subTotal,
            'discount_amount' => $discountAmount,
            'shipping_amount' => $shippingAmount,
            'shipping_method_name' => $shippingMethodName ?? 'Standard Delivery',
            'is_free_shipping' => ($shippingAmount == 0),
            'tax_amount' => $taxAmount,
            'grand_total' => $finalAmount,
            'currency' => strtoupper(get_application_currency()->title ?? 'INR'),
            'resolved_products' => $resolvedProducts,
            'applied_coupon_model' => $appliedCouponModel,
            'is_free_shipping_coupon' => $isFreeShippingCoupon,
        ];
    }

    /**
     * Get active ecommerce shipping rules
     */
    public function getShippingRules(): JsonResponse
    {
        $rules = DB::table('ec_shipping_rules')
            ->select('id', 'name', 'type', 'from', 'to', 'price')
            ->get();

        $freeRule = $rules->firstWhere('price', 0);
        $standardRule = $rules->firstWhere('price', '>', 0);

        return $this->httpResponse()
            ->setData([
                'free_shipping_threshold' => $freeRule && $freeRule->from ? (float) $freeRule->from : 2000.0,
                'standard_shipping_fee' => $standardRule ? (float) $standardRule->price : 10.0,
                'currency' => 'INR',
                'rules' => $rules,
            ])
            ->toApiResponse();
    }
}
