import { useEffect, useRef, useState } from "react";

interface StreetViewEmbedProps {
  lat: number;
  lng: number;
  name: string;
  country: string;
  highlights: string[];
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

/* ── Singleton script loader ─────────────────────────────── */

type LoadState = "idle" | "loading" | "ready" | "error";
let loadState: LoadState = "idle";
const loadCallbacks: Array<() => void> = [];

function loadMapsApi(onReady: () => void): void {
  if (loadState === "ready") { onReady(); return; }
  if (loadState === "error") return;
  loadCallbacks.push(onReady);
  if (loadState === "loading") return;

  loadState = "loading";
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  script.async = true;
  script.onload = () => {
    loadState = "ready";
    loadCallbacks.splice(0).forEach((cb) => cb());
  };
  script.onerror = () => {
    loadState = "error";
    loadCallbacks.length = 0;
  };
  document.head.appendChild(script);
}

/* ── Component ───────────────────────────────────────────── */

export function StreetViewEmbed({
  lat,
  lng,
  name,
  country,
  highlights,
}: StreetViewEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [hidden, setHidden] = useState(false);
  const [panoId, setPanoId] = useState<string | null>(null);

  /* Official Maps URL API — opens Street View on both desktop and mobile */
  const mapsUrl = panoId
    ? `https://www.google.com/maps/@?api=1&map_action=pano&pano=${panoId}`
    : `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;

  useEffect(() => {
    if (!API_KEY || !containerRef.current) return;

    let cancelled = false;

    loadMapsApi(() => {
      if (cancelled || !containerRef.current) return;

      const sv = new google.maps.StreetViewService();

      const renderPanorama = (location: google.maps.LatLngLiteral, radius: number) => {
        sv.getPanorama(
          {
            location,
            radius,
            preference: google.maps.StreetViewPreference.BEST,
            source: google.maps.StreetViewSource.OUTDOOR,
          },
          (data, status) => {
            if (cancelled || !containerRef.current) return;

            if (status !== google.maps.StreetViewStatus.OK) {
              if (radius < 5000) {
                renderPanorama({ lat, lng }, 5000);
              } else {
                setHidden(true);
              }
              return;
            }

            const id = data!.location!.pano;
            setPanoId(id);

            panoramaRef.current = new google.maps.StreetViewPanorama(
              containerRef.current!,
              {
                pano: id,
                disableDefaultUI: true,
                clickToGo: false,
                scrollwheel: false,
                showRoadLabels: false,
                motionTracking: false,
                motionTrackingControl: false,
              },
            );
          },
        );
      };

      const firstHighlight = highlights[0];
      if (firstHighlight) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: `${firstHighlight}, ${country}` },
          (results, status) => {
            if (cancelled) return;
            if (
              status === google.maps.GeocoderStatus.OK &&
              results?.[0]?.geometry?.location
            ) {
              const loc = results[0].geometry.location;
              renderPanorama({ lat: loc.lat(), lng: loc.lng() }, 500);
            } else {
              renderPanorama({ lat, lng }, 1000);
            }
          },
        );
      } else {
        renderPanorama({ lat, lng }, 1000);
      }
    });

    return () => {
      cancelled = true;
      panoramaRef.current = null;
    };
  }, [lat, lng, country, highlights]);

  if (!API_KEY || hidden) return null;

  return (
    <div className="sv-embed">
      <div ref={containerRef} className="sv-embed-frame" />

      {/* Bottom gradient — covers the Maps attribution bar */}
      <div className="sv-attribution-mask" aria-hidden="true" />

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sv-cta"
        aria-label={`Explore ${name} on Google Maps Street View`}
      >
        <svg
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="11"
          height="11"
          aria-hidden="true"
        >
          <circle cx="7" cy="6" r="2.5" />
          <path d="M7 1C4.24 1 2 3.12 2 5.7 2 8.6 6.2 13 7 13s5-4.4 5-7.3C12 3.12 9.76 1 7 1z" />
        </svg>
        Explore the area
      </a>
    </div>
  );
}
