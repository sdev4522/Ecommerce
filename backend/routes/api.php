<?php

use App\Http\Controllers\API\SiteSettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('site-settings', [SiteSettingsController::class, 'index'])->name('api.v1.site-settings');
});
