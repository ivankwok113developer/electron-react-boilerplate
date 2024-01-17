import { configureStore } from '@reduxjs/toolkit';
import canvasControlSlice from '../slices/CanvasControlSlice';
import canvasObjectsSlice from '../slices/CanvasObjectsSlice';
// ...

export const store = configureStore({
  reducer: {
    canvasControl: canvasControlSlice,
    canvasObjects: canvasObjectsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {canvasControl: CanvasControlState}
export type AppDispatch = typeof store.dispatch;
