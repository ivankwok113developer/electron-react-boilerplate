import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

// Define a type for the slice state
export interface CanvasControlState {
  zoomLevel: number;
  position: {
    x: number;
    y: number;
  };
  mousePosition: {
    x: number;
    y: number;
  };
  canvasSize: {
    width: number;
    height: number;
  };
  lastMouseDownCoor: {
    x: number;
    y: number;
  } | null;
  isDragging: boolean;
  isMouseDown: boolean;
  tempRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
}

// Define the initial canvas size
const canvasInitialSize = { width: 5000, height: 5000 }; // Adjust this size as needed

// Define the initial state using that type
const initialState: CanvasControlState = {
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
  lastMouseDownCoor: null,
  isDragging: false,
  isMouseDown: false,
  tempRect: null,
};

export const canvasControlSlice = createSlice({
  name: 'canvasControl',
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
    setLastMouseDownCoor: (
      state,
      action: PayloadAction<null>,
    ) => {
      state.lastMouseDownCoor = state.mousePosition;
    },
    setDragStart: (
      state,
      action: PayloadAction<{ x: number; y: number } | null>,
    ) => {
      state.lastMouseDownCoor = action.payload;
    },
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setIsMouseDown: (state, action: PayloadAction<boolean>) => {
      state.isMouseDown = action.payload;
    },
    // for selecting object
    setTempRect: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        width: number;
        height: number;
      } | null>,
    ) => {
      state.tempRect = action.payload;
    },
  },
});

export const {
  adjustZoomLevel,
  adjustPosition,
  setMousePosition,
  setDragStart,
  setIsDragging,
  setIsMouseDown,
  setTempRect,
  setLastMouseDownCoor,
} = canvasControlSlice.actions;

export default canvasControlSlice.reducer;
