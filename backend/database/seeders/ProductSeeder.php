<?php

namespace Database\Seeders;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Supports\BaseSeeder;
use Botble\Ecommerce\Database\Seeders\Traits\HasProductSeeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;

class ProductSeeder extends BaseSeeder
{
    use HasProductSeeder;

    public function run(): void
    {
        $this->uploadFiles('products');

        $faker = fake();

        $products = [
            [
                'name' => 'Smart Home Speaker',
                'is_featured' => true,
                'metadata' => [
                    'layout' => 'product-right-sidebar',
                ],
            ],
            [
                'name' => 'Headphone Ultra Bass',
                'is_featured' => true,
                'metadata' => [
                    'layout' => 'product-left-sidebar',
                ],
            ],
            [
                'name' => 'Boxed - Bluetooth Headphone',
                'is_featured' => true,
                'metadata' => [
                    'layout' => 'product-full-width',
                ],
            ],
            [
                'name' => 'Chikie - Bluetooth Speaker',
                'is_featured' => true,
            ],
            [
                'name' => 'Camera Hikvision HK-35VS8',
                'is_featured' => true,
            ],
            [
                'name' => 'Camera Samsung SS-24',
                'is_featured' => true,
            ],
            [
                'name' => 'Leather Watch Band',
                'is_featured' => true,
            ],
            [
                'name' => 'Apple iPhone 13 Plus',
                'is_featured' => true,
            ],
            [
                'name' => 'Macbook Pro 2015',
                'is_featured' => true,
            ],
            [
                'name' => 'Macbook Air 12 inch',
                'is_featured' => true,
            ],
            [
                'name' => 'Apple Watch Serial 7',
                'is_featured' => true,
            ],
            [
                'name' => 'Macbook Pro 13 inch',
                'is_featured' => true,
            ],
            [
                'name' => 'Apple Keyboard',
                'is_featured' => true,
            ],
            [
                'name' => 'MacSafe 80W',
                'is_featured' => true,
            ],
            [
                'name' => 'Hand playstation',
                'is_featured' => true,
            ],
            [
                'name' => 'Apple Airpods Serial 3',
                'is_featured' => true,
            ],
            [
                'name' => 'Cool Smart Watches',
                'is_featured' => true,
            ],
            [
                'name' => 'Black Smart Watches',
                'is_featured' => true,
            ],
            [
                'name' => 'Leather Watch Band Serial 3',
                'is_featured' => true,
            ],
            [
                'name' => 'Macbook Pro 2015 13 inch',
                'is_featured' => true,
            ],
            [
                'name' => 'Historic Alarm Clock',
                'is_featured' => true,
            ],
            [
                'name' => 'Black Glasses',
                'is_featured' => true,
            ],
            [
                'name' => 'Phillips Mouse',
                'is_featured' => true,
            ],
            [
                'name' => 'Gaming Keyboard',
                'is_featured' => true,
            ],
        ];

        foreach ($products as $key => &$item) {
            if (! isset($item['description'])) {
                $item['description'] = file_get_contents(__DIR__ . '/contents/product-description.html');
            }

            $item['content'] = file_get_contents(__DIR__ . '/contents/product-content.html');
            $item['status'] = BaseStatusEnum::PUBLISHED;
            $item['sku'] = 'HS-' . $faker->numberBetween(100, 200);
            $item['brand_id'] = $faker->numberBetween(1, 7);
            $item['views'] = $faker->numberBetween(1000, 200000);
            $item['quantity'] = $faker->numberBetween(10, 20);
            $item['length'] = $faker->numberBetween(10, 20);
            $item['wide'] = $faker->numberBetween(10, 20);
            $item['height'] = $faker->numberBetween(10, 20);
            $item['weight'] = $faker->numberBetween(500, 900);
            $item['with_storehouse_management'] = true;

            if ($key % 2 == 0) {
                Arr::set($item, 'metadata.is_popular', '1');
            }

            $images = [
                'products/' . ($key + 1) . '.jpg',
            ];

            for ($i = 1; $i <= 10; $i++) {
                if (File::exists(database_path('seeders/files/products/' . ($key + 1) . '-' . $i . '.jpg'))) {
                    $images[] = 'products/' . ($key + 1) . '-' . $i . '.jpg';
                }
            }

            $item['images'] = json_encode($images);
        }

        $this->createProducts($products);
    }
}
