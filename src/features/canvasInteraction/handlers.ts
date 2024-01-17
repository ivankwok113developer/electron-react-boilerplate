import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import {
  setDragStart,
  setIsDragging,
  setTempRect,
  adjustZoomLevel,
  adjustPosition,
  setMousePosition,
  setLastMouseDownCoor,
  setIsMouseDown,
} from '../../slices/CanvasControlSlice';
import { useRef, useCallback, useEffect, useState } from 'react';
import {
  clearSelection,
  selectObject,
  setObjectCoordinates,
  moveObjectCoordinates,
} from '../../slices/CanvasObjectsSlice';
import { stat } from 'fs';

export const useCanvasInteractionHandlers = (
  canvasRef: React.RefObject<HTMLElement>,
) => {
  const dispatch = useDispatch();
  const zoomLevel = useAppSelector((state) => state.canvasControl.zoomLevel);
  const speedFactor = 1; // Adjust this value as needed
  const position = useAppSelector((state) => state.canvasControl.position);
  const mouseCoor = useAppSelector(
    (state) => state.canvasControl.mousePosition,
  );

  const canvasObjects = useAppSelector((state) => state.canvasObjects.objects);

  const selectedObjects = useAppSelector(
    (state) => state.canvasObjects.selectedObjects,
  );

  const lastMouseDownCoor = useAppSelector(
    (state) => state.canvasControl.lastMouseDownCoor,
  );

  const isMouseDown = useAppSelector(
    (state) => state.canvasControl.isMouseDown,
  );

  const isDragging = useAppSelector((state) => state.canvasControl.isDragging);
  const canvasHTMLElement = canvasRef.current?.childNodes[0]
    .childNodes[0] as HTMLElement;

  const initDragObjsCoor = useRef<{ [id: string]: { x: number; y: number } }>(
    {},
  );

  const handleWheelEvent = (event: WheelEvent) => {
    const adjustedDX = (event.deltaX * speedFactor) / zoomLevel;
    const adjustedDY = (event.deltaY * speedFactor) / zoomLevel;

    if (event.shiftKey) {
      // Horizontal shift adjusted for zoom level
      dispatch(adjustPosition({ dx: adjustedDX, dy: 0 }));
    } else if (event.metaKey || event.ctrlKey) {
      // Zoom
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      dispatch(adjustZoomLevel(zoomFactor));
    } else {
      // Vertical shift adjusted for zoom level
      dispatch(adjustPosition({ dx: 0, dy: -adjustedDY }));
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    //```get mouse position```
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    // Coordinates of the mouse relative to the top-left of the canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Adjust for zoom and position to get the coordinates relative to the center
    const adjustedX =
      (mouseX - element.offsetWidth / 2) / zoomLevel + position.x;
    const adjustedY =
      (mouseY - element.offsetHeight / 2) / zoomLevel - position.y;

    dispatch(setMousePosition({ x: adjustedX, y: adjustedY }));

    //```dragging```
    if (isMouseDown) {
      if (!isDragging) {
        handleDragStart();
      } else {
        handleOnDrag();
      }
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    console.log('handleMouseUp');
    dispatch(setIsMouseDown(false));

    if (isDragging) {
      handleOnDragEnd();
    }
  };

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      dispatch(setLastMouseDownCoor(null));
      dispatch(setIsMouseDown(true));
      const target = event.target as HTMLElement;
      const target_key = target.getAttribute('id');
      const parentNode = target.parentNode as HTMLElement | null;
      const isCanvasArea = target_key === 'canvas';
      console.log('handleMouseDown : target', target, 'target_key', target_key);
      if (isCanvasArea) {
        console.log('handleMouseDown : canvas area');
        dispatch(clearSelection());
      } else {
        console.log('handleMouseDown : object');
        const objectId = parentNode?.getAttribute('id');
        if (objectId) {
          dispatch(selectObject(objectId));
        }
      }
    },
    [dispatch, canvasRef],
  );

  const handleDragStart = () => {
    console.log('handleDragStart');
    dispatch(setIsDragging(true));
    if (selectedObjects === null) {
      console.log('handleOnDrag: start dragging on canvas');
      // Dragging on empty space to create a rectangle
    } else {
      console.log('handleDragStart: start dragging on an object');
      // Save the initial coordinates of the selected objects
      initDragObjsCoor.current = {};
      selectedObjects.forEach((objectId) => {
        const object = canvasObjects[objectId];
        if (object) {
          initDragObjsCoor.current[objectId] = { ...object.coordinates };
        }
      });
    }
  };

  const handleOnDrag = () => {
    if (selectedObjects === null) {
      console.log('handleOnDrag: dragging on canvas');
      // Dragging on empty space to create a rectangle
      const deltaX = lastMouseDownCoor ? mouseCoor.x - lastMouseDownCoor.x : 0;
      const deltaY = lastMouseDownCoor ? mouseCoor.y - lastMouseDownCoor.y : 0;
      dispatch(
        setTempRect({
          x: lastMouseDownCoor ? lastMouseDownCoor.x || 0 : 0,
          y: lastMouseDownCoor ? lastMouseDownCoor.y || 0 : 0,
          width: deltaX,
          height: deltaY,
        }),
      );
    } else {
      console.log('handleOnDrag: dragging on an object to move it');
      // Move the selected objects
      selectedObjects.forEach((objectId) => {
        const initialCoordinates = initDragObjsCoor.current[objectId];
        if (initialCoordinates && lastMouseDownCoor) {
          const deltaX = mouseCoor.x - lastMouseDownCoor.x;
          const deltaY = mouseCoor.y - lastMouseDownCoor.y;
          dispatch(
            setObjectCoordinates({
              id: objectId,
              coordinates: {
                x: initialCoordinates.x + deltaX,
                y: initialCoordinates.y + deltaY,
              },
            }),
          );
        }
      });
    }
  };

  const handleOnDragEnd = () => {
    console.log('handleOnDragEnd');
    dispatch(setIsDragging(false));
    // Reset the initial drag coordinates for objects
    initDragObjsCoor.current = {};
  };

  return {
    handleWheelEvent,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
};
