import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainTabParamList } from './types';
import JobsNavigator from './JobsNavigator';
import SavedJobsScreen from '../screens/main/SavedJobsScreen';
import ApplicationsScreen from '../screens/main/ApplicationsScreen';
import ProfileNavigator from './ProfileNavigator';
import ResourcesNavigator from './ResourcesNavigator';
import OpportunitiesHomeScreen from '../screens/main/OpportunitiesHomeScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          
          switch (route.name) {
            case 'Opportunities':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Saved':
              iconName = focused ? 'bookmark' : 'bookmark-outline';
              break;
            case 'Applications':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Resources':
              iconName = focused ? 'medical' : 'medical-outline';
              break;
            default:
              iconName = 'help-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        },
        headerShown: false
      })}
    >
      <Tab.Screen 
        name="Opportunities" 
        component={OpportunitiesHomeScreen}
        options={{ tabBarLabel: 'Life' }}
      />
      <Tab.Screen 
        name="Jobs" 
        component={JobsNavigator}
        options={{ tabBarLabel: 'Work' }}
      />
      <Tab.Screen 
        name="Saved" 
        component={SavedJobsScreen}
        options={{ tabBarLabel: 'Saved' }}
      />
      <Tab.Screen 
        name="Applications" 
        component={ApplicationsScreen}
        options={{ tabBarLabel: 'Applications' }}
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesNavigator}
        options={{ tabBarLabel: 'Resources' }}
      />
    </Tab.Navigator>
  );
}