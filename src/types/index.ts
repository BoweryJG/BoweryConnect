export interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  skills: string[];
  experience: Experience[];
  education?: Education[];
  availability: Availability;
  location: Location;
  transportation: TransportationMethod[];
  languages: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  shelterAffiliation?: string;
  caseWorkerContact?: CaseWorker;
}

export interface Experience {
  id: string;
  title: string;
  company?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isCurrent: boolean;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree?: string;
  field?: string;
  year?: number;
}

export interface Availability {
  daysAvailable: DayOfWeek[];
  timeSlots: TimeSlot[];
  startDate: Date;
  isFlexible: boolean;
}

export interface TimeSlot {
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
}

export interface Location {
  zipCode?: string;
  borough?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
}

export interface CaseWorker {
  id: string;
  name: string;
  organization: string;
  phoneNumber?: string;
  email?: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  skills: string[];
  location: Location;
  type: JobType;
  schedule: JobSchedule;
  wage: Wage;
  benefits?: string[];
  isSecondChanceEmployer: boolean;
  transportationAccessible: boolean;
  createdAt: Date;
  expiresAt?: Date;
  applications: number;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  size?: CompanySize;
  industry?: string;
  isVerified: boolean;
  isSecondChanceEmployer: boolean;
}

export interface Wage {
  amount: number;
  period: WagePeriod;
  currency: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  notes?: string;
  caseWorkerEndorsement?: boolean;
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export enum TransportationMethod {
  WALKING = 'walking',
  PUBLIC_TRANSIT = 'public_transit',
  BICYCLE = 'bicycle',
  CAR = 'car'
}

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  TEMPORARY = 'temporary',
  DAY_LABOR = 'day_labor',
  INTERNSHIP = 'internship',
  APPRENTICESHIP = 'apprenticeship'
}

export enum JobSchedule {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night',
  FLEXIBLE = 'flexible',
  ROTATING = 'rotating'
}

export enum WagePeriod {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export enum CompanySize {
  SMALL = '1-50',
  MEDIUM = '51-250',
  LARGE = '251-1000',
  ENTERPRISE = '1000+'
}

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn'
}