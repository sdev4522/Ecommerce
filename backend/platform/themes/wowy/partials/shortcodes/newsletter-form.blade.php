<section class="newsletter bg-brand p-30 text-white wow fadeIn animated">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-7 mb-md-3 mb-lg-0">
                <div class="row align-items-center">
                    <div class="col flex-horizontal-center">
                        <img class="icon-email" src="{{ Theme::asset()->url('images/icons/icon-email.svg') }}" alt="icon">
                        <h4 class="font-size-20 mb-0 ml-3">{!! BaseHelper::clean($title) !!}</h4>
                    </div>
                    <div class="col my-4 my-md-0">
                        <h5 class="font-size-15 ml-4 mb-0">{!! BaseHelper::clean($description) !!}</h5>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <form class="newsletter-form" method="post" action="{{ route('public.newsletter.subscribe') }}">
                    @csrf
                    <div class="form-subcriber d-flex wow fadeIn animated ">
                        <input type="email" name="email" class="form-control bg-white font-small" placeholder="{{ __('Enter your email') }}">
                        <button class="btn bg-dark text-white" type="submit">{{ __('Subscribe') }}</button>
                    </div>

                    <div class="col-auto mt-3">
                        {!! apply_filters('form_extra_fields_render', null, \Botble\Newsletter\Forms\Fronts\NewsletterForm::class) !!}
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
