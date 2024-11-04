import React from "react";
import { Position } from "reactflow";
import GenericNode, { GenericNodeProps } from "./nodeAbstract.tsx";

const textConfig: GenericNodeProps = {
  id: '1',
  config: {
    fields: [{
      label: "Input1",
      type: 'text',
      defaultValue: 'something',
      name: 'First input'
    }],
    label: 'Text Label',
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: '1'
      }
    ],
    customStyles: {
      background: 'blue'
    }
  }
}

export const TextNode = (props) => <GenericNode {...props} config={textConfig.config} /> 
