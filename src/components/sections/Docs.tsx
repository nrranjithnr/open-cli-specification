import React from 'react';
import './Docs.css';

interface DocsProps {
  className?: string;
}

export const Docs: React.FC<DocsProps> = ({ className = '' }) => {
  return (
    <div className={`docs ${className}`}>
      <div className="docs__container">
        
        {/* Header */}
        <div className="docs__header">
          <h1>OpenCLI Specification Documentation</h1>
          <p className="docs__subtitle">
            Complete reference documentation for all OpenCLI properties, types, and features.
          </p>
        </div>

        {/* Documentation Content */}
        <div className="docs__content">
          
          {/* Navigation Tree */}
          <nav className="docs__nav">
            <div className="docs__nav-section">
              <h4>Properties</h4>
              <ul className="docs__nav-list">
                <li><a href="#info">info</a></li>
                <li><a href="#commands">commands</a></li>
                <li><a href="#parameters">parameters</a></li>
                <li><a href="#environment">environment</a></li>
                <li><a href="#validation">validation</a></li>
                <li><a href="#metadata">metadata</a></li>
                <li><a href="#security">security</a></li>
                <li><a href="#extensions">extensions</a></li>
              </ul>
            </div>
            
            <div className="docs__nav-section">
              <h4>Types</h4>
              <ul className="docs__nav-list">
                <li><a href="#command-object">Command Object</a></li>
                <li><a href="#parameter-object">Parameter Object</a></li>
                <li><a href="#example-object">Example Object</a></li>
                <li><a href="#schema-object">Schema Object</a></li>
              </ul>
            </div>

            <div className="docs__nav-section">
              <h4>Examples</h4>
              <ul className="docs__nav-list">
                <li><a href="#basic-cli">Basic CLI</a></li>
                <li><a href="#advanced-cli">Advanced CLI</a></li>
                <li><a href="#nested-commands">Nested Commands</a></li>
              </ul>
            </div>
          </nav>

          {/* Main Documentation */}
          <main className="docs__main">
            
            {/* Info Section */}
            <section id="info" className="docs__section">
              <h2>Info Object</h2>
              <p>The info object provides metadata about the CLI application.</p>
              
              <div className="docs__property-table">
                <table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>title</code></td>
                      <td>string</td>
                      <td>✓</td>
                      <td>The title of the CLI application</td>
                    </tr>
                    <tr>
                      <td><code>description</code></td>
                      <td>string</td>
                      <td>✓</td>
                      <td>A short description of the CLI application</td>
                    </tr>
                    <tr>
                      <td><code>version</code></td>
                      <td>string</td>
                      <td>✓</td>
                      <td>The version of the CLI application</td>
                    </tr>
                    <tr>
                      <td><code>termsOfService</code></td>
                      <td>string</td>
                      <td></td>
                      <td>A URL to the Terms of Service for the CLI</td>
                    </tr>
                    <tr>
                      <td><code>contact</code></td>
                      <td>Contact Object</td>
                      <td></td>
                      <td>Contact information for the CLI</td>
                    </tr>
                    <tr>
                      <td><code>license</code></td>
                      <td>License Object</td>
                      <td></td>
                      <td>License information for the CLI</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs__example">
                <h4>Example</h4>
                <pre><code>{`info:
  title: "My CLI Tool"
  description: "A powerful command-line interface"
  version: "1.0.0"
  contact:
    name: "API Support"
    email: "support@example.com"
    url: "https://example.com/support"
  license:
    name: "MIT"
    url: "https://opensource.org/licenses/MIT"`}</code></pre>
              </div>
            </section>

            {/* Commands Section */}
            <section id="commands" className="docs__section">
              <h2>Commands Object</h2>
              <p>The commands object defines all available commands for the CLI application.</p>
              
              <div className="docs__property-table">
                <table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>{"{command-name}"}</code></td>
                      <td>Command Object</td>
                      <td>✓</td>
                      <td>A command definition</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs__example">
                <h4>Example</h4>
                <pre><code>{`commands:
  create:
    summary: "Create a new resource"
    description: "Creates a new resource with the specified parameters"
    parameters:
      - name: "type"
        description: "The type of resource to create"
        required: true
        schema:
          type: "string"
          enum: ["file", "directory", "project"]
  delete:
    summary: "Delete a resource"
    description: "Deletes an existing resource"
    parameters:
      - name: "path"
        description: "Path to the resource to delete"
        required: true
        schema:
          type: "string"`}</code></pre>
              </div>
            </section>

            {/* Command Object Section */}
            <section id="command-object" className="docs__section">
              <h2>Command Object</h2>
              <p>Describes a single command within the CLI application.</p>
              
              <div className="docs__property-table">
                <table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>summary</code></td>
                      <td>string</td>
                      <td></td>
                      <td>A short summary of what the command does</td>
                    </tr>
                    <tr>
                      <td><code>description</code></td>
                      <td>string</td>
                      <td></td>
                      <td>A verbose explanation of the command behavior</td>
                    </tr>
                    <tr>
                      <td><code>parameters</code></td>
                      <td>[Parameter Object]</td>
                      <td></td>
                      <td>A list of parameters for the command</td>
                    </tr>
                    <tr>
                      <td><code>examples</code></td>
                      <td>[Example Object]</td>
                      <td></td>
                      <td>A list of examples showing how to use the command</td>
                    </tr>
                    <tr>
                      <td><code>subcommands</code></td>
                      <td>Commands Object</td>
                      <td></td>
                      <td>Nested subcommands</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Parameter Object Section */}
            <section id="parameter-object" className="docs__section">
              <h2>Parameter Object</h2>
              <p>Describes a parameter that can be used with a command.</p>
              
              <div className="docs__property-table">
                <table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>name</code></td>
                      <td>string</td>
                      <td>✓</td>
                      <td>The name of the parameter</td>
                    </tr>
                    <tr>
                      <td><code>description</code></td>
                      <td>string</td>
                      <td></td>
                      <td>A brief description of the parameter</td>
                    </tr>
                    <tr>
                      <td><code>required</code></td>
                      <td>boolean</td>
                      <td></td>
                      <td>Whether the parameter is required</td>
                    </tr>
                    <tr>
                      <td><code>schema</code></td>
                      <td>Schema Object</td>
                      <td></td>
                      <td>The schema defining the parameter</td>
                    </tr>
                    <tr>
                      <td><code>example</code></td>
                      <td>Any</td>
                      <td></td>
                      <td>Example value for the parameter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Schema Object Section */}
            <section id="schema-object" className="docs__section">
              <h2>Schema Object</h2>
              <p>The Schema Object allows the definition of input and output data types.</p>
              
              <div className="docs__property-table">
                <table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>type</code></td>
                      <td>string</td>
                      <td></td>
                      <td>The type of the schema (string, number, boolean, array, object)</td>
                    </tr>
                    <tr>
                      <td><code>format</code></td>
                      <td>string</td>
                      <td></td>
                      <td>The format of the string type</td>
                    </tr>
                    <tr>
                      <td><code>enum</code></td>
                      <td>array</td>
                      <td></td>
                      <td>Allowed values for the parameter</td>
                    </tr>
                    <tr>
                      <td><code>default</code></td>
                      <td>Any</td>
                      <td></td>
                      <td>Default value for the parameter</td>
                    </tr>
                    <tr>
                      <td><code>minimum</code></td>
                      <td>number</td>
                      <td></td>
                      <td>Minimum value for numeric types</td>
                    </tr>
                    <tr>
                      <td><code>maximum</code></td>
                      <td>number</td>
                      <td></td>
                      <td>Maximum value for numeric types</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Basic CLI Example */}
            <section id="basic-cli" className="docs__section">
              <h2>Basic CLI Example</h2>
              <p>A simple CLI application with basic commands.</p>
              
              <div className="docs__example docs__example--large">
                <pre><code>{`opencli: 1.0.0
info:
  title: "File Manager CLI"
  description: "A simple file management command-line interface"
  version: "1.0.0"
  
commands:
  list:
    summary: "List files and directories"
    description: "Lists all files and directories in the specified path"
    parameters:
      - name: "path"
        description: "The directory path to list"
        required: false
        schema:
          type: "string"
          default: "."
      - name: "all"
        description: "Show hidden files"
        required: false
        schema:
          type: "boolean"
          default: false
    examples:
      - summary: "List current directory"
        value: "myapp list"
      - summary: "List specific directory with hidden files"
        value: "myapp list /home/user --all"
        
  create:
    summary: "Create a new file or directory"
    description: "Creates a new file or directory at the specified path"
    parameters:
      - name: "type"
        description: "Type of item to create"
        required: true
        schema:
          type: "string"
          enum: ["file", "directory"]
      - name: "path"
        description: "Path where to create the item"
        required: true
        schema:
          type: "string"
    examples:
      - summary: "Create a new file"
        value: "myapp create file /path/to/newfile.txt"
      - summary: "Create a new directory"
        value: "myapp create directory /path/to/newdir"`}</code></pre>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};
