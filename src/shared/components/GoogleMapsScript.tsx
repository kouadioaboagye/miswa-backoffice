'use client';

import Script from 'next/script';

const GoogleMapsScript = () => {
    return (
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
                'AIzaSyBvOkBw7cLxY6QY6QY6QY6QY6QY6QY6QY6Q'
            }&libraries=places`}
            strategy="afterInteractive"
            onLoad={() => {
                console.log('Google Maps script loaded');
            }}
            onError={(e) => {
                console.error('Google Maps script failed to load:', e);
            }}
        />
    );
};

export default GoogleMapsScript;
