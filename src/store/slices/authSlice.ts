import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_CONFIG } from '../../constants/config';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  token: null,
  userId: null,
  isLoading: false,
  error: null
};

// Generate a 6-digit access code
const generateAccessCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { 
    firstName: string; 
    lastName: string; 
    username: string; 
    caseWorkerId?: string 
  }) => {
    // TODO: Implement actual API call
    // For now, simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const accessCode = generateAccessCode();
    const mockToken = 'mock_jwt_token_' + Date.now();
    const mockUserId = 'user_' + Date.now();
    
    // Store user data and access code
    await AsyncStorage.setItem(`user_${userData.username}`, JSON.stringify({
      ...userData,
      accessCode,
      userId: mockUserId
    }));
    
    // Store auth session
    await AsyncStorage.setItem(AUTH_CONFIG.SESSION_STORAGE_KEY, JSON.stringify({
      token: mockToken,
      userId: mockUserId,
      username: userData.username
    }));
    
    return {
      token: mockToken,
      userId: mockUserId,
      username: userData.username,
      accessCode // Return access code to show to user
    };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, accessCode }: { username: string; accessCode: string }) => {
    // TODO: Implement actual API call
    // For now, simulate login with local storage
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    const userDataStr = await AsyncStorage.getItem(`user_${username}`);
    if (!userDataStr) {
      throw new Error('Invalid username or access code');
    }
    
    const userData = JSON.parse(userDataStr);
    if (userData.accessCode !== accessCode) {
      throw new Error('Invalid username or access code');
    }
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    // Store auth session
    await AsyncStorage.setItem(AUTH_CONFIG.SESSION_STORAGE_KEY, JSON.stringify({
      token: mockToken,
      userId: userData.userId,
      username
    }));
    
    return {
      token: mockToken,
      userId: userData.userId,
      username
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
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Registration failed';
    });
    
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Login failed';
    });
    
    // Load stored auth
    builder.addCase(loadStoredAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
      }
    });
    
    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      return initialState;
    });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;