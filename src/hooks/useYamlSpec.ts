import { useState, useEffect, useCallback } from 'react';
import { loadYamlSpec } from '../utils/yamlUtils';
import * as yaml from 'js-yaml';
import type { OpenCLISpec } from '../types';

interface UseYamlSpecResult {
  data: OpenCLISpec | null;
  loading: boolean;
  error: string | null;
  refreshSpec: () => Promise<void>;
  parseYamlString: (yamlString: string) => any;
}

/**
 * Hook to load and manage YAML specification data
 */
export function useYamlSpec(url: string = '/opencli.yaml'): UseYamlSpecResult {
  const [data, setData] = useState<OpenCLISpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseYamlString = useCallback((yamlString: string) => {
    return yaml.load(yamlString);
  }, []);

  const refreshSpec = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedSpec = await loadYamlSpec(url);
      setData(loadedSpec);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refreshSpec();
  }, [refreshSpec]);

  return {
    data,
    loading,
    error,
    refreshSpec,
    parseYamlString,
  };
}
