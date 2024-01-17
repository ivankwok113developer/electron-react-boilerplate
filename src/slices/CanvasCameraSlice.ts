import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CanvasCameraState {
  zoomLevel: number;
  position: {
    x: number;
    y: number;
  };
  mousePosition: {
    x: number | null;
    y: number | null;
  };
  canvasSize: {
    width: number;
    height: number;
  };
}

// Define the initial canvas size
const canvasInitialSize = { width: 5000, height: 5000 }; // Adjust this size as needed


// Define the initial state using that type
const initialState: CanvasCameraState = {
  zoomLevel: 1, // Assuming 1 is the default zoom level (100%)
  position: {
    // Initialize the position at the center of the canvas
    x: 0,
    y: 0,
  },
  mousePosition: {
    x: 0,
    y: 0,
  },
  canvasSize: canvasInitialSize,
};

export const canvasCameraSlice = createSlice({
  name: 'canvasCamera',
  initialState,
  reducers: {
    // Reducer to adjust zoom level
    adjustZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel *= action.payload;
    },

    // Reducer to adjust position
    adjustPosition: (
      state,
      action: PayloadAction<{ dx: number; dy: number }>,
    ) => {
      state.position.x += action.payload.dx;
      state.position.y += action.payload.dy;
    },
    setMousePosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      state.mousePosition.x = action.payload.x;
      state.mousePosition.y = -action.payload.y;
    },
  },
});

export const { adjustZoomLevel, adjustPosition, setMousePosition, } =
  canvasCameraSlice.actions;

export default canvasCameraSlice.reducer;
