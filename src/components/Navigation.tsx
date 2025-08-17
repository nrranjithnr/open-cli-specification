import React from 'react';
import { TabType } from '../types';
import './Navigation.css';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  className?: string;
}

const tabs: { id: TabType; label: string; filename: string }[] = [
  {
    id: 'home',
    label: 'Home',
    filename: 'index.md',
  },
  {
    id: 'spec',
    label: 'Specification',
    filename: 'opencli.yaml',
  },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <nav className={`terminal-tabs ${className}`} role="navigation" aria-label="Main navigation">
      <div className="terminal-tabs__container">
        <div className="terminal-tabs__list" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`terminal-tab ${activeTab === tab.id ? 'terminal-tab--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              type="button"
            >
              <div className="terminal-tab__content">
                <div className="terminal-tab__header">
                  <span className="terminal-tab__filename">{tab.filename}</span>
                  <span className="terminal-tab__close">×</span>
                </div>
              </div>
              {activeTab !== tab.id && <div className="terminal-tab__separator" />}
            </button>
          ))}
        </div>
        <div className="terminal-tabs__new">
          <button className="terminal-new-tab" aria-label="New tab">
            +
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
