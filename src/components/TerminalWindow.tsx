import React from 'react';
import type { TerminalWindowProps } from '../types';
import './TerminalWindow.css';

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div
            className="terminal-button close"
            aria-label="Close terminal"
            role="button"
            tabIndex={0}
          />
          <div
            className="terminal-button minimize"
            aria-label="Minimize terminal"
            role="button"
            tabIndex={0}
          />
          <div
            className="terminal-button maximize"
            aria-label="Maximize terminal"
            role="button"
            tabIndex={0}
          />
        </div>
        <div className="terminal-title">{title}</div>
      </div>
      <div className="terminal-content">{children}</div>
    </div>
  );
};
