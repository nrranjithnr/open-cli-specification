import { useState, useCallback } from 'react';

interface UseToggleResult {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  set: (value: boolean) => void;
}

/**
 * Reusable toggle hook for expandable sections, modals, etc.
 */
export function useToggle(initialValue = false): UseToggleResult {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const set = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  return { isOpen, toggle, open, close, set };
}

interface UseExpandedSectionsResult {
  expandedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
  expandSection: (sectionId: string) => void;
  collapseSection: (sectionId: string) => void;
  expandAll: (sections: string[]) => void;
  collapseAll: () => void;
  isExpanded: (sectionId: string) => boolean;
}

/**
 * Hook for managing expanded/collapsed sections in documentation
 */
export function useExpandedSections(initialSections: string[] = []): UseExpandedSectionsResult {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(initialSections));

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  const expandSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => new Set([...prev, sectionId]));
  }, []);

  const collapseSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(sectionId);
      return newSet;
    });
  }, []);

  const expandAll = useCallback((sections: string[]) => {
    setExpandedSections(new Set(sections));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedSections(new Set());
  }, []);

  const isExpanded = useCallback(
    (sectionId: string) => {
      return expandedSections.has(sectionId);
    },
    [expandedSections]
  );

  return {
    expandedSections,
    toggleSection,
    expandSection,
    collapseSection,
    expandAll,
    collapseAll,
    isExpanded,
  };
}
