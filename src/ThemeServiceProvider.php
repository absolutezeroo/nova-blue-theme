<?php

namespace Absolutezeroo\HabboTheme;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class ThemeServiceProvider extends ServiceProvider
{
    const CSS_PATH = __DIR__ . '/../resources/css';
    const CONFIG_FILE = __DIR__ . '/../config/nova-habbo-theme.php';

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // JS for Responsive design
        Nova::serving(function (ServingNova $event) {
            Nova::style('nova-habbo-theme',  __DIR__ . '/../resources/css/responsive.css');
            Nova::script('nova-habbo-theme', __DIR__ . '/../resources/js/responsive.js');
            Nova::provideToScript([
                'mmns' => config('nova-habbo-theme'),
            ]);
        });

        // Publishes Config
        $this->publishes([
            self::CONFIG_FILE => config_path('nova-habbo-theme.php'),
        ], 'config');

        // Publish Public CSS for login screen
        $this->publishes([
            self::CSS_PATH => public_path('vendor/absolutezeroo/nova-habbo-theme'),
        ], 'styling');

        // Sets CSS file as asset
        Nova::theme(asset('vendor/absolutezeroo/nova-habbo-theme/habbo-theme.css'));
        Nova::theme(asset('vendor/absolutezeroo/nova-habbo-theme/responsive.css'));
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            self::CONFIG_FILE,
            'nova-styling'
        );
    }
}
