import React, { memo } from 'react';
import { DocSection, DocNavigation, type NavigationSection } from '../docs';
import { useActiveSection } from '../../hooks/useActiveSection';
import { specificationStructure } from '../../data/specificationStructure';
import './Reference.css';

interface ReferenceProps {
  className?: string;
}

// Get example for each section
const getExample = (id: string): string | undefined => {
  const examples: Record<string, string> = {
    opencli: `opencli: "1.0.0"`,

    info: `info:
  title: "Open Command-Line Interface Specification"
  description: "Standard for defining command-line interfaces"
  version: "1.0.0"
  contact:
    name: "OpenCLI Working Group"
    url: "https://github.com/openclispec/open-cli-specification"
  license:
    name: "Apache 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"`,

    'info-title': `info:
  title: "Open Command-Line Interface Specification"`,

    'info-description': `info:
  description: "Standard for defining command-line interfaces"`,

    'info-version': `info:
  version: "1.0.0"`,

    'info-contact': `info:
  contact:
    name: "OpenCLI Working Group"
    url: "https://github.com/openclispec/open-cli-specification"`,

    'contact-name': `contact:
  name: "OpenCLI Working Group"`,

    'contact-url': `contact:
  url: "https://github.com/openclispec/open-cli-specification"`,

    'contact-email': `contact:
  email: "team@opencli.org"`,

    'info-license': `info:
  license:
    name: "Apache 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"`,

    'license-name': `license:
  name: "Apache 2.0"`,

    'license-url': `license:
  url: "https://www.apache.org/licenses/LICENSE-2.0"`,

    externalDocs: `externalDocs:
  description: "Find out more about OpenCLI"
  url: "https://www.openclispec.com"`,

    commands: `commands:
  ocs:
    summary: "Open CLI Spec tool"
    description: "Main entry point for the Open CLI Specification tool"
    operationId: "rootCommand"
    aliases:
      - "opencli"
    tags:
      - "core"
    parameters:
      - name: "config"
        alias:
          - "c"
        description: "Path to configuration file"
        scope: "inherited"
        schema:
          type: "string"
          format: "path"
          example: "~/.config/ocs/config.yaml"

  /validate:
    summary: "Validate CLI specification"
    description: "Validate a CLI specification file against the OpenCLI standard"
    operationId: "validateCommand"
    aliases:
      - "val"
      - "check"
    tags:
      - "core"
    parameters:
      - name: "file"
        in: "argument"
        position: 1
        description: "Path to the CLI specification file"
        required: true
        scope: "local"
        schema:
          type: "string"
          format: "path"
          example: "opencli.yaml"
    responses:
      '0':
        description: "Validation successful"
        content:
          text/plain:
            example: |
              ✓ Validation successful
              No errors found in opencli.yaml`,

    parameters: `parameters:
  - name: "config"
    alias:
      - "c"
    description: "Path to configuration file"
    scope: "inherited"
    schema:
      type: "string"
      format: "path"
      example: "~/.config/ocs/config.yaml"
  - name: "file"
    in: "argument"
    position: 1
    description: "Path to the CLI specification file"
    required: true
    scope: "local"
    schema:
      type: "string"
      format: "path"
      example: "opencli.yaml"
  - name: "verbose"
    in: "flag"
    alias:
      - "v"
    description: "Enable verbose output"
    scope: "inherited"
    schema:
      type: "boolean"
      default: false
  - name: "output"
    alias:
      - "o"
    description: "Output format for results"
    scope: "local"
    schema:
      type: "string"
      enum:
        - "json"
        - "yaml" 
        - "text"
      default: "text"
  - name: "rules"
    description: "Specific linting rules to apply"
    scope: "local"
    arity:
      min: 1
      max: 10
    schema:
      type: "string"
      example: "naming-convention parameter-validation"`,

    environment: `environment:
  - name: "OCS_CONFIG_PATH"
    description: "Override default configuration file path"
  - name: "OCS_VERBOSE"
    description: "Enable verbose output globally"
  - name: "OCS_QUIET"
    description: "Suppress non-essential output globally"`,

    tags: `tags:
  - name: "core"
    description: "Core commands and utilities"
  - name: "data"
    description: "Data processing commands"
  - name: "auth"
    description: "Authentication and user management"
  - name: "system"
    description: "System-level commands and utilities"`,

    platforms: `platforms:
  - name: "linux"
    architectures:
      - "amd64"
      - "arm64"
  - name: "darwin"
    architectures:
      - "amd64"
      - "arm64"
  - name: "windows"
    architectures:
      - "amd64"
      - "arm64"`,

    components: `components:
  schemas:
    Error:
      type: "object"
      required: ["code", "message"]
      properties:
        code:
          type: "integer"
          format: "int32"
        message:
          type: "string"
        details:
          type: "string"
          
  parameters:
    OutputFormat:
      name: "output"
      alias: ["o"]
      description: "Output format for results"
      schema:
        type: "string"
        enum: ["json", "yaml", "text"]
        default: "text"
        
  responses:
    FileNotFound:
      description: "File not found or not readable"
      content:
        text/plain:
          example: |
            ✗ Error: File not found
            Could not read the specified file
        application/json:
          schema:
            $ref: "#/components/schemas/Error"`,

    // Add missing property examples
    'components-schemas': `schemas:
  Error:
    type: "object"
    required: ["code", "message"]
    properties:
      code:
        type: "integer"
        format: "int32"
      message:
        type: "string"
      details:
        type: "string"`,

    'components-parameters': `parameters:
  OutputFormat:
    name: "output"
    alias: ["o"]
    description: "Output format for results"
    schema:
      type: "string"
      enum: ["json", "yaml", "text"]
      default: "text"`,

    'components-responses': `responses:
  FileNotFound:
    description: "File not found or not readable"
    content:
      text/plain:
        example: |
          ✗ Error: File not found
          Could not read the specified file
      application/json:
        schema:
          $ref: "#/components/schemas/Error"`,

    'externalDocs-description': `externalDocs:
  description: "Find out more about OpenCLI"`,

    'externalDocs-url': `externalDocs:
  url: "https://www.openclispec.com"`,

    'environment-name': `environment:
  - name: "OCS_CONFIG_PATH"`,

    'environment-description': `environment:
  - name: "OCS_VERBOSE"
    description: "Enable verbose output globally"`,

    'tags-name': `tags:
  - name: "core"`,

    'tags-description': `tags:
  - name: "core"
    description: "Core commands and utilities"`,

    'platforms-name': `platforms:
  - name: "linux"`,

    'platforms-architectures': `platforms:
  - name: "linux"
    architectures:
      - "amd64"
      - "arm64"`,

    // Additional missing examples
    'platform-name': `platforms:
  - name: "linux"`,

    'platform-architectures': `platforms:
  - name: "linux"
    architectures:
      - "amd64"
      - "arm64"`,

    'env-name': `environment:
  - name: "OCS_CONFIG_PATH"`,

    'env-description': `environment:
  - name: "OCS_VERBOSE"
    description: "Enable verbose output globally"`,

    'tag-name': `tags:
  - name: "core"`,

    'tag-description': `tags:
  - name: "core"
    description: "Core commands and utilities"`,

    'command-summary': `commands:
  ocs:
    summary: "Open CLI Spec tool"`,

    'command-description': `commands:
  ocs:
    description: "Main entry point for the Open CLI Specification tool"`,

    'command-operationId': `commands:
  ocs:
    operationId: "rootCommand"`,

    'command-aliases': `commands:
  ocs:
    aliases:
      - "opencli"`,

    'command-tags': `commands:
  ocs:
    tags:
      - "core"`,

    'command-parameters': `commands:
  ocs:
    parameters:
      - name: "config"
        alias:
          - "c"
        description: "Path to configuration file"
        scope: "inherited"
        schema:
          type: "string"
          format: "path"`,

    'command-responses': `commands:
  /validate:
    responses:
      '0':
        description: "Validation successful"
        content:
          text/plain:
            example: |
              ✓ Validation successful
              No errors found in opencli.yaml
      '1':
        description: "Validation failed"
        content:
          text/plain:
            example: |
              ✗ Validation failed
              Error: Missing required field 'opencli'`,

    // Fix ID mismatches from spec structure
    'externaldocs-description': `externalDocs:
  description: "Find out more about OpenCLI"`,

    'externaldocs-url': `externalDocs:
  url: "https://www.openclispec.com"`,

    // Parameter sub-properties from opencli.yaml
    'parameter-name': `parameters:
  - name: "config"`,

    'parameter-in': `parameters:
  - name: "file"
    in: "argument"`,

    'parameter-position': `parameters:
  - name: "file"
    in: "argument"
    position: 1`,

    'parameter-alias': `parameters:
  - name: "verbose"
    alias:
      - "v"`,

    'parameter-description': `parameters:
  - name: "config"
    description: "Path to configuration file"`,

    'parameter-required': `parameters:
  - name: "file"
    required: true`,

    'parameter-scope': `parameters:
  - name: "config"
    scope: "inherited"  # Available to all subcommands
  - name: "file"
    scope: "local"      # Only for this command`,

    'parameter-arity': `parameters:
  - name: "files"
    arity:
      min: 1          # At least one file required
      max: 10         # Maximum 10 files allowed
  - name: "rules"
    arity:
      min: 1          # At least one rule
      # No max = unlimited
  - name: "exclude"
    arity:
      min: 0          # Optional
      max: 5          # Up to 5 exclusions`,

    'parameter-schema': `parameters:
  - name: "language"
    schema:
      type: "string"
      enum:
        - "go"
        - "python"
        - "javascript"
      example: "go"`,

    // Response sub-properties from opencli.yaml
    'response-description': `responses:
  '0':
    description: "Validation successful"`,

    'response-content': `responses:
  '0':
    content:
      text/plain:
        example: |
          ✓ Validation successful
          No errors found in opencli.yaml
      application/json:
        schema:
          type: "object"
          properties:
            valid:
              type: "boolean"
            file:
              type: "string"`,

    // Additional schema properties from opencli.yaml
    'schema-type': `schema:
  type: "string"`,

    'schema-format': `schema:
  type: "string"
  format: "path"`,

    'schema-enum': `schema:
  type: "string"
  enum:
    - "json"
    - "yaml"
    - "text"`,

    'schema-default': `schema:
  type: "boolean"
  default: false`,

    'schema-example': `schema:
  type: "string"
  format: "path"
  example: "~/.config/ocs/config.yaml"`,
  };
  return examples[id];
};

// Create documentation content for each section in the spec structure
const createDocContent = (section: any): string => {
  const getDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      opencli:
        'Specifies which version of the OpenCLI specification your CLI tool follows. Always place this as the first field in your YAML file.',

      info: 'Core metadata that identifies your CLI tool to users and package managers.',
      'info-title':
        'Human-readable name of your CLI application (used in help text and documentation).',
      'info-description':
        'Brief explanation of what your CLI tool does (appears in --help output).',
      'info-version': 'Current version following semantic versioning (major.minor.patch).',
      'info-contact': 'How users can reach you for support, bug reports, or contributions.',
      'contact-name': 'Maintainer name or organization responsible for the CLI tool.',
      'contact-url': 'Primary support channel (GitHub issues, website, etc.).',
      'contact-email': 'Direct email for urgent issues or security reports.',
      'info-license': 'Legal terms under which your CLI tool is distributed.',
      'license-name': 'SPDX license identifier (e.g., MIT, Apache-2.0, GPL-3.0).',
      'license-url': 'Full license text location for legal compliance.',

      externalDocs: 'Links to comprehensive guides, tutorials, and API documentation.',

      commands: 'Hierarchical structure defining all available CLI commands and subcommands.',

      parameters:
        'Global parameters that work across multiple commands (like --verbose, --config).',

      environment: 'Maps environment variables to CLI parameters for containerized deployments.',

      tags: 'Logical grouping system for organizing commands by feature or domain.',

      platforms: 'OS-specific configurations for Windows, macOS, and Linux distributions.',

      'externalDocs-description': 'Brief summary of what the external documentation contains.',
      'externalDocs-url': 'Direct link to comprehensive guides and documentation.',

      'externaldocs-description': 'Brief summary of what the external documentation contains.',
      'externaldocs-url': 'Direct link to comprehensive guides and documentation.',

      'platform-name': 'Operating system identifier (linux, darwin, windows, etc.).',
      'platform-architectures': 'Supported CPU architectures for this platform.',

      'env-name': 'Environment variable name that your CLI tool recognizes.',
      'env-description': 'Purpose and usage of this environment variable.',

      'tag-name': 'Unique identifier for organizing related commands.',
      'tag-description': 'Human-readable explanation of what commands share this tag.',

      'command-summary': 'One-line description shown in command help listings.',
      'command-description': 'Detailed explanation of command purpose and behavior.',
      'command-operationId': 'Unique identifier for programmatic access (for testing, docs, etc.).',
      'command-aliases': 'Alternative command names for user convenience.',
      'command-tags': 'Categories for organizing commands in help and documentation.',
      'command-parameters': 'All flags, options, and arguments this command accepts.',
      'command-responses': 'Exit codes and output formats users can expect.',

      // Parameter sub-properties
      'parameter-name': 'Unique identifier for the parameter within the command.',
      'parameter-in':
        'Where the parameter appears (argument for positional, flag for boolean, option for named).',
      'parameter-position': 'Order position for positional arguments (starting from 1).',
      'parameter-alias': 'Short form alternatives (e.g., -v for --verbose).',
      'parameter-description': 'Help text shown to users explaining the parameter purpose.',
      'parameter-required': 'Whether users must provide this parameter.',
      'parameter-scope':
        'Inheritance behavior - local (this command only) or inherited (available to subcommands).',
      'parameter-arity': 'How many values this parameter accepts (useful for arrays and lists).',
      'parameter-schema': 'Data type, validation rules, and constraints for parameter values.',

      // Response sub-properties
      'response-description': 'Human-readable explanation of when this response occurs.',
      'response-content':
        'Output format examples by media type (text/plain, application/json, etc.).',

      // Schema sub-properties
      'schema-type': 'Data type for validation (string, integer, boolean, array, object).',
      'schema-format': 'Format hint for specialized string types (path, email, uri, date).',
      'schema-enum': 'Restricted list of allowed values for this parameter.',
      'schema-default': 'Value used when parameter is not provided by the user.',
      'schema-example': 'Sample value shown in help text and documentation.',

      components: 'Reusable schemas for parameters, responses, and data validation.',
    };
    return descriptions[id] || section.description || 'Documentation for this property.';
  };

  return getDescription(section.id);
};

// Recursively collect all sections from the tree structure
const collectAllSections = (
  sections: NavigationSection[]
): Array<{
  id: string;
  title: string;
  required?: boolean;
  type?: string;
  description?: string;
}> => {
  const result: Array<{
    id: string;
    title: string;
    required?: boolean;
    type?: string;
    description?: string;
  }> = [];

  const traverse = (sections: NavigationSection[]) => {
    sections.forEach(section => {
      result.push({
        id: section.id,
        title: section.title,
        required: section.required,
        type: section.type,
        description: section.description,
      });

      if (section.children) {
        traverse(section.children);
      }
    });
  };

  traverse(sections);
  return result;
};

export const Reference: React.FC<ReferenceProps> = memo(({ className = '' }) => {
  const { activeSection, scrollToSection } = useActiveSection('opencli');

  // Use the proper tree structure from specification structure
  const navigationSections: NavigationSection[] =
    specificationStructure.filter(section => section.id === 'root')[0]?.children || [];

  // Create flat list of all sections for content rendering
  const allSections = collectAllSections(navigationSections);

  return (
    <div
      className={`reference ${className}`}
      role="tabpanel"
      id="panel-reference"
      aria-labelledby="tab-reference"
    >
      {/* Header matching Spec page style */}
      <div className="reference__header">
        <div className="reference__header-content">
          <div className="reference__title-section">
            <h1>
              OpenCLI Specification Reference
              <span className="reference__version-badge">v1.0.0</span>
            </h1>
            <p className="reference__description">
              Complete reference documentation for OpenCLI Specification v1.0.0 - The standard for
              defining command-line interfaces.
            </p>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="reference__main">
        <div className="reference__layout">
          {/* Main Content - Left Side Scrollable */}
          <main className="reference__content">
            {allSections.map(section => (
              <DocSection
                key={section.id}
                id={section.id}
                title={section.title}
                required={section.required}
                type={section.type}
                description={createDocContent(section)}
                example={getExample(section.id)}
              />
            ))}
          </main>

          {/* Navigation - Right Side Fixed */}
          <nav className="reference__navigation">
            <DocNavigation
              sections={navigationSections}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
              className="reference__nav"
            />
          </nav>
        </div>
      </div>
    </div>
  );
});
