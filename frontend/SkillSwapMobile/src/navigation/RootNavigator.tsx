import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppDrawer from './AppDrawer';
import { useSkillSwap } from '../context/SkillSwapContext';
import { ActivityIndicator, View } from 'react-native';
import theme from '../constants/theme';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isLoadingSession, token } = useSkillSwap();

  if (isLoadingSession) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="root-navigator"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        {/*
          If token exists, initial route is Main; otherwise Auth.
          We define both screens so user can transition seamlessly.
        */}
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
