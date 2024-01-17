// src/hooks/useResizablePanel.ts
import { useState, useEffect, useCallback } from 'react';

const useResizablePanel = (initialWidth: number) => {
  const [width, setWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setWidth((prevWidth) => prevWidth + e.movementX);
      }
    },
    [isDragging],
  );

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    }

    return () => {
      if (isDragging) {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDragging);
      }
    };
  }, [isDragging, onDrag, stopDragging]);

  return {
    width,
    isDragging,
    startDragging,
    resizeHandleClass: isDragging
      ? 'bg-sky-500'
      : 'hover:bg-sky-500 bg-transparent',
  };
};

export default useResizablePanel;
