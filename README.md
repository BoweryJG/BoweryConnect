# BoweryConnect

A mobile-first professional networking and employment platform designed for individuals experiencing homelessness, with initial focus on those connected to the Bowery Mission in NYC.

## Overview

BoweryConnect bridges the gap between homeless individuals seeking employment and inclusive employers. The app provides a dignified, accessible platform that addresses the unique challenges faced by this population.

## Key Features

- **Simplified Profile Creation**: Voice-to-text capability, flexible address options, skills-based profiles
- **Smart Job Matching**: AI-powered matching based on skills, location-aware suggestions
- **Support Network**: Direct connection to case workers, peer mentorship
- **Resource Hub**: Interview prep, digital literacy tutorials, benefits calculator
- **Offline-First Design**: Works with intermittent connectivity

## Tech Stack

- **Frontend**: React Native with TypeScript (Expo)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Offline Support**: React Native Offline + AsyncStorage
- **Accessibility**: Voice input, high contrast UI, large touch targets

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/         # Screen components
│   ├── auth/       # Authentication screens
│   ├── onboarding/ # User onboarding flow
│   ├── jobs/       # Job search and application
│   ├── profile/    # User profile management
│   └── resources/  # Support resources
├── navigation/      # Navigation configuration
├── store/          # Redux store and slices
├── services/       # API and external services
├── utils/          # Helper functions
├── constants/      # App constants and config
├── types/          # TypeScript type definitions
└── hooks/          # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
cd bowery/BoweryConnect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - Press `i` for iOS
   - Press `a` for Android
   - Scan QR code with Expo Go app on your phone

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run typecheck
```

## Features in Development

- [ ] Complete authentication flow with OTP
- [ ] User profile creation and management
- [ ] Job search and filtering
- [ ] Application tracking
- [ ] Offline data sync
- [ ] Voice-based navigation
- [ ] Multi-language support (English, Spanish, Chinese)

## Contributing

This project is currently in active development. Please check with the maintainers before contributing.

## Partner Organizations

- **The Bowery Mission**: Primary partner providing user feedback and testing

## License

This project is proprietary software. All rights reserved.

## Contact

For questions or support, please contact: support@boweryconnect.org