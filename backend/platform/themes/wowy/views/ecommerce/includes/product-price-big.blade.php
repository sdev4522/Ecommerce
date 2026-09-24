@if (! EcommerceHelper::hideProductPrice() || EcommerceHelper::isCartEnabled())
    <div class="clearfix product-price-cover">
        <div class="product-price primary-color float-left">
            <span class="current-price text-brand">{{ format_price($product->front_sale_price_with_taxes) }}</span>
            <span>
            <span @class(['save-price font-md color3 ml-15', 'd-none' => $product->front_sale_price == $product->price])>
                <span class="percentage-off">{{ get_sale_percentage($product->price, $product->front_sale_price) }} {{ __('Off') }}</span>
            </span>
            <span @class(['old-price font-md ml-15', 'd-none' => $product->front_sale_price == $product->price])>{{ format_price($product->price_with_taxes) }}</span>
        </span>
        </div>
    </div>
@endif