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
  PhoneInput: undefined;
  OTPVerification: { phoneNumber: string };
};

export type OnboardingStackParamList = {
  ProfileSetup: undefined;
  SkillsSelection: undefined;
  AvailabilitySetup: undefined;
  LocationSetup: undefined;
  OnboardingComplete: undefined;
};

export type MainTabParamList = {
  Jobs: undefined;
  Saved: undefined;
  Applications: undefined;
  Profile: undefined;
  Resources: undefined;
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
export type OTPVerificationRouteProp = RouteProp<AuthStackParamList, 'OTPVerification'>;
export type JobDetailsRouteProp = RouteProp<JobsStackParamList, 'JobDetails'>;
export type JobApplicationRouteProp = RouteProp<JobsStackParamList, 'JobApplication'>;