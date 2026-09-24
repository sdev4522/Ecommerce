<?php

namespace Database\Seeders;

use Botble\Base\Facades\Html;
use Botble\Base\Facades\MetaBox;
use Botble\Base\Supports\BaseSeeder;
use Botble\Page\Models\Page;
use Botble\Slug\Facades\SlugHelper;
use Illuminate\Support\Arr;

class PageSeeder extends BaseSeeder
{
    public function run(): void
    {
        $faker = fake();

        $pages = [
            [
                'name' => 'Homepage',
                'content' =>
                    Html::tag(
                        'div',
                        '[simple-slider key="home-slider-1" is_autoplay="yes" autoplay_speed="5000"][/simple-slider]'
                    ) .
                    Html::tag(
                        'div',
                        '[site-features icon1="general/icon-truck.png" title1="Free Shipping" subtitle1="Orders $50 or more" icon2="general/icon-purchase.png" title2="Free Returns" subtitle2="Within 30 days" icon3="general/icon-bag.png" title3="Get 20% Off 1 Item" subtitle3="When you sign up" icon4="general/icon-operator.png" title4="Support Center" subtitle4="24/7 amazing services"][/site-features]'
                    ) .
                    Html::tag(
                        'div',
                        '[featured-product-categories title="Top Categories" mobile_scroll_items="2"][/featured-product-categories]'
                    ) .
                    Html::tag('div', '[product-collections title="Exclusive Products"][/product-collections]') .
                    Html::tag(
                        'div',
                        '[theme-ads ads_1="IZ6WU8KUALYD" ads_2="ILSFJVYFGCPZ" ads_3="ILSDKVYFGXPH"][/theme-ads]'
                    ) .
                    Html::tag('div', '[featured-products title="Featured products" mobile_scroll_items="2"][/featured-products]') .
                    Html::tag('div', '[flash-sale show_popup="yes"][/flash-sale]') .
                    Html::tag(
                        'div',
                        '[featured-brands title="Featured Brands" mobile_scroll_items="2"][/featured-brands]'
                    ) .
                    Html::tag('div', '[product-category-products category_id="12"][/product-category-products]') .
                    Html::tag(
                        'div',
                        '[featured-news title="Visit Our Blog"][/featured-news]'
                    )
                ,
                'template' => 'homepage',
            ],
            [
                'name' => 'Homepage 2',
                'content' =>
                    Html::tag(
                        'div',
                        '[simple-slider key="home-slider-2" is_autoplay="yes" autoplay_speed="5000"][/simple-slider]'
                    ) .
                    Html::tag(
                        'div',
                        '[theme-ads ads_1="IZ6WU8KUALYD" ads_2="ILSFJVYFGCPZ" ads_3="ILSDKVYFGXPH"][/theme-ads]'
                    ) .
                    Html::tag('div', '[product-collections title="Exclusive Products"][/product-collections]') .
                    Html::tag('div', '[theme-ads ads_1="IZ6WU8KUALYF"][/theme-ads]') .
                    Html::tag('div', '[featured-products title="Featured products"][/featured-products]') .
                    Html::tag('div', '[flash-sale show_popup="yes"][/flash-sale]') .
                    Html::tag(
                        'div',
                        '[featured-brands title="Featured Brands"][/featured-brands]'
                    ) .
                    Html::tag(
                        'div',
                        '[featured-product-categories title="Top Categories"][/featured-product-categories]'
                    ) .
                    Html::tag('div', '[product-category-products category_id="12"][/product-category-products]') .
                    Html::tag(
                        'div',
                        '[featured-news title="Visit Our Blog"][/featured-news]'
                    ) .
                    Html::tag(
                        'div',
                        '[site-features icon1="general/icon-truck.png" title1="Free Shipping" subtitle1="Orders $50 or more" icon2="general/icon-purchase.png" title2="Free Returns" subtitle2="Within 30 days" icon3="general/icon-bag.png" title3="Get 20% Off 1 Item" subtitle3="When you sign up" icon4="general/icon-operator.png" title4="Support Center" subtitle4="24/7 amazing services"][/site-features]'
                    )
                ,
                'template' => 'homepage',
                'header_style' => 'header-style-2',
                'expanding_product_categories_on_the_homepage' => 'yes',
            ],
            [
                'name' => 'Homepage 3',
                'content' =>
                    Html::tag(
                        'div',
                        '[simple-slider key="home-slider-3" ads_1="ILSDKVYFGXPJ" ads_2="IZ6WU8KUALYE" is_autoplay="yes" autoplay_speed="5000"][/simple-slider]'
                    ) .
                    Html::tag('div', '[product-collections title="Exclusive Products"][/product-collections]') .
                    Html::tag(
                        'div',
                        '[theme-ads ads_1="IZ6WU8KUALYD" ads_2="ILSFJVYFGCPZ" ads_3="ILSDKVYFGXPH"][/theme-ads]'
                    ) .
                    Html::tag(
                        'div',
                        '[site-features icon1="general/icon-truck.png" title1="Free Shipping" subtitle1="Orders $50 or more" icon2="general/icon-purchase.png" title2="Free Returns" subtitle2="Within 30 days" icon3="general/icon-bag.png" title3="Get 20% Off 1 Item" subtitle3="When you sign up" icon4="general/icon-operator.png" title4="Support Center" subtitle4="24/7 amazing services"][/site-features]'
                    ) .
                    Html::tag(
                        'div',
                        '[featured-product-categories title="Top Categories"][/featured-product-categories]'
                    ) .
                    Html::tag('div', '[featured-products title="Featured products"][/featured-products]') .
                    Html::tag('div', '[flash-sale show_popup="yes"][/flash-sale]') .
                    Html::tag('div', '[theme-ads ads_1="IZ6WU8KUALYF"][/theme-ads]') .
                    Html::tag(
                        'div',
                        '[featured-brands title="Featured Brands"][/featured-brands]'
                    ) .
                    Html::tag('div', '[product-category-products category_id="12"][/product-category-products]') .
                    Html::tag(
                        'div',
                        '[featured-news title="Visit Our Blog"][/featured-news]'
                    )
                ,
                'template' => 'homepage',
                'header_style' => 'header-style-3',
            ],
            [
                'name' => 'Homepage 4',
                'content' =>
                    Html::tag(
                        'div',
                        '[simple-slider key="home-slider-4" is_autoplay="yes" autoplay_speed="5000"][/simple-slider]'
                    ) .
                    Html::tag(
                        'div',
                        '[site-features icon1="general/icon-truck.png" title1="Free Shipping" subtitle1="Orders $50 or more" icon2="general/icon-purchase.png" title2="Free Returns" subtitle2="Within 30 days" icon3="general/icon-bag.png" title3="Get 20% Off 1 Item" subtitle3="When you sign up" icon4="general/icon-operator.png" title4="Support Center" subtitle4="24/7 amazing services"][/site-features]'
                    ) .
                    Html::tag('div', '[product-collections title="Exclusive Products"][/product-collections]') .
                    Html::tag(
                        'div',
                        '[featured-product-categories title="Top Categories"][/featured-product-categories]'
                    ) .
                    Html::tag(
                        'div',
                        '[theme-ads ads_1="IZ6WU8KUALYD" ads_2="ILSFJVYFGCPZ" ads_3="ILSDKVYFGXPH"][/theme-ads]'
                    ) .
                    Html::tag('div', '[theme-ads ads_1="IZ6WU8KUALYF"][/theme-ads]') .
                    Html::tag('div', '[featured-products title="Featured products"][/featured-products]') .
                    Html::tag('div', '[flash-sale show_popup="yes"][/flash-sale]') .
                    Html::tag(
                        'div',
                        '[featured-brands title="Featured Brands"][/featured-brands]'
                    ) .
                    Html::tag('div', '[product-category-products category_id="12"][/product-category-products]') .
                    Html::tag(
                        'div',
                        '[featured-news title="Visit Our Blog"][/featured-news]'
                    )
                ,
                'template' => 'homepage',
                'header_style' => 'header-style-4',
            ],
            [
                'name' => 'Blog',
                'content' => Html::tag('p', '---'),
                'template' => 'blog-right-sidebar',
            ],
            [
                'name' => 'Contact',
                'content' => Html::tag('p', '[google-map]502 New Street, Brighton VIC, Australia[/google-map]') .
                    Html::tag('p', '[our-offices][/our-offices]') .
                    Html::tag('p', '[contact-form][/contact-form]'),
            ],
            [
                'name' => 'About us',
                'content' => Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)) .
                    Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500))
                ,
            ],
            [
                'name' => 'Cookie Policy',
                'content' => Html::tag('h3', 'EU Cookie Consent') .
                    Html::tag(
                        'p',
                        'To use this website we are using Cookies and collecting some data. To be compliant with the EU GDPR we give you to choose if you allow us to use certain Cookies and to collect some Data.'
                    ) .
                    Html::tag('h4', 'Essential Data') .
                    Html::tag(
                        'p',
                        'The Essential Data is needed to run the Site you are visiting technically. You can not deactivate them.'
                    ) .
                    Html::tag(
                        'p',
                        '- Session Cookie: PHP uses a Cookie to identify user sessions. Without this Cookie the Website is not working.'
                    ) .
                    Html::tag(
                        'p',
                        '- XSRF-Token Cookie: Laravel automatically generates a CSRF "token" for each active user session managed by the application. This token is used to verify that the authenticated user is the one actually making the requests to the application.'
                    ),
            ],
            [
                'name' => 'Terms & Conditions',
                'content' => Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)) .
                    Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)),
            ],
            [
                'name' => 'Returns & Exchanges',
                'content' => Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)) .
                    Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)),
            ],
            [
                'name' => 'Shipping & Delivery',
                'content' => Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)) .
                    Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)),
            ],
            [
                'name' => 'Privacy Policy',
                'content' => Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)) .
                    Html::tag('p', $faker->realText(500)) . Html::tag('p', $faker->realText(500)),
            ],
            [
                'name' => 'Blog Left Sidebar',
                'content' => Html::tag('p', '[blog-posts paginate="12"][/blog-posts]'),
                'template' => 'blog-left-sidebar',
            ],
            [
                'name' => 'FAQ',
                'content' => Html::tag('div', '[faqs][/faqs]'),
            ],
        ];

        Page::query()->truncate();

        foreach ($pages as $item) {
            $item['user_id'] = 1;

            if (! isset($item['template'])) {
                $item['template'] = 'default';
            }

            $page = Page::query()->create(
                Arr::except(
                    $item,
                    ['header_style', 'expanding_product_categories_on_the_homepage']
                )
            );

            if (isset($item['expanding_product_categories_on_the_homepage'])) {
                MetaBox::saveMetaBoxData(
                    $page,
                    'expanding_product_categories_on_the_homepage',
                    $item['expanding_product_categories_on_the_homepage']
                );
            }

            SlugHelper::createSlug($page);
        }
    }
}
