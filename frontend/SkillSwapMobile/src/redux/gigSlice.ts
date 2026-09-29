import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '../utils/storage';

export interface SavedGigItem {
  id: string;
  title: string;
  price: number;
  category?: string;
  deliveryTime?: string;
}

export interface GigState {
  saved: SavedGigItem[];
  totalCost: number;
}

const initialState: GigState = {
  saved: [],
  totalCost: 0,
};

export const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    saveGig: (state, action: PayloadAction<SavedGigItem>) => {
      const exists = state.saved.find((g) => g.id === action.payload.id);
      if (!exists) {
        state.saved.push(action.payload);
        state.totalCost = state.saved.reduce((acc, curr) => acc + (curr.price || 0), 0);
        storage.setSavedGigs(state.saved);
      }
    },
    removeGig: (state, action: PayloadAction<string>) => {
      state.saved = state.saved.filter((g) => g.id !== action.payload);
      state.totalCost = state.saved.reduce((acc, curr) => acc + (curr.price || 0), 0);
      storage.setSavedGigs(state.saved);
    },
    hydrateSaved: (state, action: PayloadAction<SavedGigItem[]>) => {
      state.saved = action.payload || [];
      state.totalCost = state.saved.reduce((acc, curr) => acc + (curr.price || 0), 0);
    },
  },
});

export const { saveGig, removeGig, hydrateSaved } = gigSlice.actions;
export default gigSlice.reducer;
