import { useState, useEffect } from "react";

/**
 * Generic debounce hook.
 * Returns a debounced version of `value` that only updates
 * after `delay` ms of inactivity.
 *
 * @example
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 400);
 */
export default function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}
