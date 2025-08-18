import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  ExpandIcon,
  CollapseIcon,
  TreeViewIcon,
  CodeViewIcon,
  JsonViewIcon,
} from './icons';
import './SpecificationViewer.css';

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
            <TreeViewIcon size={18} />
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
            <CodeViewIcon size={18} />
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
            <JsonViewIcon size={18} />
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
                <ExpandIcon size={18} />
              </button>
              <button
                className="specification-viewer__action-btn"
                onClick={collapseAll}
                title="Collapse all nodes"
                type="button"
              >
                <CollapseIcon size={18} />
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
