import { useEffect } from 'react';
import { useCanvasInteractionHandlers } from '../features/canvasInteraction/handlers';

export const useCanvasInteraction = (ref: React.RefObject<HTMLElement>) => {
  const { handleWheelEvent, handleMouseMove } = useCanvasInteractionHandlers();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('wheel', handleWheelEvent);
      element.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheelEvent);
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [ref, handleWheelEvent, handleMouseMove]);

  return {};
};
