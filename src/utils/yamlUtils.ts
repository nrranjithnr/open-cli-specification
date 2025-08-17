import * as yaml from 'js-yaml';
import type { OpenCLISpec } from '../types';

/**
 * Load and parse YAML specification from URL
 */
export async function loadYamlSpec(url: string): Promise<OpenCLISpec> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch YAML: ${response.statusText}`);
    }

    const yamlText = await response.text();
    const parsed = yaml.load(yamlText) as OpenCLISpec;

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid YAML structure');
    }

    return parsed;
  } catch (error) {
    console.error('Error loading YAML spec:', error);
    throw new Error(
      `Failed to load specification: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Convert object to YAML string
 */
export function objectToYaml(obj: any): string {
  try {
    return yaml.dump(obj, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
      sortKeys: false,
    });
  } catch (error) {
    console.error('Error converting object to YAML:', error);
    return '';
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if device has touch capability
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get current responsive breakpoint
 */
export function getBreakpoint(): string {
  const width = window.innerWidth;
  if (width < 576) return 'xs';
  if (width < 768) return 'sm';
  if (width < 992) return 'md';
  if (width < 1200) return 'lg';
  return 'xl';
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Scroll to element with offset
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  }
}
