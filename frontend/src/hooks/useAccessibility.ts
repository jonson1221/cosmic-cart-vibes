
import { useState, useEffect } from 'react';

type AccessibilityOptions = {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
};

export const useAccessibility = () => {
  const [options, setOptions] = useState<AccessibilityOptions>(() => {
    // Try to get saved options from localStorage
    const savedOptions = localStorage.getItem('accessibility-options');
    return savedOptions 
      ? JSON.parse(savedOptions) 
      : { highContrast: false, largeText: false, screenReader: false };
  });

  // Apply accessibility options when they change
  useEffect(() => {
    // Apply large text option
    if (options.largeText) {
      document.documentElement.classList.add('text-large');
    } else {
      document.documentElement.classList.remove('text-large');
    }

    // Apply high contrast option
    if (options.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply screen reader optimizations
    if (options.screenReader) {
      document.documentElement.classList.add('screen-reader-mode');
    } else {
      document.documentElement.classList.remove('screen-reader-mode');
    }

    // Save options to localStorage
    localStorage.setItem('accessibility-options', JSON.stringify(options));
  }, [options]);

  // Toggle individual options
  const toggleHighContrast = () => {
    setOptions(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleLargeText = () => {
    setOptions(prev => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleScreenReader = () => {
    setOptions(prev => ({ ...prev, screenReader: !prev.screenReader }));
  };

  // Reset all options
  const resetOptions = () => {
    setOptions({ highContrast: false, largeText: false, screenReader: false });
  };

  return {
    options,
    toggleHighContrast,
    toggleLargeText, 
    toggleScreenReader,
    resetOptions
  };
};
