import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../constants/theme';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryDark} />
      <View style={styles.decorCircleTop} />
      <View style={styles.decorCircleBottom} />

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.appName}>SkillSwap</Text>
          <Text style={styles.tagline}>Campus Freelance Marketplace</Text>
          <Text style={styles.subtext}>
            Turn your campus skills into earnings. Browse trusted peer freelancers,
            book micro-gigs, and showcase your creative talents.
          </Text>

          <View style={styles.statsPillRow}>
            <View style={styles.pill}>
              <Text style={styles.pillValue}>8+</Text>
              <Text style={styles.pillLabel}>Categories</Text>
            </View>
            <View style={styles.pillDivider} />
            <View style={styles.pill}>
              <Text style={styles.pillValue}>100%</Text>
              <Text style={styles.pillLabel}>Peer Verified</Text>
            </View>
            <View style={styles.pillDivider} />
            <View style={styles.pill}>
              <Text style={styles.pillValue}>₹0</Text>
              <Text style={styles.pillLabel}>Listing Fee</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <PrimaryButton
            title="Get Started"
            onPress={() => navigation.navigate('Register')}
            style={styles.primaryBtn}
          />
          <SecondaryButton
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            style={styles.secondaryBtn}
            textStyle={styles.secondaryBtnText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  decorCircleTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorCircleBottom: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 36,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  logoIcon: {
    fontSize: 36,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.chip,
    marginBottom: 16,
  },
  subtext: {
    fontSize: 14,
    color: '#D8E2FD',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
    marginBottom: 28,
  },
  statsPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: theme.radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pill: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  pillValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pillLabel: {
    fontSize: 11,
    color: theme.colors.chip,
    marginTop: 1,
  },
  pillDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  actionSection: {
    width: '100%',
    gap: 12,
    marginBottom: 10,
  },
  primaryBtn: {
    backgroundColor: '#FFFFFF',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  secondaryBtnText: {
    color: '#FFFFFF',
  },
});

export default WelcomeScreen;
