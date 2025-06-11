import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ResourcesStackParamList } from './types';
import ResourcesHomeScreen from '../screens/resources/ResourcesHomeScreen';
import InterviewPrepScreen from '../screens/resources/InterviewPrepScreen';
import BenefitsCalculatorScreen from '../screens/resources/BenefitsCalculatorScreen';
import SupportContactsScreen from '../screens/resources/SupportContactsScreen';
import DigitalLiteracyScreen from '../screens/resources/DigitalLiteracyScreen';
import { colors } from '../constants/theme';

const Stack = createStackNavigator<ResourcesStackParamList>();

export default function ResourcesNavigator() {
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
        name="ResourcesHome" 
        component={ResourcesHomeScreen}
        options={{ title: 'Resources' }}
      />
      <Stack.Screen 
        name="InterviewPrep" 
        component={InterviewPrepScreen}
        options={{ title: 'Interview Preparation' }}
      />
      <Stack.Screen 
        name="BenefitsCalculator" 
        component={BenefitsCalculatorScreen}
        options={{ title: 'Benefits Calculator' }}
      />
      <Stack.Screen 
        name="SupportContacts" 
        component={SupportContactsScreen}
        options={{ title: 'Support Contacts' }}
      />
      <Stack.Screen 
        name="DigitalLiteracy" 
        component={DigitalLiteracyScreen}
        options={{ title: 'Digital Skills' }}
      />
    </Stack.Navigator>
  );
}