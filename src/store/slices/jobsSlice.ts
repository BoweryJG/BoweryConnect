import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Job, Application, ApplicationStatus } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JobsState {
  jobs: Job[];
  savedJobs: string[]; // Job IDs
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  filters: JobFilters;
}

interface JobFilters {
  searchQuery: string;
  jobType: string[];
  schedule: string[];
  distance: number;
  minWage: number;
  secondChanceOnly: boolean;
}

const initialState: JobsState = {
  jobs: [],
  savedJobs: [],
  applications: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  filters: {
    searchQuery: '',
    jobType: [],
    schedule: [],
    distance: 5,
    minWage: 0,
    secondChanceOnly: false
  }
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ page = 1, filters }: { page?: number; filters?: Partial<JobFilters> }) => {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock job data
    const mockJobs: Job[] = [];
    const hasMore = page < 5; // Mock pagination
    
    return { jobs: mockJobs, hasMore, page };
  }
);

export const saveJob = createAsyncThunk(
  'jobs/saveJob',
  async (jobId: string) => {
    // Save to local storage
    const savedJobs = await AsyncStorage.getItem('saved_jobs');
    const jobsList = savedJobs ? JSON.parse(savedJobs) : [];
    
    if (!jobsList.includes(jobId)) {
      jobsList.push(jobId);
      await AsyncStorage.setItem('saved_jobs', JSON.stringify(jobsList));
    }
    
    return jobId;
  }
);

export const unsaveJob = createAsyncThunk(
  'jobs/unsaveJob',
  async (jobId: string) => {
    // Remove from local storage
    const savedJobs = await AsyncStorage.getItem('saved_jobs');
    const jobsList = savedJobs ? JSON.parse(savedJobs) : [];
    
    const filtered = jobsList.filter((id: string) => id !== jobId);
    await AsyncStorage.setItem('saved_jobs', JSON.stringify(filtered));
    
    return jobId;
  }
);

export const applyToJob = createAsyncThunk(
  'jobs/applyToJob',
  async ({ jobId, userId, notes }: { jobId: string; userId: string; notes?: string }) => {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const application: Application = {
      id: `app_${Date.now()}`,
      userId,
      jobId,
      status: ApplicationStatus.PENDING,
      appliedAt: new Date(),
      notes
    };
    
    // Save to local storage
    const applications = await AsyncStorage.getItem('applications');
    const appsList = applications ? JSON.parse(applications) : [];
    appsList.push(application);
    await AsyncStorage.setItem('applications', JSON.stringify(appsList));
    
    return application;
  }
);

export const loadSavedData = createAsyncThunk(
  'jobs/loadSavedData',
  async () => {
    const [savedJobs, applications] = await Promise.all([
      AsyncStorage.getItem('saved_jobs'),
      AsyncStorage.getItem('applications')
    ]);
    
    return {
      savedJobs: savedJobs ? JSON.parse(savedJobs) : [],
      applications: applications ? JSON.parse(applications) : []
    };
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobsError: (state) => {
      state.error = null;
    },
    updateFilters: (state, action: PayloadAction<Partial<JobFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset pagination when filters change
      state.jobs = []; // Clear current jobs
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
      state.jobs = [];
    }
  },
  extraReducers: (builder) => {
    // Fetch jobs
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.page === 1) {
        state.jobs = action.payload.jobs;
      } else {
        state.jobs = [...state.jobs, ...action.payload.jobs];
      }
      state.currentPage = action.payload.page;
      state.hasMore = action.payload.hasMore;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch jobs';
    });
    
    // Save/unsave jobs
    builder.addCase(saveJob.fulfilled, (state, action) => {
      if (!state.savedJobs.includes(action.payload)) {
        state.savedJobs.push(action.payload);
      }
    });
    builder.addCase(unsaveJob.fulfilled, (state, action) => {
      state.savedJobs = state.savedJobs.filter(id => id !== action.payload);
    });
    
    // Apply to job
    builder.addCase(applyToJob.fulfilled, (state, action) => {
      state.applications.push(action.payload);
    });
    
    // Load saved data
    builder.addCase(loadSavedData.fulfilled, (state, action) => {
      state.savedJobs = action.payload.savedJobs;
      state.applications = action.payload.applications;
    });
  }
});

export const { clearJobsError, updateFilters, resetFilters } = jobsSlice.actions;
export default jobsSlice.reducer;