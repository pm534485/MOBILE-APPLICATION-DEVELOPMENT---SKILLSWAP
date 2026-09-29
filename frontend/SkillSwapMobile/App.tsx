import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SkillSwapProvider } from './src/context/SkillSwapContext';
import RootNavigator from './src/navigation/RootNavigator';
import storage from './src/utils/storage';
import { hydrateSaved } from './src/redux/gigSlice';

const AppContent = () => {
  useEffect(() => {
    // Hydrate Redux saved gigs from AsyncStorage on startup
    const hydrate = async () => {
      try {
        const saved = await storage.getSavedGigs();
        if (saved && saved.length > 0) {
          store.dispatch(hydrateSaved(saved));
        }
      } catch (e) {
        console.warn('Failed to hydrate saved gigs', e);
      }
    };
    hydrate();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <RootNavigator />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SkillSwapProvider>
        <AppContent />
      </SkillSwapProvider>
    </Provider>
  );
};

export default App;
