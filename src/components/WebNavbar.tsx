import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export default function WebNavbar() {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.navbar}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logo}>
          <Text style={styles.logoText}>BoweryConnect</Text>
        </TouchableOpacity>
        
        <View style={styles.navLinks}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Features</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  logo: {
    padding: spacing.sm,
  },
  logoText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  navItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  navText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.regular,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginLeft: spacing.md,
  },
  ctaText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
});