<?php
// kc-stays-config.php: settings for kc-stays.php (hotel and Airbnb search).
// Keep this file private. Never share it or paste its key in chat.
return [
    'site' => 'samori',

    // Paste the RapidAPI key of the application that holds the Booking.com
    // and Airbnb Live API Pro subscriptions (default-application_12461714).
    'rapidapi_key' => 'e45fd1a6e3msh7619dfa1b9b09c6p1ad687jsnff128cbc5c63',

    'allowed_referers' => ['samori.net', 'www.samori.net'],

    // Destination slug => free-text destination sent to the APIs.
    'allowed_dest' => [
        'dubai' => 'Dubai, United Arab Emirates',
        'doha'  => 'Doha, Qatar',
    ],

    'currency'    => 'GBP',
    'cache_dir'   => __DIR__ . '/kc-cache',
    'cache_hours' => 6,

    // Providers: turn either off with false.
    'use_booking' => true,
    'use_airbnb'  => true,

    // Safety caps on real (uncached) upstream calls.
    // Booking Pro = 2,000 a month (about 60 a day). Airbnb Pro = 10,000 a month.
    'daily_cap_booking'     => 40,
    'daily_cap_airbnb'      => 100,
    'per_visitor_per_hour'  => 12,

    'max_nights'     => 14,
    'max_days_ahead' => 330,
    'max_hotels'     => 8,
    'max_stays'      => 6,

    // Booking.com affiliate. Until you are approved leave mode as 'off':
    // links still work but carry NO tracking (the API's own tracking is removed).
    //   'off'    : plain Booking.com links, no commission
    //   'aid'    : adds your Booking.com affiliate ID ('aid' value below)
    //   'prefix' : wraps the link in your network deep-link, e.g. Awin, CJ or
    //              Travelpayouts. The prefix is placed before the URL-encoded link.
    'booking_affiliate' => [
        'mode'   => 'off',
        'aid'    => '',
        'prefix' => '',
    ],
];
