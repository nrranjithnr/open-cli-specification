import React from 'react';

export interface DocumentationSection {
  id: string;
  title: string;
  required?: boolean;
  type?: string;
  description?: string;
  example?: string;
  content?: React.ReactNode;
}

export function getDocumentationSections(): DocumentationSection[] {
  return [
    {
      id: 'overview',
      title: 'OpenCLI Specification Overview',
      description: 'Introduction to the OpenCLI specification format and its purpose.',
      content: (
        <div>
          <p>
            The OpenCLI Specification is a YAML-based format for describing command-line interfaces
            in a standardized way. It enables AI automation, improves documentation consistency, and
            provides a foundation for tooling and code generation.
          </p>

          <h3>Key Features</h3>
          <ul>
            <li>
              <strong>Standardized Format</strong>: Consistent structure across all CLI tools
            </li>
            <li>
              <strong>AI-Ready</strong>: Machine-readable specifications for automation
            </li>
            <li>
              <strong>Comprehensive</strong>: Covers commands, parameters, responses, and metadata
            </li>
            <li>
              <strong>Extensible</strong>: Supports reusable components and references
            </li>
          </ul>

          <h3>Use Cases</h3>
          <ul>
            <li>Automated CLI documentation generation</li>
            <li>Code generation for CLI frameworks</li>
            <li>AI-powered CLI assistance and automation</li>
            <li>Testing and validation of CLI tools</li>
            <li>Integration with development workflows</li>
          </ul>
        </div>
      ),
    },

    {
      id: 'opencli',
      title: 'opencli',
      required: true,
      type: 'string',
      description: 'The version of the OpenCLI specification being used.',
      example: 'opencli: "1.0.0"',
      content: (
        <div>
          <p>
            The <code>opencli</code> field specifies which version of the OpenCLI specification this
            document conforms to. This is required and should be the first field in your
            specification file.
          </p>

          <p>
            <strong>Current version:</strong> 1.0.0
          </p>
        </div>
      ),
    },

    {
      id: 'info',
      title: 'info',
      required: true,
      type: 'object',
      description: 'Metadata about the CLI tool including title, version, and contact information.',
      example: `info:
  title: "My CLI Tool"
  description: "A powerful command-line utility"
  version: "2.1.0"
  contact:
    name: "Development Team"
    url: "https://github.com/myorg/cli-tool"
  license:
    name: "MIT"
    url: "https://opensource.org/licenses/MIT"`,
      content: (
        <div>
          <p>
            The <code>info</code> object contains essential metadata about your CLI tool. This
            information is used for documentation generation and tool identification.
          </p>

          <h4>Required Fields</h4>
          <ul>
            <li>
              <code>title</code> - The name of your CLI tool
            </li>
            <li>
              <code>version</code> - The current version of your CLI tool
            </li>
          </ul>

          <h4>Optional Fields</h4>
          <ul>
            <li>
              <code>description</code> - A brief description of what your tool does
            </li>
            <li>
              <code>contact</code> - Contact information for support or contributions
            </li>
            <li>
              <code>license</code> - License information for your tool
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: 'commands',
      title: 'commands',
      required: true,
      type: 'object',
      description: 'Definition of CLI commands, their parameters, and expected responses.',
      example: `commands:
  /validate:
    summary: "Validate CLI specification"
    description: "Validate a CLI specification file against the OpenCLI standard"
    operationId: "validateCommand"
    tags: ["core"]
    parameters:
      - name: "file"
        in: "argument"
        position: 1
        description: "Path to the CLI specification file"
        required: true
        schema:
          type: "string"
          format: "path"
    responses:
      '0':
        description: "Validation successful"
        content:
          text/plain:
            example: |
              ✓ Validation successful
              No errors found in opencli.yaml`,
      content: (
        <div>
          <p>
            The <code>commands</code> section defines all available commands in your CLI tool. Each
            command is defined as a key-value pair where the key is the command path (starting with
            /) and the value contains the command specification.
          </p>

          <h4>Command Properties</h4>
          <ul>
            <li>
              <code>summary</code> - Brief one-line description
            </li>
            <li>
              <code>description</code> - Detailed description of the command
            </li>
            <li>
              <code>operationId</code> - Unique identifier for the command
            </li>
            <li>
              <code>parameters</code> - Array of command parameters, flags, and options
            </li>
            <li>
              <code>responses</code> - Expected outputs organized by exit code
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: 'command-responses',
      title: 'responses',
      type: 'object',
      description: 'Expected command outputs and exit codes for CLI commands.',
      example: `responses:
  '0':
    description: "Command executed successfully"
    content:
      text/plain:
        example: |
          ✓ Operation completed successfully
          Files processed: 42
      application/json:
        schema:
          type: "object"
          properties:
            status:
              type: "string"
            files_processed:
              type: "integer"
  '1':
    description: "Command failed with error"
    content:
      text/plain:
        example: |
          ✗ Operation failed
          Error: Invalid input file`,
      content: (
        <div>
          <p>
            CLI responses are organized by exit codes (as strings) and define what users can expect
            when running commands. Unlike HTTP APIs, CLI tools use exit codes to indicate success
            (0) or various error conditions (1, 2, etc.).
          </p>

          <h4>Response Structure</h4>
          <ul>
            <li>
              <code>description</code> - What this response means
            </li>
            <li>
              <code>content</code> - Expected output format and examples
            </li>
          </ul>

          <h4>Common Exit Codes</h4>
          <ul>
            <li>
              <code>0</code> - Success
            </li>
            <li>
              <code>1</code> - General error
            </li>
            <li>
              <code>2</code> - Invalid usage/arguments
            </li>
            <li>
              <code>126</code> - Command not executable
            </li>
            <li>
              <code>127</code> - Command not found
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: 'components',
      title: 'components',
      type: 'object',
      description: 'Reusable schemas, parameters, and responses to avoid duplication.',
      example: `components:
  schemas:
    Error:
      type: "object"
      required: ["code", "message"]
      properties:
        code:
          type: "integer"
        message:
          type: "string"
        details:
          type: "string"
  
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
      content: (
        <div>
          <p>
            The <code>components</code> section allows you to define reusable elements that can be
            referenced throughout your specification. This promotes consistency and reduces
            duplication.
          </p>

          <h4>Component Types</h4>
          <ul>
            <li>
              <code>schemas</code> - Reusable data structure definitions
            </li>
            <li>
              <code>parameters</code> - Common parameter definitions
            </li>
            <li>
              <code>responses</code> - Standard response definitions
            </li>
          </ul>

          <h4>Using References</h4>
          <p>
            Reference components using JSON Pointer syntax:
            <code>$ref: "#/components/schemas/Error"</code>
          </p>
        </div>
      ),
    },
  ];
}
