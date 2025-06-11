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
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { sendOTP } from '../../store/slices/authSlice';
import { AuthStackNavigationProp } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { AUTH_CONFIG } from '../../constants/config';

export default function PhoneInputScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    let formatted = cleaned;
    if (cleaned.length >= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 3) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    
    return formatted;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    
    // Validate phone number
    const cleaned = text.replace(/\D/g, '');
    setIsValid(AUTH_CONFIG.PHONE_NUMBER_REGEX.test(cleaned));
  };

  const handleContinue = async () => {
    if (!isValid) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const cleaned = phoneNumber.replace(/\D/g, '');
    const result = await dispatch(sendOTP(cleaned));
    
    if (sendOTP.fulfilled.match(result)) {
      navigation.navigate('OTPVerification', { phoneNumber: cleaned });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Enter your phone number</Text>
            <Text style={styles.subtitle}>
              We'll send you a verification code to confirm your number
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+1</Text>
            <TextInput
              style={styles.input}
              placeholder="(555) 123-4567"
              placeholderTextColor={colors.text.tertiary}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={14} // (XXX) XXX-XXXX
              autoFocus
            />
          </View>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              By continuing, you agree to receive SMS messages. Standard rates may apply.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.continueButton, !isValid && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isValid || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text.inverse} />
            ) : (
              <Text style={styles.continueText}>Continue</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => Alert.alert(
              'Need Help?',
              'If you need assistance, please visit The Bowery Mission at 227 Bowery, New York, NY 10002 or call (212) 226-6214.'
            )}
          >
            <Text style={styles.helpText}>Need help signing up?</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md
  },
  countryCode: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginRight: spacing.sm
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    paddingVertical: spacing.md
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md
  },
  infoContainer: {
    marginBottom: spacing.xl
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md
  },
  continueButtonDisabled: {
    backgroundColor: colors.border.medium
  },
  continueText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold
  },
  helpButton: {
    alignItems: 'center',
    paddingVertical: spacing.md
  },
  helpText: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium
  }
});