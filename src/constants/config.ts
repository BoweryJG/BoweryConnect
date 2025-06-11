export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  OFFLINE_STORAGE_KEY: '@boweryconnect_offline_data'
};

export const AUTH_CONFIG = {
  PHONE_NUMBER_REGEX: /^\+?1?\d{10,14}$/,
  OTP_LENGTH: 6,
  OTP_EXPIRY_MINUTES: 10,
  SESSION_STORAGE_KEY: '@boweryconnect_session'
};

export const APP_CONFIG = {
  APP_NAME: 'BoweryConnect',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@boweryconnect.org',
  SUPPORT_PHONE: '+1-212-226-6214', // Bowery Mission phone
  BOWERY_MISSION_ADDRESS: '227 Bowery, New York, NY 10002'
};

export const ACCESSIBILITY_CONFIG = {
  MIN_TOUCH_TARGET: 44, // iOS Human Interface Guidelines
  HIGH_CONTRAST_MODE_KEY: '@boweryconnect_high_contrast',
  FONT_SCALE_KEY: '@boweryconnect_font_scale',
  VOICE_ENABLED_KEY: '@boweryconnect_voice_enabled'
};

export const OFFLINE_CONFIG = {
  SYNC_INTERVAL: 300000, // 5 minutes
  MAX_OFFLINE_STORAGE: 50 * 1024 * 1024, // 50MB
  CRITICAL_DATA_KEYS: ['user_profile', 'saved_jobs', 'applications']
};

export const JOB_CONFIG = {
  DEFAULT_SEARCH_RADIUS: 5, // miles
  MAX_SEARCH_RADIUS: 25, // miles
  JOBS_PER_PAGE: 20,
  FEATURED_EMPLOYERS_KEY: '@boweryconnect_featured_employers'
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '中文' }
];

export const NYC_BOROUGHS = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island'
];

export const SKILLS_CATEGORIES = {
  'General Labor': [
    'Construction',
    'Warehouse',
    'Moving',
    'Cleaning',
    'Landscaping',
    'Painting',
    'Assembly'
  ],
  'Food Service': [
    'Food Prep',
    'Dishwashing',
    'Line Cook',
    'Serving',
    'Cashier',
    'Food Safety'
  ],
  'Administrative': [
    'Data Entry',
    'Filing',
    'Reception',
    'Customer Service',
    'Phone Skills'
  ],
  'Maintenance': [
    'Janitorial',
    'Building Maintenance',
    'Groundskeeping',
    'Basic Repairs'
  ],
  'Retail': [
    'Stocking',
    'Inventory',
    'Sales',
    'Visual Merchandising'
  ]
};