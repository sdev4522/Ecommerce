<?php

namespace Database\Seeders;

use Botble\Base\Supports\BaseSeeder;
use Botble\Blog\Models\Post;
use Botble\Ecommerce\Models\Product;
use Botble\Ecommerce\Models\ProductCategory;
use Botble\Menu\Database\Traits\HasMenuSeeder;
use Botble\Page\Models\Page;

class MenuSeeder extends BaseSeeder
{
    use HasMenuSeeder;

    public function run(): void
    {
        $data = [
            [
                'name' => 'Main menu',
                'slug' => 'main-menu',
                'location' => 'main-menu',
                'items' => [
                    [
                        'title' => 'Home',
                        'url' => '/',
                        'children' => [
                            [
                                'title' => 'Home 1',
                                'reference_id' => 1,
                                'reference_type' => Page::class,
                            ],
                            [
                                'title' => 'Home 2',
                                'reference_id' => 2,
                                'reference_type' => Page::class,
                            ],
                            [
                                'title' => 'Home 3',
                                'reference_id' => 3,
                                'reference_type' => Page::class,
                            ],
                            [
                                'title' => 'Home 4',
                                'reference_id' => 4,
                                'reference_type' => Page::class,
                            ],
                        ],
                    ],
                    [
                        'title' => 'Shop',
                        'url' => '/products',
                        'children' => [
                            [
                                'title' => 'Shop Grid - Full Width',
                                'url' => '/products',
                            ],
                            [
                                'title' => 'Shop Grid - Right Sidebar',
                                'url' => '/products?layout=product-right-sidebar',
                            ],
                            [
                                'title' => 'Shop Grid - Left Sidebar',
                                'url' => '/products?layout=product-left-sidebar',
                            ],
                            [
                                'title' => 'Products Of Category',
                                'reference_id' => 1,
                                'reference_type' => ProductCategory::class,
                            ],
                        ],
                    ],
                    [
                        'title' => 'Product',
                        'url' => '#',
                        'children' => [
                            [
                                'title' => 'Product Right Sidebar',
                                'url' => str_replace(url(''), '', Product::query()->find(1)->url),
                            ],
                            [
                                'title' => 'Product Left Sidebar',
                                'url' => str_replace(url(''), '', Product::query()->find(2)->url),
                            ],
                            [
                                'title' => 'Product Full Width',
                                'url' => str_replace(url(''), '', Product::query()->find(3)->url),
                            ],
                        ],
                    ],
                    [
                        'title' => 'Blog',
                        'reference_id' => 5,
                        'reference_type' => Page::class,
                        'children' => [
                            [
                                'title' => 'Blog Right Sidebar',
                                'reference_id' => 5,
                                'reference_type' => Page::class,
                            ],
                            [
                                'title' => 'Blog Left Sidebar',
                                'reference_id' => 13,
                                'reference_type' => Page::class,
                            ],
                            [
                                'title' => 'Single Post Right Sidebar',
                                'url' => str_replace(url(''), '', Post::query()->find(1)->url),
                            ],
                            [
                                'title' => 'Single Post Left Sidebar',
                                'url' => str_replace(url(''), '', Post::query()->find(2)->url),
                            ],
                            [
                                'title' => 'Single Post Full Width',
                                'url' => str_replace(url(''), '', Post::query()->find(3)->url),
                            ],
                            [
                                'title' => 'Single Post with Product Listing',
                                'url' => str_replace(url(''), '', Post::query()->find(4)->url),
                            ],
                        ],
                    ],
                    [
                        'title' => 'FAQ',
                        'reference_id' => 14,
                        'reference_type' => Page::class,
                    ],
                    [
                        'title' => 'Contact',
                        'reference_id' => 6,
                        'reference_type' => Page::class,
                    ],
                ],
            ],
            [
                'name' => 'Product categories',
                'slug' => 'product-categories',
                'items' => [
                    [
                        'title' => 'Men',
                        'reference_id' => 1,
                        'reference_type' => ProductCategory::class,
                    ],
                    [
                        'title' => 'Women',
                        'reference_id' => 2,
                        'reference_type' => ProductCategory::class,
                    ],
                    [
                        'title' => 'Accessories',
                        'reference_id' => 3,
                        'reference_type' => ProductCategory::class,
                    ],
                    [
                        'title' => 'Shoes',
                        'reference_id' => 4,
                        'reference_type' => ProductCategory::class,
                    ],
                    [
                        'title' => 'Denim',
                        'reference_id' => 5,
                        'reference_type' => ProductCategory::class,
                    ],
                    [
                        'title' => 'Dress',
                        'reference_id' => 6,
                        'reference_type' => ProductCategory::class,
                    ],
                ],
            ],
            [
                'name' => 'Information',
                'slug' => 'information',
                'items' => [
                    [
                        'title' => 'Contact Us',
                        'reference_id' => 6,
                        'reference_type' => Page::class,
                    ],
                    [
                        'title' => 'About Us',
                        'reference_id' => 8,
                        'reference_type' => Page::class,
                    ],
                    [
                        'title' => 'Terms & Conditions',
                        'reference_id' => 9,
                        'reference_type' => Page::class,
                    ],
                    [
                        'title' => 'Returns & Exchanges',
                        'reference_id' => 10,
                        'reference_type' => Page::class,
                    ],
                    [
                        'title' => 'Shipping & Delivery',
                        'reference_id' => 11,
                        'reference_type' => Page::class,
                    ],
                    [
                        'title' => 'Privacy Policy',
                        'reference_id' => 12,
                        'reference_type' => Page::class,
                    ],
                ],
            ],
        ];

        $this->createMenus($data);
    }
}
