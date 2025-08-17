import React, { useState, useMemo } from 'react';
import './SpecificationViewer.css';

// Simple chevron icon for expand/collapse
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

interface SpecificationViewerProps {
  data: any;
  className?: string;
}

export const SpecificationViewer: React.FC<SpecificationViewerProps> = ({
  data,
  className = '',
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderValue = (value: any): string => {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    if (Array.isArray(value)) return `[${value.length} items]`;
    if (typeof value === 'object') return `{${Object.keys(value).length} properties}`;
    return String(value);
  };

  const getValueClass = (value: any): string => {
    if (value === null) return 'specification-viewer__value--null';
    if (typeof value === 'string') return 'specification-viewer__value--string';
    if (typeof value === 'boolean') return 'specification-viewer__value--boolean';
    if (typeof value === 'number') return 'specification-viewer__value--number';
    return 'specification-viewer__value';
  };

  const renderTreeNode = (
    key: string,
    value: any,
    level: number,
    path: string
  ): React.ReactNode => {
    const isExpandable =
      value && typeof value === 'object' && (Array.isArray(value) || Object.keys(value).length > 0);
    const isExpanded = expandedNodes.has(path);
    const hasChildren = isExpandable && isExpanded;

    return (
      <div key={path} className="specification-viewer__tree-item">
        <button
          className="specification-viewer__tree-button"
          onClick={() => isExpandable && toggleNode(path)}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {isExpandable && (
            <span
              className={`specification-viewer__tree-toggle ${
                isExpanded ? 'specification-viewer__tree-toggle--expanded' : ''
              }`}
            >
              <ChevronRightIcon />
            </span>
          )}
          {!isExpandable && <span style={{ width: '16px' }} />}

          <span className="specification-viewer__key">{key}</span>
          {!hasChildren && <span className={getValueClass(value)}>{renderValue(value)}</span>}
        </button>

        {hasChildren && (
          <div className="specification-viewer__tree-children">
            {Array.isArray(value)
              ? value.map((item, index) =>
                  renderTreeNode(`[${index}]`, item, level + 1, `${path}.${index}`)
                )
              : Object.entries(value).map(([childKey, childValue]) =>
                  renderTreeNode(childKey, childValue, level + 1, `${path}.${childKey}`)
                )}
          </div>
        )}
      </div>
    );
  };

  const treeData = useMemo(() => {
    if (!data) return null;
    return Object.entries(data).map(([key, value]) => renderTreeNode(key, value, 0, key));
  }, [data, expandedNodes]);

  if (!data) {
    return (
      <div className={`specification-viewer ${className}`}>
        <div className="specification-viewer__error">No specification data available</div>
      </div>
    );
  }

  return (
    <div className={`specification-viewer ${className}`}>
      <div className="specification-viewer__content">
        <div className="specification-viewer__tree">{treeData}</div>
      </div>
    </div>
  );
};

export default SpecificationViewer;
