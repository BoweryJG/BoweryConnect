import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { NetworkProvider } from 'react-native-offline';
import { loadOfflineData } from './src/store/slices/offlineSlice';
import { loadSavedData } from './src/store/slices/jobsSlice';

export default function App() {
  useEffect(() => {
    // Load offline data on app start
    store.dispatch(loadOfflineData());
    store.dispatch(loadSavedData());
  }, []);

  return (
    <Provider store={store}>
      <NetworkProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </NetworkProvider>
    </Provider>
  );
}
