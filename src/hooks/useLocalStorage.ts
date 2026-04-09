'use client';

import { useState, useEffect, useCallback } from 'react';

function toBase64(value: string) {
  return window.btoa(
    encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 16))
    )
  );
}

function fromBase64(value: string) {
  return decodeURIComponent(
    Array.from(window.atob(value), (char) =>
      `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`
    ).join('')
  );
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const decoded = (() => {
          try {
            return fromBase64(item);
          } catch {
            return item;
          }
        })();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoredValue(JSON.parse(decoded));
      }
    } catch {
      // localStorage not available
    }
    setIsHydrated(true);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((currentValue) => {
          const valueToStore =
            value instanceof Function ? value(currentValue) : value;

          window.localStorage.setItem(
            key,
            toBase64(JSON.stringify(valueToStore))
          );

          return valueToStore;
        });
      } catch {
        // localStorage not available
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // localStorage not available
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue, isHydrated };
}
