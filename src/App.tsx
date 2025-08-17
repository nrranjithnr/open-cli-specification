import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { SEO } from './components/SEO';
import { Home } from './components/sections/Home';
import { Spec } from './components/sections/Spec';
import { Docs } from './components/sections/Docs';
import { useResponsive } from './hooks/useResponsive';
import { TabType } from './types';
import './styles/globals.css';
import './App.css';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2>Something went wrong</h2>
            <p>We encountered an unexpected error. Please refresh the page to try again.</p>
            <button className="error-boundary__button" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="error-boundary__details">
                <summary>Error Details (Development)</summary>
                <pre>{this.state.error?.stack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="loading-spinner__animation" />
    <p>Loading OpenCLI Specification...</p>
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onTabChange={handleTabChange} />;
      case 'spec':
        return <Spec />;
      case 'docs':
        return <Docs />;
      default:
        return <Home onTabChange={handleTabChange} />;
    }
  };

  if (isLoading) {
    return (
      <HelmetProvider>
        <div className="app app--loading">
          <SEO activeTab={activeTab} />
          <LoadingSpinner />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className={`app ${isMobile ? 'app--mobile' : ''} ${isTablet ? 'app--tablet' : ''}`}>
          <SEO activeTab={activeTab} />
          <div className="terminal-app">
            <div className="terminal-app__header">
              <div className="terminal-app__controls">
                <div className="terminal-controls">
                  <div className="terminal-button terminal-button--close" aria-label="Close" />
                  <div
                    className="terminal-button terminal-button--minimize"
                    aria-label="Minimize"
                  />
                  <div
                    className="terminal-button terminal-button--maximize"
                    aria-label="Maximize"
                  />
                </div>
                <div className="terminal-title">
                  <span className="terminal-title__text">OpenCLI Specification</span>
                  <span className="terminal-title__path">OCLIS</span>
                </div>
                <div className="terminal-status">
                  <span className="terminal-status__connection">●</span>
                  <span className="terminal-status__text">connected</span>
                </div>
              </div>

              <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            <main className="terminal-app__main">
              <div className="terminal-app__content">{renderTabContent()}</div>
            </main>

            <footer className="terminal-app__footer">
              <div className="terminal-app__status-bar">
                <div className="terminal-status-left">
                  <span className="terminal-status__item">OpenCLI v1.0.0</span>
                  <span className="terminal-status__separator">|</span>
                  <span className="terminal-status__item">Apache 2.0 License</span>
                </div>
                <div className="terminal-status-right">
                  <a
                    href="https://github.com/openclispec/open-cli-specification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-status__link"
                  >
                    GitHub
                  </a>
                  <span className="terminal-status__separator">|</span>
                  <span className="terminal-status__item">Line 1, Col 1</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
