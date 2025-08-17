// Global type definitions for the OpenCLI Specification app

declare global {
  const __APP_VERSION__: string;
  const __BUILD_DATE__: string;
}

export interface OpenCLISpec {
  opencli: string;
  info: Info;
  externalDocs?: ExternalDocs;
  platforms?: Platforms;
  tags?: Tag[];
  commands: Commands;
  components?: Components;
}

export interface Info {
  title: string;
  description: string;
  version: string;
  contact?: Contact;
  license?: License;
}

export interface Contact {
  name?: string;
  url?: string;
  email?: string;
}

export interface License {
  name: string;
  url?: string;
}

export interface ExternalDocs {
  description?: string;
  url: string;
}

export interface Platforms {
  [platform: string]: string[];
}

export interface Tag {
  name: string;
  description?: string;
}

export interface Commands {
  [commandPath: string]: Command;
}

export interface Command {
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: Parameter[];
  responses?: Responses;
}

export interface Parameter {
  name: string;
  in: 'argument' | 'flag' | 'option';
  description?: string;
  required?: boolean;
  alias?: string[];
  schema?: Schema;
}

export interface Schema {
  type: 'string' | 'integer' | 'number' | 'boolean' | 'array' | 'object';
  format?: string;
  enum?: (string | number)[];
  default?: any;
  example?: any;
  items?: Schema;
  properties?: { [key: string]: Schema };
}

export interface Responses {
  [statusCode: string]: Response;
}

export interface Response {
  description: string;
  content?: Content;
}

export interface Content {
  [mediaType: string]: MediaTypeObject;
}

export interface MediaTypeObject {
  schema?: Schema;
  example?: any;
}

export interface Components {
  schemas?: { [key: string]: Schema };
  parameters?: { [key: string]: Parameter };
  responses?: { [key: string]: Response };
}

// UI State Types
export interface AppState {
  activeTab: TabType;
  spec: OpenCLISpec | null;
  loading: boolean;
  error: string | null;
  expandedNodes: Set<string>;
}

export type TabType = 'home' | 'spec';

export interface NavigationTab {
  id: TabType;
  label: string;
  filename: string;
  description: string;
}

// Component Props Types
export interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export interface SectionProps {
  id: string;
  title: string;
  isActive: boolean;
  children: React.ReactNode;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// SEO and Meta Types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: string;
  stack?: string;
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    mono: string;
    sans: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export {};
