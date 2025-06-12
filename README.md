# BoweryConnect 🏙️💙

A revolutionary platform connecting NYC's homeless community with dignity, opportunities, and hope. More than an app - it's a lifeline for crisis support, creative expression, and genuine human connection.

## 🌟 Live Platform

**Web App**: [https://boweryconnect-web.netlify.app](https://boweryconnect-web.netlify.app)  
**Crisis API**: [https://boweryconnect-backend.onrender.com](https://boweryconnect-backend.onrender.com)

## 🎯 Mission

BoweryConnect treats homeless individuals as complete human beings with dreams, talents, and potential. We connect people to real resources, creative opportunities, and communities that see their worth beyond their circumstances.

## ✨ Revolutionary Features

### 🆘 AI-Powered Crisis Support (Industry First!)
- **24/7 Specialized Chatbot**: Trained specifically for homeless mental health crises
- **Multi-Language Support**: English, Spanish (Español), Mandarin (中文), Arabic (العربية), Russian (Русский)
- **Voice Recognition**: Hands-free support when typing is difficult
- **Offline Mode**: Cached crisis responses work without internet
- **Emotion Detection**: Analyzes typing patterns to detect panic/distress
- **Peer Support Network**: Connect with others who've survived the streets

### 🏛️ Real NYC Resources (20+ Organizations)
- **24/7 Drop-In Centers**: 
  - Olivieri Center (257 W 30th St) - Never closes
  - Urban Pathways - Multiple locations
  - The Door - Youth services
- **Creative Arts Programs**:
  - The Door - Daily music, theater, visual arts
  - NY Writers Coalition - Your story matters
  - Project Renewal TOP - Healing through art
- **Education & Skills**:
  - NYPL - 92 locations with free classes
  - Culinary training with job placement
  - Computer literacy programs
- **Culture Access**:
  - NYC Culture Pass - 100+ museums free
  - IDNYC museum memberships
- **Technology**:
  - LinkNYC - 1,800+ free WiFi kiosks
  - Free device charging 24/7

## 🛠️ Tech Stack

### Frontend
- **React Native / Expo**: Cross-platform (iOS, Android, Web)
- **TypeScript**: Type-safe, maintainable code
- **Redux Toolkit**: Predictable state management
- **Expo Router**: File-based navigation
- **React Native Reanimated**: Smooth, calming animations

### Backend (Crisis API)
- **Node.js / Express**: Fast, scalable API
- **OpenAI GPT-4**: Intelligent crisis responses
- **Multi-Language AI**: Real-time translation
- **Fallback System**: Works even without API keys

### Infrastructure
- **Netlify**: Frontend hosting with instant deploys
- **Render**: Backend hosting with auto-scaling
- **GitHub Actions**: CI/CD pipeline

## 📁 Project Structure

```
BoweryConnect/
├── src/
│   ├── components/          # UI Components
│   │   ├── EnhancedCrisisChatBot.tsx  # AI crisis support
│   │   └── ImmersiveCrisisChatBot.tsx # Sensory calming features
│   ├── screens/            
│   │   ├── main/           # Main app screens
│   │   │   └── OpportunitiesHomeScreen.tsx
│   │   └── resources/      # Resource listings
│   │       └── ResourceCategoryScreen.tsx
│   ├── data/               
│   │   └── resourcesData.ts # 20+ NYC organizations
│   ├── services/           
│   │   └── crisisApi.ts    # Crisis chat service
│   └── store/              # Redux state management

BoweryConnect-Backend/
├── server.js               # Express API server
├── .env                    # Environment variables
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/BoweryJG/BoweryConnect.git
cd BoweryConnect

# Install dependencies
npm install

# Start development server
npm start

# For web
npm run web

# Build for production
npm run netlify:build
```

### Backend Setup

```bash
# Clone backend
git clone https://github.com/BoweryJG/BoweryConnect-Backend.git
cd BoweryConnect-Backend

# Install dependencies
npm install

# Set environment variables
echo "OPENAI_API_KEY=your_key_here" > .env

# Start server
npm start
```

## 📱 Key Features Explained

### Crisis Support Chatbot
- **Immediate Response**: Detects crisis keywords and responds instantly
- **Grounding Exercises**: For panic attacks and psychosis
- **Breathing Animations**: Visual calming techniques
- **Resource Locator**: Finds nearest help based on location
- **Peer Matching**: Connect with others who understand

### Resource Directory
- **Real-Time Info**: Updated hours, services, requirements
- **One-Tap Actions**: Call, get directions, share
- **Save Favorites**: Quick access to your resources
- **Offline Access**: Critical info cached locally

### Community Features
- **Success Stories**: Read how others made it
- **Event Calendar**: Free meals, services, activities  
- **Peer Forums**: Safe space to connect
- **Mentor Matching**: Learn from those who've been there

## 🤝 Contributing

We welcome contributions that respect our community. Please ensure:
- Use person-first language ("person experiencing homelessness")
- Test with actual users when possible
- Prioritize accessibility and offline functionality
- Keep dignity at the center of all features

## 📊 Impact

- **24/7 Availability**: Crisis support never sleeps
- **5 Languages**: Serving NYC's diverse population
- **20+ Organizations**: Real resources, verified info
- **Zero Barriers**: No sign-ups, no requirements

## 🆘 Emergency Resources

**Crisis? Get Help Now:**
- **Call 988**: Suicide & Crisis Lifeline
- **Text HOME to 741741**: Crisis Text Line
- **Call 1-888-NYC-WELL**: NYC Mental Health

**Need Shelter Tonight?**
- **Olivieri Center**: 257 W 30th St (24/7)
- **Call 311**: For shelter placement
- **The Bowery Mission**: 227 Bowery

## 🙏 Acknowledgments

Built with insights from:
- The homeless community of NYC
- Coalition for the Homeless
- The Bowery Mission
- Urban Pathways
- The Door
- NY Writers Coalition
- Project Renewal

## 📄 License

MIT License - Free to use and improve

## 💌 Contact

- **Website**: [boweryconnect.org](https://boweryconnect-web.netlify.app)
- **Crisis API**: [API Documentation](https://boweryconnect-backend.onrender.com)
- **GitHub**: [@BoweryJG](https://github.com/BoweryJG)

---

*"You are not alone. You are not forgotten. You matter."*

Built with ❤️ for NYC's homeless community