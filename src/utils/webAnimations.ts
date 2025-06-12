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
  gentlePulse: {
    animationName: 'gentlePulse',
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  fadeIn: {
    animationName: 'fadeIn',
    animationDuration: '1.5s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  },
  slideUp: {
    animationName: 'slideUp',
    animationDuration: '1.2s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  }
} : {};

// Global CSS for web animations
export const webAnimationCSS = Platform.OS === 'web' ? `
  @keyframes gentlePulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
` : '';