import { useEffect } from 'react';
import { useCanvasInteractionHandlers } from '../features/canvasInteraction/handlers';

export const useCanvasInteraction = (ref: React.RefObject<HTMLElement>) => {
  const {
    handleWheelEvent,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  } = useCanvasInteractionHandlers(ref); // Pass ref to the handlers

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('wheel', handleWheelEvent);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheelEvent);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [
    ref,
    handleWheelEvent,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  ]);

  return {};
};

