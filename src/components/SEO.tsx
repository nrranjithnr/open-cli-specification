import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TabType } from '../types';

interface SEOProps {
  activeTab: TabType;
}

const tabMetadata = {
  home: {
    title: 'OpenCLI Specification - Modern CLI Documentation Standard',
    description:
      'OpenCLI is a YAML-based specification for documenting command-line interfaces. Enable AI automation, standardize CLI documentation, and improve developer experience.',
    keywords:
      'opencli, cli, specification, yaml, command line, automation, ai, documentation, standard, developer tools',
  },
  spec: {
    title: 'OpenCLI Specification - YAML Structure Documentation',
    description:
      'Explore the complete OpenCLI YAML specification structure with interactive tree view. Learn about commands, options, metadata, and validation rules.',
    keywords:
      'opencli, yaml, specification, cli, command line, api, documentation, structure, commands, options',
  },
};

const baseMetadata = {
  siteName: 'OpenCLI Specification',
  siteUrl: 'https://openclispec.dev',
  author: 'OpenCLI Team',
  twitterHandle: '@opencli',
  image: '/og-image.png',
  locale: 'en_US',
};

export const SEO: React.FC<SEOProps> = ({ activeTab }) => {
  const metadata = tabMetadata[activeTab] || tabMetadata.home; // Fallback to home if tab not found
  const canonicalUrl = `${baseMetadata.siteUrl}/${
    activeTab === 'home' || activeTab === 'spec' ? '' : activeTab
  }`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="title" content={metadata.title} />
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content={baseMetadata.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={`${baseMetadata.siteUrl}${baseMetadata.image}`} />
      <meta property="og:site_name" content={baseMetadata.siteName} />
      <meta property="og:locale" content={baseMetadata.locale} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={metadata.title} />
      <meta property="twitter:description" content={metadata.description} />
      <meta property="twitter:image" content={`${baseMetadata.siteUrl}${baseMetadata.image}`} />
      <meta property="twitter:creator" content={baseMetadata.twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#00ff88" />
      <meta name="msapplication-TileColor" content="#00ff88" />
      <meta name="application-name" content={baseMetadata.siteName} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: baseMetadata.siteName,
          url: baseMetadata.siteUrl,
          description: 'A modern YAML-based specification for defining command-line interfaces',
          author: {
            '@type': 'Organization',
            name: baseMetadata.author,
          },
          mainEntity: {
            '@type': 'SoftwareApplication',
            name: 'OpenCLI',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Cross-platform',
            description: metadata.description,
            url: canonicalUrl,
          },
        })}
      </script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;
