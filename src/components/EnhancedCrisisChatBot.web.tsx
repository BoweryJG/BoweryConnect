import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import crisisApi from '../services/crisisApi';
import { styles } from '../styles/EnhancedCrisisChatBotStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  emotion?: string;
  language?: string;
  isVoice?: boolean;
}

interface CachedResponse {
  keywords: string[];
  response: string;
  emotion: string;
}

interface PeerConnection {
  id: string;
  name: string;
  story: string;
  isAvailable: boolean;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

// Offline crisis responses cache
const OFFLINE_RESPONSES: CachedResponse[] = [
  {
    keywords: ['suicide', 'kill myself', 'end it', 'want to die'],
    response: "I hear you're in tremendous pain. Your life matters. Please call 988 right now - they're there 24/7. If you can't call, text HOME to 741741. You are not alone.",
    emotion: 'crisis'
  },
  {
    keywords: ['voices', 'hearing things', 'they tell me'],
    response: "The voices feel very real, I know. Let's ground you: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This helps your mind reconnect with what's real.",
    emotion: 'psychosis'
  },
  {
    keywords: ['cold', 'freezing', 'nowhere to go'],
    response: "Getting warm is priority #1. Nearest warming centers: Bowery Mission (227 Bowery), NYC Rescue Mission (90 Lafayette). Call 311 for transport. Libraries and McDonald's have heat too.",
    emotion: 'urgent'
  },
  {
    keywords: ['hungry', 'food', 'starving'],
    response: "Free meals RIGHT NOW: Bowery Mission serves 3x daily. Holy Apostles (296 9th Ave) Mon-Fri 10:30am. Most churches do lunch. Dumpster behind Whole Foods has good stuff after 10pm.",
    emotion: 'practical'
  },
  {
    keywords: ['drugs', 'withdrawal', 'dope sick'],
    response: "Withdrawal is hell but you can survive. For immediate help: CORNER Project (Washington Heights) has supplies. Call 311 for detox bed. Drink water, eat bananas for cramps. You're stronger than you know.",
    emotion: 'supportive'
  },
];

const PEER_SUPPORTERS: PeerConnection[] = [
  {
    id: '1',
    name: 'Marcus (Queens)',
    story: '5 years clean, was on streets for 3 years',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Sarah (Brooklyn)',
    story: 'Survived winter of 2019 outside, now housed',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Angel (Bronx)',
    story: 'Bipolar, found right meds, working now',
    isAvailable: false
  },
];

// Web-compatible blur view
const BlurView = ({ children, intensity, style }: any) => (
  <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]}>
    {children}
  </View>
);

// Web-compatible gradient component
const LinearGradient = ({ colors, style, children }: any) => (
  <View 
    style={[
      style, 
      { 
        backgroundColor: colors[0],
        backgroundImage: `linear-gradient(to bottom, ${colors.join(', ')})`
      }
    ]}
  >
    {children}
  </View>
);

export default function EnhancedCrisisChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showPeerSupport, setShowPeerSupport] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState<number[]>([]);
  const [userMood, setUserMood] = useState<'stable' | 'anxious' | 'crisis'>('stable');
  const [sessionId, setSessionId] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const lastTypeTime = useRef<number>(Date.now());

  useEffect(() => {
    initializeSession();
    checkNetworkStatus();
    loadUserPreferences();
  }, []);

  const initializeSession = async () => {
    const id = `session_${Date.now()}`;
    setSessionId(id);
    
    // Load previous session if exists
    try {
      const lastSession = await AsyncStorage.getItem('lastSession');
      if (lastSession) {
        const data = JSON.parse(lastSession);
        if (Date.now() - data.timestamp < 3600000) { // 1 hour
          setMessages(data.messages);
          setUserMood(data.mood || 'stable');
        }
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const checkNetworkStatus = async () => {
    try {
      const health = await crisisApi.checkHealth();
      setIsOffline(!health);
    } catch {
      setIsOffline(true);
    }
  };

  const loadUserPreferences = async () => {
    try {
      const prefs = await AsyncStorage.getItem('userPreferences');
      if (prefs) {
        const { language } = JSON.parse(prefs);
        setSelectedLanguage(language || 'en');
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const saveSession = async () => {
    try {
      await AsyncStorage.setItem('lastSession', JSON.stringify({
        messages: messages.slice(-20), // Keep last 20 messages
        mood: userMood,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const detectEmotion = (text: string, speed: number[]): string => {
    const avgSpeed = speed.reduce((a, b) => a + b, 0) / speed.length;
    const textLower = text.toLowerCase();
    
    // Fast erratic typing might indicate panic
    if (avgSpeed < 100 && speed.some(s => s < 50)) {
      setUserMood('anxious');
      return 'panicked';
    }
    
    // Very slow typing might indicate depression
    if (avgSpeed > 500) {
      return 'depressed';
    }
    
    // Check for crisis keywords
    if (OFFLINE_RESPONSES.some(r => r.keywords.some(k => textLower.includes(k)))) {
      setUserMood('crisis');
      return 'crisis';
    }
    
    return 'neutral';
  };

  const handleTyping = (text: string) => {
    setInputText(text);
    
    // Track typing speed
    const now = Date.now();
    const timeDiff = now - lastTypeTime.current;
    lastTypeTime.current = now;
    
    if (timeDiff < 1000) { // Only track if less than 1 second between keystrokes
      setTypingSpeed(prev => [...prev.slice(-10), timeDiff]);
    }
  };

  const translateMessage = async (text: string, targetLang: string): Promise<string> => {
    // In production, use a translation API
    // For now, return key translations
    const translations: { [key: string]: { [lang: string]: string } } = {
      'How can I help you today?': {
        es: '¿Cómo puedo ayudarte hoy?',
        zh: '我今天能为您做些什么？',
        ar: 'كيف يمكنني مساعدتك اليوم؟',
        ru: 'Как я могу помочь вам сегодня?'
      }
    };
    
    return translations[text]?.[targetLang] || text;
  };

  const getOfflineResponse = (text: string): string => {
    const textLower = text.toLowerCase();
    
    for (const cached of OFFLINE_RESPONSES) {
      if (cached.keywords.some(keyword => textLower.includes(keyword))) {
        return cached.response;
      }
    }
    
    return "I'm offline right now but I'm still here for you. If this is an emergency, please call 911 or 988. What's happening?";
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
      emotion: detectEmotion(inputText, typingSpeed),
      language: selectedLanguage,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setTypingSpeed([]);
    setIsLoading(true);

    try {
      let response;
      
      if (isOffline) {
        // Use offline responses
        response = {
          message: getOfflineResponse(userMessage.text),
          urgency: userMood === 'crisis' ? 'high' : 'medium',
          fallback: true
        };
      } else {
        response = await crisisApi.sendMessage(
          userMessage.text,
          messages,
          {
            language: selectedLanguage,
            emotion: userMessage.emotion,
            sessionId,
            mood: userMood
          }
        );
      }

      let botText = response.message;
      
      // Translate if needed
      if (selectedLanguage !== 'en') {
        botText = await translateMessage(botText, selectedLanguage);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        isBot: true,
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, botMessage]);

      // Save session after each exchange
      await saveSession();

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: isOffline ? getOfflineResponse(userMessage.text) : 
              "I'm having trouble connecting. If this is urgent, call 988 or 911. I'm still here - what's going on?",
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const connectToPeer = (peer: PeerConnection) => {
    Alert.alert(
      'Connect with ' + peer.name,
      `${peer.story}\n\nWould you like to connect? They'll get a notification.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Connect', 
          onPress: () => {
            // In production, this would initiate a peer connection
            const message: Message = {
              id: Date.now().toString(),
              text: `🤝 Connecting you with ${peer.name}. They've been where you are and made it through. They'll join shortly...`,
              isBot: true,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, message]);
            setShowPeerSupport(false);
          }
        }
      ]
    );
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animated.View style={[
      styles.messageContainer,
      item.isBot ? styles.botMessage : styles.userMessage,
      { opacity: item.isBot && item.text.includes('🤝') ? pulseAnim : 1 }
    ]}>
      <Text style={[
        styles.messageText,
        item.isBot ? styles.botMessageText : styles.userMessageText
      ]}>
        {item.text}
      </Text>
      {item.emotion && item.emotion !== 'neutral' && (
        <Text style={styles.emotionIndicator}>
          {item.emotion === 'crisis' ? '🚨' : 
           item.emotion === 'panicked' ? '😰' :
           item.emotion === 'depressed' ? '😔' : ''}
        </Text>
      )}
    </Animated.View>
  );

  const renderSettings = () => (
    <Modal
      visible={showSettings}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowSettings(false)}
    >
      <BlurView intensity={90} style={styles.modalContainer}>
        <View style={styles.settingsPanel}>
          <Text style={styles.settingsTitle}>Comfort Settings</Text>
          
          {/* Language Selection */}
          <Text style={styles.settingLabel}>Language / Idioma / 语言</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {LANGUAGES.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang.code && styles.selectedLanguage
                ]}
                onPress={() => {
                  setSelectedLanguage(lang.code);
                  AsyncStorage.setItem('userPreferences', JSON.stringify({
                    language: lang.code
                  }));
                }}
              >
                <Text style={styles.languageText}>{lang.flag} {lang.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowSettings(false)}
          >
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  const renderPeerSupport = () => (
    <Modal
      visible={showPeerSupport}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPeerSupport(false)}
    >
      <BlurView intensity={90} style={styles.modalContainer}>
        <View style={styles.peerPanel}>
          <Text style={styles.peerTitle}>Peer Support - People Who Get It</Text>
          <Text style={styles.peerSubtitle}>Connect with someone who's been there</Text>
          
          <FlatList
            data={PEER_SUPPORTERS}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.peerCard,
                  !item.isAvailable && styles.peerUnavailable
                ]}
                onPress={() => item.isAvailable && connectToPeer(item)}
                disabled={!item.isAvailable}
              >
                <View style={styles.peerInfo}>
                  <Text style={styles.peerName}>{item.name}</Text>
                  <Text style={styles.peerStory}>{item.story}</Text>
                </View>
                <View style={[
                  styles.peerStatus,
                  { backgroundColor: item.isAvailable ? '#10B981' : '#6B7280' }
                ]}>
                  <Text style={styles.peerStatusText}>
                    {item.isAvailable ? 'Available' : 'Offline'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowPeerSupport(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <LinearGradient
      colors={
        userMood === 'crisis' ? ['#1F2937', '#111827', '#030712'] :
        userMood === 'anxious' ? ['#1E3A8A', '#1E293B', '#0F172A'] :
        ['#065F46', '#064E3B', '#022C22']
      }
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Crisis Support</Text>
          {isOffline && (
            <View style={styles.offlineIndicator}>
              <MaterialCommunityIcons name="wifi-off" size={16} color="#FCD34D" />
              <Text style={styles.offlineText}>Offline Mode</Text>
            </View>
          )}
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setShowPeerSupport(true)} style={styles.iconButton}>
            <MaterialCommunityIcons name="account-group" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Numbers Bar */}
      <View style={styles.emergencyBar}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyText}>📞 988 Crisis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyText}>📱 Text HOME to 741741</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.messagesContainer}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 && (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                I'm here for you, no judgment. What's going on? 
                {'\n\n'}You can type or connect with a peer who's been there.
              </Text>
            </View>
          )}
          
          {messages.map(message => (
            <View key={message.id}>
              {renderMessage({ item: message })}
            </View>
          ))}
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={handleTyping}
            placeholder={
              selectedLanguage === 'es' ? "¿Qué está pasando?" :
              selectedLanguage === 'zh' ? "发生了什么事？" :
              selectedLanguage === 'ar' ? "ماذا يحدث؟" :
              selectedLanguage === 'ru' ? "Что происходит?" :
              "What's happening?"
            }
            placeholderTextColor="#94A3B8"
            multiline
            maxHeight={100}
          />
          
          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modals */}
      {renderSettings()}
      {renderPeerSupport()}
    </LinearGradient>
  );
}