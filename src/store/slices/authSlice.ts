import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_CONFIG } from '../../constants/config';

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  token: string | null;
  userId: string | null;
  isLoading: boolean;
  error: string | null;
  otpSent: boolean;
  otpExpiry: Date | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  phoneNumber: null,
  token: null,
  userId: null,
  isLoading: false,
  error: null,
  otpSent: false,
  otpExpiry: null
};

export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (phoneNumber: string) => {
    // TODO: Implement actual API call
    // For now, simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      phoneNumber,
      expiry: new Date(Date.now() + AUTH_CONFIG.OTP_EXPIRY_MINUTES * 60 * 1000)
    };
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ phoneNumber, otp }: { phoneNumber: string; otp: string }) => {
    // TODO: Implement actual API call
    // For now, simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const mockToken = 'mock_jwt_token_' + Date.now();
    const mockUserId = 'user_' + Date.now();
    
    // Store auth data
    await AsyncStorage.setItem(AUTH_CONFIG.SESSION_STORAGE_KEY, JSON.stringify({
      token: mockToken,
      userId: mockUserId,
      phoneNumber
    }));
    
    return {
      token: mockToken,
      userId: mockUserId,
      phoneNumber
    };
  }
);

export const loadStoredAuth = createAsyncThunk(
  'auth/loadStoredAuth',
  async () => {
    const storedAuth = await AsyncStorage.getItem(AUTH_CONFIG.SESSION_STORAGE_KEY);
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
    return null;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await AsyncStorage.removeItem(AUTH_CONFIG.SESSION_STORAGE_KEY);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetOTP: (state) => {
      state.otpSent = false;
      state.otpExpiry = null;
    }
  },
  extraReducers: (builder) => {
    // Send OTP
    builder.addCase(sendOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otpSent = true;
      state.phoneNumber = action.payload.phoneNumber;
      state.otpExpiry = action.payload.expiry.toISOString();
    });
    builder.addCase(sendOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to send OTP';
    });
    
    // Verify OTP
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.phoneNumber = action.payload.phoneNumber;
      state.otpSent = false;
      state.otpExpiry = null;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Invalid OTP';
    });
    
    // Load stored auth
    builder.addCase(loadStoredAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.phoneNumber = action.payload.phoneNumber;
      }
    });
    
    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      return initialState;
    });
  }
});

export const { clearError, resetOTP } = authSlice.actions;
export default authSlice.reducer;