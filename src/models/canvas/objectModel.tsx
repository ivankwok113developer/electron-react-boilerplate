export interface CanvasObject {
  id: string;
  type: string;
  coordinates: { x: number; y: number };
  isSelected: boolean;
  properties: any;
  // Add more properties as needed
}

export interface CanvasObjectsState {
  objects: { [id: string]: CanvasObject };
  selectedObjects: string[]; // Array to hold the IDs of selected objects
}

export interface BlockProperties {
  name: string;
  state: string; // the state of the block (running, stopped, paused, etc.)
  inputs: string[]; // store all the inputs' id
  outputs: string[]; // store all the outputs' id
  parameters: BlockParameters[];
  script: string; //the python script of the block
}

export interface BlockParameters {
  id: string;
  name: string;
  dataType: string; //data type
  value: any;
  interface : {
    type : string; // default 
    setting : any; // setting for the interface
  }
}

export interface Node {
  id: string;
  type: string; //input or output
  dataType: string; //data type
  value: any;
}
// Define the Block interface by extending CanvasObject but replacing the properties field
export interface BlockObject extends Omit<CanvasObject, 'properties'> {
  properties: BlockProperties;
}