// src/components/canvas/LeftPanel.tsx
import React from 'react';
import useResizablePanel from '../../hooks/useResizablePanel'; // Adjust the import path as needed

export const LeftPanel = (): JSX.Element => {
  const { width, isDragging, startDragging, resizeHandleClass } =
    useResizablePanel(300);

  return (
    <div
      className=" min-w-[200px] relative h-full bg-bg-2 border-r border-solid border-[#ffffff1a]"
      style={{ width }}
    >
      {/* resize handler */}
      <div
        className={`absolute top-0 right-0 w-1 h-full cursor-ew-resize ${resizeHandleClass}`}
        onMouseDown={(e) => {
          startDragging();
          e.preventDefault();
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
          isDragging
            ? null
            : (e.currentTarget.style.backgroundColor = '#3B82F6')
        }
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
          isDragging ? null : (e.currentTarget.style.backgroundColor = '')
        }
      />
      {/* ... rest of your panel content ... */}
    </div>
  );
};
    