import { useState, useEffect, useCallback } from 'react';

interface UseActiveSectionResult {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string, offset?: number) => void;
}

/**
 * Hook for managing active section in documentation with scroll handling
 */
export function useActiveSection(defaultSection = 'overview'): UseActiveSectionResult {
  const [activeSection, setActiveSection] = useState(defaultSection);

  const scrollToSection = useCallback((sectionId: string, offset = 80) => {
    const element = document.getElementById(`section-${sectionId}`);
    const container = document.querySelector('.reference__content') as HTMLElement;

    if (element && container) {
      // Calculate the position relative to the container
      const elementTop = element.offsetTop;
      const scrollTop = Math.max(0, elementTop - offset);

      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });

      setActiveSection(sectionId);
    } else if (element) {
      // Fallback to window scrolling
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(sectionId);
    }
  }, []);

  // Listen for scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.reference__content') as HTMLElement;
      const sections = document.querySelectorAll('[id^="section-"]');

      if (container && sections.length > 0) {
        // For container scrolling
        const scrollPosition = container.scrollTop + 150; // Offset for better UX

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i] as HTMLElement;
          const sectionTop = section.offsetTop;

          if (scrollPosition >= sectionTop) {
            const sectionId = section.id.replace('section-', '');
            if (sectionId !== activeSection) {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    const container = document.querySelector('.reference__content');

    if (container) {
      container.addEventListener('scroll', throttledHandleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', throttledHandleScroll);
      }
    };
  }, [activeSection]);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
  };
}

// Throttle utility function
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(null, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(null, args);
      }, remaining);
    }
  };
}
