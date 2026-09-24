<div class="sidebar-widget widget_categories mb-30 p-20 bg-grey border-radius-10">
    <div class="widget-header position-relative mb-20 pb-10">
        <h5 class="widget-title mb-10">{{ $config['name'] }}</h5>
        <div class="bt-1 border-color-1"></div>
    </div>
    <div class="custome-checkbox ps-custom-scrollbar" style="max-height: 310px; overflow: hidden">
        <ul class="ps-list--categories">
            @php
                $categories = ProductCategoryHelper::getAllProductCategories([
                    'condition' => ['status' => \Botble\Base\Enums\BaseStatusEnum::PUBLISHED],
                    'with' => ['slugable', 'activeChildren' => function($query) {
                        $query->with(['slugable', 'activeChildren' => function($q) {
                            $q->with('slugable');
                        }]);
                    }]
                ], true);
            @endphp
            @foreach($categories as $category)
                <li class="@if (URL::current() == $category->url) current-menu-item @endif @if ($category->activeChildren->count()) menu-item-has-children @endif">
                    <a href="{{ $category->url }}">{{ $category->name }}</a>
                    @if ($category->activeChildren->isNotEmpty())
                        @include(Theme::getThemeNamespace() . '::views.ecommerce.includes.sub-categories', ['children' => $category->activeChildren])
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</div>
