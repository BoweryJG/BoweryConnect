import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from './types';
import ProfileViewScreen from '../screens/profile/ProfileViewScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import EditSkillsScreen from '../screens/profile/EditSkillsScreen';
import EditAvailabilityScreen from '../screens/profile/EditAvailabilityScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import { colors } from '../constants/theme';

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border.light
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        }
      }}
    >
      <Stack.Screen 
        name="ProfileView" 
        component={ProfileViewScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen 
        name="EditSkills" 
        component={EditSkillsScreen}
        options={{ title: 'Edit Skills' }}
      />
      <Stack.Screen 
        name="EditAvailability" 
        component={EditAvailabilityScreen}
        options={{ title: 'Edit Availability' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}