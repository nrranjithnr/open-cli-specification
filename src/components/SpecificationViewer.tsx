import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
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

// Tree view icon
const TreeViewIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M3 6h.01" />
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
  </svg>
);

// Code view icon
const CodeViewIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

// JSON view icon
const JsonViewIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
    <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
    <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
  </svg>
);

type ViewMode = 'tree' | 'code' | 'json';

interface SpecificationViewerProps {
  data: any;
  className?: string;
  onCopy?: (format: 'yaml' | 'json') => void;
  copySuccess?: string;
}

export const SpecificationViewer: React.FC<SpecificationViewerProps> = ({
  data,
  className = '',
  onCopy,
  copySuccess,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [rawYaml, setRawYaml] = useState<string>('');
  const [rawJson, setRawJson] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch raw YAML content for code view
  useEffect(() => {
    const fetchRawYaml = async () => {
      try {
        const response = await fetch('/opencli.yaml');
        if (response.ok) {
          const yamlContent = await response.text();
          setRawYaml(yamlContent);
        }
      } catch (error) {
        console.error('Failed to fetch raw YAML:', error);
      }
    };

    if (viewMode === 'code' && !rawYaml) {
      fetchRawYaml();
    }
  }, [viewMode, rawYaml]);

  // Fetch raw JSON content for JSON view
  useEffect(() => {
    const fetchRawJson = async () => {
      try {
        const response = await fetch('/opencli.json');
        if (response.ok) {
          const jsonContent = await response.text();
          setRawJson(jsonContent);
        }
      } catch (error) {
        console.error('Failed to fetch raw JSON:', error);
      }
    };

    if (viewMode === 'json' && !rawJson) {
      fetchRawJson();
    }
  }, [viewMode, rawJson]);
  const renderCodeView = () => {
    if (!rawYaml) {
      return (
        <div className="specification-viewer__loading-code">
          <div className="specification-viewer__loading-spinner" />
          <p>Loading YAML content...</p>
        </div>
      );
    }

    const lines = rawYaml.split('\n');

    return (
      <div className="specification-viewer__code-view">
        <pre className="specification-viewer__code-pre">
          <code className="specification-viewer__code">
            {lines.map((line, index) => (
              <div key={index} className="specification-viewer__code-line">
                <span className="specification-viewer__line-number">
                  {(index + 1).toString().padStart(3, ' ')}
                </span>
                <span className="specification-viewer__line-content">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    );
  };

  const renderJsonView = () => {
    if (!rawJson) {
      return (
        <div className="specification-viewer__loading-code">
          <div className="specification-viewer__loading-spinner" />
          <p>Loading JSON content...</p>
        </div>
      );
    }

    const lines = rawJson.split('\n');

    return (
      <div className="specification-viewer__code-view">
        <pre className="specification-viewer__code-pre">
          <code className="specification-viewer__code specification-viewer__code--json">
            {lines.map((line, index) => (
              <div key={index} className="specification-viewer__code-line">
                <span className="specification-viewer__line-number">
                  {(index + 1).toString().padStart(3, ' ')}
                </span>
                <span className="specification-viewer__line-content">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    );
  };

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
      {/* View mode toggle and action buttons */}
      <div className="specification-viewer__toolbar">
        <div className="specification-viewer__view-toggle">
          <button
            className={`specification-viewer__view-btn ${
              viewMode === 'tree' ? 'specification-viewer__view-btn--active' : ''
            }`}
            onClick={() => setViewMode('tree')}
            title="Tree view"
            type="button"
          >
            <TreeViewIcon />
            <span>Tree</span>
          </button>
          <button
            className={`specification-viewer__view-btn ${
              viewMode === 'code' ? 'specification-viewer__view-btn--active' : ''
            }`}
            onClick={() => setViewMode('code')}
            title="Code view (YAML)"
            type="button"
          >
            <CodeViewIcon />
            <span>YAML</span>
          </button>
          <button
            className={`specification-viewer__view-btn ${
              viewMode === 'json' ? 'specification-viewer__view-btn--active' : ''
            }`}
            onClick={() => setViewMode('json')}
            title="JSON view"
            type="button"
          >
            <JsonViewIcon />
            <span>JSON</span>
          </button>
        </div>

        <div className="specification-viewer__actions">
          {copySuccess && <div className="specification-viewer__copy-success">{copySuccess}</div>}

          {viewMode === 'tree' && (
            <>
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
            </>
          )}

          <button
            className="specification-viewer__action-btn"
            onClick={() => onCopy && onCopy(viewMode === 'json' ? 'json' : 'yaml')}
            title={`Copy ${viewMode === 'json' ? 'JSON' : 'YAML'} to clipboard`}
            type="button"
          >
            <CopyIcon />
          </button>
          <a
            href={viewMode === 'json' ? '/opencli.json' : '/opencli.yaml'}
            download
            className="specification-viewer__action-btn"
            title={`Download ${viewMode === 'json' ? 'JSON' : 'YAML'} file`}
          >
            <DownloadIcon />
          </a>
        </div>
      </div>

      <div className="specification-viewer__content" ref={contentRef}>
        {viewMode === 'tree' && <div className="specification-viewer__tree">{treeData}</div>}
        {viewMode === 'code' && renderCodeView()}
        {viewMode === 'json' && renderJsonView()}
      </div>
    </div>
  );
};

export default SpecificationViewer;
