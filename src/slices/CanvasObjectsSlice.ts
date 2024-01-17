// /Users/ivankwok/develope/ScriptAssembler/src/slices/CanvasObjectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import testData from './canvasTest.json'; // Assuming JSON import is configured
import { CanvasObject, CanvasObjectsState } from '../models/canvas/objectModel'; // Adjust the path as needed



const initialState: CanvasObjectsState = {
  objects: testData,
  selectedObjects: [],
};

const canvasObjectsSlice = createSlice({
  name: 'canvasObjects',
  initialState,
  reducers: {
    addObject: (state, action: PayloadAction<CanvasObject>) => {
      state.objects[action.payload.id] = action.payload;
    },
    setObjectCoordinates: (
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
    moveObjectCoordinates: (
      state,
      action: PayloadAction<{
        id: string;
        coordinates: { dx: number; dy: number };
      }>,
    ) => {
      const { id, coordinates } = action.payload;
      if (state.objects[id]) {
        state.objects[id].coordinates.x += coordinates.dx;
        state.objects[id].coordinates.y += coordinates.dy;
      }
    },

    selectObject: (state, action: PayloadAction<string>) => {
      //add object to selectedObjects
      state.selectedObjects.push(action.payload); 
      
      //set onject's isSelected to true
      state.objects[action.payload].isSelected = true;
    },

    // Reducer to clear selection
    clearSelection: (state) => {
      //clear selectedObjects
      state.selectedObjects = [];

      //set each object's isSelected to false
      Object.values(state.objects).forEach((object) => {
        object.isSelected = false;
      });
    },
  },
});

export const {
  addObject,
  setObjectCoordinates,
  selectObject,
  clearSelection,
  moveObjectCoordinates,
} = canvasObjectsSlice.actions;
export default canvasObjectsSlice.reducer;
