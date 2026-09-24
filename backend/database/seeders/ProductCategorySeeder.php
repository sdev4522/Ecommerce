<?php

namespace Database\Seeders;

use Botble\Base\Supports\BaseSeeder;
use Botble\Ecommerce\Models\ProductCategory;
use Botble\Slug\Facades\SlugHelper;
use Illuminate\Support\Arr;

class ProductCategorySeeder extends BaseSeeder
{
    public function run(): void
    {
        $this->uploadFiles('product-categories');

        $categories = [
            [
                'name' => 'Hot Promotions',
                'icon' => 'far fa-star',
            ],
            [
                'name' => 'Electronics',
                'icon' => 'wowy-font-cpu',
                'image' => 'product-categories/1.jpg',
                'is_featured' => true,
                'children' => [
                    [
                        'name' => 'Home Audio & Theaters',
                    ],
                    [
                        'name' => 'TV & Videos',
                    ],
                    [
                        'name' => 'Camera, Photos & Videos',
                    ],
                    [
                        'name' => 'Cellphones & Accessories',
                    ],
                    [
                        'name' => 'Headphones',
                    ],
                    [
                        'name' => 'Videos games',
                    ],
                    [
                        'name' => 'Wireless Speakers',
                    ],
                    [
                        'name' => 'Office Electronic',
                    ],
                ],
            ],
            [
                'name' => 'Clothing',
                'icon' => 'wowy-font-tshirt',
                'image' => 'product-categories/2.jpg',
                'is_featured' => true,
            ],
            [
                'name' => 'Computers',
                'icon' => 'wowy-font-desktop',
                'image' => 'product-categories/3.jpg',
                'is_featured' => true,
                'children' => [
                    [
                        'name' => 'Computer & Tablets',
                    ],
                    [
                        'name' => 'Laptop',
                    ],
                    [
                        'name' => 'Monitors',
                    ],
                    [
                        'name' => 'Computer Components',
                    ],
                ],
            ],
            [
                'name' => 'Home & Kitchen',
                'icon' => 'wowy-font-home',
                'image' => 'product-categories/4.jpg',
                'is_featured' => true,
            ],
            [
                'name' => 'Health & Beauty',
                'icon' => 'wowy-font-dress',
                'image' => 'product-categories/5.jpg',
                'is_featured' => true,
            ],
            [
                'name' => 'Jewelry & Watch',
                'icon' => 'wowy-font-diamond',
                'image' => 'product-categories/6.jpg',
                'is_featured' => true,
            ],
            [
                'name' => 'Technology Toys',
                'icon' => 'far fa-microchip',
                'image' => 'product-categories/7.jpg',
                'is_featured' => true,
                'children' => [
                    [
                        'name' => 'Drive & Storages',
                    ],
                    [
                        'name' => 'Gaming Laptop',
                    ],
                    [
                        'name' => 'Security & Protection',
                    ],
                    [
                        'name' => 'Accessories',
                    ],
                ],
            ],
            [
                'name' => 'Phones',
                'icon' => 'wowy-font-smartphone',
                'image' => 'product-categories/8.jpg',
                'is_featured' => true,
            ],
            [
                'name' => 'Babies & Moms',
                'icon' => 'wowy-font-teddy-bear',
            ],
            [
                'name' => 'Sport & Outdoor',
                'icon' => 'wowy-font-kite',
            ],
            [
                'name' => 'Books & Office',
                'icon' => 'far fa-book',
            ],
            [
                'name' => 'Cars & Motorcycles',
                'icon' => 'far fa-car',
            ],
            [
                'name' => 'Home Improvements',
                'icon' => 'wowy-font-home',
            ],
        ];

        ProductCategory::query()->truncate();

        foreach ($categories as $index => $item) {
            $this->createCategoryItem($index, $item);
        }
    }

    protected function createCategoryItem(int $index, array $category, int $parentId = 0): void
    {
        $category['parent_id'] = $parentId;
        $category['order'] = $index;

        if (Arr::has($category, 'children')) {
            $children = $category['children'];
            unset($category['children']);
        } else {
            $children = [];
        }

        $createdCategory = ProductCategory::query()->create($category);

        SlugHelper::createSlug($createdCategory);

        if ($children) {
            foreach ($children as $childIndex => $child) {
                $this->createCategoryItem($childIndex, $child, $createdCategory->id);
            }
        }
    }
}
