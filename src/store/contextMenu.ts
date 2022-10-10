import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ContextMenuState = {
  isOpen: boolean;
  x: number;
  y: number;
};

const initialState: ContextMenuState = {
  isOpen: false,
  x: 0,
  y: 0,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openMenu: (state, action: PayloadAction<{ x: number; y: number; }>) => {
      const { x, y } = action.payload;

      state.isOpen = true;
      state.x = x;
      state.y = y;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = contextMenuSlice.actions;
