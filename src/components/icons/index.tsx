import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Common base component for all icons
const BaseIcon: React.FC<IconProps & { children: React.ReactNode; viewBox?: string }> = ({
  className = '',
  size = 16,
  color = 'currentColor',
  children,
  viewBox = '0 0 24 24',
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// Navigation & Expansion Icons
export const ChevronRightIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="9,18 15,12 9,6" />
  </BaseIcon>
);

export const ChevronDownIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="6,9 12,15 18,9" />
  </BaseIcon>
);

export const ExpandIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="7,13 12,18 17,13" />
    <polyline points="7,6 12,11 17,6" />
  </BaseIcon>
);

export const CollapseIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="17,11 12,6 7,11" />
    <polyline points="17,18 12,13 7,18" />
  </BaseIcon>
);

// Action Icons
export const CopyIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </BaseIcon>
);

export const DownloadIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </BaseIcon>
);

export const ExternalLinkIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </BaseIcon>
);

// Document & Type Icons
export const DocumentIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z" />
    <polyline points="14,2 14,8 20,8" />
  </BaseIcon>
);

export const CodeIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </BaseIcon>
);

export const TerminalIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="4,17 10,11 4,5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </BaseIcon>
);

// Status & UI Icons
export const CheckIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="20,6 9,17 4,12" />
  </BaseIcon>
);

export const XIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </BaseIcon>
);

export const AlertIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </BaseIcon>
);

export const LoadingIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </BaseIcon>
);

// File type icons
export const FileJsonIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="M10,16v2a2,2 0 0,1 -2,2" />
    <path d="M14,16v2a2,2 0 0,0 2,2" />
  </BaseIcon>
);

export const FileYamlIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="M8,13l2,-3l2,3" />
    <path d="M14,13l-2,3l2,3" />
  </BaseIcon>
);

// View Mode Icons
export const TreeViewIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M3 6h.01" />
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
  </BaseIcon>
);

export const CodeViewIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </BaseIcon>
);

export const JsonViewIcon: React.FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
    <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
    <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
  </BaseIcon>
);

// Export all icons as a collection for easy importing
export const Icons = {
  ChevronRight: ChevronRightIcon,
  ChevronDown: ChevronDownIcon,
  Expand: ExpandIcon,
  Collapse: CollapseIcon,
  Copy: CopyIcon,
  Download: DownloadIcon,
  ExternalLink: ExternalLinkIcon,
  Document: DocumentIcon,
  Code: CodeIcon,
  Terminal: TerminalIcon,
  Check: CheckIcon,
  X: XIcon,
  Alert: AlertIcon,
  Loading: LoadingIcon,
  FileJson: FileJsonIcon,
  FileYaml: FileYamlIcon,
  TreeView: TreeViewIcon,
  CodeView: CodeViewIcon,
  JsonView: JsonViewIcon,
} as const;

export type IconName = keyof typeof Icons;
