<?php

namespace Database\Seeders;

use Botble\Base\Supports\BaseSeeder;
use Botble\Theme\Facades\Theme;
use Botble\Widget\Models\Widget as WidgetModel;

class WidgetSeeder extends BaseSeeder
{
    public function run(): void
    {
        WidgetModel::query()->truncate();

        $data = [
            [
                'widget_id' => 'NewsletterWidget',
                'sidebar_id' => 'top_footer_sidebar',
                'position' => 1,
                'data' => [
                    'id' => 'NewsletterWidget',
                    'name' => 'Sign up to Newsletter',
                    'subtitle' => '...and receive $25 coupon for first shopping.',
                ],
            ],
            [
                'widget_id' => 'SiteInfoWidget',
                'sidebar_id' => 'footer_sidebar',
                'position' => 0,
                'data' => [
                    'id' => 'SiteInfoWidget',
                    'name' => 'Site information',
                ],
            ],
            [
                'widget_id' => 'CustomMenuWidget',
                'sidebar_id' => 'footer_sidebar',
                'position' => 1,
                'data' => [
                    'id' => 'CustomMenuWidget',
                    'name' => 'Categories',
                    'menu_id' => 'product-categories',
                ],
            ],
            [
                'widget_id' => 'CustomMenuWidget',
                'sidebar_id' => 'footer_sidebar',
                'position' => 2,
                'data' => [
                    'id' => 'CustomMenuWidget',
                    'name' => 'Information',
                    'menu_id' => 'information',
                ],
            ],
            [
                'widget_id' => 'PaymentMethodsWidget',
                'sidebar_id' => 'footer_sidebar',
                'position' => 3,
                'data' => [
                    'id' => 'PaymentMethodsWidget',
                    'name' => 'Payments',
                    'description' => 'Secured Payment Gateways',
                    'image' => 'general/payment-methods.png',
                ],
            ],

            [
                'widget_id' => 'BlogSearchWidget',
                'sidebar_id' => 'primary_sidebar',
                'position' => 0,
                'data' => [
                    'id' => 'BlogSearchWidget',
                    'name' => 'Search',
                ],
            ],
            [
                'widget_id' => 'BlogCategoriesWidget',
                'sidebar_id' => 'primary_sidebar',
                'position' => 1,
                'data' => [
                    'id' => 'BlogCategoriesWidget',
                    'name' => 'Categories',
                ],
            ],
            [
                'widget_id' => 'RecentPostsWidget',
                'sidebar_id' => 'primary_sidebar',
                'position' => 2,
                'data' => [
                    'id' => 'RecentPostsWidget',
                    'name' => 'Recent Posts',
                ],
            ],
            [
                'widget_id' => 'TagsWidget',
                'sidebar_id' => 'primary_sidebar',
                'position' => 4,
                'data' => [
                    'id' => 'TagsWidget',
                    'name' => 'Popular Tags',
                ],
            ],

            [
                'widget_id' => 'ProductCategoriesWidget',
                'sidebar_id' => 'product_sidebar',
                'position' => 1,
                'data' => [
                    'id' => 'ProductCategoriesWidget',
                    'name' => 'Categories',
                ],
            ],
            [
                'widget_id' => 'FeaturedProductsWidget',
                'sidebar_id' => 'product_sidebar',
                'position' => 2,
                'data' => [
                    'id' => 'FeaturedProductsWidget',
                    'name' => 'Featured Products',
                ],
            ],
            [
                'widget_id' => 'FeaturedBrandsWidget',
                'sidebar_id' => 'product_sidebar',
                'position' => 3,
                'data' => [
                    'id' => 'FeaturedBrandsWidget',
                    'name' => 'Manufacturers',
                ],
            ],
        ];

        $theme = Theme::getThemeName();

        foreach ($data as $item) {
            $item['theme'] = $theme;
            WidgetModel::query()->create($item);
        }
    }
}
