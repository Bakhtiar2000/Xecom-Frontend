import { useEffect, useState } from "react";

export function useDebounce<T>(value: T): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [value, 300]);

    return debouncedValue;
}
