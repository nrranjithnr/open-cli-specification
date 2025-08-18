import { useState, useCallback } from 'react';

export interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for managing async operations with loading, error, and data states
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false
): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFunction(...args);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for managing disclosure state (modals, dropdowns, etc.)
 */
export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    onOpen: open,
    onClose: close,
    onToggle: toggle,
  };
}

/**
 * Hook for managing boolean state with toggle functionality
 */
export function useBoolean(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prev => !prev), []);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
    on: setTrue,
    off: setFalse,
  };
}

/**
 * Hook for managing counter state
 */
export function useCounter(initialValue = 0, { min, max }: { min?: number; max?: number } = {}) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(
    (step = 1) => {
      setCount(prev => {
        const next = prev + step;
        return max !== undefined ? Math.min(next, max) : next;
      });
    },
    [max]
  );

  const decrement = useCallback(
    (step = 1) => {
      setCount(prev => {
        const next = prev - step;
        return min !== undefined ? Math.max(next, min) : next;
      });
    },
    [min]
  );

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  const set = useCallback(
    (value: number) => {
      setCount(() => {
        let next = value;
        if (min !== undefined) next = Math.max(next, min);
        if (max !== undefined) next = Math.min(next, max);
        return next;
      });
    },
    [min, max]
  );

  return {
    count,
    increment,
    decrement,
    reset,
    set,
  };
}

/**
 * Hook for managing previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>();

  if (previous !== value) {
    setPrevious(value);
  }

  return previous;
}
