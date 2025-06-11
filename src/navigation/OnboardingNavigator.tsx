import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from './types';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';
import SkillsSelectionScreen from '../screens/onboarding/SkillsSelectionScreen';
import AvailabilitySetupScreen from '../screens/onboarding/AvailabilitySetupScreen';
import LocationSetupScreen from '../screens/onboarding/LocationSetupScreen';
import OnboardingCompleteScreen from '../screens/onboarding/OnboardingCompleteScreen';
import { colors } from '../constants/theme';

const Stack = createStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
          elevation: 0,
          shadowOpacity: 0
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        cardStyle: { backgroundColor: colors.background.primary }
      }}
    >
      <Stack.Screen 
        name="ProfileSetup" 
        component={ProfileSetupScreen}
        options={{ 
          title: 'Create Your Profile',
          headerLeft: () => null // Prevent going back during onboarding
        }}
      />
      <Stack.Screen 
        name="SkillsSelection" 
        component={SkillsSelectionScreen}
        options={{ title: 'Your Skills' }}
      />
      <Stack.Screen 
        name="AvailabilitySetup" 
        component={AvailabilitySetupScreen}
        options={{ title: 'Your Availability' }}
      />
      <Stack.Screen 
        name="LocationSetup" 
        component={LocationSetupScreen}
        options={{ title: 'Your Location' }}
      />
      <Stack.Screen 
        name="OnboardingComplete" 
        component={OnboardingCompleteScreen}
        options={{ 
          title: 'Welcome!',
          headerLeft: () => null
        }}
      />
    </Stack.Navigator>
  );
}