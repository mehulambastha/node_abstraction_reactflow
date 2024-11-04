import { useState } from "react";
import { Handle, Position } from "reactflow";

export const MyCustomNode = ({ id, data }) => {
  return (
    <div>
      <div style={{ borderRadius: '10px', borderWidth: '5px', borderColor: 'blueviolet' }}>
        This the custom node we&nbsp;ve all been thinking about.
      </div>
      <Handle
        type="target"
        position={Position.Top}
      />
    </div>
  )
}
