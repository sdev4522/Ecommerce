<?php

use Botble\Ads\Facades\AdsManager;
use Botble\Ads\Models\Ads;
use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;
use Botble\Base\Forms\FieldOptions\NumberFieldOption;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\Fields\NumberField;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Models\BaseModel;
use Botble\Blog\Repositories\Interfaces\PostInterface;
use Botble\Ecommerce\Facades\EcommerceHelper;
use Botble\Ecommerce\Models\FlashSale;
use Botble\Ecommerce\Models\ProductCategory;
use Botble\Ecommerce\Repositories\Interfaces\ProductInterface;
use Botble\Faq\Repositories\Interfaces\FaqCategoryInterface;
use Botble\Shortcode\Compilers\Shortcode;
use Botble\Shortcode\Forms\ShortcodeForm;
use Botble\Theme\Facades\Theme;
use Botble\Theme\Supports\ThemeSupport;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

if (! function_exists('addAutoplaySettingsFields')) {
    function addAutoplaySettingsFields(ShortcodeForm $form): ShortcodeForm
    {
        $attributes = $form->getModel();

        return $form
            ->add(
                'is_autoplay',
                SelectField::class,
                SelectFieldOption::make()
                ->label(__('Is autoplay?'))
                ->choices([
                    'no' => __('No'),
                    'yes' => __('Yes'),
                ])
                ->selected($attributes['is_autoplay'] ?? 'no')
            )
            ->add(
                'is_infinite',
                SelectField::class,
                SelectFieldOption::make()
                ->label(__('Loop?'))
                ->choices([
                    'no' => __('No'),
                    'yes' => __('Yes'),
                ])
                ->selected($attributes['is_infinite'] ?? 'yes')
            )
            ->add(
                'autoplay_speed',
                SelectField::class,
                SelectFieldOption::make()
                ->label(__('Autoplay Speed (if autoplay enabled)'))
                ->choices(function_exists('theme_get_autoplay_speed_options') ? theme_get_autoplay_speed_options() : [
                    2000 => '2000ms',
                    3000 => '3000ms',
                    4000 => '4000ms',
                    5000 => '5000ms',
                    6000 => '6000ms',
                    7000 => '7000ms',
                    8000 => '8000ms',
                    9000 => '9000ms',
                    10000 => '10000ms',
                ])
                ->selected($attributes['autoplay_speed'] ?? 3000)
            );
    }
}

if (! function_exists('addAdsFields')) {
    function addAdsFields(ShortcodeForm $form, int $count = 4): ShortcodeForm
    {
        if (is_plugin_active('ads')) {
            $attributes = $form->getModel();
            $ads = Ads::query()
                ->wherePublished()
                ->notExpired()
                ->pluck('name', 'key')
                ->prepend(__('-- Select --'), '');

            for ($i = 1; $i <= $count; $i++) {
                $form->add(
                    "ads_{$i}",
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Ad :number', ['number' => $i]))
                    ->choices($ads)
                    ->selected($attributes["ads_{$i}"] ?? '')
                );
            }
        }

        return $form;
    }
}

app()->booted(function (): void {
    ThemeSupport::registerGoogleMapsShortcode();
    ThemeSupport::registerYoutubeShortcode();

    if (is_plugin_active('simple-slider')) {
        add_filter(SIMPLE_SLIDER_VIEW_TEMPLATE, function () {
            return Theme::getThemeNamespace() . '::partials.shortcodes.sliders.main';
        }, 120);
    }

    add_shortcode('site-features', __('Site features'), __('Site features'), function (Shortcode $shortcode) {
        return Theme::partial('shortcodes.site-features', compact('shortcode'));
    });

    shortcode()->setAdminConfig('site-features', function (array $attributes) {
        $form = ShortcodeForm::createFromArray($attributes);

        for ($i = 1; $i <= 4; $i++) {
            $form
                ->add(
                    "icon{$i}",
                    MediaImageField::class,
                    MediaImageFieldOption::make()
                    ->label(__('Icon :number', ['number' => $i]))
                )
                ->add(
                    "title{$i}",
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title :number', ['number' => $i]))
                )
                ->add(
                    "subtitle{$i}",
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Subtitle :number', ['number' => $i]))
                );
        }

        return $form;
    });

    if (is_plugin_active('ecommerce')) {
        add_shortcode(
            'featured-product-categories',
            __('Featured Product Categories'),
            __('Featured Product Categories'),
            function (Shortcode $shortcode) {
                $categories = get_featured_product_categories();

                return Theme::partial('shortcodes.featured-product-categories', [
                    'title' => $shortcode->title,
                    'categories' => $categories,
                    'shortcode' => $shortcode,
                ]);
            }
        );

        shortcode()->setAdminConfig('featured-product-categories', function (array $attributes) {
            $form = ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'mobile_scroll_items',
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Mobile scroll items'))
                    ->choices([
                        '1' => __('1'),
                        '2' => __('2'),
                    ])
                    ->selected($attributes['mobile_scroll_items'] ?? '1')
                );

            return addAutoplaySettingsFields($form);
        });

        add_shortcode('featured-products', __('Featured products'), __('Featured products'), function (Shortcode $shortcode) {
            if (! is_plugin_active('ecommerce')) {
                return null;
            }

            $products = get_featured_products(array_merge([
                'take' => (int) $shortcode->limit ?: 8,
            ], EcommerceHelper::withReviewsParams()));

            return Theme::partial('shortcodes.featured-products', [
                'title' => $shortcode->title,
                'description' => $shortcode->subtitle,
                'products' => $products,
                'shortcode' => $shortcode,
            ]);
        });

        shortcode()->setAdminConfig('featured-products', function (array $attributes) {
            $form = ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'subtitle',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Subtitle'))
                )
                ->add(
                    'limit',
                    NumberField::class,
                    NumberFieldOption::make()
                    ->label(__('Limit'))
                    ->value($attributes['limit'] ?? 8)
                )
                ->add(
                    'mobile_scroll_items',
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Mobile scroll items'))
                    ->choices([
                        '1' => __('1'),
                        '2' => __('2'),
                    ])
                    ->selected($attributes['mobile_scroll_items'] ?? '1')
                );

            return addAutoplaySettingsFields($form);
        });

        add_shortcode('flash-sale', __('Flash sale'), __('Flash sale'), function (Shortcode $shortcode) {
            $flashSales = FlashSale::query()
                ->notExpired()
                ->wherePublished()
                ->get();

            if (! $flashSales->count()) {
                return null;
            }

            $flashSale = $flashSales->first();

            if (! $flashSale || ! $flashSale->products->count()) {
                return null;
            }

            foreach ($flashSales as $item) {
                $item->load([
                    'products' => function (BelongsToMany $query) use ($shortcode) {
                        $reviewParams = EcommerceHelper::withReviewsParams();

                        if (EcommerceHelper::isReviewEnabled()) {
                            $query->withAvg($reviewParams['withAvg'][0], $reviewParams['withAvg'][1]);
                        }

                        return $query
                            ->wherePublished()
                            ->limit((int) $shortcode->limit ?: 2)
                            ->withCount($reviewParams['withCount'])
                            ->with(EcommerceHelper::withProductEagerLoadingRelations());
                    },
                ]);
            }

            return Theme::partial('shortcodes.flash-sale', [
                'title' => $shortcode->title,
                'showPopup' => $shortcode->show_popup,
                'flashSale' => $flashSale,
                'flashSales' => $flashSales,
            ]);
        });

        shortcode()->setAdminConfig('flash-sale', function (array $attributes) {
            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'show_popup',
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Show sale popup?'))
                    ->choices([
                        'yes' => __('Yes'),
                        'no' => __('No'),
                    ])
                    ->selected($attributes['show_popup'] ?? 'yes')
                )
                ->add(
                    'limit',
                    NumberField::class,
                    NumberFieldOption::make()
                    ->label(__('Limit'))
                    ->value($attributes['limit'] ?? 2)
                );
        });

        add_shortcode(
            'product-collections',
            __('Product Collections'),
            __('Product Collections'),
            function (Shortcode $shortcode) {
                $productCollections = get_product_collections(
                    ['status' => BaseStatusEnum::PUBLISHED],
                    [],
                    ['id', 'name', 'slug']
                );

                if ($productCollections->isEmpty()) {
                    return null;
                }

                $limit = (int) $shortcode->limit ?: 8;

                $products = get_products_by_collections(array_merge([
                    'collections' => [
                        'by' => 'id',
                        'value_in' => [$productCollections->first()->id],
                    ],
                    'take' => $limit,
                    'with' => EcommerceHelper::withProductEagerLoadingRelations(),
                ], EcommerceHelper::withReviewsParams()));

                return Theme::partial('shortcodes.product-collections', [
                    'title' => $shortcode->title,
                    'productCollections' => $productCollections,
                    'limit' => $limit,
                    'products' => $products,
                ]);
            }
        );

        shortcode()->setAdminConfig('product-collections', function (array $attributes) {
            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'limit',
                    NumberField::class,
                    NumberFieldOption::make()
                    ->label(__('Limit'))
                    ->value($attributes['limit'] ?? 8)
                );
        });

        add_shortcode(
            'product-category-products',
            __('Product category products'),
            __('Product category products'),
            function (Shortcode $shortcode) {
                $category = ProductCategory::query()
                    ->wherePublished()
                    ->where('id', (int) $shortcode->category_id)
                    ->with([
                        'activeChildren' => function ($query) {
                            return $query->limit(3);
                        },
                    ])
                    ->first();

                if (! $category) {
                    return null;
                }

                $limit = (int) $shortcode->limit ?: 8;

                $products = app(ProductInterface::class)->getProductsByCategories(array_merge([
                    'categories' => [
                        'by' => 'id',
                        'value_in' => $category->getChildrenIds($category->activeChildren, [$category->getKey()]),
                    ],
                    'take' => $limit,
                ], EcommerceHelper::withReviewsParams()));

                return Theme::partial('shortcodes.product-category-products', compact('category', 'products', 'limit'));
            }
        );

        shortcode()->setAdminConfig('product-category-products', function (array $attributes) {
            $categories = ProductCategory::query()
                ->wherePublished()
                ->pluck('name', 'id');

            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'category_id',
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Product category'))
                    ->choices($categories)
                    ->selected($attributes['category_id'] ?? '')
                )
                ->add(
                    'limit',
                    NumberField::class,
                    NumberFieldOption::make()
                    ->label(__('Limit'))
                    ->value($attributes['limit'] ?? 8)
                );
        });

        add_shortcode('featured-brands', __('Featured Brands'), __('Featured Brands'), function (Shortcode $shortcode) {
            $brands = get_featured_brands();

            return Theme::partial('shortcodes.featured-brands', [
                'title' => $shortcode->title,
                'brands' => $brands,
                'shortcode' => $shortcode,
            ]);
        });

        shortcode()->setAdminConfig('featured-brands', function (array $attributes) {
            $form = ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'mobile_scroll_items',
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Mobile scroll items'))
                    ->choices([
                        '1' => __('1'),
                        '2' => __('2'),
                    ])
                    ->selected($attributes['mobile_scroll_items'] ?? '1')
                );

            return addAutoplaySettingsFields($form);
        });

        add_shortcode('trending-products', __('Trending Products'), __('Trending Products'), function (Shortcode $shortcode) {
            return Theme::partial('shortcodes.trending-products', [
                'title' => $shortcode->title,
                'description' => $shortcode->subtitle,
                'limit' => (int) $shortcode->limit ?: 8,
            ]);
        });

        shortcode()->setAdminConfig('trending-products', function (array $attributes) {
            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'subtitle',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Subtitle'))
                )
                ->add(
                    'limit',
                    NumberField::class,
                    NumberFieldOption::make()
                    ->label(__('Limit'))
                    ->value($attributes['limit'] ?? 8)
                );
        });
    }

    if (is_plugin_active('ads')) {
        add_shortcode('theme-ads', __('Theme ads'), __('Theme ads'), function (Shortcode $shortcode) {
            $keys = get_ads_keys_from_shortcode($shortcode);

            return display_ads($keys);
        });

        shortcode()->setAdminConfig('theme-ads', function (array $attributes) {
            $form = ShortcodeForm::createFromArray($attributes);

            return addAdsFields($form);
        });

        AdsManager::load();

        function display_ad($ads, $class = ''): ?string
        {
            if (! ($ads instanceof BaseModel)) {
                $ads = AdsManager::getData()
                    ->where('key', $ads)
                    ->first();
            }

            if (! $ads || ! $ads->image) {
                return null;
            }

            if ($ads->location &&
                $ads->location != 'not_set' &&
                view()->exists(Theme::getThemeNamespace() . '::partials.shortcodes.ads.' . $ads->location)) {
                return Theme::partial('shortcodes.ads.' . $ads->location, compact('ads', 'class'));
            }

            return Theme::partial('shortcodes.ads.item', compact('ads', 'class'));
        }

        function get_ads_keys_from_shortcode(Shortcode $shortcode): array
        {
            $keys = collect($shortcode->toArray())
                ->sortKeys()
                ->filter(function ($value, $key) use ($shortcode) {
                    return Str::startsWith($key, 'ads_') ||
                        ($shortcode->name == 'theme-ads' && Str::startsWith($key, 'key_'));
                });

            return array_filter($keys->toArray() + [$shortcode->ads]);
        }

        function display_ads(array $keys): string
        {
            $keys = collect($keys);

            return Theme::partial('shortcodes.ads.items', compact('keys'));
        }

        if (is_plugin_active('simple-slider')) {
            add_filter(SHORTCODE_REGISTER_CONTENT_IN_ADMIN, function ($data, $key, $attributes) {
                if ($key == 'simple-slider') {
                    $form = ShortcodeForm::createFromArray($attributes);

                    // Add style field
                    $form->add(
                        'simple_slider_style',
                        SelectField::class,
                        SelectFieldOption::make()
                        ->label(__('Style'))
                        ->choices(function_exists('get_simple_slider_styles') ? get_simple_slider_styles() : [
                            'style-1' => __('Default - Full width'),
                            'style-2' => __('Full width - text center'),
                            'style-3' => __('With Ads'),
                            'style-4' => __('Limit width'),
                        ])
                        ->selected($attributes['simple_slider_style'] ?? 'style-1')
                    );

                    // Add autoplay settings
                    $form = addAutoplaySettingsFields($form);

                    // Add ads fields
                    $form = addAdsFields($form);

                    return $data . $form->renderForm();
                }

                return $data;
            }, 50, 3);
        }
    }

    if (is_plugin_active('blog')) {
        add_shortcode('featured-news', __('Featured News'), __('Featured News'), function (Shortcode $shortcode) {
            $posts = app(PostInterface::class)->getFeatured(4, ['slugable', 'categories', 'categories.slugable']);

            return Theme::partial('shortcodes.featured-news', ['title' => $shortcode->title, 'posts' => $posts]);
        });

        shortcode()->setAdminConfig('featured-news', function (array $attributes) {
            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                );
        });
    }

    if (is_plugin_active('contact')) {
        add_filter(CONTACT_FORM_TEMPLATE_VIEW, function () {
            return Theme::getThemeNamespace() . '::partials.shortcodes.contact-form';
        }, 120);
    }

    if (is_plugin_active('newsletter')) {
        add_shortcode('newsletter-form', __('Newsletter Form'), __('Newsletter Form'), function (Shortcode $shortcode) {
            return Theme::partial('shortcodes.newsletter-form', [
                'title' => $shortcode->title,
                'description' => $shortcode->description,
            ]);
        });

        shortcode()->setAdminConfig('newsletter-form', function (array $attributes) {
            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'title',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Title'))
                )
                ->add(
                    'subtitle',
                    TextField::class,
                    TextFieldOption::make()
                    ->label(__('Subtitle'))
                );
        });
    }

    add_shortcode('our-offices', __('Our offices'), __('Our offices'), function () {
        return Theme::partial('shortcodes.our-offices');
    });

    shortcode()->setAdminConfig('our-offices', function (array $attributes) {
        return '<div class="mb-3"><p>' . __('You can configure it in Admin -> Appearance -> Theme options (tab Contact info boxes)') . '</p></div>';
    });

    if (is_plugin_active('faq')) {
        add_shortcode('faqs', __('FAQs'), __('List of FAQs'), function (Shortcode $shortcode) {
            $params = [
                'condition' => [
                    'status' => BaseStatusEnum::PUBLISHED,
                ],
                'with' => [
                    'faqs' => function ($query): void {
                        $query->wherePublished();
                    },
                ],
                'order_by' => [
                    'faq_categories.order' => 'ASC',
                    'faq_categories.created_at' => 'DESC',
                ],
            ];

            if ($shortcode->category_id) {
                $params['condition']['id'] = $shortcode->category_id;
            }

            $categories = app(FaqCategoryInterface::class)->advancedGet($params);

            return Theme::partial('shortcodes.faqs', compact('categories'));
        });

        shortcode()->setAdminConfig('faqs', function (array $attributes) {
            $categories = app(FaqCategoryInterface::class)->pluck('name', 'id', ['status' => BaseStatusEnum::PUBLISHED]);
            $categories->prepend(__('All'), '');

            return ShortcodeForm::createFromArray($attributes)
                ->add(
                    'category_id',
                    SelectField::class,
                    SelectFieldOption::make()
                    ->label(__('Category'))
                    ->choices($categories)
                    ->selected($attributes['category_id'] ?? '')
                );
        });
    }
});
