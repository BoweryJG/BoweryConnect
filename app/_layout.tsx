import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { Platform } from 'react-native';

// Conditionally import NetworkProvider only for native platforms
let NetworkProvider: any = ({ children }: any) => children;
if (Platform.OS !== 'web') {
  NetworkProvider = require('react-native-offline').NetworkProvider;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </NetworkProvider>
    </Provider>
  );
}