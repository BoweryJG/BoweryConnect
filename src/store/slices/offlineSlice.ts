import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { OFFLINE_CONFIG } from '../../constants/config';

interface OfflineState {
  isOnline: boolean;
  pendingActions: PendingAction[];
  lastSync: Date | null;
  syncInProgress: boolean;
  syncError: string | null;
}

interface PendingAction {
  id: string;
  type: string;
  payload: any;
  timestamp: Date;
  retryCount: number;
}

const initialState: OfflineState = {
  isOnline: true,
  pendingActions: [],
  lastSync: null,
  syncInProgress: false,
  syncError: null
};

export const checkConnectivity = createAsyncThunk(
  'offline/checkConnectivity',
  async () => {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected ?? false;
  }
);

export const syncOfflineData = createAsyncThunk(
  'offline/syncData',
  async (_, { getState }) => {
    const state = getState() as any;
    const pendingActions = state.offline.pendingActions;
    
    if (pendingActions.length === 0) {
      return { synced: [], failed: [] };
    }
    
    const synced: string[] = [];
    const failed: string[] = [];
    
    // TODO: Implement actual sync logic
    for (const action of pendingActions) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        synced.push(action.id);
      } catch (error) {
        failed.push(action.id);
      }
    }
    
    // Update last sync time
    await AsyncStorage.setItem('last_sync', new Date().toISOString());
    
    return { synced, failed };
  }
);

export const savePendingAction = createAsyncThunk(
  'offline/savePendingAction',
  async (action: Omit<PendingAction, 'id' | 'timestamp' | 'retryCount'>) => {
    const pendingAction: PendingAction = {
      ...action,
      id: `action_${Date.now()}`,
      timestamp: new Date(),
      retryCount: 0
    };
    
    // Save to AsyncStorage
    const storedActions = await AsyncStorage.getItem('pending_actions');
    const actions = storedActions ? JSON.parse(storedActions) : [];
    actions.push(pendingAction);
    await AsyncStorage.setItem('pending_actions', JSON.stringify(actions));
    
    return pendingAction;
  }
);

export const loadOfflineData = createAsyncThunk(
  'offline/loadData',
  async () => {
    const [pendingActions, lastSync] = await Promise.all([
      AsyncStorage.getItem('pending_actions'),
      AsyncStorage.getItem('last_sync')
    ]);
    
    return {
      pendingActions: pendingActions ? JSON.parse(pendingActions) : [],
      lastSync: lastSync ? new Date(lastSync) : null
    };
  }
);

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    clearSyncError: (state) => {
      state.syncError = null;
    },
    removePendingAction: (state, action: PayloadAction<string>) => {
      state.pendingActions = state.pendingActions.filter(
        a => a.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    // Check connectivity
    builder.addCase(checkConnectivity.fulfilled, (state, action) => {
      state.isOnline = action.payload;
    });
    
    // Sync data
    builder.addCase(syncOfflineData.pending, (state) => {
      state.syncInProgress = true;
      state.syncError = null;
    });
    builder.addCase(syncOfflineData.fulfilled, (state, action) => {
      state.syncInProgress = false;
      state.lastSync = new Date();
      
      // Remove synced actions
      state.pendingActions = state.pendingActions.filter(
        action => !action.payload.synced.includes(action.id)
      );
    });
    builder.addCase(syncOfflineData.rejected, (state, action) => {
      state.syncInProgress = false;
      state.syncError = action.error.message || 'Sync failed';
    });
    
    // Save pending action
    builder.addCase(savePendingAction.fulfilled, (state, action) => {
      state.pendingActions.push(action.payload);
    });
    
    // Load offline data
    builder.addCase(loadOfflineData.fulfilled, (state, action) => {
      state.pendingActions = action.payload.pendingActions;
      state.lastSync = action.payload.lastSync;
    });
  }
});

export const { setOnlineStatus, clearSyncError, removePendingAction } = offlineSlice.actions;
export default offlineSlice.reducer;