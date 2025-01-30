<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
        /*

        if (!app()->runningInConsole()) { // Only execute in web requests
            register_shutdown_function(function () {
                try {
                    DB::table('personal_access_tokens')->delete();
                } catch (\Throwable $e) {
                    // Log the error to avoid breaking the application
                    \Log::error('Failed to delete personal access tokens on shutdown: ' . $e->getMessage());
                }
            });
        }
            */
    }
}
