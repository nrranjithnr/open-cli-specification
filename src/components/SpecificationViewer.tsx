import React, { useState, useMemo, useRef, useCallback } from 'react';
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

// Copy icon
const CopyIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// Download icon
const DownloadIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Expand All icon
const ExpandAllIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <polyline points="7,13 12,18 17,13" />
    <polyline points="7,6 12,11 17,6" />
  </svg>
);

// Collapse All icon
const CollapseAllIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <polyline points="17,11 12,6 7,11" />
    <polyline points="17,18 12,13 7,18" />
  </svg>
);

interface SpecificationViewerProps {
  data: any;
  className?: string;
  onCopyYaml?: () => void;
  copySuccess?: string;
}

export const SpecificationViewer: React.FC<SpecificationViewerProps> = ({
  data,
  className = '',
  onCopyYaml,
  copySuccess,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleNode = useCallback(
    (path: string) => {
      const newExpanded = new Set(expandedNodes);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
        // Scroll the expanded node into view after a short delay
        setTimeout(() => {
          const nodeElement = document.querySelector(`[data-path="${path}"]`);
          if (nodeElement && contentRef.current) {
            nodeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          }
        }, 100);
      }
      setExpandedNodes(newExpanded);
    },
    [expandedNodes]
  );

  const expandAll = useCallback(() => {
    const getAllPaths = (obj: any, currentPath = ''): string[] => {
      let paths: string[] = [];
      if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
          const newPath = currentPath ? `${currentPath}.${key}` : key;
          paths.push(newPath);
          if (obj[key] && typeof obj[key] === 'object') {
            paths = paths.concat(getAllPaths(obj[key], newPath));
          }
        });
      }
      return paths;
    };

    if (data) {
      const allPaths = getAllPaths(data);
      setExpandedNodes(new Set(['root', ...allPaths]));
    }
  }, [data]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set(['root']));
  }, []);

  const renderValue = (value: any): string => {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    // Don't show counts for objects and arrays when collapsed
    return '';
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
      <div key={path} className="specification-viewer__tree-item" data-path={path}>
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
      {/* Top-right action buttons */}
      <div className="specification-viewer__actions">
        {copySuccess && <div className="specification-viewer__copy-success">{copySuccess}</div>}
        <button
          className="specification-viewer__action-btn"
          onClick={expandAll}
          title="Expand all nodes"
          type="button"
        >
          <ExpandAllIcon />
        </button>
        <button
          className="specification-viewer__action-btn"
          onClick={collapseAll}
          title="Collapse all nodes"
          type="button"
        >
          <CollapseAllIcon />
        </button>
        <button
          className="specification-viewer__action-btn"
          onClick={onCopyYaml}
          title="Copy YAML to clipboard"
          type="button"
        >
          <CopyIcon />
        </button>
        <a
          href="/opencli.yaml"
          download
          className="specification-viewer__action-btn"
          title="Download YAML file"
        >
          <DownloadIcon />
        </a>
      </div>

      <div className="specification-viewer__content" ref={contentRef}>
        <div className="specification-viewer__tree">{treeData}</div>
      </div>
    </div>
  );
};

export default SpecificationViewer;
