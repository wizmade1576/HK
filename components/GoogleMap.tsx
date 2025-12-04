"use client";

import { useEffect, useRef, useState } from "react";

export type MapListing = {
  id: string;
  lat: number;
  lng: number;
  price: number;
};

export type MapBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

type Props = {
  listings: MapListing[];
  center?: { lat: number; lng: number } | null;
  activeId?: string | null;
  onMarkerClick?: (id: string) => void;
  onBoundsChange?: (bounds: MapBounds) => void;
};

declare global {
  interface Window {
    initMap?: () => void;
    google?: typeof google;
  }
}

const loadGoogleMap = (apiKey: string, callbackName = "initMap") => {
  if (document.getElementById("gmaps")) return;

  const script = document.createElement("script");
  script.id = "gmaps";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

export default function GoogleMap({
  listings,
  center,
  activeId,
  onMarkerClick,
  onBoundsChange,
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    if (!mapRef.current || !API_KEY) {
      setError(!API_KEY);
      return;
    }

    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapCenter = {
        lat: Number(center?.lat ?? 37.5665),
        lng: Number(center?.lng ?? 126.978),
      };

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 12,
        clickableIcons: false,
        gestureHandling: "greedy",
      });

      mapInstance.current.addListener("idle", () => {
        if (!mapInstance.current || !onBoundsChange) return;
        const bounds = mapInstance.current.getBounds();
        if (!bounds) return;

        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        onBoundsChange({
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng(),
        });
      });

      setLoaded(true);
    };

    window.initMap = initMap;

    if (window.google && window.google.maps) {
      initMap();
    } else {
      loadGoogleMap(API_KEY, "initMap");
    }

    return () => {
      window.initMap = undefined;
    };
  }, [API_KEY, center, onBoundsChange]);

  useEffect(() => {
    if (!mapInstance.current || !center) return;
    mapInstance.current.panTo(center);
  }, [center]);

  useEffect(() => {
    if (!loaded || !window.google || !mapInstance.current) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    listings.forEach((listing) => {
      const parsedLat = Number(listing.lat);
      const parsedLng = Number(listing.lng);
      if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) return;

      const isActive = listing.id === activeId;

      const marker = new window.google.maps.Marker({
        position: { lat: parsedLat, lng: parsedLng },
        map: mapInstance.current!,
        icon: {
          path: "M0 0z",
          scale: 0,
        } as google.maps.Symbol,
        label: {
          text: `₩${listing.price.toLocaleString()}`,
          color: "#1f2937",
          fontSize: "12px",
          className: `map-price-marker ${
            isActive ? "map-price-marker-active" : ""
          }`,
        },
      });

      marker.addListener("click", () => {
        onMarkerClick?.(listing.id);
      });

      markersRef.current.push(marker);
    });
  }, [listings, activeId, loaded, onMarkerClick]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border shadow-sm">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 text-sm text-gray-500">
          지도를 불러오는 중입니다...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-red-500">
          지도 API 키를 설정해주세요.
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
