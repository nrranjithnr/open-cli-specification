import React, { useState, useEffect } from 'react';
import './Docs.css';

interface DocsProps {
  className?: string;
}

interface SpecSection {
  id: string;
  title: string;
  children?: SpecSection[];
  required?: boolean;
  type?: string;
}

export const Docs: React.FC<DocsProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['root', 'info', 'commands', 'info-contact', 'info-license'])
  );
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);

  const specStructure: SpecSection[] = [
    {
      id: 'root',
      title: 'OpenCLI Document',
      children: [
        { id: 'opencli', title: 'opencli', required: true, type: 'string' },
        {
          id: 'info',
          title: 'info',
          required: true,
          type: 'object',
          children: [
            { id: 'info-title', title: 'title', required: true, type: 'string' },
            { id: 'info-description', title: 'description', type: 'string' },
            { id: 'info-version', title: 'version', required: true, type: 'string' },
            {
              id: 'info-contact',
              title: 'contact',
              type: 'object',
              children: [
                { id: 'contact-name', title: 'name', type: 'string' },
                { id: 'contact-url', title: 'url', type: 'string' },
                { id: 'contact-email', title: 'email', type: 'string' },
              ],
            },
            {
              id: 'info-license',
              title: 'license',
              type: 'object',
              children: [
                { id: 'license-name', title: 'name', type: 'string' },
                { id: 'license-url', title: 'url', type: 'string' },
              ],
            },
          ],
        },
        {
          id: 'externalDocs',
          title: 'externalDocs',
          type: 'object',
          children: [
            { id: 'externaldocs-description', title: 'description', type: 'string' },
            { id: 'externaldocs-url', title: 'url', type: 'string' },
          ],
        },
        {
          id: 'platforms',
          title: 'platforms',
          type: 'array',
          children: [
            { id: 'platform-name', title: 'name', type: 'string' },
            { id: 'platform-architectures', title: 'architectures', type: 'array' },
          ],
        },
        {
          id: 'environment',
          title: 'environment',
          type: 'array',
          children: [
            { id: 'env-name', title: 'name', type: 'string' },
            { id: 'env-description', title: 'description', type: 'string' },
          ],
        },
        {
          id: 'tags',
          title: 'tags',
          type: 'array',
          children: [
            { id: 'tag-name', title: 'name', type: 'string' },
            { id: 'tag-description', title: 'description', type: 'string' },
          ],
        },
        {
          id: 'commands',
          title: 'commands',
          required: true,
          type: 'object',
          children: [
            { id: 'command-summary', title: 'summary', type: 'string' },
            { id: 'command-description', title: 'description', type: 'string' },
            { id: 'command-operationId', title: 'operationId', type: 'string' },
            { id: 'command-aliases', title: 'aliases', type: 'array' },
            { id: 'command-tags', title: 'tags', type: 'array' },
            {
              id: 'command-parameters',
              title: 'parameters',
              type: 'array',
              children: [
                { id: 'param-name', title: 'name', required: true, type: 'string' },
                { id: 'param-in', title: 'in', type: 'string' },
                { id: 'param-required', title: 'required', type: 'boolean' },
                { id: 'param-description', title: 'description', type: 'string' },
                { id: 'param-alias', title: 'alias', type: 'array' },
                { id: 'param-schema', title: 'schema', type: 'object' },
              ],
            },
            {
              id: 'command-responses',
              title: 'responses',
              type: 'object',
              children: [
                { id: 'response-description', title: 'description', type: 'string' },
                { id: 'response-content', title: 'content', type: 'object' },
              ],
            },
          ],
        },
        {
          id: 'components',
          title: 'components',
          type: 'object',
          children: [
            { id: 'components-schemas', title: 'schemas', type: 'object' },
            { id: 'components-parameters', title: 'parameters', type: 'object' },
            { id: 'components-responses', title: 'responses', type: 'object' },
          ],
        },
      ],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setMobileNavVisible(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CopyButton: React.FC<{ text: string }> = ({ text }) => (
    <button
      className="docs__copy-btn"
      onClick={() => copyToClipboard(text)}
      aria-label="Copy to clipboard"
    >
      Copy
    </button>
  );

  const renderTreeNode = (section: SpecSection, level: number = 0): React.ReactNode => {
    const isExpanded = expandedSections.has(section.id);
    const hasChildren = section.children && section.children.length > 0;
    const isActive = activeSection === section.id;

    return (
      <div key={section.id} className={`docs__tree-node docs__tree-node--level-${level}`}>
        <div
          className={`docs__tree-item ${isActive ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
        >
          {hasChildren && (
            <button
              className={`docs__tree-toggle ${isExpanded ? 'expanded' : ''}`}
              onClick={e => {
                e.stopPropagation();
                toggleSection(section.id);
              }}
              aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          <span className="docs__tree-title">
            {section.title}
            {section.required && <span className="docs__required">*</span>}
            {section.type && <span className="docs__type">{section.type}</span>}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="docs__tree-children">
            {section.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="section-"]');
      let currentSection = 'overview';

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          currentSection = section.id.replace('section-', '');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`docs ${className}`} role="tabpanel" id="panel-docs" aria-labelledby="tab-docs">
      <div className="docs__container">
        {/* Header */}
        <div className="docs__header">
          <h1>OpenCLI Specification Reference</h1>
          <p className="docs__subtitle">
            Complete reference documentation for OpenCLI Specification v1.0.0 - The standard for
            defining command-line interfaces.
          </p>
        </div>

        {/* Content with Navigation */}
        <div className="docs__content">
          {/* Mobile Navigation Toggle */}
          <button
            className="docs__nav-toggle"
            onClick={toggleMobileNav}
            aria-label={mobileNavVisible ? 'Hide navigation' : 'Show navigation'}
          >
            {mobileNavVisible ? '✕ Hide Spec Tree' : '📋 Show Spec Tree'}
          </button>

          {/* Main Content - Left Side */}
          <main className="docs__main">
            {/* Overview Section */}
            <section id="section-overview" className="docs__section">
              <h2>Overview</h2>
              <p className="docs__lead">
                The OpenCLI Specification defines a standard, language-agnostic interface for
                describing command-line interfaces. This specification provides a structured way to
                document CLI tools, enabling automation, validation, and code generation.
              </p>

              <div className="docs__highlight-box">
                <h4>🎯 Key Features</h4>
                <ul>
                  <li>
                    <strong>Standardized Schema</strong>: YAML/JSON format for CLI definitions
                  </li>
                  <li>
                    <strong>Rich Metadata</strong>: Comprehensive tool and command descriptions
                  </li>
                  <li>
                    <strong>Parameter Validation</strong>: Type safety and input validation
                  </li>
                  <li>
                    <strong>Response Definitions</strong>: Expected outputs and exit codes
                  </li>
                  <li>
                    <strong>Component Reuse</strong>: Shared schemas and parameter definitions
                  </li>
                  <li>
                    <strong>Multi-platform Support</strong>: Platform and architecture
                    specifications
                  </li>
                </ul>
              </div>
            </section>

            {/* OpenCLI Version Section */}
            <section id="section-opencli" className="docs__section">
              <h2>opencli Field</h2>
              <p>
                The <code>opencli</code> field specifies which version of the OpenCLI Specification
                your document uses. This MUST be included at the root level of every specification.
              </p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__required">required</span>
                </h4>
                <p>
                  The version number of the OpenCLI Specification that the document uses. Version
                  follows semantic versioning (semver) format.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Example</span>
                    <CopyButton text='opencli: "1.0.0"' />
                  </div>
                  <pre className="docs__code">opencli: "1.0.0"</pre>
                </div>

                <h5>Supported Versions</h5>
                <ul>
                  <li>
                    <code>"1.0.0"</code> - Current stable version
                  </li>
                </ul>
              </div>
            </section>

            {/* Info Object Section */}
            <section id="section-info" className="docs__section">
              <h2>info Object</h2>
              <p>
                The <code>info</code> object provides metadata about the CLI tool being specified.
                This information is used for documentation generation and tool identification.
              </p>

              <div className="docs__field-definition">
                <h4>Required Fields</h4>

                <div className="docs__property">
                  <h5>
                    <code>title</code> <span className="docs__type">string</span>{' '}
                    <span className="docs__required">required</span>
                  </h5>
                  <p>The name of the CLI tool.</p>
                </div>

                <div className="docs__property">
                  <h5>
                    <code>version</code> <span className="docs__type">string</span>{' '}
                    <span className="docs__required">required</span>
                  </h5>
                  <p>The version of the CLI tool. Should follow semantic versioning.</p>
                </div>

                <h4>Optional Fields</h4>

                <div className="docs__property">
                  <h5>
                    <code>description</code> <span className="docs__type">string</span>
                  </h5>
                  <p>A short description of the CLI tool and its purpose.</p>
                </div>

                <div className="docs__property">
                  <h5>
                    <code>contact</code> <span className="docs__type">Contact Object</span>
                  </h5>
                  <p>Contact information for the CLI tool maintainers.</p>
                </div>

                <div className="docs__property">
                  <h5>
                    <code>license</code> <span className="docs__type">License Object</span>
                  </h5>
                  <p>License information for the CLI tool.</p>
                </div>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Complete Info Object Example</span>
                    <CopyButton
                      text={`info:
  title: "Open Command-Line Interface Specification"
  description: "Standard for defining command-line interfaces"
  version: "1.0.0"
  contact:
    name: "OpenCLI Working Group"
    url: "https://github.com/openclispec/open-cli-specification"
  license:
    name: "Apache 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"`}
                    />
                  </div>
                  <pre className="docs__code">{`info:
  title: "Open Command-Line Interface Specification"
  description: "Standard for defining command-line interfaces"
  version: "1.0.0"
  contact:
    name: "OpenCLI Working Group"
    url: "https://github.com/openclispec/open-cli-specification"
  license:
    name: "Apache 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"`}</pre>
                </div>
              </div>
            </section>

            {/* Info Title Section */}
            <section id="section-info-title" className="docs__section">
              <h2>info.title</h2>
              <p>The title field specifies the human-readable name of your CLI tool.</p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__required">required</span>
                </h4>
                <p>
                  The name should be clear and descriptive. This is typically used in help text,
                  documentation, and error messages.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Examples</span>
                    <CopyButton
                      text={`# CLI tool names
title: "Open Command-Line Interface Specification"
title: "Docker CLI"
title: "Kubernetes CLI (kubectl)"
title: "AWS Command Line Interface"
title: "Weather CLI"`}
                    />
                  </div>
                  <pre className="docs__code">{`# CLI tool names
title: "Open Command-Line Interface Specification"
title: "Docker CLI"
title: "Kubernetes CLI (kubectl)" 
title: "AWS Command Line Interface"
title: "Weather CLI"`}</pre>
                </div>
              </div>
            </section>

            {/* Info Description Section */}
            <section id="section-info-description" className="docs__section">
              <h2>info.description</h2>
              <p>
                An optional but recommended field that provides a brief description of what your CLI
                tool does.
              </p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__optional">optional</span>
                </h4>
                <p>
                  This description is used in generated documentation and help text. It should
                  clearly explain the purpose and main functionality of your CLI.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Examples</span>
                    <CopyButton
                      text={`# Good descriptions
description: "Standard for defining command-line interfaces"
description: "Container management platform command-line interface"
description: "Deploy and manage containerized applications on Kubernetes"
description: "Unified tool to manage your AWS services from the command line"`}
                    />
                  </div>
                  <pre className="docs__code">{`# Good descriptions
description: "Standard for defining command-line interfaces"
description: "Container management platform command-line interface"
description: "Deploy and manage containerized applications on Kubernetes"
description: "Unified tool to manage your AWS services from the command line"`}</pre>
                </div>
              </div>
            </section>

            {/* Info Version Section */}
            <section id="section-info-version" className="docs__section">
              <h2>info.version</h2>
              <p>
                Specifies the version of your CLI tool. This is separate from the OpenCLI
                specification version and represents your tool's release version.
              </p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__required">required</span>
                </h4>
                <p>
                  The version of your CLI application. It's strongly recommended to follow semantic
                  versioning (semver) format: MAJOR.MINOR.PATCH.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Version Examples</span>
                    <CopyButton
                      text={`# Semantic versioning examples
version: "1.0.0"      # Initial stable release
version: "1.2.3"      # Minor update with patches
version: "2.0.0"      # Major version with breaking changes
version: "1.0.0-beta" # Pre-release version
version: "1.0.0-alpha.1" # Alpha release`}
                    />
                  </div>
                  <pre className="docs__code">{`# Semantic versioning examples
version: "1.0.0"      # Initial stable release
version: "1.2.3"      # Minor update with patches
version: "2.0.0"      # Major version with breaking changes
version: "1.0.0-beta" # Pre-release version
version: "1.0.0-alpha.1" # Alpha release`}</pre>
                </div>

                <h5>Version Guidelines</h5>
                <ul>
                  <li>
                    <strong>MAJOR</strong>: Increment for incompatible API changes
                  </li>
                  <li>
                    <strong>MINOR</strong>: Increment for backward-compatible new features
                  </li>
                  <li>
                    <strong>PATCH</strong>: Increment for backward-compatible bug fixes
                  </li>
                  <li>Use pre-release identifiers for development versions</li>
                  <li>Always use strings, not numbers, for versions</li>
                </ul>
              </div>
            </section>

            {/* Contact Object Section */}
            <section id="section-info-contact" className="docs__section">
              <h2>info.contact</h2>
              <p>
                The contact object provides information about the CLI tool maintainers. All fields
                are optional.
              </p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>object</code> <span className="docs__optional">optional</span>
                </h4>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Contact Object Example</span>
                    <CopyButton
                      text={`contact:
  name: "OpenCLI Working Group"
  url: "https://github.com/openclispec/open-cli-specification"
  email: "team@opencli.org"`}
                    />
                  </div>
                  <pre className="docs__code">{`contact:
  name: "OpenCLI Working Group"
  url: "https://github.com/openclispec/open-cli-specification"
  email: "team@opencli.org"`}</pre>
                </div>
              </div>
            </section>

            {/* Contact Name Section */}
            <section id="section-contact-name" className="docs__section">
              <h2>contact.name</h2>
              <p>
                The identifying name of the contact person or organization responsible for the CLI
                tool.
              </p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__optional">optional</span>
                </h4>
                <p>This could be a person's name, team name, organization name, or project name.</p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Contact Name Examples</span>
                    <CopyButton
                      text={`# Different types of contact names
name: "OpenCLI Working Group"          # Working group
name: "Docker Team"                    # Organization team
name: "John Smith"                     # Individual developer
name: "Kubernetes SIG CLI"             # Special interest group
name: "AWS CLI Team"                   # Product team`}
                    />
                  </div>
                  <pre className="docs__code">{`# Different types of contact names
name: "OpenCLI Working Group"          # Working group
name: "Docker Team"                    # Organization team
name: "John Smith"                     # Individual developer
name: "Kubernetes SIG CLI"             # Special interest group
name: "AWS CLI Team"                   # Product team`}</pre>
                </div>
              </div>
            </section>

            {/* Contact URL Section */}
            <section id="section-contact-url" className="docs__section">
              <h2>contact.url</h2>
              <p>The URL pointing to the contact information, support page, or project homepage.</p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__optional">optional</span>
                </h4>
                <p>
                  This should be a valid URL where users can find more information, get support, or
                  contact the maintainers.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Contact URL Examples</span>
                    <CopyButton
                      text={`# Different types of contact URLs
url: "https://github.com/openclispec/open-cli-specification"  # GitHub repository
url: "https://github.com/docker/cli"                         # GitHub repository
url: "https://kubernetes.io/docs/reference/kubectl/"         # Documentation site
url: "https://aws.amazon.com/cli/"                           # Product page
url: "https://support.company.com"                           # Support portal`}
                    />
                  </div>
                  <pre className="docs__code">{`# Different types of contact URLs
url: "https://github.com/openclispec/open-cli-specification"  # GitHub repository
url: "https://github.com/docker/cli"                         # GitHub repository
url: "https://kubernetes.io/docs/reference/kubectl/"         # Documentation site
url: "https://aws.amazon.com/cli/"                           # Product page
url: "https://support.company.com"                           # Support portal`}</pre>
                </div>
              </div>
            </section>

            {/* Contact Email Section */}
            <section id="section-contact-email" className="docs__section">
              <h2>contact.email</h2>
              <p>The email address for contacting the CLI tool maintainers or support team.</p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__optional">optional</span>
                </h4>
                <p>
                  This should be a valid email address where users can reach out for support, bug
                  reports, or general inquiries.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Contact Email Examples</span>
                    <CopyButton
                      text={`# Different types of contact emails
email: "support@opencli.org"          # Support email
email: "support@docker.com"           # Support email
email: "cli-team@kubernetes.io"        # Team email
email: "maintainer@project.org"        # Maintainer email
email: "hello@company.com"             # General contact`}
                    />
                  </div>
                  <pre className="docs__code">{`# Different types of contact emails
email: "support@opencli.org"          # Support email
email: "support@docker.com"           # Support email
email: "cli-team@kubernetes.io"        # Team email
email: "maintainer@project.org"        # Maintainer email
email: "hello@company.com"             # General contact`}</pre>
                </div>
              </div>
            </section>

            {/* License Object Section */}
            <section id="section-info-license" className="docs__section">
              <h2>info.license</h2>
              <p>
                The license object provides information about the license under which the CLI tool
                is distributed.
              </p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>object</code> <span className="docs__optional">optional</span>
                </h4>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>License Object Example</span>
                    <CopyButton
                      text={`license:
  name: "Apache 2.0"
  url: "https://www.apache.org/licenses/LICENSE-2.0"`}
                    />
                  </div>
                  <pre className="docs__code">{`license:
  name: "Apache 2.0"
  url: "https://www.apache.org/licenses/LICENSE-2.0"`}</pre>
                </div>
              </div>
            </section>

            {/* License Name Section */}
            <section id="section-license-name" className="docs__section">
              <h2>license.name</h2>
              <p>The name of the license used for the CLI tool.</p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__optional">optional</span>
                </h4>
                <p>
                  Use the official name of the license. For common licenses, use the SPDX license
                  identifier when possible.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Common License Names</span>
                    <CopyButton
                      text={`# Popular open source licenses
name: "Apache 2.0"
name: "MIT"
name: "GPL-3.0"
name: "BSD-3-Clause"
name: "ISC"
name: "Mozilla Public License 2.0"

# Proprietary licenses
name: "Proprietary"
name: "Commercial License"`}
                    />
                  </div>
                  <pre className="docs__code">{`# Popular open source licenses
name: "Apache 2.0"
name: "MIT"
name: "GPL-3.0"
name: "BSD-3-Clause"
name: "ISC"
name: "Mozilla Public License 2.0"

# Proprietary licenses
name: "Proprietary"
name: "Commercial License"`}</pre>
                </div>
              </div>
            </section>

            {/* License URL Section */}
            <section id="section-license-url" className="docs__section">
              <h2>license.url</h2>
              <p>A URL pointing to the full text of the license.</p>

              <div className="docs__field-definition">
                <h4>
                  Type: <code>string</code> <span className="docs__optional">optional</span>
                </h4>
                <p>
                  This should link to the complete license text, either on the official license
                  website or in your project repository.
                </p>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>License URL Examples</span>
                    <CopyButton
                      text={`# Official license URLs
url: "https://www.apache.org/licenses/LICENSE-2.0"
url: "https://opensource.org/licenses/MIT"
url: "https://www.gnu.org/licenses/gpl-3.0.html"

# Project-specific license URLs
url: "https://github.com/owner/repo/blob/main/LICENSE"
url: "https://example.com/project/license.txt"`}
                    />
                  </div>
                  <pre className="docs__code">{`# Official license URLs
url: "https://www.apache.org/licenses/LICENSE-2.0"
url: "https://opensource.org/licenses/MIT"
url: "https://www.gnu.org/licenses/gpl-3.0.html"

# Project-specific license URLs
url: "https://github.com/owner/repo/blob/main/LICENSE"
url: "https://example.com/project/license.txt"`}</pre>
                </div>
              </div>
            </section>

            {/* Commands Section */}
            <section id="section-commands" className="docs__section">
              <h2>commands Object</h2>
              <p>
                The commands object defines all available commands and subcommands for your CLI
                tool. Each command is defined as a key-value pair where the key is the command path.
              </p>

              <div className="docs__field-definition">
                <h4>Command Path Format</h4>
                <p>Commands are defined using path-like syntax:</p>
                <ul>
                  <li>
                    <code>mycli</code> - Root command
                  </li>
                  <li>
                    <code>/subcommand</code> - Direct subcommand
                  </li>
                  <li>
                    <code>/group/action</code> - Nested subcommand
                  </li>
                </ul>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Command Structure Example</span>
                    <CopyButton
                      text={`commands:
  # Root command
  ocs:
    summary: "Open CLI Spec tool"
    description: "Main entry point for the Open CLI Specification tool"
    
  # Direct subcommands  
  /validate:
    summary: "Validate CLI specification"
    description: "Validate a CLI specification file against the OpenCLI standard"
    parameters:
      - name: file
        in: argument
        position: 1
        required: true
        description: "Path to the CLI specification file"
        schema:
          type: string
          format: path
    
  /generate:
    summary: "Generate CLI code"
    description: "Generate CLI implementation code from specification"
    parameters:
      - name: spec
        in: argument
        position: 1
        required: true
        schema:
          type: string
          format: path
      - name: language
        alias: ["l"]
        required: true
        description: "Target programming language"
        schema:
          type: string
          enum: ["go", "python", "javascript", "typescript", "rust"]`}
                    />
                  </div>
                  <pre className="docs__code">{`commands:
  # Root command
  ocs:
    summary: "Open CLI Spec tool"
    description: "Main entry point for the Open CLI Specification tool"
    
  # Direct subcommands  
  /validate:
    summary: "Validate CLI specification"
    description: "Validate a CLI specification file against the OpenCLI standard"
    parameters:
      - name: file
        in: argument
        position: 1
        required: true
        description: "Path to the CLI specification file"
        schema:
          type: string
          format: path
    
  /generate:
    summary: "Generate CLI code"
    description: "Generate CLI implementation code from specification"
    parameters:
      - name: spec
        in: argument
        position: 1
        required: true
        schema:
          type: string
          format: path
      - name: language
        alias: ["l"]
        required: true
        description: "Target programming language"
        schema:
          type: string
          enum: ["go", "python", "javascript", "typescript", "rust"]`}</pre>
                </div>
              </div>
            </section>

            {/* Command Properties Sections */}
            <section id="section-command-summary" className="docs__section">
              <h2>commands.{`command`}.summary</h2>
              <p>
                A brief, one-line summary of what the command does. This should be concise and
                descriptive, often used in help text and command listings.
              </p>

              <div className="docs__code-example">
                <div className="docs__code-header">
                  <span>Example</span>
                  <button
                    className="docs__copy-btn"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `commands:\n  /deploy:\n    summary: "Deploy application to production"`
                      )
                    }
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
                <pre className="docs__code">{`commands:
  /deploy:
    summary: "Deploy application to production"`}</pre>
              </div>
            </section>

            <section id="section-command-description" className="docs__section">
              <h2>commands.{`command`}.description</h2>
              <p>
                A detailed description of what the command does, including any important behavior,
                side effects, or usage notes. This can be multi-line and support formatting.
              </p>

              <div className="docs__code-example">
                <div className="docs__code-header">
                  <span>Example</span>
                  <button
                    className="docs__copy-btn"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `commands:\n  /deploy:\n    description: |\n      Deploys the current application to the specified environment.\n      This command will build the application, run tests, and deploy\n      to the target infrastructure.`
                      )
                    }
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
                <pre className="docs__code">{`commands:
  /deploy:
    description: |
      Deploys the current application to the specified environment.
      This command will build the application, run tests, and deploy
      to the target infrastructure.`}</pre>
              </div>
            </section>

            <section id="section-command-operationId" className="docs__section">
              <h2>commands.{`command`}.operationId</h2>
              <p>
                A unique identifier for the command operation. Used for code generation and internal
                references. Should be a valid identifier name.
              </p>

              <div className="docs__code-example">
                <div className="docs__code-header">
                  <span>Example</span>
                  <button
                    className="docs__copy-btn"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `commands:\n  /deploy:\n    operationId: "deployApplication"`
                      )
                    }
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
                <pre className="docs__code">{`commands:
  /deploy:
    operationId: "deployApplication"`}</pre>
              </div>
            </section>

            <section id="section-command-aliases" className="docs__section">
              <h2>commands.{`command`}.aliases</h2>
              <p>
                Alternative names for the command. Users can invoke the command using any of these
                aliases instead of the full command path.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`commands:
  /deploy:
    aliases: ["d", "ship", "release"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `commands:\n  /deploy:\n    aliases: ["d", "ship", "release"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-command-tags" className="docs__section">
              <h2>commands.{`command`}.tags</h2>
              <p>
                Tags that categorize this command. References tag names defined in the top-level
                tags array. Used for grouping and organization.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`commands:
  /deploy:
    tags: ["deployment", "production"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `commands:\n  /deploy:\n    tags: ["deployment", "production"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-command-parameters" className="docs__section">
              <h2>commands.{`command`}.parameters</h2>
              <p>
                An array of parameters that the command accepts. Parameters can be arguments, flags,
                or options that modify the command's behavior.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`commands:
  /deploy:
    parameters:
      - name: "environment"
        in: "argument"
        required: true
        description: "Target deployment environment"
        schema:
          type: "string"
          enum: ["staging", "production"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `commands:\n  /deploy:\n    parameters:\n      - name: "environment"\n        in: "argument"\n        required: true\n        description: "Target deployment environment"\n        schema:\n          type: "string"\n          enum: ["staging", "production"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Parameter Properties</h3>
              <ul>
                <li>
                  <strong>name</strong> (string, required): Parameter name
                </li>
                <li>
                  <strong>in</strong> (string): Where the parameter appears ("argument", "flag",
                  "option")
                </li>
                <li>
                  <strong>required</strong> (boolean): Whether the parameter is required
                </li>
                <li>
                  <strong>description</strong> (string): Parameter description
                </li>
                <li>
                  <strong>alias</strong> (array): Alternative names for the parameter
                </li>
                <li>
                  <strong>schema</strong> (object): Parameter value schema
                </li>
              </ul>
            </section>

            <section id="section-param-name" className="docs__section">
              <h2>parameters[].name</h2>
              <p>
                <strong>Required.</strong> The name of the parameter. This is how users will
                reference the parameter when using the command.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`parameters:
  - name: "output"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() => navigator.clipboard.writeText(`parameters:\n  - name: "output"`)}
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-param-in" className="docs__section">
              <h2>parameters[].in</h2>
              <p>
                Specifies where the parameter appears in the command line. Valid values are:
                "argument" (positional), "flag" (boolean), or "option" (key-value).
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`parameters:
  - name: "verbose"
    in: "flag"
  - name: "output"
    in: "option"
  - name: "filename"
    in: "argument"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `parameters:\n  - name: "verbose"\n    in: "flag"\n  - name: "output"\n    in: "option"\n  - name: "filename"\n    in: "argument"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-param-required" className="docs__section">
              <h2>parameters[].required</h2>
              <p>
                Boolean indicating whether the parameter is required. When true, the command will
                fail if this parameter is not provided.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`parameters:
  - name: "input"
    required: true`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `parameters:\n  - name: "input"\n    required: true`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-param-description" className="docs__section">
              <h2>parameters[].description</h2>
              <p>
                A description of what the parameter does and how it affects the command's behavior.
                Used in help text and documentation.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`parameters:
  - name: "timeout"
    description: "Maximum time to wait for operation completion (in seconds)"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `parameters:\n  - name: "timeout"\n    description: "Maximum time to wait for operation completion (in seconds)"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-param-alias" className="docs__section">
              <h2>parameters[].alias</h2>
              <p>
                Alternative names for the parameter. Users can use any of these aliases instead of
                the full parameter name.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`parameters:
  - name: "verbose"
    alias: ["v"]
  - name: "output"
    alias: ["o", "out"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `parameters:\n  - name: "verbose"\n    alias: ["v"]\n  - name: "output"\n    alias: ["o", "out"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-param-schema" className="docs__section">
              <h2>parameters[].schema</h2>
              <p>
                Defines the data type and validation rules for the parameter value. Follows JSON
                Schema specification for type definitions.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`parameters:
  - name: "count"
    schema:
      type: "integer"
      minimum: 1
      maximum: 100
  - name: "format"
    schema:
      type: "string"
      enum: ["json", "yaml", "xml"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `parameters:\n  - name: "count"\n    schema:\n      type: "integer"\n      minimum: 1\n      maximum: 100\n  - name: "format"\n    schema:\n      type: "string"\n      enum: ["json", "yaml", "xml"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-command-responses" className="docs__section">
              <h2>commands.{`command`}.responses</h2>
              <p>
                Defines the possible responses from the command, including success and error
                scenarios. Each response includes a description and optional content schema.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`commands:
  /deploy:
    responses:
      '200':
        description: "Deployment completed successfully"
        content:
          application/json:
            schema:
              type: "object"
              properties:
                status:
                  type: "string"
                deploymentId:
                  type: "string"
      '400':
        description: "Invalid deployment configuration"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `commands:\n  /deploy:\n    responses:\n      '200':\n        description: "Deployment completed successfully"\n        content:\n          application/json:\n            schema:\n              type: "object"\n              properties:\n                status:\n                  type: "string"\n                deploymentId:\n                  type: "string"\n      '400':\n        description: "Invalid deployment configuration"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-response-description" className="docs__section">
              <h2>responses.{`code`}.description</h2>
              <p>
                <strong>Required.</strong> A description of the response. Explains what this
                response means and when it occurs.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`responses:
  '200':
    description: "Command executed successfully"
  '404':
    description: "Requested resource not found"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `responses:\n  '200':\n    description: "Command executed successfully"\n  '404':\n    description: "Requested resource not found"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-response-content" className="docs__section">
              <h2>responses.{`code`}.content</h2>
              <p>
                Defines the structure and format of the response data. Organized by content type
                (e.g., "application/json", "text/plain") with JSON Schema definitions.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`responses:
  '200':
    content:
      application/json:
        schema:
          type: "object"
          properties:
            message:
              type: "string"
            data:
              type: "array"
      text/plain:
        schema:
          type: "string"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `responses:\n  '200':\n    content:\n      application/json:\n        schema:\n          type: "object"\n          properties:\n            message:\n              type: "string"\n            data:\n              type: "array"\n      text/plain:\n        schema:\n          type: "string"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            {/* External Documentation Section */}
            <section id="section-externalDocs" className="docs__section">
              <h2>externalDocs Object</h2>
              <p>
                The <code>externalDocs</code> field allows you to reference external documentation
                for your CLI tool. This can be particularly useful for linking to comprehensive
                guides, API documentation, or other resources that complement your CLI
                specification.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`externalDocs:
  description: "Complete CLI Guide"
  url: "https://example.com/cli-guide"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `externalDocs:\n  description: "Complete CLI Guide"\n  url: "https://example.com/cli-guide"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Properties</h3>
              <ul>
                <li>
                  <strong>description</strong> (string): A short description of the external
                  documentation
                </li>
                <li>
                  <strong>url</strong> (string, required): The URL for the external documentation
                </li>
              </ul>
            </section>

            <section id="section-externaldocs-description" className="docs__section">
              <h2>externalDocs.description</h2>
              <p>
                A short description of the external documentation. This should briefly explain what
                users can expect to find in the external resource.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`externalDocs:
  description: "Comprehensive user guide with tutorials"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `externalDocs:\n  description: "Comprehensive user guide with tutorials"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-externaldocs-url" className="docs__section">
              <h2>externalDocs.url</h2>
              <p>
                <strong>Required.</strong> The URL pointing to the external documentation. Must be a
                valid URL that users can access to get additional information about your CLI tool.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`externalDocs:
  url: "https://docs.example.com/cli"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `externalDocs:\n  url: "https://docs.example.com/cli"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            {/* Environment Section */}
            <section id="section-environment" className="docs__section">
              <h2>environment Array</h2>
              <p>
                The <code>environment</code> field defines environment variables that your CLI tool
                uses or requires. This helps users understand what configuration is needed.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`environment:
  - name: "API_KEY"
    description: "Required API key for authentication"
  - name: "DEBUG"
    description: "Enable debug output when set"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `environment:\n  - name: "API_KEY"\n    description: "Required API key for authentication"\n  - name: "DEBUG"\n    description: "Enable debug output when set"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Properties</h3>
              <ul>
                <li>
                  <strong>name</strong> (string, required): The environment variable name
                </li>
                <li>
                  <strong>description</strong> (string): Description of what the variable does
                </li>
              </ul>
            </section>

            <section id="section-env-name" className="docs__section">
              <h2>environment[].name</h2>
              <p>
                <strong>Required.</strong> The name of the environment variable. Should follow
                standard environment variable naming conventions (uppercase, underscores).
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`environment:
  - name: "API_TOKEN"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(`environment:\n  - name: "API_TOKEN"`)
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-env-description" className="docs__section">
              <h2>environment[].description</h2>
              <p>
                A description of what the environment variable is used for and how it affects the
                CLI tool's behavior.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`environment:
  - name: "DEBUG"
    description: "Set to any value to enable verbose debugging output"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `environment:\n  - name: "DEBUG"\n    description: "Set to any value to enable verbose debugging output"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            {/* Tags Section */}
            <section id="section-tags" className="docs__section">
              <h2>tags Array</h2>
              <p>
                Tags provide a way to group commands by functionality or purpose. They can be
                referenced in command definitions to organize your CLI's functionality.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`tags:
  - name: "core"
    description: "Core functionality commands"
  - name: "database"
    description: "Database management commands"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `tags:\n  - name: "core"\n    description: "Core functionality commands"\n  - name: "database"\n    description: "Database management commands"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Properties</h3>
              <ul>
                <li>
                  <strong>name</strong> (string, required): The tag identifier
                </li>
                <li>
                  <strong>description</strong> (string): Description of what commands with this tag
                  do
                </li>
              </ul>
            </section>

            <section id="section-tag-name" className="docs__section">
              <h2>tags[].name</h2>
              <p>
                <strong>Required.</strong> The tag identifier. Used to reference this tag in command
                definitions.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`tags:
  - name: "admin"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() => navigator.clipboard.writeText(`tags:\n  - name: "admin"`)}
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-tag-description" className="docs__section">
              <h2>tags[].description</h2>
              <p>
                A description of what commands with this tag are responsible for. This helps users
                understand the grouping and purpose.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`tags:
  - name: "admin"
    description: "Administrative and configuration commands"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `tags:\n  - name: "admin"\n    description: "Administrative and configuration commands"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            {/* Platforms Section */}
            <section id="section-platforms" className="docs__section">
              <h2>platforms Array</h2>
              <p>
                The <code>platforms</code> field specifies which operating systems and architectures
                your CLI tool supports. This information helps users understand compatibility.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`platforms:
  - name: "linux"
    architectures: ["amd64", "arm64"]
  - name: "darwin"
    architectures: ["amd64", "arm64"]
  - name: "windows"
    architectures: ["amd64"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `platforms:\n  - name: "linux"\n    architectures: ["amd64", "arm64"]\n  - name: "darwin"\n    architectures: ["amd64", "arm64"]\n  - name: "windows"\n    architectures: ["amd64"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Properties</h3>
              <ul>
                <li>
                  <strong>name</strong> (string, required): The platform/OS name (e.g., "linux",
                  "darwin", "windows")
                </li>
                <li>
                  <strong>architectures</strong> (array): Supported CPU architectures for this
                  platform
                </li>
              </ul>
            </section>

            <section id="section-platform-name" className="docs__section">
              <h2>platforms[].name</h2>
              <p>
                <strong>Required.</strong> The operating system name. Common values include "linux",
                "darwin" (macOS), "windows", "freebsd", etc.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`platforms:
  - name: "linux"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() => navigator.clipboard.writeText(`platforms:\n  - name: "linux"`)}
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            <section id="section-platform-architectures" className="docs__section">
              <h2>platforms[].architectures</h2>
              <p>
                An array of CPU architectures supported on this platform. Common values include
                "amd64", "arm64", "386", "arm", etc.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`platforms:
  - name: "linux"
    architectures: ["amd64", "arm64", "386"]`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `platforms:\n  - name: "linux"\n    architectures: ["amd64", "arm64", "386"]`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </section>

            {/* Components Section */}
            <section id="section-components" className="docs__section">
              <h2>components Object</h2>
              <p>
                The components object allows you to define reusable schemas, parameters, and
                responses that can be referenced throughout your specification using{' '}
                <code>$ref</code>.
              </p>

              <div className="docs__field-definition">
                <h4>Component Types</h4>

                <div className="docs__property">
                  <h5>
                    <code>schemas</code>
                  </h5>
                  <p>Reusable data schemas for parameters and responses</p>
                </div>

                <div className="docs__property">
                  <h5>
                    <code>parameters</code>
                  </h5>
                  <p>Common parameter definitions that can be reused across commands</p>
                </div>

                <div className="docs__property">
                  <h5>
                    <code>responses</code>
                  </h5>
                  <p>Standard response definitions for common scenarios</p>
                </div>

                <div className="docs__code-example">
                  <div className="docs__code-header">
                    <span>Components Example</span>
                    <CopyButton
                      text={`components:
  schemas:
    Error:
      type: object
      required: ["code", "message"]
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
        details:
          type: string
          
  parameters:
    OutputFormat:
      name: output
      alias: ["o"]
      description: "Output format for results"
      schema:
        type: string
        enum: ["json", "yaml", "text"]
        default: "text"
        
    ConfigFile:
      name: config
      alias: ["c"]
      description: "Path to configuration file"
      scope: inherited
      schema:
        type: string
        format: path
        
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
            $ref: "#/components/schemas/Error"`}
                    />
                  </div>
                  <pre className="docs__code">{`components:
  schemas:
    Error:
      type: object
      required: ["code", "message"]
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
        details:
          type: string
          
  parameters:
    OutputFormat:
      name: output
      alias: ["o"]
      description: "Output format for results"
      schema:
        type: string
        enum: ["json", "yaml", "text"]
        default: "text"
        
    ConfigFile:
      name: config
      alias: ["c"]
      description: "Path to configuration file"
      scope: inherited
      schema:
        type: string
        format: path
        
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
            $ref: "#/components/schemas/Error"`}</pre>
                </div>
              </div>
            </section>

            {/* Component Property Sections */}
            <section id="section-components-schemas" className="docs__section">
              <h2>components.schemas</h2>
              <p>
                Reusable data schema definitions that can be referenced throughout your
                specification. These schemas define the structure and validation rules for data
                types used in parameters, responses, and other parts of your CLI specification.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`components:
  schemas:
    Error:
      type: "object"
      required: ["code", "message"]
      properties:
        code:
          type: "integer"
        message:
          type: "string"
    User:
      type: "object"
      properties:
        id:
          type: "string"
        name:
          type: "string"
        email:
          type: "string"
          format: "email"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `components:\n  schemas:\n    Error:\n      type: "object"\n      required: ["code", "message"]\n      properties:\n        code:\n          type: "integer"\n        message:\n          type: "string"\n    User:\n      type: "object"\n      properties:\n        id:\n          type: "string"\n        name:\n          type: "string"\n        email:\n          type: "string"\n          format: "email"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Usage</h3>
              <p>
                Reference schemas using <code>$ref: "#/components/schemas/SchemaName"</code>
              </p>
            </section>

            <section id="section-components-parameters" className="docs__section">
              <h2>components.parameters</h2>
              <p>
                Reusable parameter definitions that can be shared across multiple commands. This
                helps maintain consistency and reduces duplication in your specification.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`components:
  parameters:
    OutputFormat:
      name: "output"
      alias: ["o"]
      description: "Output format for results"
      schema:
        type: "string"
        enum: ["json", "yaml", "text"]
        default: "text"
    Verbose:
      name: "verbose"
      alias: ["v"]
      description: "Enable verbose output"
      schema:
        type: "boolean"
        default: false`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `components:\n  parameters:\n    OutputFormat:\n      name: "output"\n      alias: ["o"]\n      description: "Output format for results"\n      schema:\n        type: "string"\n        enum: ["json", "yaml", "text"]\n        default: "text"\n    Verbose:\n      name: "verbose"\n      alias: ["v"]\n      description: "Enable verbose output"\n      schema:\n        type: "boolean"\n        default: false`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Usage</h3>
              <p>
                Reference parameters using{' '}
                <code>$ref: "#/components/parameters/ParameterName"</code>
              </p>
            </section>

            <section id="section-components-responses" className="docs__section">
              <h2>components.responses</h2>
              <p>
                Reusable response definitions for common scenarios like errors, success messages,
                and standard output formats. Helps maintain consistency across commands.
              </p>

              <div className="docs__example">
                <h3>Example</h3>
                <pre>
                  <code>{`components:
  responses:
    Success:
      description: "Operation completed successfully"
      content:
        application/json:
          schema:
            type: "object"
            properties:
              message:
                type: "string"
              status:
                type: "string"
                enum: ["success"]
    NotFound:
      description: "Resource not found"
      content:
        text/plain:
          example: "Resource not found"
        application/json:
          schema:
            $ref: "#/components/schemas/Error"`}</code>
                </pre>
                <button
                  className="docs__copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `components:\n  responses:\n    Success:\n      description: "Operation completed successfully"\n      content:\n        application/json:\n          schema:\n            type: "object"\n            properties:\n              message:\n                type: "string"\n              status:\n                type: "string"\n                enum: ["success"]\n    NotFound:\n      description: "Resource not found"\n      content:\n        text/plain:\n          example: "Resource not found"\n        application/json:\n          schema:\n            $ref: "#/components/schemas/Error"`
                    )
                  }
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>

              <h3>Usage</h3>
              <p>
                Reference responses using <code>$ref: "#/components/responses/ResponseName"</code>
              </p>
            </section>
          </main>

          {/* Specification Tree Navigation - Right Side */}
          <nav
            className={`docs__spec-tree ${mobileNavVisible ? 'mobile-visible' : ''}`}
            role="navigation"
            aria-label="OpenCLI specification structure"
          >
            <div className="docs__spec-tree-header">
              <h3>Specification Structure</h3>
              <p>Navigate the OpenCLI schema</p>
            </div>
            <div className="docs__tree-container">
              {specStructure.map(section => renderTreeNode(section))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
