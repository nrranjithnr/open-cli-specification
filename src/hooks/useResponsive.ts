import { useState, useEffect } from 'react';
import { debounce, isTouchDevice, getBreakpoint } from '../utils/yamlUtils';

/**
 * Hook to detect responsive breakpoints
 */
export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateBreakpoint = debounce(() => {
      const newBreakpoint = getBreakpoint();
      setBreakpoint(newBreakpoint);
      setIsMobile(newBreakpoint === 'xs' || newBreakpoint === 'sm');
      setIsTablet(newBreakpoint === 'md');
      setIsDesktop(newBreakpoint === 'lg' || newBreakpoint === 'xl');
    }, 150);

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
}

/**
 * Hook to detect touch device
 */
export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());

    if (isTouch) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.remove('touch-device');
    }

    return () => {
      document.body.classList.remove('touch-device');
    };
  }, [isTouch]);

  return isTouch;
}

/**
 * Hook for managing local storage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Hook for copy to clipboard functionality
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);

      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopied(false);
      return false;
    }
  };

  return { copied, copy };
}
