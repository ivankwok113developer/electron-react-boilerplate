import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import {
  adjustZoomLevel,
  adjustPosition,
  setMousePosition,
} from '../../slices/CanvasCameraSlice';

export const useCanvasInteractionHandlers = () => {
  const dispatch = useDispatch();
  const zoomLevel = useAppSelector((state) => state.canvasCamera.zoomLevel);
  const speedFactor = 1; // Adjust this value as needed
  const position = useAppSelector((state) => state.canvasCamera.position); // Add this line

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
  };

  return { handleWheelEvent, handleMouseMove };
};
