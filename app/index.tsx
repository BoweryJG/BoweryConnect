import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from '../src/navigation/MainNavigator';
import { useAppDispatch } from '../src/store';
import { loadOfflineData } from '../src/store/slices/offlineSlice';
import { loadSavedData } from '../src/store/slices/jobsSlice';

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOfflineData());
    dispatch(loadSavedData());
  }, [dispatch]);

  return (
    <>
      <StatusBar style="auto" />
      <MainNavigator />
    </>
  );
}