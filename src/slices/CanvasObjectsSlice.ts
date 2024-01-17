import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import testData from './canvasTest.json'; // Assuming JSON import is configured

interface CanvasObject {
  id: string;
  type: string;
  coordinates: { x: number; y: number };
  properties: any;
  // Add more properties as needed
}

interface CanvasObjectsState {
  objects: { [id: string]: CanvasObject };
}

const initialState: CanvasObjectsState = {
  objects: testData,
};

const canvasObjectsSlice = createSlice({
  name: 'canvasObjects',
  initialState,
  reducers: {
    addObject: (state, action: PayloadAction<CanvasObject>) => {
      state.objects[action.payload.id] = action.payload;
    },
    updateObjectCoordinates: (
      state,
      action: PayloadAction<{
        id: string;
        coordinates: { x: number; y: number };
      }>,
    ) => {
      const { id, coordinates } = action.payload;
      if (state.objects[id]) {
        state.objects[id].coordinates = coordinates;
      }
    },
    // Add more reducers as needed (updateObject, removeObject, etc.)
  },
});

export const { addObject, updateObjectCoordinates } = canvasObjectsSlice.actions;
export default canvasObjectsSlice.reducer;
