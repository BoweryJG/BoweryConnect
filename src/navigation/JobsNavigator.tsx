import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { JobsStackParamList } from './types';
import JobsListScreen from '../screens/jobs/JobsListScreen';
import JobDetailsScreen from '../screens/jobs/JobDetailsScreen';
import JobApplicationScreen from '../screens/jobs/JobApplicationScreen';
import JobFiltersScreen from '../screens/jobs/JobFiltersScreen';
import { colors } from '../constants/theme';

const Stack = createStackNavigator<JobsStackParamList>();

export default function JobsNavigator() {
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
        name="JobsList" 
        component={JobsListScreen}
        options={{ title: 'Jobs' }}
      />
      <Stack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen}
        options={{ title: 'Job Details' }}
      />
      <Stack.Screen 
        name="JobApplication" 
        component={JobApplicationScreen}
        options={{ title: 'Apply' }}
      />
      <Stack.Screen 
        name="JobFilters" 
        component={JobFiltersScreen}
        options={{ 
          title: 'Filters',
          presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  );
}