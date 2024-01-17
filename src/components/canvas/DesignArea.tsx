import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { useCanvasInteraction } from '../../hooks/useCanvasInteraction';
import ObjectComponent from './object/Object'; // Import the Object component

export const DesignArea = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  useCanvasInteraction(ref); // This now includes the mouse down logic
  const { position, zoomLevel, canvasSize } = useAppSelector(
    (state) => state.canvasControl,
  );
  const canvasObjects = useSelector(
    (state: any) => state.canvasObjects?.objects || {},
  );

  const tempRect = useAppSelector((state) => state.canvasControl.tempRect);
  return (
    // design area div
    <div
      ref={ref}
      className="bg-bg grow"
    >
      {/* DO NOT add more div as the src/features/canvasInteraction/handlers.ts */}
      <div className="flex justify-center items-center w-full h-full overflow-clip relative" >
        {/* canvas div */}
        <div
          id={'canvas'}
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
            <ObjectComponent
              key={object.id}
              id={object.id}
              type={object.type}
              coordinates={object.coordinates}
              properties={object.properties}
              isSelected={object.isSelected}
            />
          ))}
        </div>
        <div>
          {/* {tempRect && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${tempRect.width}px`,
                height: `${-tempRect.height}px`,
                transform: `translate(${tempRect.x}px, ${-tempRect.y}px)`,
                backgroundColor: 'rgba(0, 0, 255, 0.5)', // Semi-transparent blue
              }}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default DesignArea;
