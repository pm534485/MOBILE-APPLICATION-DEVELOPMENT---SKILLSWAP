import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../constants/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { validateEmail, validatePassword } from '../utils/validators';
import { useSkillSwap } from '../context/SkillSwapContext';
import authApi from '../services/authApi';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useSkillSwap();
  const [email, setEmail] = useState('aarav.sharma@campus.edu');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleLogin = async () => {
    setApiError('');
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    const newErrors: { email?: string; password?: string } = {};
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error;

    setErrors(newErrors);

    if (!emailValidation.isValid || !passwordValidation.isValid) {
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(email.trim(), password);
      await login(response.user, response.token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (err: any) {
      setApiError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoIcon}>⚡</Text>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to manage your campus gigs and orders
            </Text>
          </View>

          {Boolean(apiError) && (
            <View style={styles.apiErrorBanner}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          )}

          <View style={styles.formCard}>
            <InputField
              label="Campus or Personal Email"
              placeholder="e.g. yourname@campus.edu"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <InputField
              label="Password"
              placeholder="Enter your password (min 6 chars)"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              isPassword
              autoCapitalize="none"
            />

            <PrimaryButton
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.submitBtn}
            />

            <View style={styles.simulatedNote}>
              <Text style={styles.simulatedNoteText}>
                🎓 Academic Demo: Self-contained simulated JWT token stored in
                AsyncStorage upon authentication.
              </Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Register now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 12,
  },
  backBtnText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    ...theme.shadow.card,
  },
  logoIcon: {
    fontSize: 26,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.mutedText,
    textAlign: 'center',
  },
  apiErrorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: theme.radius.sm,
    padding: 12,
    marginBottom: 16,
  },
  apiErrorText: {
    color: theme.colors.error,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
    marginBottom: 20,
  },
  submitBtn: {
    marginTop: 8,
  },
  simulatedNote: {
    marginTop: 16,
    padding: 10,
    backgroundColor: theme.colors.chip,
    borderRadius: theme.radius.sm,
  },
  simulatedNoteText: {
    fontSize: 11,
    color: theme.colors.primaryDark,
    lineHeight: 16,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.mutedText,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});

export default LoginScreen;
