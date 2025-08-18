import React, { memo } from 'react';
import { Button } from '../ui';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import './DocSection.css';

export interface DocSectionProps {
  id: string;
  title: string;
  required?: boolean;
  type?: string;
  description?: string;
  children?: React.ReactNode;
  example?: string;
  className?: string;
}

export const DocSection: React.FC<DocSectionProps> = memo(
  ({ id, title, required = false, type, description, children, example, className = '' }) => {
    const { copied, copyText } = useCopyToClipboard();

    const handleCopyExample = () => {
      if (example) {
        copyText(example);
      }
    };

    return (
      <section id={`section-${id}`} className={`doc-section ${className}`}>
        <div className="doc-section__header">
          <h2 className="doc-section__title">
            {title}
            {required && <span className="doc-section__required">*</span>}
            {type && <span className="doc-section__type">{type}</span>}
          </h2>
        </div>

        {description && (
          <div className="doc-section__description">
            <p>{description}</p>
          </div>
        )}

        {children && <div className="doc-section__content">{children}</div>}

        {example && (
          <div className="doc-section__example">
            <div className="doc-section__example-header">
              <h3>Example</h3>
            </div>
            <div className="doc-section__code-container">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyExample}
                className="doc-section__copy-btn-inline"
                title="Copy example"
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <pre className="doc-section__code">
                <code>{example}</code>
              </pre>
            </div>
          </div>
        )}
      </section>
    );
  }
);
