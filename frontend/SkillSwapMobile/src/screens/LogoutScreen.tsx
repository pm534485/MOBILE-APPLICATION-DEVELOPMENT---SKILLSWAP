import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../constants/theme';
import { useSkillSwap } from '../context/SkillSwapContext';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

interface LogoutScreenProps {
  navigation: any;
}

export const LogoutScreen: React.FC<LogoutScreenProps> = ({ navigation }) => {
  const { logout, user } = useSkillSwap();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'Welcome' }] } }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🚪</Text>
          </View>
          <Text style={styles.title}>Sign Out of SkillSwap?</Text>
          <Text style={styles.subtitle}>
            Signing out will clear your session token and saved items from
            AsyncStorage on this device.
          </Text>

          {Boolean(user?.email) && (
            <View style={styles.userBadge}>
              <Text style={styles.userBadgeText}>Signed in as: {user?.email}</Text>
            </View>
          )}

          <View style={styles.actions}>
            <PrimaryButton
              title="Yes, Sign Out"
              onPress={handleLogout}
              style={styles.logoutBtn}
            />
            <SecondaryButton
              title="Cancel & Go Back"
              onPress={() => navigation.goBack()}
              style={styles.cancelBtn}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.mutedText,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 16,
  },
  userBadge: {
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    marginBottom: 24,
  },
  userBadgeText: {
    fontSize: 12,
    color: theme.colors.primaryDark,
    fontWeight: '600',
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  logoutBtn: {
    backgroundColor: theme.colors.error,
  },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
});

export default LogoutScreen;
