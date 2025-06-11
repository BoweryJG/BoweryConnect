import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>BC</Text>
          </View>
          <Text style={styles.title}>BoweryConnect</Text>
          <Text style={styles.subtitle}>
            Your path to meaningful employment
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💼</Text>
            <Text style={styles.featureText}>Find jobs that fit your skills</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🤝</Text>
            <Text style={styles.featureText}>Connect with supportive employers</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureText}>Build your professional network</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('PhoneInput')}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            In partnership with
          </Text>
          <Text style={styles.boweryMission}>The Bowery Mission</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  logoText: {
    fontSize: typography.fontSize.xxxl,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: width * 0.8
  },
  featuresContainer: {
    marginVertical: spacing.xxl
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md
  },
  featureIcon: {
    fontSize: 24,
    marginRight: spacing.md
  },
  featureText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    flex: 1
  },
  getStartedButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  getStartedText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold
  },
  footer: {
    alignItems: 'center'
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary
  },
  boweryMission: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginTop: spacing.xs
  }
});