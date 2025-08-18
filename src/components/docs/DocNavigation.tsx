import React, { memo } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { Button } from '../ui';
import './DocNavigation.css';

export interface NavigationSection {
  id: string;
  title: string;
  required?: boolean;
  type?: string;
  description?: string;
  children?: NavigationSection[];
}

export interface DocNavigationProps {
  sections: NavigationSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  className?: string;
}

export const DocNavigation: React.FC<DocNavigationProps> = memo(
  ({ sections, activeSection, onSectionClick, className = '' }) => {
    const { isOpen: mobileNavOpen, toggle: toggleMobileNav } = useToggle(false);

    return (
      <>
        {/* Mobile Navigation Toggle */}
        <div className="doc-nav__mobile-toggle">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMobileNav}
            className="doc-nav__toggle-btn"
          >
            📚 Navigation
          </Button>
        </div>

        {/* Navigation */}
        <nav
          className={`doc-nav ${mobileNavOpen ? 'doc-nav--mobile-open' : ''} ${className}`}
          role="navigation"
          aria-label="Documentation navigation"
        >
          <div className="doc-nav__sections">
            {sections.map(section => (
              <DocNavSection
                key={section.id}
                section={section}
                activeSection={activeSection}
                onSectionClick={onSectionClick}
                level={0}
              />
            ))}
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        {mobileNavOpen && (
          <div className="doc-nav__overlay" onClick={toggleMobileNav} aria-hidden="true" />
        )}
      </>
    );
  }
);

interface DocNavSectionProps {
  section: NavigationSection;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  level: number;
}

const DocNavSection: React.FC<DocNavSectionProps> = memo(
  ({ section, activeSection, onSectionClick, level }) => {
    const { isOpen: isExpanded, toggle: toggleExpanded } = useToggle(level < 2);
    const hasChildren = section.children && section.children.length > 0;
    const isActive = activeSection === section.id;

    return (
      <div className={`doc-nav__section doc-nav__section--level-${level}`}>
        <div className="doc-nav__section-header">
          {hasChildren && (
            <button
              className={`doc-nav__expand-btn ${isExpanded ? 'doc-nav__expand-btn--expanded' : ''}`}
              onClick={toggleExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${section.title}`}
            >
              ▶
            </button>
          )}

          <button
            className={`doc-nav__link ${isActive ? 'doc-nav__link--active' : ''}`}
            onClick={() => onSectionClick(section.id)}
          >
            <span className="doc-nav__title">{section.title}</span>
            {section.required && <span className="doc-nav__required">*</span>}
            {section.type && <span className="doc-nav__type">{section.type}</span>}
          </button>
        </div>

        {hasChildren && isExpanded && (
          <div className="doc-nav__children">
            {section.children!.map((child: NavigationSection) => (
              <DocNavSection
                key={child.id}
                section={child}
                activeSection={activeSection}
                onSectionClick={onSectionClick}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
