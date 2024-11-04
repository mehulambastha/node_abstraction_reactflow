import { useCallback, useState } from "react";
import { NodeField } from "../nodes/nodeAbstract";

export const useNodeState = (fields: NodeField[]) => {
  const [state, setState] = useState<Record<string, string>>(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      return acc;
    }, {} as Record<string, string>)
  );

  const handleChange = useCallback((field: string, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { state, handleChange };
}
