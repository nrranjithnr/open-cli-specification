import React from 'react';
import { Button } from './Button';
import { CopyIcon } from '../icons';
import './CodeBlock.css';

export interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
  onCopy?: (code: string) => void;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = 'yaml',
  showLineNumbers = false,
  maxHeight,
  onCopy,
  className = '',
}) => {
  const lines = children.split('\n');

  const handleCopy = async () => {
    if (onCopy) {
      onCopy(children);
    } else {
      try {
        await navigator.clipboard.writeText(children);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  return (
    <div className={`code-block ${className}`}>
      <div className="code-block__header">
        <span className="code-block__language">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="code-block__copy"
          title="Copy to clipboard"
          leftIcon={<CopyIcon size={14} />}
        ></Button>
      </div>
      <pre className="code-block__pre" style={maxHeight ? { maxHeight } : undefined}>
        <code className={`code-block__code code-block__code--${language}`}>
          {showLineNumbers
            ? lines.map((line, index) => (
                <div key={index} className="code-block__line">
                  <span className="code-block__line-number">{index + 1}</span>
                  <span className="code-block__line-content">{line}</span>
                </div>
              ))
            : children}
        </code>
      </pre>
    </div>
  );
};
