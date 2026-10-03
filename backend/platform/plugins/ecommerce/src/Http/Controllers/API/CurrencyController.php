<?php

namespace Botble\Ecommerce\Http\Controllers\API;

use Botble\Api\Http\Controllers\BaseApiController;
use Botble\Ecommerce\Facades\Currency as CurrencyFacade;
use Illuminate\Http\JsonResponse;

class CurrencyController extends BaseApiController
{
    /**
     * Get list of available currencies
     *
     * @group Currencies
     *
     * @response {
     *   "error": false,
     *   "data": [
     *     {
     *       "id": 1,
     *       "title": "USD",
     *       "symbol": "$",
     *       "is_prefix_symbol": true,
     *       "decimals": 2,
     *       "order": 0,
     *       "is_default": true,
     *       "exchange_rate": 1
     *     },
     *     {
     *       "id": 2,
     *       "title": "EUR",
     *       "symbol": "€",
     *       "is_prefix_symbol": false,
     *       "decimals": 2,
     *       "order": 1,
     *       "is_default": false,
     *       "exchange_rate": 0.91
     *     }
     *   ],
     *   "message": null
     * }
     */
    public function index()
    {
        $currencies = CurrencyFacade::currencies();

        return response()
            ->json($currencies);
    }

    /**
     * Get current currency
     *
     * @group Currencies
     *
     * @response {
     *   "error": false,
     *   "data": {
     *     "id": 1,
     *     "title": "USD",
     *     "symbol": "$",
     *     "is_prefix_symbol": true,
     *     "decimals": 2,
     *     "order": 0,
     *     "is_default": true,
     *     "exchange_rate": 1
     *   },
     *   "message": null
     * }
     */
    public function getCurrentCurrency(): JsonResponse
    {
        $currency = CurrencyFacade::getApplicationCurrency();
        if (! $currency) {
            $currency = CurrencyFacade::getDefaultCurrency();
        }

        $data = $currency ? $currency->toArray() : [];
        $decSep = function_exists('get_ecommerce_setting') ? get_ecommerce_setting('decimal_separator', '.') : '.';
        $thSep = function_exists('get_ecommerce_setting') ? get_ecommerce_setting('thousands_separator', ',') : ',';

        $data['code'] = $currency?->title ?? 'INR';
        $data['symbol'] = $currency?->symbol ?? '₹';
        $data['position'] = ($currency?->is_prefix_symbol ?? true) ? 'before' : 'after';
        $data['decimal_places'] = (int) ($currency?->decimals ?? 0);
        $data['decimal_separator'] = ($decSep === 'space') ? ' ' : ($decSep ?: '.');
        $data['thousand_separator'] = ($thSep === 'space') ? ' ' : ($thSep ?: ',');

        return response()->json($data);
    }
}
