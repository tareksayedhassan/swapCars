import { useEffect, useState } from "react";

/* ── In-memory cache ─────────────────────────────────────────────────
   Shared across all hook instances so we never fetch the same coords
   twice, and Nominatim's usage policy (max 1 req/sec) is respected. */

const addressCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

function cacheKey(lat: number, lng: number): string {
    return `${lat.toFixed(6)},${lng.toFixed(6)}`;
}

/* ── Nominatim fetcher with dedup ──────────────────────────────────── */

async function fetchAddress(lat: number, lng: number): Promise<string> {
    const key = cacheKey(lat, lng);

    // Return cached result
    if (addressCache.has(key)) return addressCache.get(key)!;

    // Deduplicate parallel requests for the same coords
    if (pendingRequests.has(key)) return pendingRequests.get(key)!;

    const promise = (async () => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
                {
                    headers: {
                        "Accept-Language": "en",
                    },
                },
            );

            if (!res.ok) throw new Error(`Nominatim ${res.status}`);

            const data = await res.json();

            // Build a short, readable address from address parts
            const addr = data.address;
            const parts: string[] = [];

            // Prefer: road/neighbourhood → suburb/city_district → city/town → state
            if (addr?.road) parts.push(addr.road);
            else if (addr?.neighbourhood) parts.push(addr.neighbourhood);

            if (addr?.suburb || addr?.city_district)
                parts.push(addr.suburb || addr.city_district);

            if (addr?.city || addr?.town || addr?.village)
                parts.push(addr.city || addr.town || addr.village);
            else if (addr?.state) parts.push(addr.state);

            const address =
                parts.length > 0
                    ? parts.slice(0, 3).join(", ")
                    : data.display_name?.split(",").slice(0, 3).join(",").trim() ||
                    `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

            addressCache.set(key, address);
            return address;
        } catch {
            // Fallback to coords on error
            const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            addressCache.set(key, fallback);
            return fallback;
        } finally {
            pendingRequests.delete(key);
        }
    })();

    pendingRequests.set(key, promise);
    return promise;
}

/* ── Hook ──────────────────────────────────────────────────────────── */

interface UseReverseGeocodeResult {
    address: string | null;
    isLoading: boolean;
}

export function useReverseGeocode(
    lat?: number | null,
    lng?: number | null,
    /** Fallback shown while loading or if coords are missing */
    fallback?: string,
): UseReverseGeocodeResult {
    const [address, setAddress] = useState<string | null>(() => {
        // Check cache synchronously to avoid flash
        if (lat != null && lng != null && !isNaN(lat) && !isNaN(lng)) {
            return addressCache.get(cacheKey(lat, lng)) ?? null;
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState<boolean>(
        lat != null && lng != null && address === null,
    );

    useEffect(() => {
        if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) {
            queueMicrotask(() => {
                setAddress(fallback ?? null);
                setIsLoading(false);
            });
            return;
        }

        // Check cache first
        const key = cacheKey(lat, lng);
        const cached = addressCache.get(key);
        if (cached) {
            queueMicrotask(() => {
                setAddress(cached);
                setIsLoading(false);
            });
            return;
        }

        let cancelled = false;
        queueMicrotask(() => {
            if (!cancelled) setIsLoading(true);
        });

        fetchAddress(lat, lng).then((result) => {
            if (!cancelled) {
                setAddress(result);
                setIsLoading(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [lat, lng, fallback]);

    return { address, isLoading };
}
