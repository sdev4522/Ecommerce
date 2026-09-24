<section class="popular-categories bg-grey-9 section-padding-60" id="featured-product-categories">
    <div class="container wow fadeIn animated">
        <h3 class="section-title mb-30">{{ $title }}</h3>

        <div class="carousel-6-columns-cover position-relative">
            <div class="slider-arrow slider-arrow-2 carousel-6-columns-arrow" id="carousel-6-columns-categories-arrows"></div>
            <div class="carousel-slider-wrapper carousel-6-columns" id="carousel-6-columns-categories" data-slick="{{ json_encode([
                'autoplay' => $shortcode->is_autoplay == 'yes',
                'infinite' => $shortcode->infinite == 'yes' || $shortcode->is_infinite == 'yes',
                'autoplaySpeed' => (int)(in_array($shortcode->autoplay_speed, theme_get_autoplay_speed_options()) ? $shortcode->autoplay_speed : 3000),
                'speed' => 800,
                'mobileScrollItems' => (int)($shortcode->mobile_scroll_items ?? 1),
            ]) }}">
                @foreach($categories as $category)
                    <div class="card-1 border-radius-10 hover-up p-20">
                        <figure class="mb-30 img-hover-scale overflow-hidden">
                            <a href="{{ $category->url }}"><img src="{{ RvMedia::getImageUrl($category->image, 'product-thumb', false, RvMedia::getDefaultImage()) }}" alt="{{ $category->name }}" /></a>
                        </figure>
                        <h5><a href="{{ $category->url }}">{{ $category->name }}</a></h5>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>
