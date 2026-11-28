<?php
// kc-stays-config.php (Karibucongo): settings for kc-stays.php (hotel and Airbnb search).
// The RapidAPI key is read from the Samori config on this server so it lives in one place.
// Keep this file private.
$samoriCfg = '/home/samopsep/public_html/kc-stays-config.php';
$shared = is_file($samoriCfg) ? (require $samoriCfg) : [];
return [
    'site' => 'karibucongo',
    'rapidapi_key' => is_array($shared) && !empty($shared['rapidapi_key']) ? $shared['rapidapi_key'] : 'PASTE_RAPIDAPI_KEY_HERE',

    'allowed_referers' => ['karibucongo.com', 'www.karibucongo.com'],

    // Destination slug => free-text destination sent to the APIs.
    'allowed_dest' => [
        'kinshasa'     => 'Kinshasa, Democratic Republic of the Congo',
        'brazzaville'  => 'Brazzaville, Republic of the Congo',
        'lubumbashi'   => 'Lubumbashi, Democratic Republic of the Congo',
        'pointe-noire' => 'Pointe-Noire, Republic of the Congo',
        'dubai'        => 'Dubai, United Arab Emirates',
        'doha'         => 'Doha, Qatar',
    ],

    // Keep only hotels whose area text matches (Booking.com mixes Kinshasa and Brazzaville in one search).
    'area_match' => [
        'kinshasa'     => '/kinshasa/i',
        'brazzaville'  => '/brazzaville/i',
        'lubumbashi'   => '/lubumbashi/i',
        'pointe-noire' => '/pointe[- ]?noire/i',
    ],

    // Airbnb sometimes pads small cities with listings from elsewhere: keep only those within the radius (km).
    'geo' => [
        'kinshasa'     => [-4.325, 15.322, 30],
        'brazzaville'  => [-4.263, 15.243, 30],
        'lubumbashi'   => [-11.664, 27.479, 35],
        'pointe-noire' => [-4.769, 11.866, 35],
        'dubai'        => [25.205, 55.271, 60],
        'doha'         => [25.285, 51.531, 40],
    ],

    'currency'    => 'GBP',
    'cache_dir'   => __DIR__ . '/kc-cache',
    'cache_hours' => 6,

    'use_booking' => true,
    // Destinations where the Booking.com API times out (no usable hotel data): show homes only.
    'skip_booking' => ['pointe-noire'],
    'use_airbnb'  => true,

    // Both sites share one RapidAPI subscription each (Booking Pro 2,000/month, Airbnb Pro 10,000/month).
    // Samori caps at 40 and 100 a day, so keep these lower: 40 + 25 a day stays under 2,000 a month.
    'daily_cap_booking'     => 25,
    'daily_cap_airbnb'      => 60,
    'per_visitor_per_hour'  => 12,

    'max_nights'     => 14,
    'max_days_ahead' => 330,
    'max_hotels'     => 8,
    'max_stays'      => 6,

    // Booking.com affiliate: 'off' (plain links, no commission), 'aid', or 'prefix'. See Samori config notes.
    'booking_affiliate' => [
        'mode'   => 'off',
        'aid'    => '',
        'prefix' => '',
    ],
];
