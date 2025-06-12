import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Vibration,
  StatusBar,
  Platform
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  colorTheme?: 'calming' | 'energizing' | 'grounding' | 'emergency';
  sensoryMode?: 'breathing' | 'grounding' | 'heartbeat' | 'waves';
}

interface SensoryResponse {
  message: string;
  colorTheme: 'calming' | 'energizing' | 'grounding' | 'emergency';
  sensoryMode?: 'breathing' | 'grounding' | 'heartbeat' | 'waves';
  vibrationPattern?: number[];
  backgroundAnimation?: boolean;
}

const SENSORY_RESPONSES: { [key: string]: SensoryResponse } = {
  panic: {
    message: "Breathe with me. Feel the rhythm. In... and out... You're safe. Watch the colors flow with your breath.",
    colorTheme: 'calming',
    sensoryMode: 'breathing',
    vibrationPattern: [200, 400, 200],
    backgroundAnimation: true
  },
  voices: {
    message: "Ground yourself with me. Feel your feet on the earth. You are HERE. You are REAL. Focus on the gentle pulse.",
    colorTheme: 'grounding',
    sensoryMode: 'grounding',
    vibrationPattern: [100, 100, 100, 100],
    backgroundAnimation: true
  },
  suicidal: {
    message: "Your heartbeat is proof you belong here. Feel it. Each beat is a reason to stay. You matter. Help is coming.",
    colorTheme: 'emergency',
    sensoryMode: 'heartbeat',
    vibrationPattern: [100, 200, 100, 200, 100, 200],
    backgroundAnimation: true
  },
  confused: {
    message: "Let the waves wash over your confusion. You're floating safely. Today is real. You are real. I am real.",
    colorTheme: 'calming',
    sensoryMode: 'waves',
    vibrationPattern: [300, 600, 300],
    backgroundAnimation: true
  },
  angry: {
    message: "Your fire is valid. Let it flow through you and out. Feel the energy transform into power.",
    colorTheme: 'energizing',
    sensoryMode: 'breathing',
    vibrationPattern: [150, 300, 150],
    backgroundAnimation: true
  }
};

const COLOR_THEMES = {
  calming: {
    primary: '#4FC3F7',
    secondary: '#81C784',
    accent: '#FFB74D',
    background: '#E3F2FD'
  },
  energizing: {
    primary: '#FF7043',
    secondary: '#FFA726',
    accent: '#FFCA28',
    background: '#FFF3E0'
  },
  grounding: {
    primary: '#8D6E63',
    secondary: '#A1887F',
    accent: '#BCAAA4',
    background: '#EFEBE9'
  },
  emergency: {
    primary: '#E57373',
    secondary: '#F06292',
    accent: '#BA68C8',
    background: '#FCE4EC'
  }
};

export default function ImmersiveCrisisChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "I see you. I feel you. You're safe in this space. Let the colors surround you. What's happening in your world right now?",
      isBot: true,
      timestamp: new Date(),
      colorTheme: 'calming',
      sensoryMode: 'breathing'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'calming' | 'energizing' | 'grounding' | 'emergency'>('calming');
  const [isFullscreen, setIsFullscreen] = useState(true);
  
  // Animation values
  const breathingAnim = useRef(new Animated.Value(1)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const heartbeatAnim = useRef(new Animated.Value(1)).current;
  const groundingAnim = useRef(new Animated.Value(0)).current;
  
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    StatusBar.setHidden(isFullscreen, 'fade');
    startAmbientAnimations();
  }, [isFullscreen]);

  const startAmbientAnimations = () => {
    // Background color cycling
    Animated.loop(
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
      })
    ).start();

    // Gentle pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startBreathingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnim, {
          toValue: 1.4,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breathingAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startWaveAnimation = () => {
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  };

  const startHeartbeatAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startGroundingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(groundingAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(groundingAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const detectCrisisKeywords = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('kill') || lowerText.includes('die') || lowerText.includes('suicide')) {
      return 'suicidal';
    }
    if (lowerText.includes('voices') || lowerText.includes('hearing')) {
      return 'voices';
    }
    if (lowerText.includes('panic') || lowerText.includes('can\'t breathe')) {
      return 'panic';
    }
    if (lowerText.includes('confused') || lowerText.includes('where am i')) {
      return 'confused';
    }
    if (lowerText.includes('angry') || lowerText.includes('pissed')) {
      return 'angry';
    }
    
    return 'general';
  };

  const generateResponse = (userMessage: string): SensoryResponse => {
    const crisisType = detectCrisisKeywords(userMessage);
    
    if (SENSORY_RESPONSES[crisisType]) {
      return SENSORY_RESPONSES[crisisType];
    }
    
    return {
      message: "I'm here with you. Feel the gentle rhythm. You're not alone in this space.",
      colorTheme: 'calming',
      sensoryMode: 'breathing',
      backgroundAnimation: true
    };
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date(),
        colorTheme: response.colorTheme,
        sensoryMode: response.sensoryMode
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setCurrentTheme(response.colorTheme);

      // Start appropriate sensory animation
      switch (response.sensoryMode) {
        case 'breathing':
          startBreathingAnimation();
          break;
        case 'waves':
          startWaveAnimation();
          break;
        case 'heartbeat':
          startHeartbeatAnimation();
          break;
        case 'grounding':
          startGroundingAnimation();
          break;
      }

      // Trigger vibration pattern
      if (response.vibrationPattern && Platform.OS !== 'web') {
        Vibration.vibrate(response.vibrationPattern);
      }

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };

  const renderSensoryBackground = () => {
    const theme = COLOR_THEMES[currentTheme];
    
    return (
      <View style={StyleSheet.absoluteFill}>
        {/* Animated background gradients */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.background,
              opacity: backgroundColorAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.3, 0.6, 0.3]
              })
            }
          ]}
        />
        
        {/* Breathing circle */}
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              backgroundColor: theme.primary + '30',
              transform: [{ scale: breathingAnim }]
            }
          ]}
        />
        
        {/* Pulse rings */}
        <Animated.View
          style={[
            styles.pulseRing,
            {
              borderColor: theme.secondary + '40',
              transform: [{ scale: pulseAnim }]
            }
          ]}
        />
        
        {/* Wave effect */}
        <Animated.View
          style={[
            styles.waveEffect,
            {
              backgroundColor: theme.accent + '20',
              transform: [{
                translateY: waveAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, -height/2]
                })
              }]
            }
          ]}
        />
        
        {/* Heartbeat indicator */}
        <Animated.View
          style={[
            styles.heartbeatIndicator,
            {
              backgroundColor: theme.primary,
              transform: [{ scale: heartbeatAnim }]
            }
          ]}
        />
        
        {/* Grounding dots */}
        {[0, 1, 2, 3, 4].map(i => (
          <Animated.View
            key={i}
            style={[
              styles.groundingDot,
              {
                backgroundColor: theme.secondary,
                left: (width / 6) * (i + 1),
                opacity: groundingAnim.interpolate({
                  inputRange: [0, 0.2 * (i + 1), 0.2 * (i + 2), 1],
                  outputRange: [0.2, 1, 1, 0.2]
                })
              }
            ]}
          />
        ))}
      </View>
    );
  };

  const renderMessage = (message: Message) => {
    const theme = COLOR_THEMES[message.colorTheme || currentTheme];
    
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageContainer,
          message.isBot ? styles.botMessage : styles.userMessage,
          {
            backgroundColor: message.isBot 
              ? theme.primary + '90' 
              : theme.secondary + '90'
          }
        ]}
        transform={[{ scale: pulseAnim }]}
      >
        <Text style={[
          styles.messageText,
          {
            color: message.isBot ? '#FFFFFF' : '#000000',
            textShadowColor: 'rgba(0,0,0,0.3)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2
          }
        ]}>
          {message.text}
        </Text>
        
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSensoryBackground()}
      
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.fullscreenToggle}
            onPress={() => setIsFullscreen(!isFullscreen)}
          >
            <Text style={styles.fullscreenText}>
              {isFullscreen ? '◐ Exit Immersion' : '◯ Full Immersion'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Animated.Text 
              style={[
                styles.headerTitle,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              🫂 Crisis Sanctuary
            </Animated.Text>
            <Text style={styles.headerSubtitle}>
              Breathe • Feel • Heal
            </Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          
          {isTyping && (
            <Animated.View 
              style={[
                styles.messageContainer, 
                styles.botMessage,
                { backgroundColor: COLOR_THEMES[currentTheme].primary + '70' }
              ]}
              transform={[{ scale: pulseAnim }]}
            >
              <View style={styles.typingIndicator}>
                <Animated.View 
                  style={[
                    styles.typingDot,
                    { backgroundColor: '#FFFFFF' }
                  ]} 
                />
                <Animated.View 
                  style={[
                    styles.typingDot,
                    { backgroundColor: '#FFFFFF' }
                  ]} 
                />
                <Animated.View 
                  style={[
                    styles.typingDot,
                    { backgroundColor: '#FFFFFF' }
                  ]} 
                />
              </View>
            </Animated.View>
          )}
        </ScrollView>

        <View style={[
          styles.inputContainer,
          { backgroundColor: COLOR_THEMES[currentTheme].background + 'E0' }
        ]}>
          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: COLOR_THEMES[currentTheme].primary + '20',
                borderColor: COLOR_THEMES[currentTheme].primary + '60'
              }
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Express yourself... colors will respond to your energy"
            placeholderTextColor={COLOR_THEMES[currentTheme].primary + '80'}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { 
                backgroundColor: COLOR_THEMES[currentTheme].primary,
                opacity: !inputText.trim() ? 0.5 : 1
              }
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isTyping}
          >
            <Text style={styles.sendButtonText}>✨</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  breathingCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: height * 0.3,
    left: width / 2 - 100,
    opacity: 0.3
  },
  pulseRing: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    top: height * 0.25,
    left: width / 2 - 150,
    opacity: 0.4
  },
  waveEffect: {
    position: 'absolute',
    width: width * 2,
    height: height * 0.8,
    borderRadius: width,
    left: -width / 2,
    opacity: 0.2
  },
  heartbeatIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    top: 50,
    right: 30,
    opacity: 0.8
  },
  groundingDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    bottom: 120
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center'
  },
  fullscreenToggle: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md
  },
  fullscreenText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm
  },
  headerContent: {
    alignItems: 'center',
    marginTop: spacing.lg
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: spacing.xs
  },
  messagesContainer: {
    flex: 1
  },
  messagesContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl
  },
  messageContainer: {
    marginVertical: spacing.sm,
    maxWidth: width * 0.85,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  botMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: borderRadius.sm
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: borderRadius.sm
  },
  messageText: {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * 1.5,
    fontWeight: typography.fontWeight.medium
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.sm,
    textAlign: 'right'
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  typingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'flex-end',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl
  },
  textInput: {
    flex: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.base,
    color: '#000000',
    maxHeight: 120,
    marginRight: spacing.sm,
    borderWidth: 2
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },
  sendButtonText: {
    fontSize: 24
  }
});