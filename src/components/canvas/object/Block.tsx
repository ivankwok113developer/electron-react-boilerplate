import React from 'react';
import {
  BlockObject,
  BlockProperties,
} from '../../../models/canvas/objectModel';
import openaiIcon from '../../../assets/logos/openai.svg';


const BlockComponent: React.FC<BlockObject> = ({
  id,
  properties,
  isSelected,
}) => {

  return (
    <div className="p-6 divide-zinc-600/80 min-w-[300px] min-h-[300px] h-fit w-fit bg-zinc-700 rounded-lg ">
      <div
        className={`grid grid-cols-1 gap-3 divide-y divide-zinc-600/80 ${
          isSelected ? '' : 'pointer-events-none'
        }`}
      >
        <div>
          <div className="flex flex-row items-center">
            <img className="w-[36px]" src={openaiIcon} alt="openaiIcon" />
            <h6 className="ml-2">{properties.name}</h6>
            <button
              className="ml-auto bg-red"
              onClick={() => {
                console.log(properties.name);
              }}
            >
              Debug button
            </button>
          </div>
        </div>
        <p>123</p>
      </div>
    </div>
  );
};

export default BlockComponent;
