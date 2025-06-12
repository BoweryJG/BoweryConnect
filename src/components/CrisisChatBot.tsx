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
  Vibration
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isCalming?: boolean;
  hasEmergencyActions?: boolean;
}

interface CrisisResponse {
  message: string;
  isCalming: boolean;
  hasEmergencyActions?: boolean;
  breathingExercise?: boolean;
  grounding?: boolean;
}

const CRISIS_RESPONSES: { [key: string]: CrisisResponse } = {
  panic: {
    message: "I hear you're feeling overwhelmed right now. You're safe. Let's breathe together. In for 4 seconds... hold for 4... out for 6. You're doing great.",
    isCalming: true,
    breathingExercise: true
  },
  voices: {
    message: "The voices can be scary, but you're in control. Focus on my words. You are real, you are safe, you are valued. Let's ground ourselves - name 5 things you can see around you.",
    isCalming: true,
    grounding: true
  },
  suicidal: {
    message: "Your life has value and meaning. You matter. I'm connecting you to immediate help. Please stay with me. You've survived tough times before - you're stronger than you know.",
    isCalming: true,
    hasEmergencyActions: true
  },
  drugs: {
    message: "Addiction is not a moral failing - it's a health condition. You're brave for reaching out. Let's find you safe, judgment-free support right now.",
    isCalming: true,
    hasEmergencyActions: true
  },
  confused: {
    message: "Feeling confused or disoriented is okay. You're talking to BoweryConnect's support system. You're in New York. Today is a new day with new possibilities. Let's orient together.",
    isCalming: true,
    grounding: true
  },
  angry: {
    message: "Your anger is valid. Life has been unfair to you. But right now, in this moment, you're safe. Let's channel that fire into something that helps you. What's one small thing that might feel good right now?",
    isCalming: true
  },
  lonely: {
    message: "You're not alone, even when it feels that way. I'm here with you. There are people in this city who want to connect with you as a human being, not as someone to fix.",
    isCalming: true
  }
};

const CALMING_PHRASES = [
  "You are safe in this moment.",
  "Your feelings are valid.",
  "You have survived difficult times before.",
  "One breath at a time.",
  "You matter and you belong here.",
  "This feeling will pass.",
  "You're stronger than you know."
];

export default function CrisisChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm here to support you. However you're feeling right now - angry, scared, confused, overwhelmed - it's okay. You're safe here. What's going on?",
      isBot: true,
      timestamp: new Date(),
      isCalming: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const breathingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Gentle pulsing animation for calming effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const startBreathingExercise = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnim, {
          toValue: 1.3,
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

  const detectCrisisKeywords = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('kill') || lowerText.includes('die') || lowerText.includes('suicide') || lowerText.includes('end it')) {
      return 'suicidal';
    }
    if (lowerText.includes('voices') || lowerText.includes('hearing') || lowerText.includes('whisper')) {
      return 'voices';
    }
    if (lowerText.includes('drugs') || lowerText.includes('high') || lowerText.includes('withdrawal') || lowerText.includes('needle')) {
      return 'drugs';
    }
    if (lowerText.includes('panic') || lowerText.includes('can\'t breathe') || lowerText.includes('heart racing')) {
      return 'panic';
    }
    if (lowerText.includes('confused') || lowerText.includes('don\'t know') || lowerText.includes('where am i')) {
      return 'confused';
    }
    if (lowerText.includes('angry') || lowerText.includes('pissed') || lowerText.includes('hate')) {
      return 'angry';
    }
    if (lowerText.includes('alone') || lowerText.includes('lonely') || lowerText.includes('nobody')) {
      return 'lonely';
    }
    
    return 'general';
  };

  const generateResponse = (userMessage: string): CrisisResponse => {
    const crisisType = detectCrisisKeywords(userMessage);
    
    if (CRISIS_RESPONSES[crisisType]) {
      return CRISIS_RESPONSES[crisisType];
    }
    
    // General supportive response
    const randomPhrase = CALMING_PHRASES[Math.floor(Math.random() * CALMING_PHRASES.length)];
    return {
      message: `${randomPhrase} Can you tell me more about what you're experiencing right now? I'm here to listen.`,
      isCalming: true
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

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date(),
        isCalming: response.isCalming,
        hasEmergencyActions: response.hasEmergencyActions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (response.breathingExercise) {
        startBreathingExercise();
      }

      if (response.hasEmergencyActions) {
        // Gentle vibration for attention without being jarring
        Vibration.vibrate([100, 200, 100]);
      }

      // Auto-scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const renderMessage = (message: Message) => (
    <Animated.View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isBot ? styles.botMessage : styles.userMessage,
        message.isCalming && styles.calmingMessage
      ]}
      transform={message.isCalming ? [{ scale: pulseAnim }] : []}
    >
      <Text style={[
        styles.messageText,
        message.isBot ? styles.botText : styles.userText,
        message.isCalming && styles.calmingText
      ]}>
        {message.text}
      </Text>
      
      {message.hasEmergencyActions && (
        <View style={styles.emergencyActions}>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>🚨 Connect to Crisis Hotline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>📍 Find Immediate Help Nearby</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View 
          style={[styles.headerIcon, { transform: [{ scale: breathingAnim }] }]}
        >
          <Text style={styles.headerIconText}>🫂</Text>
        </Animated.View>
        <View>
          <Text style={styles.headerTitle}>Crisis Support</Text>
          <Text style={styles.headerSubtitle}>24/7 • Safe • Confidential</Text>
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
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={styles.typingIndicator}>
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your feelings here... it's safe"
          placeholderTextColor={colors.text.tertiary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary + '10',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light
  },
  headerIcon: {
    marginRight: spacing.md
  },
  headerIconText: {
    fontSize: 32
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary
  },
  messagesContainer: {
    flex: 1
  },
  messagesContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl
  },
  messageContainer: {
    marginVertical: spacing.xs,
    maxWidth: width * 0.8
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.sm,
    padding: spacing.md
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.sm,
    padding: spacing.md
  },
  calmingMessage: {
    backgroundColor: '#22C55E20',
    borderWidth: 1,
    borderColor: '#22C55E40'
  },
  messageText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * 1.4
  },
  botText: {
    color: colors.text.primary
  },
  userText: {
    color: colors.text.inverse
  },
  calmingText: {
    fontWeight: typography.fontWeight.medium
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    textAlign: 'right'
  },
  emergencyActions: {
    marginTop: spacing.md
  },
  emergencyButton: {
    backgroundColor: colors.danger,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginVertical: spacing.xs
  },
  emergencyButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center'
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.secondary,
    marginHorizontal: 2
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    maxHeight: 100,
    marginRight: spacing.sm
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg
  },
  sendButtonDisabled: {
    backgroundColor: colors.border.medium
  },
  sendButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold
  }
});