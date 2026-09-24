<div class="product-detail accordion-detail">
    <div class="detail-info">
        <h3 class="title-detail">{!! BaseHelper::clean($product->name) !!}</h3>

        @include(Theme::getThemeNamespace('views.ecommerce.includes.product-price-big'))

        <form class="add-to-cart-form" method="POST" action="{{ route('public.cart.add-to-cart') }}">
            @csrf

            @if ($product->has_variation)
                <div class="pr_switch_wrap">
                    {!! render_product_swatches($product, [
                        'selected' => $selectedAttrs,
                        'view'     => Theme::getThemeNamespace() . '::views.ecommerce.attributes.swatches-renderer'
                    ]) !!}
                </div>
            @endif

            @if ($product->options()->count() > 0 && isset($product->toArray()['options']))
                <div class="pr_switch_wrap" id="product-option">
                    {!! render_product_options($product) !!}
                </div>
            @endif

            {!! Theme::partial('product-availability', compact('product', 'productVariation')) !!}

            {!! apply_filters(ECOMMERCE_PRODUCT_DETAIL_EXTRA_HTML, null, $product) !!}

            <input type="hidden" name="id" class="hidden-product-id" value="{{ ($product->is_variation || !$product->defaultVariation->product_id) ? $product->id : $product->defaultVariation->product_id }}"/>

            <div class="detail-extralink mb-20 mt-20">
                @if (EcommerceHelper::isCartEnabled())
                    <div class="detail-qty border radius">
                        <a href="javascript:void(0)" class="qty-down"><i class="fa fa-caret-down"></i></a>
                        <input type="number" min="1" value="1" name="qty" class="qty-val qty-input" />
                        <a href="javascript:void(0)" class="qty-up"><i class="fa fa-caret-up"></i></a>
                    </div>
                @endif

                <div class="product-extra-link2 @if (EcommerceHelper::isQuickBuyButtonEnabled()) has-buy-now-button @endif">
                    @if (EcommerceHelper::isCartEnabled())
                        <button type="submit"
                                class="button button-add-to-cart @if ($product->isOutOfStock()) btn-disabled @endif"
                                @if ($product->isOutOfStock()) disabled @endif><i class="far fa-shopping-bag"></i>{{ __('Add to cart') }}</button>
                    @endif
                </div>
            </div>
        </form>

        <div class="font-xs">
            <a href="{{ $product->url }}" class="text-brand hover-up">{{ __('View full details') }} <i class="far fa-arrow-right"></i></a>
        </div>
    </div>
</div>
