import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  isProfileComplete: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
  isProfileComplete: false
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string) => {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check local storage first
    const cachedUser = await AsyncStorage.getItem(`user_profile_${userId}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    
    // Mock user data
    return null;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: Partial<User>) => {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to local storage
    if (userData.id) {
      await AsyncStorage.setItem(`user_profile_${userData.id}`, JSON.stringify(userData));
    }
    
    return userData;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    updateUserField: (state, action: PayloadAction<{ field: keyof User; value: any }>) => {
      if (state.currentUser) {
        (state.currentUser as any)[action.payload.field] = action.payload.value;
      }
    }
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isProfileComplete = checkProfileCompleteness(action.payload);
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch profile';
    });
    
    // Update profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        state.isProfileComplete = checkProfileCompleteness(state.currentUser);
      }
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update profile';
    });
  }
});

function checkProfileCompleteness(user: User | null): boolean {
  if (!user) return false;
  
  return !!(
    user.firstName &&
    user.skills.length > 0 &&
    user.availability &&
    user.location &&
    user.transportation.length > 0
  );
}

export const { clearUserError, updateUserField } = userSlice.actions;
export default userSlice.reducer;