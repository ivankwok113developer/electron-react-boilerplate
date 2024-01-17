import { configureStore } from '@reduxjs/toolkit';
import canvasCameraSlice from '../slices/CanvasCameraSlice';
import canvasObjectsSlice from '../slices/CanvasObjectsSlice';
// ...

export const store = configureStore({
  reducer: {
    canvasCamera: canvasCameraSlice,
    canvasObjects: canvasObjectsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {canvasCamera: CanvasCameraState}
export type AppDispatch = typeof store.dispatch;
