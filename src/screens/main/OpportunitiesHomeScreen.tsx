import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  LinearGradient,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainTabNavigationProp } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import EnhancedCrisisChatBot from '../../components/EnhancedCrisisChatBot';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

interface OpportunityCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  stereotypeBreaker?: string;
}

const opportunityCategories: OpportunityCategory[] = [
  {
    id: 'crisis',
    title: 'Crisis Support',
    subtitle: 'Immediate help when you need it',
    icon: '🫂',
    color: '#E11D48',
    description: 'AI-powered crisis intervention with immersive calming features',
    stereotypeBreaker: 'Revolutionary mental health support designed specifically for street experiences'
  },
  {
    id: 'friendship',
    title: 'Friendship & Community',
    subtitle: 'Connect with others who understand',
    icon: '🤝',
    color: '#10B981',
    description: 'Safe spaces to meet people, build friendships, and find your community',
    stereotypeBreaker: 'Real connections at drop-in centers like Olivieri Center - 24/7 community'
  },
  {
    id: 'creative',
    title: 'Creative Expression',
    subtitle: 'Art, music, writing, theater',
    icon: '🎨',
    color: '#8B5CF6',
    description: 'Free programs to express yourself through arts and creativity',
    stereotypeBreaker: 'The Door offers daily arts programs, NY Writers Coalition welcomes all voices'
  },
  {
    id: 'learning',
    title: 'Learning & Growth',
    subtitle: 'Education and skill building',
    icon: '📚',
    color: '#3B82F6',
    description: 'Free classes, job training, and educational opportunities',
    stereotypeBreaker: 'NYPL has 92 locations with free classes - no library card needed for many'
  },
  {
    id: 'culture',
    title: 'Culture & Museums',
    subtitle: 'Free access to NYC culture',
    icon: '🏛️',
    color: '#F59E0B',
    description: 'Museum passes, cultural events, and free entertainment',
    stereotypeBreaker: 'Culture Pass gives you free access to 100+ museums with just a library card'
  },
  {
    id: 'tech',
    title: 'Technology Access',
    subtitle: 'Computers, internet, and digital skills',
    icon: '💻',
    color: '#14B8A6',
    description: 'Free computer access, WiFi, and technology training',
    stereotypeBreaker: 'LinkNYC has 1,800+ kiosks with free WiFi and charging - available 24/7'
  },
  {
    id: 'wellness',
    title: 'Wellness & Self-Care',
    subtitle: 'Physical and mental wellness',
    icon: '🧘',
    color: '#EC4899',
    description: 'Free fitness, meditation, and wellness programs',
    stereotypeBreaker: 'NYC Parks offers free yoga and fitness - wellness is not a luxury'
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Recovery',
    subtitle: 'Healing your mind',
    icon: '🧠',
    color: '#7C3AED',
    description: 'Psychiatrists, therapists, and peer support groups',
    stereotypeBreaker: 'Project Renewal uses art therapy - healing through creativity'
  },
  {
    id: 'housing',
    title: 'Housing & Home',
    subtitle: 'More than shelter',
    icon: '🏠',
    color: '#A855F7',
    description: 'Find a place to truly call home',
    stereotypeBreaker: 'Intentional communities, co-living spaces, and housing advocates'
  },
  {
    id: 'food',
    title: 'Food with Dignity',
    subtitle: 'More than just meals',
    icon: '🍲',
    color: '#F97316',
    description: 'Restaurant-quality food and welcoming spaces',
    stereotypeBreaker: 'Holy Apostles serves 1,000+ daily in a beautiful church - dignity matters'
  }
];

export default function OpportunitiesHomeScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [showCrisisBot, setShowCrisisBot] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      })
    ]).start();

    // Background color cycling
    Animated.loop(
      Animated.timing(backgroundAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      })
    ).start();

    // Pulse animation for crisis button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  }, []);

  const handleCategoryPress = (category: OpportunityCategory) => {
    if (category.id === 'crisis') {
      setShowCrisisBot(true);
      return;
    }
    
    // Navigate to resource category screen for other categories
    navigation.navigate('ResourceCategory', { categoryId: category.id });
  };

  const renderOpportunityCard = (category: OpportunityCategory, index: number) => {
    const isCrisis = category.id === 'crisis';
    
    return (
      <Animated.View
        key={category.id}
        style={{
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: isCrisis ? pulseAnim : 1 }
          ]
        }}
      >
        <TouchableOpacity
          style={[
            styles.categoryCard,
            {
              backgroundColor: isCrisis ? category.color + '20' : colors.background.secondary,
              borderLeftColor: category.color,
              borderLeftWidth: isCrisis ? 6 : 4,
              shadowColor: category.color,
              shadowOffset: { width: 0, height: isCrisis ? 8 : 4 },
              shadowOpacity: isCrisis ? 0.4 : 0.2,
              shadowRadius: isCrisis ? 12 : 6,
              elevation: isCrisis ? 12 : 6
            }
          ]}
          onPress={() => handleCategoryPress(category)}
          activeOpacity={0.8}
        >
          {isCrisis && (
            <View style={styles.crisisGlow}>
              <Animated.View
                style={[
                  styles.crisisRing,
                  {
                    borderColor: category.color + '60',
                    transform: [{ scale: pulseAnim }]
                  }
                ]}
              />
            </View>
          )}
          
          <View style={styles.cardHeader}>
            <Animated.Text 
              style={[
                styles.categoryIcon,
                isCrisis && { transform: [{ scale: pulseAnim }] }
              ]}
            >
              {category.icon}
            </Animated.Text>
            <View style={styles.cardTitleContainer}>
              <Text style={[
                styles.categoryTitle,
                isCrisis && { color: category.color, fontWeight: 'bold' }
              ]}>
                {category.title}
              </Text>
              <Text style={[
                styles.categorySubtitle,
                isCrisis && { color: category.color + 'CC' }
              ]}>
                {category.subtitle}
              </Text>
            </View>
            {isCrisis && (
              <View style={styles.crisisIndicator}>
                <Text style={styles.crisisText}>IMMEDIATE</Text>
              </View>
            )}
          </View>
          
          <Text style={[
            styles.categoryDescription,
            isCrisis && { fontWeight: '600', color: colors.text.primary }
          ]}>
            {category.description}
          </Text>
          
          {category.stereotypeBreaker && (
            <View style={[
              styles.stereotypeBreakerContainer,
              isCrisis && { 
                backgroundColor: category.color + '10',
                borderColor: category.color + '40'
              }
            ]}>
              <Text style={styles.stereotypeBreakerLabel}>Breaking Stereotypes:</Text>
              <Text style={styles.stereotypeBreakerText}>{category.stereotypeBreaker}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: backgroundAnim.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [
                colors.background.primary,
                '#F0F9FF', // Light blue
                '#FFF7ED', // Light orange
                '#F3E8FF', // Light purple
                colors.background.primary
              ]
            })
          }
        ]}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Animated.Text 
              style={[
                styles.title,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              BoweryConnect
            </Animated.Text>
            <Text style={styles.subtitle}>
              Where life opportunities meet human dignity.{'\n'}
              You're not just looking for help – you're looking for connection, growth, and possibility.
            </Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.manifesto,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.manifestoTitle}>Our Belief</Text>
            <Text style={styles.manifestoText}>
              Every person has unique talents, perspectives, and value to offer. 
              Homelessness doesn't define you – your potential does. 
              We connect you with opportunities that see your worth, not your circumstances.
            </Text>
          </Animated.View>

          <View style={styles.categoriesSection}>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }}
            >
              <Text style={styles.sectionTitle}>Life Opportunities</Text>
              <Text style={styles.sectionSubtitle}>
                Choose what speaks to your heart today
              </Text>
            </Animated.View>
            
            {opportunityCategories.map((category, index) => renderOpportunityCard(category, index))}
          </View>

          <Animated.View 
            style={[
              styles.emergencySection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.emergencyTitle}>Resources Map</Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyIcon}>🗺️</Text>
              <Text style={styles.emergencyText}>Find Help Near You</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>

      {/* Crisis Bot Modal */}
      <Modal
        visible={showCrisisBot}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowCrisisBot(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCrisisBot(false)}
          >
            <Text style={styles.closeButtonText}>✕ Exit Sanctuary</Text>
          </TouchableOpacity>
          <EnhancedCrisisChatBot onClose={() => setShowCrisisBot(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: spacing.xxl
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xs
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * 1.5,
    paddingHorizontal: spacing.md
  },
  manifesto: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary + '30'
  },
  manifestoTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm
  },
  manifestoText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: typography.fontSize.base * 1.6
  },
  categoriesSection: {
    paddingHorizontal: spacing.lg
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.lg
  },
  categoryCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden'
  },
  crisisGlow: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50
  },
  crisisRing: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: borderRadius.xl,
    borderWidth: 3,
    opacity: 0.5
  },
  crisisIndicator: {
    backgroundColor: '#E11D48',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start'
  },
  crisisText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: spacing.md
  },
  cardTitleContainer: {
    flex: 1
  },
  categoryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs
  },
  categorySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontStyle: 'italic'
  },
  categoryDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize.base * 1.4
  },
  stereotypeBreakerContainer: {
    backgroundColor: colors.background.primary,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light
  },
  stereotypeBreakerLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs
  },
  stereotypeBreakerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    lineHeight: typography.fontSize.sm * 1.4
  },
  emergencySection: {
    margin: spacing.lg,
    alignItems: 'center'
  },
  emergencyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md
  },
  emergencyButton: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg
  },
  emergencyIcon: {
    fontSize: 24,
    marginRight: spacing.sm
  },
  emergencyText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.inverse
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    zIndex: 1000
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium
  }
});