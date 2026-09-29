import { configureStore } from '@reduxjs/toolkit';
import gigReducer from './gigSlice';

export const store = configureStore({
  reducer: {
    gigs: gigReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
