import { configureStore } from '@reduxjs/toolkit';
import { photosSlice } from './photos';
import { contextMenuSlice } from './contextMenu';

export const store = configureStore({
  reducer: {
    photo: photosSlice.reducer,
    contextMenu: contextMenuSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
