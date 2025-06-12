import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import { useAppSelector, useAppDispatch } from '../store';
import { loadStoredAuth } from '../store/slices/authSlice';
import { checkConnectivity, setOnlineStatus } from '../store/slices/offlineSlice';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { isProfileComplete } = useAppSelector(state => state.user);

  useEffect(() => {
    // Load stored authentication
    dispatch(loadStoredAuth());
    
    // Check connectivity
    dispatch(checkConnectivity());
    
    // Set up connectivity listener
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setOnlineStatus(state.isConnected ?? false));
    });
    
    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}