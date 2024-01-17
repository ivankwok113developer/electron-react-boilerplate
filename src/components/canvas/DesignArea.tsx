import React, { useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useCanvasInteraction } from '../../hooks/useCanvasInteraction';
import { useSelector } from 'react-redux';

export const DesignArea = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  useCanvasInteraction(ref);
  const { position, zoomLevel, canvasSize } = useAppSelector(
    (state) => state.canvasCamera,
  );
  const canvasObjects = useSelector((state: any) => {
    // Assuming 'canvasObjects' is the key where the reducer is combined in your store
    return state.canvasObjects?.objects || {};
  });

  return (
    <div ref={ref} className="bg-bg grow">
      <div className="flex justify-center items-center w-full h-full overflow-clip relative ">
        <div
          className="bg-dot-pattern absolute ring-4 ring-sky-400"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            transform: `scale(${zoomLevel}) translate(${-position.x}px, ${
              position.y
            }px)`,
          }}
        >
          {Object.values(canvasObjects).map((object: any) => (
            <div>
              {/* Pass the object properties to the dynamic component renderer */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
