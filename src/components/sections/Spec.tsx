import React, { useState } from 'react';
import { SpecificationViewer } from '../SpecificationViewer';
import { useYamlSpec } from '../../hooks/useYamlSpec';
import './Spec.css';

interface SpecProps {
  className?: string;
}

export const Spec: React.FC<SpecProps> = ({ className = '' }) => {
  const { data, loading, error, refreshSpec } = useYamlSpec();
  const [copySuccess, setCopySuccess] = useState<string>('');

  const copyToClipboard = async (format: 'yaml' | 'json') => {
    try {
      const url = format === 'json' ? '/opencli.json' : '/opencli.yaml';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${format.toUpperCase()} content`);
      }
      const content = await response.text();

      await navigator.clipboard.writeText(content);
      setCopySuccess(`${format.toUpperCase()} copied to clipboard!`);
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      setCopySuccess(`Failed to copy ${format.toUpperCase()}`);
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="spec__loading">
          <div className="spec__loading-spinner" />
          <p>Loading OpenCLI specification...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="spec__error">
          <h3>Error Loading Specification</h3>
          <p className="spec__error-message">{error}</p>
          <button className="spec__retry-button" onClick={refreshSpec} type="button">
            Retry Loading
          </button>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="spec__empty">
          <h3>No Specification Available</h3>
          <p>The OpenCLI specification could not be loaded.</p>
        </div>
      );
    }

    return (
      <SpecificationViewer
        data={data}
        className="spec__viewer"
        onCopy={copyToClipboard}
        copySuccess={copySuccess}
      />
    );
  };

  return (
    <div className={`spec ${className}`} id="panel-spec" role="tabpanel" aria-labelledby="tab-spec">
      <div className="spec__header">
        <div className="spec__header-content">
          <h1>OpenCLI Specification</h1>
          <p className="spec__description">Complete YAML specification for the OpenCLI standard.</p>
        </div>
      </div>
      <div className="spec__main">{renderContent()}</div>
    </div>
  );
};
