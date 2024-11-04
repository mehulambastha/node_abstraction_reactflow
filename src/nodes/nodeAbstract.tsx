import { Handle, Position } from "reactflow";
import { useNodeState } from "../hooks/nodeHooks.ts";
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
  type: 'text' | 'select' | 'none';
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
        minWidth: 200,
        width: 'auto',
        maxWidth: 300,
        height: config.height || 'auto',
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
                    style={{ width: '80%', padding: '4px', marginTop: '4px', alignSelf: 'center' }}
                  />
                ) : field.type === 'select' ? (
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
                ) : (
                  <></>
                )
              }
            </label>
          ))
        }
      </div>

      {/* rendering media */}
      {
        config.fields?.find(field => field.name === 'imageURL') && (
          <img
            src={state['imageURL']}
            alt={"Node image"}
            style={{
              width: '100%',
              borderRadius: '4px'
            }}
          />
        )
      }

      {
        config.fields?.find(field => field.name === 'videoURL') && (
          <video
            controls
            style={{ width: '100%', borderRadius: '4px' }}
          >
            <source src={state['videoURL']} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      }

      {
        (() => {
          const handleMap = config.handles.reduce((acc, handle) => {
            acc[handle.position].push(handle)
            return acc
          }, {
            [Position.Left]: [],
            [Position.Right]: [],
            [Position.Top]: [],
            [Position.Bottom]: [],
          } as Record<Position.Left | Position.Right | Position.Top | Position.Bottom, NodeHandle[]>)

          const allHandles = Object.entries(handleMap).flatMap(([direction, handles]) => (
            handles.map((handle, index) => {
              const totalHandles = handleMap[handle.position].length;

              // Calculate top or left based on the direction
              const isVertical = handle.position === Position.Left || handle.position === Position.Right;
              const isHorizontal = handle.position === Position.Top || handle.position === Position.Bottom;

              return (
                <Handle
                  key={handle.id}
                  type={handle.type}
                  id={handle.type}
                  position={handle.position}
                  style={{
                    top: isVertical ? `${(index + 1) / totalHandles * 100}%` : '0%', // Center the handle within its position
                    left: isHorizontal ? `${(index + 1) / totalHandles * 100}%` : '0%',
                  }}
                />
              );
            })
          ));

          return allHandles;
        })
          ()
      }

    </div>
  )
}

export default GenericNode;
