import { Handle, Position } from "reactflow";
import { useNodeState } from "../hooks/nodeHooks";
import React from "react";

// NOTE: topHandles -> int (positioning defined by calculating total number of handles in that direction)
// statesAndDefaults -> [[state1Name, state1DefaultValue], [state2Name, State2DefaultValue], [], [], []]
// Handles = {
//  top: {
//    source: 2,
//    tatget: 1
//  },
//  left: {
//    source: int,
//    target: int
//  }
//  ...similar for bottom and right
// }
//
// containerSyles: object for css styling.
//
// media -> [ [{ type: 'image' | 'video' | 'document' | 'audio', source: 'url' }], [{}] ]
//
// type -> 
//

export interface NodeConfig {
  label: string;
  handles: NodeHandle[];
  customStyles: React.CSSProperties;
  height?: number;
  fields: NodeField[];
}

export interface NodeField {
  name: string;
  label: string;
  defaultValue: string;
  type: 'text' | 'select';
  options?: string[];
}

export interface NodeHandle {
  type: 'source' | 'target';
  position: Position;
  style?: React.CSSProperties;
  id: string;
}

export interface GenericNodeProps {
  id: string;
  config: NodeConfig;
}

const GenericNode = ({ id, config }: GenericNodeProps) => {
  const { state, handleChange } = useNodeState(config.fields);

  return (
    <div
      style={{
        width: 200,
        height: config.height || 100,
        border: '1px solid black',
        padding: '8px',
        borderRadius: '4px',
        ...config.customStyles,
      }}
    >
      <div>
        <strong>{config.label}</strong>
      </div>

      {/* reddering the fields */}
      <div>
        {
          config.fields?.map((field) => (
            <label key={field.name} style={{
              display: 'block',
              marginBottom: '8px',
            }}>
              {field.label}
              {
                field.type === 'text' ? (
                  <input
                    type="text"
                    value={state[field.name]}
                    onChange={e => handleChange(field.name, e.target.value)}
                    style={{ width: '100%', padding: '4px', marginTop: '4px' }}
                  />
                ) : (
                  <select
                    value={state[field.name]}
                    onChange={e => handleChange(field.name, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '4px',
                      marginTop: '4px'
                    }}
                  >
                    {
                      field.options?.map(val => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))
                    }
                  </select>
                )
              }
            </label>
          ))
        }
      </div>


    </div>
  )
}
