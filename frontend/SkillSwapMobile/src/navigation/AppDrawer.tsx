import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import LogoutScreen from '../screens/LogoutScreen';
import theme from '../constants/theme';
import { useSkillSwap } from '../context/SkillSwapContext';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { user } = useSkillSwap();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>
            {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'SS')}
          </Text>
        </View>
        <Text style={styles.headerName}>{user?.name || 'Student Freelancer'}</Text>
        <Text style={styles.headerDept}>
          {user?.department || 'Campus Community'}
        </Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Verified Student Peer</Text>
        </View>
      </View>

      <View style={styles.itemListContainer}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.drawerFooter}>
        <Text style={styles.footerVersion}>SkillSwap Mobile v1.0</Text>
        <Text style={styles.footerSub}>MCA Academic Project</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      id="app-drawer"
      initialRouteName="Marketplace"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: styles.drawerLabel,
        drawerItemStyle: styles.drawerItem,
      }}>
      <Drawer.Screen
        name="Marketplace"
        component={MainTabs}
        options={{
          drawerLabel: 'Campus Marketplace',
          drawerIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>🏪</Text>,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>⚙️</Text>,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerLabel: 'Help & Support',
          drawerIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>❓</Text>,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Sign Out',
          drawerIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>🚪</Text>,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
  },
  drawerHeader: {
    backgroundColor: theme.colors.primary,
    padding: 24,
    paddingTop: 40,
    marginBottom: 10,
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...theme.shadow.card,
  },
  headerAvatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerDept: {
    fontSize: 12,
    color: theme.colors.chip,
    marginBottom: 10,
  },
  headerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
    alignSelf: 'flex-start',
  },
  headerBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  itemListContainer: {
    flex: 1,
    paddingTop: 10,
  },
  drawerLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: -10,
  },
  drawerItem: {
    borderRadius: theme.radius.md,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
  },
  footerVersion: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  footerSub: {
    fontSize: 11,
    color: theme.colors.mutedText,
    marginTop: 2,
  },
});

export default AppDrawer;
