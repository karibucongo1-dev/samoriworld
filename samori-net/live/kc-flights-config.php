<?php
// kc-flights-config.php — keys and settings. Keep this file out of public view if you can
// (e.g. one folder above public_html), then change the require path in kc-flights.php.
// NEVER paste the key into chat or into the widget JS.

return [
    // From RapidAPI: your app's "X-RapidAPI-Key" (Google Flights Live API subscription).
    'rapidapi_key'  => 'e45fd1a6e3msh7619dfa1b9b09c6p1ad687jsnff128cbc5c63',
    
    // Copy these two from the RapidAPI playground's PHP/cURL snippet ("Roundtrip API" tab
    // and the one-way tab). Host looks like xxx.p.rapidapi.com, path like /roundtrip.
    'rapidapi_host'      => 'google-flights-live-api.p.rapidapi.com',
    'path_roundtrip'     => '/api/google_flights/roundtrip/v1',
    'path_oneway'        => '/api/google_flights/oneway/v1',

    // Site settings (change these for Samori.net later).
    'site'          => 'samori',
    'origin'        => 'LHR',
    'currency'      => 'gbp',
    'allowed_origins' => ['LHR','LGW','CDG','BRU','AMS','JNB','NBO','ADD','IST','DXB','DOH'],
    'allowed_dest'  => ['DXB','DOH'],  // Samori: empty array = any
    
    // Cost protection (each request = one API call on your plan).
    'cache_hours'        => 6,      // reuse results for this long
    'daily_call_cap'     => 10,     // free test key: 50/month
    'per_ip_per_hour'    => 20,     // stops one visitor draining your quota
    'allowed_referers'   => ['samori.net', 'www.samori.net'],
    
    // Fallback search link used when no fares are available. Put your Travelpayouts
    // affiliate marker here (the number from your Travelpayouts account).
    'tp_marker'     => '746332',

    'cache_dir'     => __DIR__ . '/kc-cache',
];
