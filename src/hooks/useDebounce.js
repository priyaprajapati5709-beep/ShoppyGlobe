import { useEffect, useState } from 'react';

/**
 * useDebounce
 * Returns a delayed version of the provided value so rapid updates do not
 * trigger unnecessary state changes. It is used for the search input to keep
 * filtering smooth and efficient.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
