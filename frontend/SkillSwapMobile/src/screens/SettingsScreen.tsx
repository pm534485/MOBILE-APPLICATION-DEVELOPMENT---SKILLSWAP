import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../constants/theme';
import AppHeader from '../components/AppHeader';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader
        title="Settings & Preferences"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Campus Notifications</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSub}>Receive updates about gig inquiries</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Order Status Alerts</Text>
              <Text style={styles.settingSub}>Alerts when peer delivers a project</Text>
            </View>
            <Switch
              value={orderAlerts}
              onValueChange={setOrderAlerts}
              trackColor={{ false: '#D1D5DB', true: theme.colors.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Display & Data</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Dark Theme (Preview)</Text>
              <Text style={styles.settingSub}>Toggle dark appearance</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D5DB', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto-Sync with Server</Text>
              <Text style={styles.settingSub}>Sync local AsyncStorage with MongoDB</Text>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#D1D5DB', true: theme.colors.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About Application</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0 (MCA Project Edition)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Architecture</Text>
            <Text style={styles.infoValue}>React Native CLI + Express + MongoDB</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target Device</Text>
            <Text style={styles.infoValue}>Pixel 4a (Android API 34)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  settingInfo: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  settingSub: {
    fontSize: 12,
    color: theme.colors.mutedText,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.mutedText,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
});

export default SettingsScreen;
