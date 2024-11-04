// llmNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import GenericNode, { NodeConfig } from './nodeAbstract.tsx';

const llmNodeConfig: NodeConfig = {
  label: 'LLM',
  height: 80,
  fields: [],
  handles: [
    { id: 'system', type: 'target', position: Position.Left },
    { id: 'prompt', type: 'target', position: Position.Left },
    { id: 'response', type: 'source', position: Position.Right },
  ],
  customStyles: { borderColor: 'green' },
};

export const LLMNode = (props) => <GenericNode {...props} config={llmNodeConfig} />

