import React from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import Block from './Block';
import UnknownTypeObject from './UnknownTypeObject';
import { selectObject } from '../../../slices/CanvasObjectsSlice';
import {CanvasObject} from '../../../models/canvas/objectModel';

const ObjectComponent: React.FC<CanvasObject> = ({
  id,
  type,
  coordinates,
  properties,
  isSelected,
}) => {
  const componentMappings: { [key: string]: React.FC<any> } = {
    block: Block,
    // Add other type-to-component mappings here
  };

  const RenderComponent = componentMappings[type] || UnknownTypeObject;

  return (
    <div
      id={id}
      className={`${isSelected ? 'ring-2 ring-cyan-600' : 'border-none'}`}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(${coordinates.x}px, ${-coordinates.y}px)`,
      }}
    >
      <RenderComponent
        isSelected={isSelected}
        objId={id}
        properties={properties}
      />
    </div>
  );
};

export default ObjectComponent;
