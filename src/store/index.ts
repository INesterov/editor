import { configureStore } from '@reduxjs/toolkit';
import { photosSlice } from './photos';

export const store = configureStore({
  reducer: {
    photo: photosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
