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

  const copyYamlToClipboard = async () => {
    try {
      // Fetch the raw YAML content
      const response = await fetch('/opencli.yaml');
      if (!response.ok) {
        throw new Error('Failed to fetch YAML content');
      }
      const yamlContent = await response.text();

      await navigator.clipboard.writeText(yamlContent);
      setCopySuccess('YAML copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      setCopySuccess('Failed to copy YAML');
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
        onCopyYaml={copyYamlToClipboard}
        copySuccess={copySuccess}
      />
    );
  };

  return (
    <div className={`spec ${className}`} id="panel-spec" role="tabpanel" aria-labelledby="tab-spec">
      <div className="spec__header">
        <h1>OpenCLI Specification</h1>
        <p className="spec__description">
          The complete YAML specification defining the OpenCLI standard for command-line interfaces.
        </p>
      </div>
      <div className="spec__main">{renderContent()}</div>
    </div>
  );
};
