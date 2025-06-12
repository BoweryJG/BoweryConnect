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
import { login } from '../../store/slices/authSlice';
import { MainStackNavigationProp } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function LoginScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);
  
  const [username, setUsername] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Missing Username', 'Please enter your username.');
      return;
    }

    if (!accessCode.trim()) {
      Alert.alert('Missing Access Code', 'Please enter your access code.');
      return;
    }

    const result = await dispatch(login({ username: username.trim(), accessCode: accessCode.trim() }));
    
    if (login.fulfilled.match(result)) {
      navigation.navigate('Main');
    } else {
      Alert.alert(
        'Login Failed', 
        'Invalid username or access code. Please check with your case worker at The Bowery Mission.'
      );
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
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>BC</Text>
            </View>
            <Text style={styles.title}>Welcome to BoweryConnect</Text>
            <Text style={styles.subtitle}>
              Enter your username and access code provided by The Bowery Mission
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor={colors.text.tertiary}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Access Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your 6-digit code"
                placeholderTextColor={colors.text.tertiary}
                value={accessCode}
                onChangeText={setAccessCode}
                keyboardType="number-pad"
                maxLength={6}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, (!username || !accessCode) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={!username || !accessCode || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text.inverse} />
            ) : (
              <Text style={styles.loginText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.helpContainer}>
            <Text style={styles.helpTitle}>Need help?</Text>
            <Text style={styles.helpText}>
              Visit The Bowery Mission at:{'\n'}
              227 Bowery, New York, NY 10002{'\n'}
              or call (212) 226-6214
            </Text>
            <Text style={styles.helpInfo}>
              Your case worker can provide you with your username and access code
            </Text>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>
              First time? <Text style={styles.registerLink}>Create an account</Text>
            </Text>
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
    paddingTop: spacing.xxl,
    justifyContent: 'space-between'
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  logoText: {
    fontSize: typography.fontSize.xxl,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal
  },
  formContainer: {
    marginBottom: spacing.xl
  },
  inputContainer: {
    marginBottom: spacing.lg
  },
  inputLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs
  },
  input: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.lg
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  loginButtonDisabled: {
    backgroundColor: colors.border.medium
  },
  loginText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold
  },
  helpContainer: {
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl
  },
  helpTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs
  },
  helpText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    marginBottom: spacing.sm
  },
  helpInfo: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    fontStyle: 'italic'
  },
  registerButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg
  },
  registerText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary
  },
  registerLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.medium
  }
});