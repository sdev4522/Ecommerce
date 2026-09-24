<?php

namespace Database\Seeders;

use Botble\Base\Facades\MetaBox;
use Botble\Base\Supports\BaseSeeder;
use Botble\Language\Models\LanguageMeta;
use Botble\SimpleSlider\Models\SimpleSlider;
use Botble\SimpleSlider\Models\SimpleSliderItem;
use Illuminate\Support\Arr;

class SimpleSliderSeeder extends BaseSeeder
{
    public function run(): void
    {
        $this->uploadFiles('sliders');

        SimpleSlider::query()->truncate();
        SimpleSliderItem::query()->truncate();

        $sliders = [
            [
                'name' => 'Home slider 1',
                'key' => 'home-slider-1',
                'total' => 3,
                'style' => '',
            ],
            [
                'name' => 'Home slider 2',
                'key' => 'home-slider-2',
                'total' => 3,
                'style' => 'style-2',
            ],
            [
                'name' => 'Home slider 3',
                'key' => 'home-slider-3',
                'total' => 2,
                'style' => 'style-3',
            ],
            [
                'name' => 'Home slider 4',
                'key' => 'home-slider-4',
                'total' => 3,
                'style' => 'style-4',
            ],
        ];

        $sliderItems = [
            [
                'title' => 'Super Value Deals',
                'link' => '/products',
                'description' => 'Save more with coupons & up to 70% off',
                'button_text' => 'Shop now',
                'subtitle' => 'Trade-In Offer',
                'highlight_text' => 'On All Products',
            ],
            [
                'title' => 'Tech Trending',
                'link' => '/products',
                'description' => 'Save more with coupons & up to 20% off',
                'button_text' => 'Discover now',
                'subtitle' => 'Tech Promotions',
                'highlight_text' => 'Great Collection',
            ],
            [
                'title' => 'Big Deals From',
                'link' => '/products',
                'description' => 'Headphone, Gaming Laptop, PC and more...',
                'button_text' => 'Shop now',
                'subtitle' => 'Upcoming Offer',
                'highlight_text' => 'Manufacturer',
            ],
        ];

        foreach ($sliders as $index => $value) {
            $slider = SimpleSlider::query()->create(Arr::only($value, ['name', 'key']));

            LanguageMeta::saveMetaData($slider);

            if ($value['style']) {
                MetaBox::saveMetaBoxData($slider, 'simple_slider_style', $value['style']);
            }

            foreach (collect($sliderItems)->take($value['total']) as $key => $item) {
                $item['image'] = 'sliders/' . ($index + 1) . '-' . ($key + 1) . '.png';
                $item['order'] = $key + 1;
                $item['simple_slider_id'] = $slider->id;

                $sliderItem = SimpleSliderItem::query()->create(
                    Arr::except($item, ['button_text', 'subtitle', 'highlight_text'])
                );

                MetaBox::saveMetaBoxData($sliderItem, 'button_text', $item['button_text']);
                MetaBox::saveMetaBoxData($sliderItem, 'subtitle', $item['subtitle']);
                MetaBox::saveMetaBoxData($sliderItem, 'highlight_text', $item['highlight_text']);
            }
        }
    }
}
