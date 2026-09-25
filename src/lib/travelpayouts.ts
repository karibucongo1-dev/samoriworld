export const TRAVELPAYOUTS = { trs: '551169', shmarker: '746332' } as const;

const { trs, shmarker } = TRAVELPAYOUTS;

export const FLIGHTS_WIDGET_SRC = `https://tpembd.com/content?currency=usd&campaign_id=100&promo_id=7879&plain=false&border_radius=0&color_focused=%230d9488&special=%23C4C4C4&secondary=%23FFFFFF&light=%23FFFFFF&dark=%23262626&color_icons=%230d9488&color_button=%230d9488&primary_override=%230d9488&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=true&show_hotels=true&shmarker=${shmarker}&trs=${trs}`;

export const CAR_RENTAL_WIDGET_SRC = `https://tpembd.com/content?trs=${trs}&shmarker=${shmarker}&powered_by=true&country=153&lang=en&width=100&background=light&logo=true&header=true&gearbox=false&cars=false&border=true&footer=true&campaign_id=87&promo_id=4322`;

export const ESIM_WIDGET_SRC = `https://tpembd.com/content?trs=${trs}&shmarker=${shmarker}&locale=en&powered_by=true&color_button=%230D9488&color_focused=%230D9488&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&campaign_id=541&promo_id=8588`;
