import { useState, useCallback } from 'react';

interface UseCopyToClipboardResult {
  copied: boolean;
  copyText: (text: string) => Promise<void>;
  resetCopied: () => void;
}

/**
 * Enhanced clipboard hook with better error handling and feedback
 */
export function useCopyToClipboard(): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Auto-reset after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
    }
  }, []);

  const resetCopied = useCallback(() => {
    setCopied(false);
  }, []);

  return { copied, copyText, resetCopied };
}
