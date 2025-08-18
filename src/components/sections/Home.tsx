import React from 'react';
import { Button } from '../ui/Button';
import './Home.css';

interface HomeProps {
  className?: string;
  onTabChange?: (tab: import('../../types').TabType) => void;
}

export const Home: React.FC<HomeProps> = ({ className = '', onTabChange }) => {
  const handleViewSpec = () => {
    if (onTabChange) {
      onTabChange('spec');
    }
  };

  return (
    <div className={`home ${className}`} role="tabpanel" id="panel-home" aria-labelledby="tab-home">
      <div className="home__content">
        {/* Hero Section - Premium Design */}
        <section className="home__hero">
          <div className="home__hero-bg">
            <div className="home__hero-grid"></div>
            <div className="home__hero-glow"></div>
          </div>
          <div className="home__hero-content">
            <div className="home__brand">
              <div className="home__logo">
                <span className="home__logo-bracket">[</span>
                <span className="home__logo-text">OpenCLI</span>
                <span className="home__logo-bracket">]</span>
              </div>
              <div className="home__version">
                <span className="home__version-badge">v1.0.0</span>
                <span className="home__version-status">Initial Release</span>
              </div>
            </div>

            <h1 className="home__headline">
              The <span className="home__highlight">Future</span> of CLI Development
            </h1>

            <p className="home__tagline">
              An open-source YAML specification for building standardized, self-documenting
              command-line interfaces that are ready for the AI era. Just as OpenAPI revolutionized
              REST APIs, OpenCLI brings consistency and automation to CLI development.
            </p>

            <div className="home__hero-stats">
              <div className="home__stat-item">
                <span className="home__stat-number">v1.0</span>
                <span className="home__stat-label">Stable Release</span>
              </div>
              <div className="home__stat-item">
                <span className="home__stat-number">Open</span>
                <span className="home__stat-label">Source & Free</span>
              </div>
              <div className="home__stat-item">
                <span className="home__stat-number">AI</span>
                <span className="home__stat-label">Ready Standard</span>
              </div>
            </div>

            <div className="home__hero-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleViewSpec}
                className="home__cta-primary"
              >
                <span className="home__cta-icon">🚀</span>
                Explore Specification
              </Button>
              <a
                href="https://github.com/openclispec/open-cli-specification"
                className="home__cta-secondary btn btn--outline btn--lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="home__cta-icon">⭐</span>
                Star on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Problem/Solution Story */}
        <section className="home__story">
          <div className="home__story-content">
            <div className="home__story-problem">
              <div className="home__story-icon">⚠️</div>
              <h2>The CLI Documentation Crisis</h2>
              <p>
                Command-line tools are everywhere, but their documentation is fragmented,
                inconsistent, and impossible for AI systems to understand. Developers waste
                countless hours writing manual documentation that becomes outdated the moment it's
                published, while users struggle with inconsistent help formats.
              </p>
              <div className="home__pain-points">
                <div className="home__pain-point">
                  <span className="home__pain-icon">💔</span>
                  <span>Inconsistent help formats</span>
                </div>
                <div className="home__pain-point">
                  <span className="home__pain-icon">⏰</span>
                  <span>Manual documentation overhead</span>
                </div>
                <div className="home__pain-point">
                  <span className="home__pain-icon">🤖</span>
                  <span>No AI-readable definitions</span>
                </div>
              </div>
            </div>

            <div className="home__story-arrow">
              <div className="home__arrow-line"></div>
              <div className="home__arrow-head">→</div>
            </div>

            <div className="home__story-solution">
              <div className="home__story-icon">✨</div>
              <h2>Enter OpenCLI Specification</h2>
              <p>
                Just as OpenAPI revolutionized REST APIs, OpenCLI brings standardization to
                command-line interfaces. Define your CLI once in YAML, then generate help text,
                completions, validation, documentation, and AI integrations automatically. Your
                specification becomes the single source of truth.
              </p>
              <div className="home__benefits">
                <div className="home__benefit">
                  <span className="home__benefit-icon">📖</span>
                  <span>Self-documenting interfaces</span>
                </div>
                <div className="home__benefit">
                  <span className="home__benefit-icon">⚡</span>
                  <span>Auto-generated completions</span>
                </div>
                <div className="home__benefit">
                  <span className="home__benefit-icon">🎯</span>
                  <span>AI-native specifications</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="home__demo">
          <div className="home__demo-header">
            <h2>See OpenCLI in Action</h2>
            <p>Watch how a simple YAML specification transforms into powerful tooling</p>
          </div>

          <div className="home__demo-container">
            <div className="home__demo-before">
              <h3>❌ Before: Fragmented Documentation</h3>
              <div className="home__code-block">
                <div className="home__code-header">Traditional CLI Help</div>
                <pre className="home__code-content">{`$ mycli --help
Usage: mycli [OPTIONS] COMMAND [ARGS]...

Commands:
  deploy    Deploy something
  config    Configure something
  
Options:
  --env TEXT    Environment name
  --help        Show this message`}</pre>
              </div>
            </div>

            <div className="home__demo-after">
              <h3>✅ After: OpenCLI Specification</h3>
              <div className="home__code-block">
                <div className="home__code-header">opencli.yaml</div>
                <pre className="home__code-content">{`info:
  title: "Advanced Deployment CLI"
  version: "2.1.0"
  description: "Enterprise-grade deployment automation"

commands:
  /deploy:
    description: "Deploy applications with validation"
    parameters:
      - name: environment
        type: string
        required: true
        description: "Target deployment environment"
        enum: ["dev", "staging", "prod"]
    responses:
      0: "✅ Deployment successful"
      1: "❌ Validation failed"
      2: "⚠️ Partial deployment"`}</pre>
              </div>
            </div>
          </div>

          <div className="home__demo-results">
            <div className="home__result-item">
              <div className="home__result-icon">🤖</div>
              <h4>AI Integration</h4>
              <p>Perfect for MCP servers and AI assistants</p>
            </div>
            <div className="home__result-item">
              <div className="home__result-icon">📚</div>
              <h4>Auto Documentation</h4>
              <p>Generate help, man pages, and guides</p>
            </div>
            <div className="home__result-item">
              <div className="home__result-icon">⚙️</div>
              <h4>Code Generation</h4>
              <p>Create CLIs, completions, and tests</p>
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="home__enterprise">
          <div className="home__enterprise-header">
            <h2>Built for the Future</h2>
            <p>
              Production-ready features designed to scale from individual projects to large
              organizations
            </p>
          </div>

          <div className="home__feature-grid">
            <div className="home__feature-card">
              <div className="home__feature-visual">
                <div className="home__feature-icon">⟨/⟩</div>
                <div className="home__feature-glow"></div>
              </div>
              <h3>Enterprise Scale</h3>
              <p>
                Standardize CLI interfaces across your entire organization with reusable components
                and governance policies.
              </p>
            </div>

            <div className="home__feature-card">
              <div className="home__feature-visual">
                <div className="home__feature-icon">◉</div>
                <div className="home__feature-glow"></div>
              </div>
              <h3>Security First</h3>
              <p>
                Built-in parameter validation, type safety, and audit trails for compliance-ready
                CLI applications.
              </p>
            </div>

            <div className="home__feature-card">
              <div className="home__feature-visual">
                <div className="home__feature-icon">▦</div>
                <div className="home__feature-glow"></div>
              </div>
              <h3>Platform Agnostic</h3>
              <p>
                Cross-platform specifications with environment-aware configurations for Windows,
                macOS, and Linux.
              </p>
            </div>

            <div className="home__feature-card">
              <div className="home__feature-visual">
                <div className="home__feature-icon">⚡</div>
                <div className="home__feature-glow"></div>
              </div>
              <h3>Developer Velocity</h3>
              <p>
                Accelerate development with auto-generated boilerplate, instant documentation, and
                intelligent tooling.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="home__cta">
          <div className="home__cta-content">
            <h2>Ready to Transform Your CLI?</h2>
            <p>Join the community building the next generation of command-line tools</p>

            <div className="home__cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleViewSpec}
                className="home__cta-primary--large"
              >
                <span className="home__cta-icon">📖</span>
                View Full Specification
              </Button>

              <div className="home__cta-links">
                <a
                  href="https://github.com/openclispec/open-cli-specification"
                  className="home__cta-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="home__cta-icon">⭐</span>
                  GitHub Repository
                </a>
                <a
                  href="#"
                  className="home__cta-link"
                  onClick={e => {
                    e.preventDefault();
                    handleViewSpec();
                  }}
                >
                  <span className="home__cta-icon">🚀</span>
                  Quick Start Guide
                </a>
              </div>
            </div>
          </div>

          <div className="home__cta-bg">
            <div className="home__cta-particles"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
