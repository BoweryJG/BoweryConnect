import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { register } from '../../store/slices/authSlice';
import { OnboardingStackNavigationProp } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function RegisterScreen() {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    caseWorkerId: ''
  });

  const handleRegister = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert('Missing Information', 'Please enter your first and last name.');
      return;
    }

    if (!formData.username.trim()) {
      Alert.alert('Missing Username', 'Please choose a username.');
      return;
    }

    if (formData.username.length < 4) {
      Alert.alert('Invalid Username', 'Username must be at least 4 characters long.');
      return;
    }

    const result = await dispatch(register({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim().toLowerCase(),
      caseWorkerId: formData.caseWorkerId.trim()
    }));
    
    if (register.fulfilled.match(result)) {
      Alert.alert(
        'Registration Successful',
        `Your access code is: ${result.payload.accessCode}\n\nPlease write this down and keep it safe. You'll need it to log in.`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('ProfileSetup')
          }
        ]
      );
    } else {
      Alert.alert(
        'Registration Failed', 
        'Username may already be taken. Please try a different username.'
      );
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Let's get you started with BoweryConnect
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.nameRow}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData('firstName', text)}
                  autoCapitalize="words"
                />
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData('lastName', text)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Choose a Username</Text>
              <TextInput
                style={styles.input}
                placeholder="username123"
                placeholderTextColor={colors.text.tertiary}
                value={formData.username}
                onChangeText={(text) => updateFormData('username', text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputHint}>
                At least 4 characters, no spaces
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Case Worker ID (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="BM-12345"
                placeholderTextColor={colors.text.tertiary}
                value={formData.caseWorkerId}
                onChangeText={(text) => updateFormData('caseWorkerId', text)}
                autoCapitalize="characters"
              />
              <Text style={styles.inputHint}>
                If you have a case worker at The Bowery Mission
              </Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Important:</Text>
            <Text style={styles.infoText}>
              After registration, you'll receive a 6-digit access code. 
              Write it down and keep it safe - you'll need it to log in.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, (!formData.firstName || !formData.lastName || !formData.username) && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={!formData.firstName || !formData.lastName || !formData.username || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text.inverse} />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>
              Already have an account? <Text style={styles.backButtonLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },
  keyboardView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl
  },
  header: {
    marginBottom: spacing.xl
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal
  },
  formContainer: {
    marginBottom: spacing.lg
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputContainer: {
    marginBottom: spacing.lg
  },
  halfWidth: {
    width: '48%'
  },
  inputLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs
  },
  input: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.lg
  },
  inputHint: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    marginTop: spacing.xs
  },
  infoBox: {
    backgroundColor: colors.info + '20',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.info
  },
  infoTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.info,
    marginBottom: spacing.xs
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed
  },
  registerButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md
  },
  registerButtonDisabled: {
    backgroundColor: colors.border.medium
  },
  registerButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: spacing.md
  },
  backButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary
  },
  backButtonLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.medium
  }
});