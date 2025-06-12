import { Platform } from 'react-native';

// Helper to determine if we should use native driver
export const useNativeDriver = Platform.OS !== 'web';

// Web-safe animation config
export const webSafeAnimation = (config: any) => ({
  ...config,
  useNativeDriver: Platform.OS !== 'web'
});

// CSS-based animations for web
export const webAnimationStyles = Platform.OS === 'web' ? {
  pulse: {
    animationName: 'pulse',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  fadeIn: {
    animationName: 'fadeIn',
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
  slideUp: {
    animationName: 'slideUp',
    animationDuration: '1s',
    animationFillMode: 'forwards',
  }
} : {};

// Global CSS for web animations
export const webAnimationCSS = Platform.OS === 'web' ? `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
` : '';