import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { NetworkProvider } from 'react-native-offline';

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