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
      <div className="spec__content">
        {/* ===== PRIMARY CONTENT: YAML VIEWER ===== */}
        {/* This YAML viewer is the most important content on this page */}
        <div className="spec__yaml-container">
          <SpecificationViewer
            data={data}
            className="spec__viewer"
            onCopyYaml={copyYamlToClipboard}
            copySuccess={copySuccess}
          />
        </div>

        {/* Comprehensive Documentation - OpenAPI Style */}
        <div className="spec__documentation">
          <div className="spec__docs-header">
            <h2>OpenCLI Specification v1.0.0</h2>
            <p>Complete reference documentation for all OpenCLI properties, types, and features.</p>
          </div>

          <div className="spec__docs-layout">
            {/* Navigation Tree */}
            <nav className="spec__docs-nav">
              <div className="spec__nav-section">
                <h4>Properties</h4>
                <ul className="spec__nav-list">
                  <li>
                    <a href="#info">info</a>
                  </li>
                  <li>
                    <a href="#commands">commands</a>
                  </li>
                  <li>
                    <a href="#parameters">parameters</a>
                  </li>
                  <li>
                    <a href="#environment">environment</a>
                  </li>
                  <li>
                    <a href="#tags">tags</a>
                  </li>
                  <li>
                    <a href="#platforms">platforms</a>
                  </li>
                  <li>
                    <a href="#components">components</a>
                  </li>
                  <li>
                    <a href="#externalDocs">externalDocs</a>
                  </li>
                </ul>
              </div>

              <div className="spec__nav-section">
                <h4>Data Types</h4>
                <ul className="spec__nav-list">
                  <li>
                    <a href="#types-string">string</a>
                  </li>
                  <li>
                    <a href="#types-number">number</a>
                  </li>
                  <li>
                    <a href="#types-boolean">boolean</a>
                  </li>
                  <li>
                    <a href="#types-array">array</a>
                  </li>
                  <li>
                    <a href="#types-object">object</a>
                  </li>
                </ul>
              </div>

              <div className="spec__nav-section">
                <h4>Examples</h4>
                <ul className="spec__nav-list">
                  <li>
                    <a href="#example-basic">Basic CLI</a>
                  </li>
                  <li>
                    <a href="#example-complex">Complex CLI</a>
                  </li>
                  <li>
                    <a href="#example-subcommands">Subcommands</a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Content Sections */}
            <div className="spec__docs-content">
              {/* Info Property */}
              <section id="info" className="spec__property-section">
                <h3>info</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Object</span>
                  <span className="spec__required">Required</span>
                </div>
                <p>
                  Essential metadata about the CLI tool including identification, versioning, and
                  contact information.
                </p>

                <h4>Properties</h4>
                <div className="spec__property-table">
                  <div className="spec__property-row">
                    <div className="spec__prop-name">title</div>
                    <div className="spec__prop-type">string</div>
                    <div className="spec__prop-required">Required</div>
                    <div className="spec__prop-desc">The name of the CLI tool</div>
                  </div>
                  <div className="spec__property-row">
                    <div className="spec__prop-name">description</div>
                    <div className="spec__prop-type">string</div>
                    <div className="spec__prop-required">Optional</div>
                    <div className="spec__prop-desc">
                      A brief description of the CLI tool's purpose
                    </div>
                  </div>
                  <div className="spec__property-row">
                    <div className="spec__prop-name">version</div>
                    <div className="spec__prop-type">string</div>
                    <div className="spec__prop-required">Required</div>
                    <div className="spec__prop-desc">
                      Version of the CLI tool (semantic versioning recommended)
                    </div>
                  </div>
                  <div className="spec__property-row">
                    <div className="spec__prop-name">contact</div>
                    <div className="spec__prop-type">object</div>
                    <div className="spec__prop-required">Optional</div>
                    <div className="spec__prop-desc">Contact information (name, url, email)</div>
                  </div>
                  <div className="spec__property-row">
                    <div className="spec__prop-name">license</div>
                    <div className="spec__prop-type">object</div>
                    <div className="spec__prop-required">Optional</div>
                    <div className="spec__prop-desc">License information (name, url)</div>
                  </div>
                </div>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`info:
  title: "My CLI Tool"
  description: "A powerful command line interface"
  version: "1.0.0"
  contact:
    name: "API Support"
    url: "https://example.com/support"
    email: "support@example.com"
  license:
    name: "MIT"
    url: "https://opensource.org/licenses/MIT"`}</code>
                  </pre>
                </div>
              </section>

              {/* Commands Property */}
              <section id="commands" className="spec__property-section">
                <h3>commands</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Object</span>
                  <span className="spec__required">Required</span>
                </div>
                <p>
                  Defines the command structure using path-based hierarchical organization. Each
                  command can have subcommands, parameters, and responses.
                </p>

                <h4>Key Features</h4>
                <ul className="spec__feature-list">
                  <li>
                    <strong>Hierarchical Structure:</strong> Support for nested commands (e.g.,
                    /git/branch/create)
                  </li>
                  <li>
                    <strong>Parameter Inheritance:</strong> Parent commands can define parameters
                    inherited by children
                  </li>
                  <li>
                    <strong>Response Definitions:</strong> Define expected output formats and status
                    codes
                  </li>
                  <li>
                    <strong>Validation Rules:</strong> Parameter validation and arity constraints
                  </li>
                </ul>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`commands:
  "/deploy":
    description: "Deploy application"
    parameters:
      - name: "environment"
        type: "string"
        required: true
        choices: ["dev", "staging", "prod"]
    responses:
      success:
        description: "Deployment successful"
        status_code: 0
      error:
        description: "Deployment failed"
        status_code: 1
  "/deploy/rollback":
    description: "Rollback deployment"
    inherits: ["/deploy"]`}</code>
                  </pre>
                </div>
              </section>

              {/* Parameters Property */}
              <section id="parameters" className="spec__property-section">
                <h3>parameters</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Array of Objects</span>
                  <span className="spec__required">Optional</span>
                </div>
                <p>
                  Global parameter definitions that can be referenced and reused across commands.
                </p>

                <h4>Parameter Types</h4>
                <div className="spec__parameter-types">
                  <div className="spec__param-type">
                    <h5>Flag</h5>
                    <p>Boolean parameters that don't take values (e.g., --verbose, -v)</p>
                  </div>
                  <div className="spec__param-type">
                    <h5>Option</h5>
                    <p>Parameters that accept values (e.g., --config file.json, -c file.json)</p>
                  </div>
                  <div className="spec__param-type">
                    <h5>Argument</h5>
                    <p>Positional parameters without flags (e.g., filename in 'cp source dest')</p>
                  </div>
                </div>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`parameters:
  - name: "verbose"
    type: "flag"
    short: "v"
    description: "Enable verbose output"
    
  - name: "config"
    type: "option"
    short: "c"
    value_type: "string"
    description: "Configuration file path"
    default: "./config.json"
    
  - name: "target"
    type: "argument"
    value_type: "string"
    position: 1
    required: true
    description: "Target file or directory"`}</code>
                  </pre>
                </div>
              </section>

              {/* Environment Property */}
              <section id="environment" className="spec__property-section">
                <h3>environment</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Object</span>
                  <span className="spec__required">Optional</span>
                </div>
                <p>
                  Maps environment variables to CLI parameters using convention-based naming with
                  proper precedence handling.
                </p>

                <h4>Naming Conventions</h4>
                <ul className="spec__feature-list">
                  <li>
                    <strong>PREFIX_PARAMETER:</strong> Standard pattern (e.g., MYAPP_CONFIG)
                  </li>
                  <li>
                    <strong>Precedence Order:</strong> CLI args → Environment → Default values
                  </li>
                  <li>
                    <strong>Type Conversion:</strong> Automatic conversion based on parameter type
                  </li>
                </ul>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`environment:
  prefix: "MYAPP"
  mappings:
    config: "MYAPP_CONFIG_FILE"
    verbose: "MYAPP_VERBOSE"
    api_key: "MYAPP_API_KEY"`}</code>
                  </pre>
                </div>
              </section>

              {/* Additional sections */}
              <section id="tags" className="spec__property-section">
                <h3>tags</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Array of Objects</span>
                  <span className="spec__required">Optional</span>
                </div>
                <p>
                  Organizational tags for categorizing and grouping commands for better discovery
                  and documentation.
                </p>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`tags:
  - name: "database"
    description: "Database management commands"
  - name: "deployment"
    description: "Application deployment commands"`}</code>
                  </pre>
                </div>
              </section>

              <section id="platforms" className="spec__property-section">
                <h3>platforms</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Object</span>
                  <span className="spec__required">Optional</span>
                </div>
                <p>
                  Platform-specific configurations for different operating systems and
                  architectures.
                </p>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`platforms:
  linux:
    architectures: ["amd64", "arm64"]
    shell: "/bin/bash"
  windows:
    architectures: ["amd64"]
    shell: "cmd.exe"
  macos:
    architectures: ["amd64", "arm64"]
    shell: "/bin/zsh"`}</code>
                  </pre>
                </div>
              </section>

              <section id="components" className="spec__property-section">
                <h3>components</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Object</span>
                  <span className="spec__required">Optional</span>
                </div>
                <p>
                  Reusable components including schemas, parameters, and responses using $ref syntax
                  for modular design.
                </p>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`components:
  parameters:
    CommonVerbose:
      name: "verbose"
      type: "flag"
      short: "v"
      description: "Enable verbose output"
  schemas:
    ApiResponse:
      type: "object"
      properties:
        status: 
          type: "string"
        message:
          type: "string"`}</code>
                  </pre>
                </div>
              </section>

              <section id="externalDocs" className="spec__property-section">
                <h3>externalDocs</h3>
                <div className="spec__property-meta">
                  <span className="spec__type">Object</span>
                  <span className="spec__required">Optional</span>
                </div>
                <p>
                  References to external documentation, tutorials, and resources that complement the
                  CLI specification.
                </p>

                <div className="spec__example">
                  <h5>Example</h5>
                  <pre>
                    <code>{`externalDocs:
  description: "Complete user guide and tutorials"
  url: "https://docs.example.com"`}</code>
                  </pre>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`spec ${className}`} role="tabpanel" id="panel-spec" aria-labelledby="tab-spec">
      {/* Compact Header */}
      <section className="spec__header">
        <div className="spec__header-content">
          <div className="spec__title-section">
            <h1 className="spec__title">OpenCLI Specification</h1>
            <div className="spec__meta">
              <span className="spec__version">v1.0.0</span>
              <span className="spec__type">YAML Schema</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT: YAML VIEWER FIRST ===== */}
      {/* This is the PRIMARY content - YAML specification viewer comes first */}
      <section className="spec__yaml-section">{renderContent()}</section>
    </div>
  );
};

export default Spec;
