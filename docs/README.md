## Customize fortify redirects
`FortifyServiceProvider.php`
```php
<?php

namespace App\Providers;

use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->instance(LogoutResponse::class, new class implements LogoutResponse
        {
            public function toResponse($request)
            {
                return response('success', 200);
            }
        });

        $this->app->instance(LoginResponse::class, new class implements LoginResponse
        {
            public function toResponse($request)
            {
                return response('success', 200);
            }
        });
    }
}
```

## Disabling Views
`fortify.php`
```php
'views' => false,
```

## .env
```yaml
APP_URL=http://localhost
```