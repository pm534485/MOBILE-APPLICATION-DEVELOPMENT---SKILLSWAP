import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyGigsScreen from '../screens/MyGigsScreen';
import PostGigScreen from '../screens/PostGigScreen';
import ProfileScreen from '../screens/ProfileScreen';
import theme from '../constants/theme';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      id="main-tabs"
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedText,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color }) => {
          let icon = '⌂';
          if (route.name === 'HomeTab') icon = '⌂';
          else if (route.name === 'MyGigs') icon = '💼';
          else if (route.name === 'PostGig') icon = '＋';
          else if (route.name === 'Profile') icon = '👤';

          return (
            <View
              style={[
                styles.iconContainer,
                route.name === 'PostGig' && styles.postIconContainer,
              ]}>
              <Text
                style={[
                  styles.iconText,
                  { color: route.name === 'PostGig' ? '#FFFFFF' : color },
                  focused && styles.iconTextFocused,
                ]}>
                {icon}
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="MyGigs"
        component={MyGigsScreen}
        options={{ tabBarLabel: 'My Gigs' }}
      />
      <Tab.Screen
        name="PostGig"
        component={PostGigScreen}
        options={{
          tabBarLabel: 'Post Gig',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 8,
    paddingTop: 6,
    ...theme.shadow.card,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  postIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  iconText: {
    fontSize: 18,
  },
  iconTextFocused: {
    fontWeight: '800',
  },
});

export default MainTabs;
