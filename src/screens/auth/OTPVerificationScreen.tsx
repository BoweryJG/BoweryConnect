import React, { useState, useRef, useEffect } from 'react';
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
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { verifyOTP, sendOTP, resetOTP } from '../../store/slices/authSlice';
import { OTPVerificationRouteProp, AuthStackNavigationProp } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { AUTH_CONFIG } from '../../constants/config';

export default function OTPVerificationScreen() {
  const route = useRoute<OTPVerificationRouteProp>();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error, otpExpiry } = useAppSelector(state => state.auth);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeRemaining, setTimeRemaining] = useState(AUTH_CONFIG.OTP_EXPIRY_MINUTES * 60);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  
  const { phoneNumber } = route.params;

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-submit when all digits are entered
    const otpString = otp.join('');
    if (otpString.length === AUTH_CONFIG.OTP_LENGTH) {
      handleVerify();
    }
  }, [otp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPhoneDisplay = (phone: string) => {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== AUTH_CONFIG.OTP_LENGTH) {
      Alert.alert('Invalid Code', 'Please enter all 6 digits.');
      return;
    }

    const result = await dispatch(verifyOTP({ phoneNumber, otp: otpString }));
    
    if (verifyOTP.fulfilled.match(result)) {
      // Navigation will be handled by RootNavigator based on auth state
    }
  };

  const handleResend = async () => {
    dispatch(resetOTP());
    setOtp(['', '', '', '', '', '']);
    setTimeRemaining(AUTH_CONFIG.OTP_EXPIRY_MINUTES * 60);
    
    const result = await dispatch(sendOTP(phoneNumber));
    
    if (sendOTP.fulfilled.match(result)) {
      Alert.alert('Code Sent', 'A new verification code has been sent to your phone.');
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
            <Text style={styles.title}>Verify your number</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to{'\n'}
              <Text style={styles.phoneNumber}>{formatPhoneDisplay(phoneNumber)}</Text>
            </Text>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : {}
                ]}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Code expires in {formatTime(timeRemaining)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            disabled={isLoading || otp.join('').length !== AUTH_CONFIG.OTP_LENGTH}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text.inverse} />
            ) : (
              <Text style={styles.verifyText}>Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResend}
            disabled={isLoading || timeRemaining > 0}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.resendText,
              timeRemaining > 0 && styles.resendTextDisabled
            ]}>
              Didn't receive a code? Resend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.changeNumberButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.changeNumberText}>Change phone number</Text>
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
  phoneNumber: {
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.lg,
    fontSize: typography.fontSize.xxl,
    textAlign: 'center',
    color: colors.text.primary
  },
  otpInputFilled: {
    borderColor: colors.primary
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
    textAlign: 'center'
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  timerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary
  },
  verifyButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md
  },
  verifyText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm
  },
  resendText: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium
  },
  resendTextDisabled: {
    color: colors.text.tertiary
  },
  changeNumberButton: {
    alignItems: 'center',
    paddingVertical: spacing.md
  },
  changeNumberText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.base
  }
});