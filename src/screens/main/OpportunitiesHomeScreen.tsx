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
import ImmersiveCrisisChatBot from '../../components/ImmersiveCrisisChatBot';

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
    id: 'mental-health',
    title: 'Mental Health & Recovery',
    subtitle: 'Healing your mind',
    icon: '🧠',
    color: '#7C3AED',
    description: 'Psychiatrists, therapists, and peer support groups',
    stereotypeBreaker: 'Trauma-informed care that understands homelessness, addiction, and survival'
  },
  {
    id: 'addiction',
    title: 'Addiction Recovery',
    subtitle: 'Breaking free together',
    icon: '🌱',
    color: '#059669',
    description: 'Detox, rehab, NA/AA meetings, and sober living',
    stereotypeBreaker: 'Harm reduction approach - meet you where you are, no judgment'
  },
  {
    id: 'work',
    title: 'Work & Career',
    subtitle: 'Beyond survival jobs',
    icon: '💼',
    color: colors.primary,
    description: 'Meaningful careers with growth potential',
    stereotypeBreaker: 'From tech startups to creative agencies wanting diverse perspectives'
  },
  {
    id: 'friendship',
    title: 'Friendship & Community',
    subtitle: 'Real human connections',
    icon: '🤝',
    color: '#22C55E',
    description: 'Meet genuine people who see you as a person',
    stereotypeBreaker: 'Young professionals, artists, entrepreneurs seeking authentic friendships'
  },
  {
    id: 'creative',
    title: 'Creative Expression',
    subtitle: 'Your voice matters',
    icon: '🎨',
    color: '#F59E0B',
    description: 'Art, music, writing, and creative collaborations',
    stereotypeBreaker: 'Gallery showings, music venues, and creative spaces seeking authentic stories'
  },
  {
    id: 'learning',
    title: 'Learning & Growth',
    subtitle: 'Expand your world',
    icon: '📚',
    color: '#3B82F6',
    description: 'From coding bootcamps to cooking classes',
    stereotypeBreaker: 'Universities, workshops, and skill-shares welcoming diverse backgrounds'
  },
  {
    id: 'adventure',
    title: 'Adventures & Experiences',
    subtitle: 'Life is meant to be lived',
    icon: '🌟',
    color: '#EF4444',
    description: 'Events, activities, and new experiences',
    stereotypeBreaker: 'Rock climbing groups, book clubs, food tours - experiences beyond basic needs'
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
    id: 'basic-needs',
    title: 'Essential Resources',
    subtitle: 'Food, shower, safety',
    icon: '🍽️',
    color: '#DC2626',
    description: 'Emergency shelter, food banks, hygiene facilities',
    stereotypeBreaker: 'Dignified services that treat you as human, not charity case'
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
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
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
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleCategoryPress = (category: OpportunityCategory) => {
    if (category.id === 'crisis') {
      setShowCrisisBot(true);
      return;
    }
    // TODO: Navigate to category-specific screen
    console.log('Navigate to:', category.id);
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
          <ImmersiveCrisisChatBot />
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