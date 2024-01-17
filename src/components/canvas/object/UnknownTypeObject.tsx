import React from 'react';

interface UnknownTypeObjectProps {
  type: string; // Optional additional properties
}

const UnknownTypeObject: React.FC<UnknownTypeObjectProps> = ({ type }) => {
  return (
    <div className="w-25 h-25 bg-red-500 text-white flex items-center justify-center">
      Unknown type: {type}
    </div>
  );
};

export default UnknownTypeObject;
