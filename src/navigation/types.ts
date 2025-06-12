import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type OnboardingStackParamList = {
  ProfileSetup: undefined;
  SkillsSelection: undefined;
  AvailabilitySetup: undefined;
  LocationSetup: undefined;
  OnboardingComplete: undefined;
};

export type MainTabParamList = {
  Opportunities: undefined;
  Jobs: undefined;
  Saved: undefined;
  Applications: undefined;
  Resources: undefined;
  ResourceCategory: { categoryId: string };
};

export type JobsStackParamList = {
  JobsList: undefined;
  JobDetails: { jobId: string };
  JobApplication: { jobId: string };
  JobFilters: undefined;
};

export type ProfileStackParamList = {
  ProfileView: undefined;
  EditProfile: undefined;
  EditSkills: undefined;
  EditAvailability: undefined;
  Settings: undefined;
};

export type ResourcesStackParamList = {
  ResourcesHome: undefined;
  InterviewPrep: undefined;
  BenefitsCalculator: undefined;
  SupportContacts: undefined;
  DigitalLiteracy: undefined;
};

// Navigation prop types
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export type OnboardingStackNavigationProp = StackNavigationProp<OnboardingStackParamList>;

export type MainStackNavigationProp = CompositeNavigationProp<
  AuthStackNavigationProp,
  RootStackNavigationProp
>;

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

export type JobsStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<JobsStackParamList>,
  MainTabNavigationProp
>;

export type ProfileStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList>,
  MainTabNavigationProp
>;

export type ResourcesStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ResourcesStackParamList>,
  MainTabNavigationProp
>;

// Route prop types
export type JobDetailsRouteProp = RouteProp<JobsStackParamList, 'JobDetails'>;
export type JobApplicationRouteProp = RouteProp<JobsStackParamList, 'JobApplication'>;