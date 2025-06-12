import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { Platform } from 'react-native';
import { NetworkProvider } from 'react-native-offline';

export default function RootLayout() {
  const content = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );

  return (
    <Provider store={store}>
      {Platform.OS === 'web' ? (
        content
      ) : (
        <NetworkProvider>
          {content}
        </NetworkProvider>
      )}
    </Provider>
  );
}