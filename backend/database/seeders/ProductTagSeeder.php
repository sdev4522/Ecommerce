<?php

namespace Database\Seeders;

use Botble\Base\Supports\BaseSeeder;
use Botble\Ecommerce\Models\ProductTag;
use Botble\Slug\Facades\SlugHelper;
use Botble\Slug\Models\Slug;

class ProductTagSeeder extends BaseSeeder
{
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Wallet',
            ],
            [
                'name' => 'Bags',
            ],
            [
                'name' => 'Shoes',
            ],
            [
                'name' => 'Clothes',
            ],
            [
                'name' => 'Hand bag',
            ],
        ];

        ProductTag::query()->truncate();
        Slug::query()->where('reference_type', ProductTag::class)->delete();

        foreach ($tags as $item) {
            $tag = ProductTag::query()->create($item);

            SlugHelper::createSlug($tag);
        }
    }
}
